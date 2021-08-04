import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import LiveHeader from 'components/LiveHeader';
import { trackInternalNav, trackSocialsHeaderClick } from 'helpers/goatcounter';
import { youtube, bandcamp, facebook, emailAddress, twitch } from 'utils/links';

import { HeaderContainer, LeftDiv, RightDiv, SocialMedia } from './styles';

type HeaderProps = {
  liveLayout?: boolean;
};

const Header: React.FC<HeaderProps> = ({ liveLayout }) => (
  <header>
    {liveLayout && <LiveHeader />}
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
        href={facebook}
        aria-label="Facebook"
        onClick={(): void => trackSocialsHeaderClick('Facebook')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'facebook']} aria-hidden />
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
      <a
        href={`mailto:${emailAddress}`}
        aria-label="Email"
        onClick={(): void => trackSocialsHeaderClick('Email')}
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon="envelope" aria-hidden />
      </a>
    </SocialMedia>
  </header>
);
export default Header;
