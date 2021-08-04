import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Normalize } from 'styled-normalize';

import ButtonLink from 'components/ButtonLink';
import Header from 'components/Header';
import PrivacyBanner from 'components/PrivacyBanner';
import GlobalFonts from 'fonts/globalFonts';
import { count } from 'helpers/goatcounter';

import {
  PageContainer,
  PortraitBackground,
  MainContentContainer,
  ButtonContainer,
} from './styles';

type LayoutProps = {
  fullHeightNav?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ fullHeightNav, children }) => {
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

  return (
    <>
      <Normalize />
      <GlobalFonts />
      <PrivacyBanner />
      <Header />
      <div style={{ overflow: 'hidden' }}>
        <PageContainer>
          <PortraitBackground
            fluid={imageData}
            isFullHeight={fullHeightNav ?? false}>
            <MainContentContainer>
              <ButtonContainer>
                <ButtonLink
                  to="/music/"
                  onClick={(): void => trackNavClick('music')}>
                  music
                </ButtonLink>
                <ButtonLink
                  to="/bio/"
                  onClick={(): void => trackNavClick('bio')}>
                  bio
                </ButtonLink>
                <ButtonLink
                  to="/contact/"
                  onClick={(): void => trackNavClick('contact')}>
                  contact
                </ButtonLink>
                <ButtonLink
                  to="/tech/"
                  onClick={(): void => trackNavClick('tech')}>
                  tech
                </ButtonLink>
              </ButtonContainer>
            </MainContentContainer>
          </PortraitBackground>
          {children}
        </PageContainer>
      </div>
    </>
  );
};

export default Layout;
