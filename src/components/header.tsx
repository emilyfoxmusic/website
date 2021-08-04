import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { fontFamily } from 'styles/fonts';

const headerHeight = '4rem';
const headerFontSize = '2rem';

const HeaderContainerLink = styled(Link)`
  display: flex;
`;

const HalfOfHeaderCss = css`
  font-family: ${fontFamily};
  font-size: ${headerFontSize};
  font-weight: bold;
  width: 50%;
  height: ${headerHeight};

  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const LeftDiv = styled.div`
  ${HalfOfHeaderCss}
  background: white;
  border: solid black 0.25rem;
  color: black;
  justify-content: flex-end;
`;

const RightDiv = styled.div`
  ${HalfOfHeaderCss}
  background: black;
  border: solid white;
  border-width: 0.25rem 0.25rem 0.25rem 0;
  color: white;
  justify-content: flex-start;
`;

export const Header: React.FC = () => (
  <header>
    <HeaderContainerLink to="/" aria-label="Emily Fox Music Home">
      <LeftDiv aria-hidden>Emily Fox</LeftDiv>
      <RightDiv aria-hidden>| Music</RightDiv>
    </HeaderContainerLink>
  </header>
);
