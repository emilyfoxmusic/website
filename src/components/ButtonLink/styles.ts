import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import ArrowImg from 'images/arrow.svg';
import { fontFamily } from 'styles/fonts';

const invertedStyle = css`
  background: white;
  color: black;
  border: black solid 4px;

  & svg {
    stroke: black;
  }
`;

export const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: black;
  color: white;
  border: black solid 4px;
  padding: 12px 16px;

  border-radius: 4px;

  font-family: ${fontFamily};
  text-decoration: none;

  font-size: 1.25rem;
  line-height: 1.5rem;

  margin: 16px 0;

  transition: all 0.2s ease-out;

  ${largeBreakpoint`
    font-size: 1.5rem;
    padding: 12px 24px;
  `}

  &:hover,
  &:focus,
  &.current-page {
    ${invertedStyle}
  }

  &:focus {
    outline: black dotted 2px;
    outline-offset: 2px;
  }
`;

export const Arrow = styled(ArrowImg)`
  stroke: white;
  height: 24px;

  margin-left: 16px;

  ${largeBreakpoint`
    margin-left: 24px;
  `}
`;
