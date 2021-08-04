// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import { navigate, PageProps } from 'gatsby';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import TwitchEmbed from 'components/Live';
import Queue from 'components/Live/Queue';
import Songlist from 'components/Live/Songlist';
import { AUTHENTICATE, AuthenticateAction } from 'state/user/actions';
import {
  WebsocketAction,
  WS_CONNECT,
  WS_DISCONNECT,
} from 'state/websocket/actions';

const Live: React.FC<PageProps> = () => {
  const dispatch = useDispatch<
    Dispatch<WebsocketAction | AuthenticateAction>
  >();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      dispatch({ type: AUTHENTICATE, payload: { code } });
      navigate(window.location.pathname, { replace: true });
    } else {
      dispatch({ type: WS_CONNECT });
    }
    return () => {
      dispatch({ type: WS_DISCONNECT });
    };
  }, [dispatch]);

  return (
    <Layout liveLayout>
      <Router basepath="/live">
        <Queue path="/queue" />
        <Songlist path="/songlist" />
        <TwitchEmbed path="/" />
      </Router>
    </Layout>
  );
};

export default Live;
