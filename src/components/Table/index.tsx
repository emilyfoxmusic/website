import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  font-size: 1rem;
  line-height: 1.3rem;

  ${largeBreakpoint`
    font-size: 1.3rem;
    line-height: 1.6rem;
  `}
`;

export const TableRow = styled.tr<{ $background?: string }>`
  background: ${({ $background }) => $background ?? 'white'};
  border-bottom: dotted black 2px;
  text-align: left;
  height: 52px;

  & td:not(:last-child),
  & th:not(:last-child) {
    padding: 0 16px 0 0;
  }
`;

export const TableHeaderCell = styled.th<{
  $width?: string | undefined;
  $widthLarge?: string | undefined;
}>`
  ${({ $width }) => $width && `width: ${$width};`}

  ${({ $widthLarge }) =>
    $widthLarge &&
    css`
      ${largeBreakpoint`
        width: ${$widthLarge};
      `}
    `}
`;
