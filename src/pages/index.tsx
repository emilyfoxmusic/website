import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import Video from 'components/Video';
import { largeBreakpoint } from 'helpers/breakpoints';
import RoseImg from 'images/rose.svg';

const NewAlbumContainer = styled.div`
  flex: 0 1 50%;

  margin-top: 32px;
  margin-right: 32px;
  text-align: center;

  ${largeBreakpoint`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const Rose = styled(RoseImg)`
  height: 96px;
  width: 64px;

  ${largeBreakpoint`
    margin-left: 32px;
  `}
`;

const ButtonContainer = styled.div`
  flex: 0 1 50%;

  ${largeBreakpoint`
    display: flex;
    justify-content: space-evenly;
    margin-top: 48px;
  `}
`;

const MainContentContainer = styled.div`
  padding: 16px 32px;

  display: flex;
  justify-content: space-between;

  ${largeBreakpoint`
    display: block;
  `}
`;

const VideoContainer = styled.div`
  width: 100%;

  ${largeBreakpoint`
    margin: 32px auto;
  `}
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <MainContentContainer>
      <NewAlbumContainer>
        <PageHeadingNoUnderline>New album coming soon!</PageHeadingNoUnderline>
        <Rose />
      </NewAlbumContainer>
      <ButtonContainer>
        <ButtonLink to="/music">Music</ButtonLink>
        <ButtonLink to="/bio">Bio</ButtonLink>
        <ButtonLink to="/contact">Contact</ButtonLink>
        <ButtonLink to="/tech">Tech</ButtonLink>
      </ButtonContainer>
    </MainContentContainer>
    <VideoContainer>
      <Video
        title="Bad Things Can Happen (Original Song)"
        src="https://www.youtube.com/embed/peoXGwCcWBk"
      />
    </VideoContainer>
  </Layout>
);

export default IndexPage;
