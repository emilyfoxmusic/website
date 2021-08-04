// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import { PageProps } from 'gatsby';
import React, { Dispatch, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'components/Layout';
import TwitchEmbed from 'components/Live';
import Queue from 'components/Live/Queue';
import Songlist from 'components/Live/Songlist';
import { buildTwitchRedirectUrl } from 'helpers/auth';
import { RootState } from 'state/types';
import {
  AuthenticateAction,
  AuthenticateRefreshAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AUTHENTICATE_REFRESH,
} from 'state/user/actions';
import {
  WebsocketAction,
  WS_CONNECT,
  WS_DISCONNECT,
} from 'state/websocket/actions';

const Live: React.FC<PageProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<
    Dispatch<WebsocketAction | AuthenticateAction | AuthenticateRefreshAction>
  >();
  const authFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    dispatch({ type: WS_CONNECT });
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
    <Layout liveLayout>
      <Router basepath="/live">
        <Queue path="/queue" />
        <Songlist path="/songlist" />
        <TwitchEmbed path="/" />
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
    </Layout>
  );
};

export default Live;
