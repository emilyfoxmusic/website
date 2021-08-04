import styled from 'styled-components';

import Button from 'components/Button';
import { invertedButtonStyle } from 'components/Button/styles';
import { largeBreakpoint } from 'helpers/breakpoints';

export const PaginationButton = styled(Button).attrs<{ current: boolean }>(
  props => ({
    'aria-current': props.current,
  })
)<{ current: boolean }>`
  display: inline-block;

  font-size: 1rem;
  line-height: 1rem;

  padding: 6px 6px 4px;

  @media (min-width: 310px) {
    padding: 8px 12px 6px;
  }

  ${largeBreakpoint`
    padding: 12px 16px 8px;
  `}

  ${({ current }) => current && invertedButtonStyle}
`;

export const Label = styled.span`
  display: none;

  @media (min-width: 450px) {
    display: inline-block;
  }
`;

export const PaginationList = styled.ol`
  display: inline;
  padding: 0;

  @media (min-width: 450px) {
    padding: 0 0 0 12px;
  }

  ${largeBreakpoint`
    padding: 12px;
  `}
`;

export const PaginationListItem = styled.li`
  display: inline;
  margin: 4px;

  &:first-child {
    margin-left: 0;
  }
`;
