/* eslint-disable @typescript-eslint/no-explicit-any */

import styled, {
  css,
  ThemeProps,
  Interpolation,
  FlattenInterpolation,
} from 'styled-components';

const breakpoint = '800px';

export const largeBreakpoint = (
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<ThemeProps<any>>[]
): Interpolation<ThemeProps<any>> => css`
  @media (min-width: ${breakpoint}) {
    ${css(strings, ...interpolations)}
  }
`;

export const largeBreakpointOnlyStyle = (
  display: string
): FlattenInterpolation<ThemeProps<unknown>> => css`
  display: none;

  ${largeBreakpoint`
    display: ${display};
  `}
`;

export const MobileOnly = styled.div`
  ${largeBreakpoint`
    display: none;
  `}
`;

export const LargeBreakpointOnly = styled.div`
  display: none;

  ${largeBreakpoint`
    display: block;
  `}
`;
