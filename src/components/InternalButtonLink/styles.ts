import { Link } from 'gatsby';
import styled from 'styled-components';

import { buttonStyle, invertedButtonStyle } from 'components/Button/styles';

export const ButtonAnchor = styled.a`
  ${buttonStyle}

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonGatsbyLink = styled(Link)`
  ${buttonStyle}

  display: flex;
  align-items: center;
  justify-content: space-between;

  &.current-page {
    ${invertedButtonStyle}
  }
`;
