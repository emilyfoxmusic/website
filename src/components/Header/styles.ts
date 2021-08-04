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
    font-size: 2.25rem;
    height: 80px;
  `}
`;

export const HeaderContainer = styled(Link)`
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
  justify-content: space-between;
  width: 47%;

  ${largeBreakpoint`
    width: 50%;
  `}
`;

export const SocialMedia = styled.nav`
  width: 100%;

  display: flex;
  justify-content: center;

  & a {
    display: inline-block;
    line-height: 0;
    margin: 8px 2px;

    @media (min-width: 320px) {
      margin: 8px 4px;
    }

    ${largeBreakpoint`
      margin: 16px;
    `}

    &:hover,
    &:focus {
      outline: black dotted 4px;
    }
  }

  & svg {
    height: 32px !important;
    width: 32px !important;
    color: black;
    margin: 6px;

    @media (min-width: 320px) {
      margin: 8px;
    }
  }
`;
