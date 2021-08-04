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

export const HeaderContainer = styled.div`
  display: flex;
  text-decoration: none;

  margin-top: 16px;

  margin-bottom: 64px;
  position: relative;

  ${largeBreakpoint`
    margin-bottom: 0;
  `}
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
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  width: 100%;

  display: flex;
  justify-content: center;

  & a {
    display: inline-block;
    line-height: 0;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &:hover,
    &:focus {
      outline: black dotted 4px;
    }
  }

  & svg {
    margin: 8px;
    color: black;
  }

  ${largeBreakpoint`
    position: unset;
    margin-right: 5%;
    width: auto;
    display: block;

    & a {
      &:hover,
      &:focus {
        outline-color: white;
      }
    }

    & svg {
      color: white;
    }
  `}  
  }
`;
