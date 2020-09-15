import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const ExternalLinkIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;
  height: 14px !important;
  width: 14px !important;
`;
