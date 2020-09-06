import React, { PropsWithChildren } from 'react';

import { Arrow, Button } from './styles';

type ButtonLinkProps = {
  to: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  className,
  onClick,
  children,
}) => (
  <Button
    to={to}
    activeClassName="current-page"
    className={className}
    onClick={onClick}>
    {children}
    <Arrow />
  </Button>
);

export default ButtonLink;
