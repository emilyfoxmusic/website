import { useStaticQuery, graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import { Normalize } from 'styled-normalize';

import ButtonLink from 'components/ButtonLink';
import Header from 'components/Header';
import GlobalFonts from 'fonts/globalFonts';

import {
  PageContainer,
  PortraitBackground,
  MainContentContainer,
  ButtonContainer,
} from './styles';

type LayoutProps = {
  fullHeightNav?: boolean;
  links: {
    text: string;
    path: string;
  }[];
};

const Layout: React.FC<LayoutProps> = ({
  links,
  fullHeightNav,
  children,
}: PropsWithChildren<{}>) => {
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
      <Normalize />
      <GlobalFonts />
      <Header />
      <PageContainer>
        <PortraitBackground
          fluid={imageData}
          isFullHeight={fullHeightNav ?? false}>
          <MainContentContainer>
            <ButtonContainer>
              {links.map(({ text, path }) => (
                <ButtonLink to={path}>{text}</ButtonLink>
              ))}
            </ButtonContainer>
          </MainContentContainer>
        </PortraitBackground>
        {children}
      </PageContainer>
    </>
  );
};

export default Layout;
