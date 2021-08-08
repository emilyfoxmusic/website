import { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

export const invertedButtonStyle = css`
  background: white;
  color: black;
  border: black solid 4px;

  & svg {
    stroke: black;
  }
`;

export const buttonStyle = css`
  cursor: pointer;

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
  &:focus {
    ${invertedButtonStyle}
  }

  &:focus {
    outline: black dotted 2px;
    outline-offset: 2px;
  }
`;
