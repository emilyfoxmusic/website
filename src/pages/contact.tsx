import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';

const MaxWidthContainer = styled.div`
  max-width: 1000px;
  margin: auto;
  text-align: center;
`;

const IconWithMargin = styled(FontAwesomeIcon)`
  margin-right: 16px;
`;

const LinkWrapper = styled.div`
  margin: 16px;
`;

const Contact: React.FC = () => (
  <Layout>
    <SEO title="Emily Fox Music | Contact" />
    <MaxWidthContainer>
      <PageHeading>Contact</PageHeading>
      <LinkWrapper>
        <TextLink href="mailto:contact@emilyfoxmusic.co.uk">
          <IconWithMargin icon="envelope" aria-hidden />
          Email
        </TextLink>
      </LinkWrapper>
      <LinkWrapper>
        <TextLink href="https://www.youtube.com/foxxemusic">
          <IconWithMargin icon={['fab', 'youtube']} aria-hidden />
          YouTube
        </TextLink>
      </LinkWrapper>
      <LinkWrapper>
        <TextLink href="https://www.facebook.com/emilyfoxmusic">
          <IconWithMargin icon={['fab', 'facebook']} aria-hidden />
          Facebook
        </TextLink>
      </LinkWrapper>
    </MaxWidthContainer>
  </Layout>
);

export default Contact;
