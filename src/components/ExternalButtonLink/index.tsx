import React, { PropsWithChildren } from 'react';

import Arrow from 'components/Arrow';

import { ButtonAnchor } from './styles';

type ButtonLinkProps = {
  href: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  title: string;
  'aria-describedby'?: string;
};

const ExternalButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  href,
  className,
  onClick,
  children,
  title,
  ...props
}) => (
  <ButtonAnchor
    href={href}
    className={className}
    onClick={onClick}
    target="_blank"
    aria-label={`${title} (opens in a new tab)`}
    aria-describedby={props['aria-describedby']}>
    {children}
    <Arrow />
  </ButtonAnchor>
);

export default ExternalButtonLink;
