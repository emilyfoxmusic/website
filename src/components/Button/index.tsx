import React, { PropsWithChildren } from 'react';

import { ButtonStyle, Arrow } from './styles';

const Button: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <ButtonStyle type="button">
    {children}
    <Arrow />
  </ButtonStyle>
);

export default Button;
