import { Link } from 'gatsby';
import styled from 'styled-components';

import { fontFamily } from 'styles/fonts';

export const Button = styled(Link)`
  background: black;
  color: white;
  border: black solid 0.25rem;

  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;

  font-family: ${fontFamily};
  font-size: 1.5rem;
  text-decoration: none;

  &:hover,
  &:focus {
    background: white;
    color: black;
    border: black solid 0.25rem;

    & svg {
      stroke: black;
    }
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
