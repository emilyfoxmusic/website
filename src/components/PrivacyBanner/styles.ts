import styled from 'styled-components';

import { red } from 'styles/colors';
import { fontFamily } from 'styles/fonts';

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  max-width: 900px;
  text-align: center;

  font-family: ${fontFamily};
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.3rem;

  margin: 16px 32px 0;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  padding: 8px;

  position: absolute;
  top: 8px;
  right: 32px;

  font-size: 1.2rem;

  &:hover {
    color: ${red};
  }

  &:focus {
    outline: dotted 2px black;
  }

  & > span {
    margin-right: 8px;
  }
`;
