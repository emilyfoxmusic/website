import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { count } from 'helpers/goatcounter';
import { RootState } from 'state/types';
import { youtube, bandcamp, facebook, emailAddress } from 'utils/links';

import {
  HeaderContainer,
  LeftDiv,
  RightDiv,
  SocialMedia,
  UserBanner,
  Username,
} from './styles';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustBodyPaddingForUserBanner = (): void => {
      const height = userBannerRef.current?.getBoundingClientRect().height;
      console.info(height);
      if (height) {
        document.body.style.paddingTop = `${height}px`;
      }
    };
    window.addEventListener('resize', adjustBodyPaddingForUserBanner);
    adjustBodyPaddingForUserBanner();

    return () =>
      window.removeEventListener('resize', adjustBodyPaddingForUserBanner);
  }, []);

  const trackSocialsEvent = (title: string): void => {
    count({ path: `header-socials: ${title}`, title, event: true });
  };

  const trackHomeNavClick = (): void => {
    count({ path: 'internal-nav:home', title: 'home', event: true });
  };
  return (
    <header>
      {user.isAuthenticated && (
        <UserBanner ref={userBannerRef} aria-live="polite">
          You are signed in as{' '}
          <Username>
            {user.username}
            {user.isAdmin ? ' (admin)' : ''}
          </Username>
        </UserBanner>
      )}
      <HeaderContainer
        to="/"
        aria-label="Emily Fox Music"
        onClick={trackHomeNavClick}>
        <LeftDiv aria-hidden>Emily Fox</LeftDiv>
        <RightDiv aria-hidden>| Music</RightDiv>
      </HeaderContainer>
      <SocialMedia aria-label="Social media links">
        <a
          href={youtube}
          aria-label="YouTube"
          onClick={(): void => trackSocialsEvent('YouTube')}>
          <FontAwesomeIcon icon={['fab', 'youtube']} aria-hidden />
        </a>
        <a
          href={facebook}
          aria-label="Facebook"
          onClick={(): void => trackSocialsEvent('Facebook')}>
          <FontAwesomeIcon icon={['fab', 'facebook']} aria-hidden />
        </a>
        <a
          href={bandcamp}
          aria-label="Bandcamp"
          onClick={(): void => trackSocialsEvent('Bandcamp')}>
          <FontAwesomeIcon icon={['fab', 'bandcamp']} aria-hidden />
        </a>
        <a
          href={`mailto:${emailAddress}`}
          aria-label="Email"
          onClick={(): void => trackSocialsEvent('Email')}>
          <FontAwesomeIcon icon="envelope" aria-hidden />
        </a>
      </SocialMedia>
    </header>
  );
};

export default Header;
