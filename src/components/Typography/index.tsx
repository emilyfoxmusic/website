import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

const headingStyle = css`
  font-family: ${fontFamily};
  font-weight: normal;
  text-align: center;
`;

export const PageHeadingNoUnderline = styled.h1`
  ${headingStyle}
  font-size: 2rem;
  line-height: 2.5rem;

  margin: 24px 0;

  ${largeBreakpoint`
    margin: 32px 0;
  `}
`;

export const PageHeading = styled(PageHeadingNoUnderline)`
  text-decoration: underline;
`;

export const PageSubheading = styled.h2`
  ${headingStyle}
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;

  margin: 32px 0 12px 0;
`;
