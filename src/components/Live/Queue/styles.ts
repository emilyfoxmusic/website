import styled from 'styled-components';

import { gold, silver, bronze } from 'styles/colors';

import { ActionButton } from '../Shared';

export const Bump1Button = styled(ActionButton)`
  && {
    border-color: ${gold};
  }
`;

export const Bump2Button = styled(ActionButton)`
  && {
    border-color: ${silver};
  }
`;

export const Bump3Button = styled(ActionButton)`
  && {
    border-color: ${bronze};
  }
`;

export const TableBlock = styled.div`
  width: min(90vw, 1000px);
  position: relative;
  left: calc((min(90vw, 1000px)) * -0.5 + 50%);

  margin-bottom: 64px;
`;
