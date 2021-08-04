// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import { PageProps } from 'gatsby';
import React from 'react';

import Layout from 'components/Layout';
import TwitchEmbed from 'components/Live';
import Login from 'components/Live/Login';
import Queue from 'components/Live/Queue';
import Songlist from 'components/Live/Songlist';

const Live: React.FC<PageProps> = () => {
  return (
    <Layout liveLayout>
      <Router basepath="/live">
        <Login path="/login" />
        <Queue path="/queue" />
        <Songlist path="/songlist" />
        <TwitchEmbed path="/" />
      </Router>
    </Layout>
  );
};

export default Live;
