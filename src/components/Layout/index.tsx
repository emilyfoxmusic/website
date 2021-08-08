import { useStaticQuery, graphql } from 'gatsby';
import React, { useLayoutEffect, useReducer } from 'react';

import ButtonLink from 'components/ButtonLink';
import Header from 'components/Header';
import LiveHeader from 'components/LiveHeader';
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
  navButtons?: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({
  fullHeightNav,
  navButtons,
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

  return (
    <>
      <Header />
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

const standardNavButtons = (
  <>
    <ButtonLink to="/music/" onClick={(): void => trackInternalNav('Music')}>
      music
    </ButtonLink>
    <ButtonLink to="/bio/" onClick={(): void => trackInternalNav('Bio')}>
      bio
    </ButtonLink>
    <ButtonLink
      to="/contact/"
      onClick={(): void => trackInternalNav('Contact')}>
      contact
    </ButtonLink>
    <ButtonLink to="/tech/" onClick={(): void => trackInternalNav('Tech')}>
      tech
    </ButtonLink>
    <ButtonLink to="/live/" onClick={(): void => trackInternalNav('Live')}>
      live
    </ButtonLink>
  </>
);

type StandardLayoutProps = {
  fullHeightNav?: boolean;
};

export const StandardLayout: React.FC<StandardLayoutProps> = ({
  fullHeightNav,
  children,
}) => (
  <Layout fullHeightNav={fullHeightNav} navButtons={standardNavButtons}>
    {children}
  </Layout>
);

const liveNavButtons = (
  <>
    <ButtonLink back to="/" onClick={(): void => trackInternalNav('Back')}>
      Back
    </ButtonLink>
    <ButtonLink to="/live/" onClick={(): void => trackInternalNav('Live')}>
      Watch
    </ButtonLink>
    <ButtonLink
      to="/live/songlist/"
      onClick={(): void => trackInternalNav('Songlist')}>
      Song list
    </ButtonLink>
    <ButtonLink
      to="/live/queue/"
      onClick={(): void => trackInternalNav('Queue')}>
      Current queue
    </ButtonLink>
  </>
);

export const LiveLayout: React.FC = ({ children }) => {
  const [renderLayout, setRenderLayout] = useReducer(() => true, false);

  // We must only render nav in the client otherwise we get hydration issues due
  // to the different routes.
  useLayoutEffect(() => {
    setRenderLayout();
  }, []);

  return (
    <>
      <LiveHeader />
      {renderLayout && <Layout navButtons={liveNavButtons}>{children}</Layout>}
    </>
  );
};
