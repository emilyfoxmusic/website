import styled from 'styled-components';

import Button from 'components/Button';
import { invertedButtonStyle } from 'components/Button/styles';
import ArrowImg from 'images/arrow.svg';

export const CurrentArrow = styled(ArrowImg)`
  stroke: white;
  height: 16px;
  ${({ $ascending }): string =>
    $ascending ? 'transform: rotate(90deg);' : 'transform: rotate(270deg);'}
`;

export const SortButtonStyle = styled(Button)<{ $active: boolean }>`
  padding: 0 4px;
  margin: 0 4px;
  display: inline-flex;

  ${({ $active }) => $active && invertedButtonStyle}
`;
