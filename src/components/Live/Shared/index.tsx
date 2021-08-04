import styled from 'styled-components';

import Button from 'components/Button';
import { TableHeaderCell } from 'components/Table';
import { largeBreakpointOnlyStyle } from 'helpers/breakpoints';

export const LargeBreakpointOnlyCell = styled.td`
  ${largeBreakpointOnlyStyle('table-cell')}
`;

export const LargeBreakpointOnlyHeaderCell = styled(TableHeaderCell)`
  ${largeBreakpointOnlyStyle('table-cell')}
`;

export const ActionButton = styled(Button).attrs(() => ({
  type: 'button',
}))`
  padding: 8px 4px 4px 4px;
  margin: 4px 4px 4px 0;
`;
