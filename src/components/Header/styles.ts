import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { fontFamily } from 'styles/fonts';

const headerHeight = '5rem';
const headerFontSize = '2.5rem';

const HalfOfHeaderCss = css`
  font-family: ${fontFamily};
  font-size: ${headerFontSize};
  width: 50%;
  height: ${headerHeight};

  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

export const HeaderContainerLink = styled(Link)`
  display: flex;
  text-decoration: none;

  margin-top: 1rem;
`;

export const LeftDiv = styled.div`
  ${HalfOfHeaderCss}
  background: white;
  border: solid black 0.25rem;
  border-left: none;
  color: black;
  justify-content: flex-end;
`;

export const RightDiv = styled.div`
  ${HalfOfHeaderCss}
  background: black;
  border: solid white;
  border-right: none;
  border-width: 0.25rem 0.25rem 0.25rem 0;
  color: white;
  justify-content: flex-start;
`;
