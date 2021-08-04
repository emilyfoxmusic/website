import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { trackInternalNav, trackSocialsHeaderClick } from 'helpers/goatcounter';
import {
  RequestStatusAction,
  STATUS_REQUEST_UPDATE,
} from 'state/requestStatus/actions';
import { RootState } from 'state/types';
import { youtube, bandcamp, facebook, emailAddress, twitch } from 'utils/links';

import {
  HeaderContainer,
  LeftDiv,
  GreenText,
  RightDiv,
  SocialMedia,
  UserBanner,
  RedText,
  AuthenticationBlock,
  RequestStatusBlock,
  UpdateStatusButton,
} from './styles';

type HeaderProps = {
  liveLayout?: boolean;
};

const Header: React.FC<HeaderProps> = ({ liveLayout }) => {
  const { user, requestStatus } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch<RequestStatusAction>>();
  const userBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustBodyPaddingForUserBanner = (): void => {
      const height = userBannerRef.current?.getBoundingClientRect().height ?? 0;
      document.body.style.paddingTop = `${height}px`;
    };
    window.addEventListener('resize', adjustBodyPaddingForUserBanner);
    adjustBodyPaddingForUserBanner();

    return () =>
      window.removeEventListener('resize', adjustBodyPaddingForUserBanner);
  }, []);

  return (
    <header>
      {liveLayout && (
        <UserBanner ref={userBannerRef} aria-live="polite">
          <RequestStatusBlock>
            Requests are{' '}
            {requestStatus.requestsOpen ? (
              <GreenText>
                open <FontAwesomeIcon icon="circle" />
              </GreenText>
            ) : (
              <RedText>
                closed <FontAwesomeIcon icon="circle" />
              </RedText>
            )}
            {user.isAdmin && (
              <UpdateStatusButton
                type="button"
                onClick={() =>
                  dispatch({
                    type: STATUS_REQUEST_UPDATE,
                    payload: { requestsOpen: !requestStatus.requestsOpen },
                  })
                }>
                {requestStatus.requestsOpen
                  ? 'Close requests'
                  : 'Open requests'}
              </UpdateStatusButton>
            )}
          </RequestStatusBlock>
          {user.isAuthenticated && (
            <AuthenticationBlock>
              You are signed in as{' '}
              <RedText>
                {user.username}
                {user.isAdmin ? ' (admin)' : ''}
              </RedText>
            </AuthenticationBlock>
          )}
        </UserBanner>
      )}
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
};

export default Header;
