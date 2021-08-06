import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { green, mediumRed } from 'styles/colors';
import { fontFamily } from 'styles/fonts';

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
