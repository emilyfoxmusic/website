import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
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
  width: 4rem;
  margin-left: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  & > * {
    margin: 0 1rem;
  }
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <NewAlbumContainer>
      <PageHeadingNoUnderline>New album coming soon!</PageHeadingNoUnderline>
      <Rose />
    </NewAlbumContainer>
    <ButtonContainer>
      <Button>Downloads</Button>
      <Button>Bio</Button>
      <Button>Contact</Button>
      <Button>Tech</Button>
    </ButtonContainer>
  </Layout>
);

export default IndexPage;
