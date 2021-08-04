import React from 'react';

import { ExternalLinkIcon, Link } from './styles';

type TextLinkProps = {
  className?: string;
  href: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  openInNewTab?: boolean;
};

const TextLink: React.FC<TextLinkProps> = ({
  href,
  className,
  onClick,
  openInNewTab,
  children,
}) => (
  <Link
    className={className}
    href={href}
    onClick={onClick}
    target={openInNewTab ? '_blank' : undefined}
    rel={openInNewTab ? 'noreferrer' : undefined}>
    {children}
    {openInNewTab && (
      <ExternalLinkIcon
        icon="external-link-alt"
        aria-label="(opens in new tab)"
      />
    )}
  </Link>
);

export default TextLink;
