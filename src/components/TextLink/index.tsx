import React from 'react';

import { Link } from './styles';

type TextLinkProps = {
  className?: string;
  href: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const TextLink: React.FC<TextLinkProps> = ({
  href,
  className,
  onClick,
  children,
}) => (
  <Link className={className} href={href} onClick={onClick}>
    {children}
  </Link>
);

export default TextLink;
