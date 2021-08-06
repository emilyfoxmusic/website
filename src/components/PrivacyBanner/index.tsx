import React, { useReducer } from 'react';

import TextLink from 'components/TextLink';
import { trackAction, trackExternalLinkClick } from 'helpers/goatcounter';

import {
  InnerContainer,
  OuterContainer,
  CloseButton,
  Text,
  Icon,
  Spacing,
} from './styles';

const key = 'privacyClosed';

const PrivacyBanner: React.FC = () => {
  const [privacyHidden, hidePrivacyNotice] = useReducer(
    () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, 'true');
      }
      trackAction('Close privacy banner');
      return true;
    },
    typeof window !== 'undefined' ? !!localStorage.getItem(key) : true
  );

  if (privacyHidden) {
    return null;
  }

  return (
    <Spacing>
      <OuterContainer>
        <InnerContainer>
          <Text>
            I use{' '}
            <TextLink
              openInNewTab
              href="https://www.goatcounter.com/"
              onClick={(): void => trackExternalLinkClick('Goatcounter')}>
              GoatCounter
            </TextLink>{' '}
            to <strong>anonymously</strong> track visits to this site in order
            to make sure that it is doing its job effectively! For more details
            see the{' '}
            <TextLink
              openInNewTab
              href="https://www.goatcounter.com/privacy"
              onClick={(): void =>
                trackExternalLinkClick('Goatcounter privacy policy')
              }>
              GoatCounter privacy policy
            </TextLink>
            .
          </Text>
          <CloseButton type="button" onClick={hidePrivacyNotice}>
            Close
            <Icon icon="times-circle" />
          </CloseButton>
        </InnerContainer>
      </OuterContainer>
    </Spacing>
  );
};

export default PrivacyBanner;
