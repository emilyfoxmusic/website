import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { PageHeadingNoUnderline } from 'components/Typography';
import Video from 'components/Video';
import { largeBreakpoint } from 'helpers/breakpoints';
import WhereFeelingsGrowImg from 'images/where-feelings-grow.svg';

import '../utils/icons';

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

const VideoContainer = styled.div`
  width: 100vw;
  margin: 32px calc((100% - 100vw) / 2) 0;
`;

const IndexPage: React.FC = () => {
  return (
    <Layout fullHeightNav>
      <SEO title="Emily Fox Music" />
      <NewAlbumContainer>
        <PageHeadingNoUnderline>
          New album:
          <WhereFeelingsGrow aria-label="Where feelings grow" />
          coming soon!
        </PageHeadingNoUnderline>
      </NewAlbumContainer>
      <VideoContainer>
        <Video
          title="Bad Things Can Happen (original song)"
          src="https://www.youtube.com/embed/peoXGwCcWBk"
        />
      </VideoContainer>
      <VideoContainer>
        <Video
          title="Hostages - The Howl and the Hum cover"
          src="https://www.youtube.com/embed/gmWIahbrHDs"
        />
      </VideoContainer>
    </Layout>
  );
};

export default IndexPage;
