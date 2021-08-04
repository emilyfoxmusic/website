import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { HeaderContainer, LeftDiv, RightDiv, SocialMedia } from './styles';

const Header: React.FC = () => (
  <header>
    <HeaderContainer aria-label="Emily Fox Music">
      <LeftDiv aria-hidden>Emily Fox</LeftDiv>
      <RightDiv>
        <span aria-hidden>| Music</span>
        <SocialMedia aria-label="Social media links">
          <a href="https://www.youtube.com/foxxemusic" aria-label="YouTube">
            <FontAwesomeIcon icon={['fab', 'youtube']} aria-hidden />
          </a>
          <a href="https://www.facebook.com/emilyfoxmusic" aria-label="Facebook">
            <FontAwesomeIcon icon={['fab', 'facebook']} aria-hidden />
          </a>
          <a href="mailto:emily@emilyfoxmusic.co.uk" aria-label="Email">
            <FontAwesomeIcon icon="envelope" aria-hidden />
          </a>
        </SocialMedia>
      </RightDiv>
    </HeaderContainer>
  </header>
);

export default Header;
