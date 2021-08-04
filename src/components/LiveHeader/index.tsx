import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  RequestStatusAction,
  STATUS_REQUEST_UPDATE,
} from 'state/requestStatus/actions';
import { RootState } from 'state/types';

import {
  UserBanner,
  RequestStatusBlock,
  GreenText,
  RedText,
  UpdateStatusButton,
  AuthenticationBlock,
} from './styles';

const LiveHeader: React.FC = () => {
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
            {requestStatus.requestsOpen ? 'Close requests' : 'Open requests'}
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
  );
};

export default LiveHeader;
