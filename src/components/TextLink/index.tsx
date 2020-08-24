import React from 'react';

import { Link } from './styles';

type TextLinkProps = {
  href: string;
};

const TextLink: React.FC<TextLinkProps> = ({ href, children }) => (
  <Link href={href}>{children}</Link>
);

export default TextLink;
