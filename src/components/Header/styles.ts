import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { green, mediumRed } from 'styles/colors';
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
    margin: 8px 6px;

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
    margin: 8px;
    color: black;
  }
`;

export const UserBanner = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${largeBreakpoint`
    flex-direction: row;
  `}

  background: black;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  padding: 12px 32px;

  font-family: ${fontFamily};
  font-size: 1.3rem;
  line-height: 1.5rem;
`;

export const GreenText = styled.b`
  color: ${green};
`;

export const RedText = styled.b`
  color: ${mediumRed};
`;

export const RequestStatusBlock = styled.div`
  text-align: center;
  font-size: 1.1rem;

  ${largeBreakpoint`
    font-size: 1.3rem;
  `}
`;

export const AuthenticationBlock = styled.div`
  text-align: center;
  margin-bottom: 8px;

  ${largeBreakpoint`
    margin-bottom: 0;
    margin-left: auto;
  `}
`;

export const UpdateStatusButton = styled.button`
  cursor: pointer;
  margin-left: 8px;

  background: none;
  border: none;
  color: white;

  padding: 0 4px;
  text-decoration: underline;

  &:focus,
  &:hover {
    outline: white dotted 2px;
    outline-offset: 2px;
  }
`;
