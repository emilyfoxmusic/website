import styled, { css } from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const commonCellStyling = css`
  border: solid black 2px;
  box-shadow: 0px 0px 8px black;
  text-align: left;

  border-radius: 8px;
`;

export const TableHeaderCell = styled.th`
  ${commonCellStyling}
  text-decoration: underline;
  font-weight: bold;
  padding: 16px 24px;

  background: white;
  color: black;
`;

export const TableCell = styled.td`
  ${commonCellStyling}
  background: dimgrey;
  color: white;

  padding: 8px 12px;

  ${largeBreakpoint`
    padding: 8px 24px;
  `}
`;
