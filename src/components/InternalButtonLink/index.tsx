import React, { PropsWithChildren } from 'react';

import Arrow from 'components/Arrow';

import { ButtonGatsbyLink } from './styles';

type ButtonLinkProps = {
  to: string;
  className?: string;
  back?: boolean;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const InternalButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  className,
  onClick,
  back,
  children,
}) => (
  <ButtonGatsbyLink
    to={to}
    activeClassName="current-page"
    className={className}
    onClick={onClick}>
    {back && <Arrow $back />}
    {children}
    {!back && <Arrow />}
  </ButtonGatsbyLink>
);

export default InternalButtonLink;
