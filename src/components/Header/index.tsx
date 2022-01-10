import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { trackInternalNav, trackSocialsHeaderClick } from 'helpers/goatcounter';
import { youtube, bandcamp, instagram, twitch } from 'utils/links';

import { HeaderContainer, LeftDiv, RightDiv, SocialMedia } from './styles';

const Header: React.FC = () => (
  <header>
    <HeaderContainer
      to="/"
      aria-label="Emily Fox Music"
      onClick={() => trackInternalNav('Home')}>
      <LeftDiv aria-hidden>Emily Fox</LeftDiv>
      <RightDiv aria-hidden>| Music</RightDiv>
    </HeaderContainer>
    <SocialMedia aria-label="Social media links">
      <a
        href={youtube}
        aria-label="YouTube"
        onClick={(): void => trackSocialsHeaderClick('YouTube')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'youtube']} aria-hidden />
      </a>
      <a
        href={instagram}
        aria-label="Instagram"
        onClick={(): void => trackSocialsHeaderClick('Instagram')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'instagram']} aria-hidden />
      </a>
      <a
        href={twitch}
        aria-label="Twitch"
        onClick={(): void => trackSocialsHeaderClick('Twitch')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'twitch']} aria-hidden />
      </a>
      <a
        href={bandcamp}
        aria-label="Bandcamp"
        onClick={(): void => trackSocialsHeaderClick('Bandcamp')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'bandcamp']} aria-hidden />
      </a>
    </SocialMedia>
  </header>
);
export default Header;
