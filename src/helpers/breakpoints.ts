/* eslint-disable @typescript-eslint/no-explicit-any */

import { css, ThemeProps, Interpolation } from 'styled-components';

const breakpoint = '800px';

export const largeBreakpoint = (
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<ThemeProps<any>>[]
): Interpolation<ThemeProps<any>> => css`
  @media (min-width: ${breakpoint}) {
    ${css(strings, ...interpolations)}
  }
`;
