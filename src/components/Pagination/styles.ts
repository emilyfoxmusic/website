import styled from 'styled-components';

import Button from 'components/Button';
import { invertedButtonStyle } from 'components/Button/styles';

export const PaginationButton = styled(Button).attrs<{ current: boolean }>(
  props => ({
    'aria-current': props.current,
  })
)<{ current: boolean }>`
  display: inline-block;

  font-size: 1rem;
  line-height: 1rem;

  padding: 12px 16px 8px;

  ${({ current }) => current && invertedButtonStyle}
`;

export const PaginationList = styled.ol`
  display: inline;
  padding: 12px;
`;

export const PaginationListItem = styled.li`
  display: inline;
  margin: 4px;
`;
