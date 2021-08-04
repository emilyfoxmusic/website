import { css, SimpleInterpolation } from 'styled-components';

const breakpoint = '800px';

export const largeBreakpoint = (
  styling: TemplateStringsArray
): SimpleInterpolation => css`
  @media (min-width: ${breakpoint}) {
    ${styling}
  }
`;
