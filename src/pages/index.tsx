import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import InternalButtonLink from 'components/InternalButtonLink';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import { largeBreakpoint } from 'helpers/breakpoints';
import { trackCta } from 'helpers/goatcounter';
import WhereFeelingsGrowImg from 'images/where-feelings-grow.svg';

const NewAlbumContainer = styled.div`
  flex: 0 1 50%;
  margin-top: 32px;

  text-align: center;

  ${largeBreakpoint`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const WhereFeelingsGrow = styled(WhereFeelingsGrowImg)`
  display: block;
  border: solid black 2px;
  margin: 16px 0;

  width: 100%;

  ${largeBreakpoint`
    max-height: 600px;
  `}
`;

const MusicButton = styled(InternalButtonLink)`
  width: 100px !important;
  margin: 32px auto;

  ${largeBreakpoint`
    margin: 24px auto 32px;
  `}
`;

const IndexPage: React.FC<PageProps> = ({ location }) => (
  <Layout fullHeightNav>
    <SEO
      description="The home of Emily Fox Music: new album 'Where Feelings Grow' coming soon!"
      location={location}
    />
    <NewAlbumContainer>
      <PageHeadingNoUnderline>
        New album:
        <WhereFeelingsGrow aria-label="Where feelings grow" />
        out now!
      </PageHeadingNoUnderline>
    </NewAlbumContainer>
    <MusicButton to="/music/" onClick={() => trackCta('Album')}>
      Listen
    </MusicButton>
  </Layout>
);

export default IndexPage;
