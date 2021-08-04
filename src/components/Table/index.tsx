import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const commonCellStyling = css`
  border: solid black 2px;
  box-shadow: 0px 0px 8px black;
  text-align: left;

  border-radius: 8px;
`;

export const TableCell = styled.td<{ $highlight?: boolean }>`
  ${commonCellStyling}
  background: dimgrey;
  color: white;

  padding: 8px 12px;

  ${largeBreakpoint`
    padding: 8px 24px;
  `}

  ${({ $highlight }) =>
    $highlight &&
    css`
      background: purple;
    `}
`;

export const TableRow = styled.tr<{ $background?: string }>`
  background: ${({ $background }) => $background ?? 'white'};
  border-bottom: dotted black 2px;
  text-align: left;
  height: 52px;
`;

export const TableHeaderCell = styled.th<{ $width?: string | undefined }>`
  ${({ $width }) => $width && `width: ${$width};`}
`;
