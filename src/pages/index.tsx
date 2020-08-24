import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import Video from 'components/Video';
import { largeBreakpoint } from 'helpers/breakpoints';
import RoseImg from 'images/rose.svg';

import '../utils/icons';

const NewAlbumContainer = styled.div`
  flex: 0 1 50%;
  margin: 24px;

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

const ButtonContainer = styled.nav`
  flex: 0 1 50%;

  ${largeBreakpoint`
    display: flex;
    justify-content: space-evenly;
  `}
`;

const MainContentContainer = styled.div`
  padding: 16px 24px;

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

const PortraitBackground = styled(BackgroundImage)`
  min-height: calc(100vw * (1080 / 1920));

  width: 100vw;
  margin: 0 calc((100% - 100vw) / 2);
`;

const IndexPage: React.FC = () => {
  const { portrait } = useStaticQuery(
    graphql`
      query {
        portrait: file(relativePath: { eq: "portrait.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );
  const imageData = portrait.childImageSharp.fluid;
  return (
    <Layout>
      <SEO title="Emily Fox Music" />
      <PortraitBackground fluid={imageData}>
        <MainContentContainer>
          <ButtonContainer>
            <ButtonLink to="/music">Music</ButtonLink>
            <ButtonLink to="/bio">Bio</ButtonLink>
            <ButtonLink to="/contact">Contact</ButtonLink>
            <ButtonLink to="/tech">Tech</ButtonLink>
          </ButtonContainer>
        </MainContentContainer>
      </PortraitBackground>
      <NewAlbumContainer>
        <PageHeadingNoUnderline>New album coming soon!</PageHeadingNoUnderline>
        <Rose />
      </NewAlbumContainer>
      <VideoContainer>
        <Video
          title="Bad Things Can Happen (Original Song)"
          src="https://www.youtube.com/embed/peoXGwCcWBk"
        />
      </VideoContainer>
    </Layout>
  );
};

export default IndexPage;
