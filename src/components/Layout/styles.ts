import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

export const PageContainer = styled.main`
  margin: 80px auto;

  width: calc(100vw - 64px);

  ${largeBreakpoint`
    margin: auto;
    max-width: 630px;
  `}

  @media (min-width: 900px) {
    max-width: 800px;
  }

  font-family: ${fontFamily};
  font-size: 1.25rem;
  line-height: 1.5rem;
`;
