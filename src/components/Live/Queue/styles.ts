import styled from 'styled-components';

import { Table } from 'components/Table';

import { ActionButton } from '../Shared';

export const Bump1Button = styled(ActionButton)`
  && {
    border-color: #b8860b;
  }
`;

export const Bump2Button = styled(ActionButton)`
  && {
    border-color: silver;
  }
`;

export const Bump3Button = styled(ActionButton)`
  && {
    border-color: #aa6b39;
  }
`;

export const TableSection = styled.div`
  width: min(90vw, 1400px);
  position: relative;
  left: calc((min(90vw, 1400px)) * -0.5 + 50%);
`;

export const TableWithBottomMargin = styled(Table)`
  margin-bottom: 64px;
`;
