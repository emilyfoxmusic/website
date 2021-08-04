import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { youtube, bandcamp, facebook, emailAddress } from 'utils/links';

import { HeaderContainer, LeftDiv, RightDiv, SocialMedia } from './styles';

const Header: React.FC = () => (
  <header>
    <HeaderContainer to="/" aria-label="Emily Fox Music">
      <LeftDiv aria-hidden>Emily Fox</LeftDiv>
      <RightDiv aria-hidden>| Music</RightDiv>
    </HeaderContainer>
    <SocialMedia aria-label="Social media links">
      <a
        href={youtube}
        aria-label="YouTube"
        data-goatcounter-click="header: YouTube">
        <FontAwesomeIcon icon={['fab', 'youtube']} aria-hidden />
      </a>
      <a
        href={facebook}
        aria-label="Facebook"
        data-goatcounter-click="header: Facebook"
        data-goatcounter-title="Facebook event">
        <FontAwesomeIcon icon={['fab', 'facebook']} aria-hidden />
      </a>
      <a
        href={bandcamp}
        aria-label="Bandcamp"
        data-goatcounter-click="header: Bandcamp">
        <FontAwesomeIcon icon={['fab', 'bandcamp']} aria-hidden />
      </a>
      <a
        href={`mailto:${emailAddress}`}
        aria-label="Email"
        data-goatcounter-click="header: email">
        <FontAwesomeIcon icon="envelope" aria-hidden />
      </a>
    </SocialMedia>
  </header>
);

export default Header;
