import React from 'react';

import Layout from 'components/Layout';
import { PageHeading } from 'components/Typography';

const Tech: React.FC = () => (
  <Layout
    links={[
      { text: 'home', path: '/' },
      { text: 'music', path: '/music' },
      { text: 'bio', path: '/bio' },
      { text: 'contact', path: '/contact' },
    ]}>
    <PageHeading>Tech</PageHeading>
  </Layout>
);

export default Tech;
