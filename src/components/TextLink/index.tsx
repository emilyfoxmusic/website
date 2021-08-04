import React from 'react';

import { Link } from './styles';

type TextLinkProps = {
  className?: string;
  href: string;
};

const TextLink: React.FC<TextLinkProps> = ({ href, className, children }) => (
  <Link className={className} href={href}>
    {children}
  </Link>
);

export default TextLink;
