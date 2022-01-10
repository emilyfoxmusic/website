import styled, { css } from 'styled-components';

import ArrowImg from 'images/arrow.svg';

const Arrow = styled(ArrowImg)`
  stroke: white;
  height: 24px;

  ${({ $back }) => css`
    margin-${$back ? 'right' : 'left'}: 16px;
  `}

  ${({ $back }): string => $back && 'transform: rotate(180deg);'}
`;

export default Arrow;
