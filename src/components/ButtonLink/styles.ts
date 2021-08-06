import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { buttonStyle, invertedButtonStyle } from 'components/Button/styles';
import ArrowImg from 'images/arrow.svg';

export const Button = styled(Link)`
  ${buttonStyle}

  display: flex;
  align-items: center;
  justify-content: space-between;

  &.current-page {
    ${invertedButtonStyle}
  }
`;

export const Arrow = styled(ArrowImg)`
  stroke: white;
  height: 24px;

  ${({ $back }) => css`
    margin-${$back ? 'right' : 'left'}: 16px;
  `}

  ${({ $back }): string => $back && 'transform: rotate(180deg);'}
`;
