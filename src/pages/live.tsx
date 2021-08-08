// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import { PageProps } from 'gatsby';
import React, { Dispatch, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TwitchEmbed from 'components/Live';
import Overlay from 'components/Live/Overlay';
import Queue from 'components/Live/Queue';
import Songlist from 'components/Live/Songlist';
import { buildTwitchRedirectUrl } from 'helpers/auth';
import { QUEUE_REQUEST_GET } from 'state/queue/actions';
import { STATUS_REQUEST_GET } from 'state/requestStatus/actions';
import { LIST_REQUEST_GET } from 'state/songlist/actions';
import { RootAction, RootState } from 'state/types';
import { AUTHENTICATE_REFRESH, LOAD_AUTHENTICATION } from 'state/user/actions';
import { WS_CONNECT, WS_DISCONNECT } from 'state/websocket/actions';

import NotFoundPage from './404';

const Live: React.FC<PageProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const authFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    dispatch({ type: WS_CONNECT });
    dispatch({ type: STATUS_REQUEST_GET });
    dispatch({ type: QUEUE_REQUEST_GET });
    dispatch({ type: LIST_REQUEST_GET });
    dispatch({ type: LOAD_AUTHENTICATION });

    return () => {
      dispatch({ type: WS_DISCONNECT });
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (event: MessageEvent): void => {
      if (
        process.env.GATSBY_SITE_URL &&
        event.origin === new URL(process.env.GATSBY_SITE_URL).origin &&
        event.data.type === 'REFRESH_AUTHENTICATION'
      ) {
        dispatch({
          type: AUTHENTICATE_REFRESH,
          payload: event.data,
        });
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const frameWindow = authFrameRef.current?.contentWindow;
      if (frameWindow && user.isAuthenticated) {
        const revalidateAfter = new Date(user.expiryTime);
        revalidateAfter.setMinutes(revalidateAfter.getMinutes() - 2);
        if (new Date() > revalidateAfter) {
          frameWindow.location.replace(buildTwitchRedirectUrl());
        }
      }
    }, 1000 * 30);
    return () => clearInterval(interval);
  }, [dispatch, user]);

  return (
    <>
      <Router basepath="/live">
        <Queue path="/queue" />
        <Songlist path="/songlist" />
        <TwitchEmbed path="/" />
        <Overlay path="/overlay" />
        <NotFoundPage default />
      </Router>
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <iframe
        ref={authFrameRef}
        aria-hidden
        style={{
          width: 0,
          height: 0,
          border: 0,
          position: 'absolute',
          display: 'none',
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default Live;
