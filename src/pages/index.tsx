import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import RoseImg from 'images/rose.svg';

const NewAlbumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Rose = styled(RoseImg)`
  height: 6rem;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <NewAlbumContainer>
      <PageHeadingNoUnderline>New album coming soon!</PageHeadingNoUnderline>
      <Rose />
    </NewAlbumContainer>
  </Layout>
);

export default IndexPage;
