import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

export const PageHeadingNoUnderline = styled.h1`
  font-family: ${fontFamily};
  font-weight: normal;
  text-align: center;

  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 24px 0;

  ${largeBreakpoint`
    font-size: 2rem;
    line-height: 2.5rem;
    margin: 32px 0;
  `}
`;

export const PageHeading = styled(PageHeadingNoUnderline)`
  text-decoration: underline;
`;
