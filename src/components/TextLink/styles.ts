import styled from 'styled-components';

import { red } from 'styles/colors';

export const Link = styled.a`
  color: black;

  &:hover {
    color: ${red};
  }

  &:focus {
    outline: dotted 2px black;
  }
`;
