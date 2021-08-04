import styled from 'styled-components';

import { fontFamily } from 'styles/fonts';

export const ButtonStyle = styled.button`
  background: black;
  color: white;
  border: none;

  padding: 1rem 1.5rem;
  border-radius: 0.25rem;

  font-family: ${fontFamily};
  font-size: 1.5rem;
`;

export const Arrow = styled.div`
  margin-left: 1rem;

  border: solid white;
  border-width: 0 0.25rem 0.25rem 0;
  display: inline-block;
  padding: 0.3rem;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;
