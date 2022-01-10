import React from 'react';

import { trackSocialsLinkClick } from 'helpers/goatcounter';
import {
  youtube,
  bandcamp,
  instagram,
  twitch,
  emailAddress,
  soundcloud,
} from 'utils/links';

import {
  ExternalButtonLinkNarrow,
  LinkList,
  LinkWrapper,
  IconWithMargin,
} from './styles';

type LinkInfo = {
  href: string;
  title: string;
  icon: string | [string, string];
  description?: string;
};

const links: LinkInfo[] = [
  {
    href: youtube,
    title: 'YouTube',
    icon: ['fab', 'youtube'],
    description:
      'YouTube is where I post all my music videos - covers and original songs.',
  },
  {
    href: bandcamp,
    title: 'Bandcamp',
    icon: ['fab', 'bandcamp'],
    description: 'All of my original music can be downloaded on Bandcamp.',
  },
  {
    href: instagram,
    title: 'Instagram',
    icon: ['fab', 'instagram'],
    description:
      'Instagram is where I post more widely; behind the scenes for my music, as well as other interests, e.g. sewing and cute pet rats! 🐀',
  },
  {
    href: twitch,
    title: 'Twitch',
    icon: ['fab', 'twitch'],
    description: 'Sometimes I stream on Twitch...',
  },
  {
    href: soundcloud,
    title: 'Soundcloud',
    icon: ['fab', 'soundcloud'],
    description:
      'For the keen-beans: I post some slightly less polished original music on Soundcloud, for example when I get round to participating in the songaweek reddit challenge.',
  },
  {
    href: `mailto:${emailAddress}`,
    title: 'Email',
    icon: 'envelope',
    description:
      'If you just want to send me a message, feel free to drop me an email.',
  },
];

type LinksProps = {
  customLinks?: LinkInfo[];
  showDescriptions?: boolean;
};

const Links: React.FC<LinksProps> = ({ customLinks, showDescriptions }) => (
  <LinkList>
    {[...(customLinks || []), ...links].map(
      ({ href, title, icon, description }) => (
        <LinkWrapper>
          {showDescriptions && <p id={title}>{description}</p>}
          <ExternalButtonLinkNarrow
            aria-describedby={showDescriptions ? title : undefined}
            href={href}
            onClick={(): void => trackSocialsLinkClick(title)}
            title={title}>
            <IconWithMargin icon={icon} aria-hidden />
            {title}
          </ExternalButtonLinkNarrow>
        </LinkWrapper>
      )
    )}
  </LinkList>
);

export default Links;
