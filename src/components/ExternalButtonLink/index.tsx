import React, { PropsWithChildren } from 'react';

import Arrow from 'components/Arrow';
import { filterAriaProps } from 'utils/aria';

import { ButtonAnchor } from './styles';

type ButtonLinkProps = {
  href: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  title: string;
} & Record<string, string>;

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...filterAriaProps(props)}>
    {children}
    <Arrow />
  </ButtonAnchor>
);

export default ExternalButtonLink;
