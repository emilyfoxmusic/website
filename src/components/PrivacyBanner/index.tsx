import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer } from 'react';

import TextLink from 'components/TextLink';
import { count } from 'helpers/goatcounter';

import { InnerContainer, OuterContainer, CloseButton, Text } from './styles';

const key = 'privacyClosed';

const PrivacyBanner: React.FC = () => {
  const [privacyHidden, hidePrivacyNotice] = useReducer(
    () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, 'true');
      }
      count({
        path: 'privacy-close-banner',
        title: 'Close privacy banner',
        event: true,
      });
      return true;
    },
    typeof window !== 'undefined' ? !!localStorage.getItem(key) : false
  );

  if (privacyHidden) {
    return null;
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Text>
          I use{' '}
          <TextLink
            href="https://www.goatcounter.com/"
            onClick={(): void =>
              count({
                path: 'privacy-goatcounter',
                title: 'Goatcounter',
                event: true,
              })
            }>
            GoatCounter
          </TextLink>{' '}
          to <strong>anonymously</strong> track visits to this site in order to
          make sure that it is doing its job effectively! For more details see
          the{' '}
          <TextLink
            href="https://www.goatcounter.com/privacy"
            onClick={(): void =>
              count({
                path: 'privacy-goatcounter-policy',
                title: 'Goatcounter PP',
                event: true,
              })
            }>
            GoatCounter privacy policy
          </TextLink>
          .
        </Text>
        <CloseButton type="button" onClick={hidePrivacyNotice}>
          <span>Close</span>
          <FontAwesomeIcon icon="times-circle" />
        </CloseButton>
      </InnerContainer>
    </OuterContainer>
  );
};

export default PrivacyBanner;
