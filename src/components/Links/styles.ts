import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import ExternalButtonLink from 'components/ExternalButtonLink';
import { largeBreakpoint } from 'helpers/breakpoints';

export const IconWithMargin = styled(FontAwesomeIcon)`
  margin-right: 16px;
`;

export const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const LinkWrapper = styled.li`
  margin: 32px 0;
  text-align: center;
`;

export const ExternalButtonLinkNarrow = styled(ExternalButtonLink)`
  max-width: 400px;

  ${largeBreakpoint`
    width: 300px;
  `}

  margin: 16px auto;
`;
