import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeading } from 'components/Typography';
import { count } from 'helpers/goatcounter';

const MusicButton = styled(ButtonLink)`
  width: 250px !important;
  margin: 32px auto;
`;

const CenteredParagraph = styled.p`
  text-align: center;
`;

const NotFoundPage: React.FC = () => {
  const trackNotFoundCta = (): void => {
    count({ path: 'not-found-cta', title: 'Not found CTA', event: true });
  };
  return (
    <Layout>
      <SEO title="Page not found" />
      <PageHeading>NOT FOUND</PageHeading>
      <CenteredParagraph>Sorry, that page doesn't exist.</CenteredParagraph>
      <MusicButton to="/music/" onClick={trackNotFoundCta}>
        Find music instead
      </MusicButton>
    </Layout>
  );
};

export default NotFoundPage;
