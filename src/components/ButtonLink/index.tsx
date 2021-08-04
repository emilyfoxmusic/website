import React, { PropsWithChildren } from 'react';

import { Arrow, Button } from './styles';

type ButtonLinkProps = {
  to: string;
  className?: string;
  back?: boolean;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  className,
  onClick,
  back,
  children,
}) => (
  <Button
    to={to}
    activeClassName="current-page"
    className={className}
    onClick={onClick}>
    {back && <Arrow back />}
    {children}
    {!back && <Arrow />}
  </Button>
);

export default ButtonLink;
