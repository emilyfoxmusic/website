import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer } from 'react';

import TextLink from 'components/TextLink';

import { InnerContainer, OuterContainer, CloseButton, Text } from './styles';

const key = 'privacyClosed';

const PrivacyBanner: React.FC = () => {
  const [privacyHidden, hidePrivacyNotice] = useReducer(() => {
    localStorage.setItem(key, 'true');
    return true;
  }, !!localStorage.getItem(key));

  if (privacyHidden) {
    return null;
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Text>
          I use{' '}
          <TextLink href="https://www.goatcounter.com/">GoatCounter</TextLink>{' '}
          to <strong>anonymously</strong> track visits to this site in order to
          make sure that it is doing its job effectively! For more details see
          the{' '}
          <TextLink href="https://www.goatcounter.com/privacy">
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
