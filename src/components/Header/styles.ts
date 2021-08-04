import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

const HalfOfHeaderCss = css`
  font-family: ${fontFamily};

  display: flex;
  align-items: center;
  padding: 0 8px;

  font-size: 1.75rem;
  line-height: 2rem;
  height: 64px;

  ${largeBreakpoint`
    font-size: 2.5rem;
    line-height: 2.5rem;
    height: 80px;
  `}
`;

export const HeaderContainerLink = styled(Link)`
  display: flex;
  text-decoration: none;

  margin-top: 16px;
`;

export const LeftDiv = styled.div`
  ${HalfOfHeaderCss}
  background: white;
  border: solid black 4px;
  border-left: none;
  color: black;
  justify-content: flex-end;

  width: 53%;

  ${largeBreakpoint`
    width: 50%;
  `}
`;

export const RightDiv = styled.div`
  ${HalfOfHeaderCss}
  background: black;
  border: solid white;
  border-right: none;
  border-width: 4px 4px 4px 0;
  color: white;
  justify-content: flex-start;

  width: 47%;

  ${largeBreakpoint`
    width: 50%;
  `}
`;
