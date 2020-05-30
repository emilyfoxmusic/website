import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { fontFamily } from 'styles/fonts';

const headerHeight = '4rem';
const headerFontSize = '2rem';

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

export const HeaderContainerLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

export const LeftDiv = styled.div`
  ${HalfOfHeaderCss}
  background: white;
  border: solid black 0.25rem;
  color: black;
  justify-content: flex-end;
`;

export const RightDiv = styled.div`
  ${HalfOfHeaderCss}
  background: black;
  border: solid white;
  border-width: 0.25rem 0.25rem 0.25rem 0;
  color: white;
  justify-content: flex-start;
`;
