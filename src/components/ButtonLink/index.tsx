import React, { PropsWithChildren } from 'react';

import { Arrow, Button } from './styles';

type ButtonLinkProps = {
  to: string;
  className?: string;
};

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  className,
  children,
}) => (
  <Button to={to} activeClassName="current-page" className={className}>
    {children}
    <Arrow />
  </Button>
);

export default ButtonLink;
