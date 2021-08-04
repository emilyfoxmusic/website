import React from 'react';

import Layout from 'components/Layout';
import { PageHeading } from 'components/Typography';

const Music: React.FC = () => (
  <Layout
    links={[
      { text: 'home', path: '/' },
      { text: 'bio', path: '/bio' },
      { text: 'contact', path: '/contact' },
      { text: 'tech', path: '/tech' },
    ]}>
    <PageHeading>Music</PageHeading>
  </Layout>
);

export default Music;
