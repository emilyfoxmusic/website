import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

import Header from 'components/Header';
import InternalButtonLink from 'components/InternalButtonLink';
import PrivacyBanner from 'components/PrivacyBanner';
import { trackInternalNav } from 'helpers/goatcounter';

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

  return (
    <>
      <Header />
      <div style={{ overflow: 'hidden' }}>
        <PageContainer>
          <PortraitBackground
            fluid={imageData}
            isFullHeight={fullHeightNav ?? false}>
            <MainContentContainer>
              <ButtonContainer>
                <InternalButtonLink
                  to="/bio/"
                  onClick={(): void => trackInternalNav('Bio')}>
                  bio
                </InternalButtonLink>
                <InternalButtonLink
                  to="/music/"
                  onClick={(): void => trackInternalNav('Music')}>
                  listen
                </InternalButtonLink>
                <InternalButtonLink
                  to="/tech/"
                  onClick={(): void => trackInternalNav('Tech')}>
                  tech
                </InternalButtonLink>
                <InternalButtonLink
                  to="/links/"
                  onClick={(): void => trackInternalNav('Links')}>
                  links
                </InternalButtonLink>
              </ButtonContainer>
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
