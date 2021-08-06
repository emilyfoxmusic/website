import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';
import { trackSocialsContactClick } from 'helpers/goatcounter';
import { facebook, youtube, emailAddress } from 'utils/links';

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

const Contact: React.FC<PageProps> = ({ location }) => (
  <Layout>
    <SEO
      title="Contact"
      description="Contact details and social media links for Emily Fox."
      location={location}
    />
    <MaxWidthContainer>
      <PageHeading>Contact</PageHeading>
      <LinkWrapper>
        <TextLink
          href={`mailto:${emailAddress}`}
          onClick={(): void => trackSocialsContactClick('Email')}>
          <IconWithMargin icon="envelope" aria-hidden />
          Email
        </TextLink>
      </LinkWrapper>
      <LinkWrapper>
        <TextLink
          href={youtube}
          onClick={(): void => trackSocialsContactClick('YouTube')}>
          <IconWithMargin icon={['fab', 'youtube']} aria-hidden />
          YouTube
        </TextLink>
      </LinkWrapper>
      <LinkWrapper>
        <TextLink
          href={facebook}
          onClick={(): void => trackSocialsContactClick('Facebook')}>
          <IconWithMargin icon={['fab', 'facebook']} aria-hidden />
          Facebook
        </TextLink>
      </LinkWrapper>
    </MaxWidthContainer>
  </Layout>
);

export default Contact;
