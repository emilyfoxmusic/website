import { useStaticQuery, graphql } from 'gatsby';
import React, { useLayoutEffect, useReducer } from 'react';

import Header from 'components/Header';
import InternalButtonLink from 'components/InternalButtonLink';
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
    <InternalButtonLink
      to="/music/"
      onClick={(): void => trackInternalNav('Music')}>
      music
    </InternalButtonLink>
    <InternalButtonLink
      to="/bio/"
      onClick={(): void => trackInternalNav('Bio')}>
      bio
    </InternalButtonLink>
    <InternalButtonLink
      to="/contact/"
      onClick={(): void => trackInternalNav('Contact')}>
      contact
    </InternalButtonLink>
    <InternalButtonLink
      to="/tech/"
      onClick={(): void => trackInternalNav('Tech')}>
      tech
    </InternalButtonLink>
    <InternalButtonLink
      to="/live/"
      onClick={(): void => trackInternalNav('Live')}>
      live
    </InternalButtonLink>
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
    <InternalButtonLink
      back
      to="/"
      onClick={(): void => trackInternalNav('Back')}>
      Back
    </InternalButtonLink>
    <InternalButtonLink
      to="/live/"
      onClick={(): void => trackInternalNav('Live')}>
      Watch
    </InternalButtonLink>
    <InternalButtonLink
      to="/live/songlist/"
      onClick={(): void => trackInternalNav('Songlist')}>
      Song list
    </InternalButtonLink>
    <InternalButtonLink
      to="/live/queue/"
      onClick={(): void => trackInternalNav('Queue')}>
      Current queue
    </InternalButtonLink>
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
