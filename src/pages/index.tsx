import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import Video from 'components/Video';
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

const VideoContainer = styled.div`
  width: 100%;
  margin: 2rem auto;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <NewAlbumContainer>
      <PageHeadingNoUnderline>New album coming soon!</PageHeadingNoUnderline>
      <Rose />
    </NewAlbumContainer>
    <ButtonContainer>
      <ButtonLink to="/bio">Downloads</ButtonLink>
      <ButtonLink to="/bio">Bio</ButtonLink>
      <ButtonLink to="/bio">Contact</ButtonLink>
      <ButtonLink to="/bio">Tech</ButtonLink>
    </ButtonContainer>
    <VideoContainer>
      <Video
        title="Bad Things Can Happen (Original Song)"
        src="https://www.youtube.com/embed/peoXGwCcWBk"
      />
    </VideoContainer>
  </Layout>
);

export default IndexPage;
