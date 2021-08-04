import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import RoseImg from 'images/rose.svg';

export const Rose = styled(RoseImg)`
  height: 48px;

  margin: 24px auto;
  display: block;

  ${largeBreakpoint`
    margin: 32px auto;
  `}
`;
