import React, { PropsWithChildren } from 'react';

import { Arrow, Button } from './styles';

type ButtonLinkProps = {
  to: string;
};

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  children,
}) => (
  <Button to={to} activeClassName="current-page">
    {children}
    <Arrow />
  </Button>
);

export default ButtonLink;
