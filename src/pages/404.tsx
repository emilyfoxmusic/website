// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';

import ButtonLink from 'components/ButtonLink';
import { LiveLayout, StandardLayout } from 'components/Layout';
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

type NotFoundPageProps = RouteComponentProps & {
  liveLayout?: boolean;
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ liveLayout }) => {
  const Layout = liveLayout ? LiveLayout : StandardLayout;
  return (
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
};

export default NotFoundPage;
