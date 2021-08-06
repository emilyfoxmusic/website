import styled from 'styled-components';

import { red } from 'styles/colors';

export const TagContainer = styled.span`
  padding: 2px 4px;
  vertical-align: super;

  font-size: 0.8rem;
  font-family: Arial, sans-serif;
  font-weight: bold;

  background: ${red};
  color: white;

  margin-left: 8px;
  border-radius: 6px;
`;
