import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { red } from 'styles/colors';
import { fontFamily } from 'styles/fonts';

export const OuterContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  max-width: 900px;
  text-align: center;

  font-family: ${fontFamily};
  font-size: 0.8rem;

  ${largeBreakpoint`
    font-size: 1rem;
  `}
`;

export const Text = styled.p`
  line-height: 1rem;
  margin: 8px 16px;

  ${largeBreakpoint`
    margin: 16px 32px 8px;
  `}
`;

export const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  border-width: 0;

  display: flex;
  align-items: center;
  margin: auto;

  &:hover {
    color: ${red};
  }

  &:focus {
    outline: dotted 2px black;
  }

  ${largeBreakpoint`
    font-size: 1.0rem;
  `}

  @media (min-width:1050px) {
    position: absolute;
    top: 8px;
    right: 32px;
    padding: 8px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;
