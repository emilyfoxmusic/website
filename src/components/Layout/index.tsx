import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

import ButtonLink from 'components/ButtonLink';
import Header from 'components/Header';
import PrivacyBanner from 'components/PrivacyBanner';
import { count } from 'helpers/goatcounter';

import {
  PageContainer,
  PortraitBackground,
  MainContentContainer,
  ButtonContainer,
} from './styles';

type LayoutProps = {
  fullHeightNav?: boolean;
  liveLayout?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  fullHeightNav,
  liveLayout,
  children,
}) => {
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

  const trackNavClick = (path: string): void => {
    count({ path: `internal-nav:${path}`, title: path, event: true });
  };

  const navButtons = liveLayout ? (
    <>
      <ButtonLink
        back
        to="/music/"
        onClick={(): void => trackNavClick('music')}>
        Back
      </ButtonLink>
      <ButtonLink to="/live/" onClick={(): void => trackNavClick('music')}>
        Watch
      </ButtonLink>
      <ButtonLink
        to="/live/songlist/"
        onClick={(): void => trackNavClick('music')}>
        Song list
      </ButtonLink>
      <ButtonLink
        to="/live/queue/"
        onClick={(): void => trackNavClick('music')}>
        Current queue
      </ButtonLink>
    </>
  ) : (
    <>
      <ButtonLink to="/music/" onClick={(): void => trackNavClick('music')}>
        music
      </ButtonLink>
      <ButtonLink to="/bio/" onClick={(): void => trackNavClick('bio')}>
        bio
      </ButtonLink>
      <ButtonLink to="/contact/" onClick={(): void => trackNavClick('contact')}>
        contact
      </ButtonLink>
      <ButtonLink to="/tech/" onClick={(): void => trackNavClick('tech')}>
        tech
      </ButtonLink>
      <ButtonLink to="/live/" onClick={(): void => trackNavClick('live')}>
        live
      </ButtonLink>
    </>
  );

  return (
    <>
      <Header liveLayout={liveLayout} />
      <div style={{ overflow: 'hidden' }}>
        <PageContainer>
          <PortraitBackground
            fluid={imageData}
            isFullHeight={fullHeightNav ?? false}>
            <MainContentContainer>
              <ButtonContainer>{navButtons}</ButtonContainer>
            </MainContentContainer>
          </PortraitBackground>
          {children}
        </PageContainer>
        <PrivacyBanner />
      </div>
    </>
  );
};

export default Layout;
