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

    & div {
      border-color: black;
    }
  }
`;

export const Arrow = styled.div`
  margin-left: 1rem;

  border: solid;
  border-color: white;
  border-width: 0 0.25rem 0.25rem 0;
  display: inline-block;
  padding: 0.3rem;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;
