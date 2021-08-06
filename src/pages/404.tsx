import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeading } from 'components/Typography';
import { largeBreakpoint } from 'helpers/breakpoints';
import { trackCta } from 'helpers/goatcounter';

const MusicButton = styled(ButtonLink)`
  max-width: 250px;

  ${largeBreakpoint`
    width: 250px !important;
  `}
  margin: 32px auto;
`;

const CenteredParagraph = styled.p`
  text-align: center;
`;

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="Page not found" />
    <PageHeading>NOT FOUND</PageHeading>
    <CenteredParagraph>Sorry, that page doesn't exist.</CenteredParagraph>
    <MusicButton
      to="/music/"
      onClick={() => trackCta('Not found - go to music')}>
      Find music instead
    </MusicButton>
  </Layout>
);

export default NotFoundPage;
