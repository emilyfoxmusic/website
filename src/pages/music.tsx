import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';
import Video from 'components/Video';
import { bandcamp, youtube } from 'utils/links';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BandcampEmbed = styled.iframe`
  border: none;
  width: 600px;
  height: 380px;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Music: React.FC<PageProps> = ({ location }) => (
  <Layout>
    <SEO
      title="Music"
      description="Find the latest music from Emily Fox, original releases and YouTube covers."
      location={location}
    />
    <PageHeading>Music</PageHeading>
    <p>
      All my original music is available on{' '}
      <TextLink href={bandcamp}>my bandcamp page</TextLink> and all my videos
      can be watched on <TextLink href={youtube}>my YouTube channel</TextLink>.
    </p>
    <CenteredContainer>
      <BandcampEmbed
        title="Real EP"
        src="https://bandcamp.com/EmbeddedPlayer/album=4081268358/size=large/bgcol=ffffff/linkcol=de270f/artwork=small/transparent=true/"
        seamless>
        <a href="http://emilyfoxmusic.bandcamp.com/album/real">
          Real by Emily Fox
        </a>
      </BandcampEmbed>
    </CenteredContainer>
    <VideoContainer>
      <Video
        title="Hostages - The Howl and the Hum cover"
        src="https://www.youtube.com/embed/gmWIahbrHDs"
      />
    </VideoContainer>
    <VideoContainer>
      <Video
        title="Bad Things Can Happen (original song)"
        src="https://www.youtube.com/embed/peoXGwCcWBk"
      />
    </VideoContainer>
    <VideoContainer>
      <Video
        title="Walls - Kings of Leon cover"
        src="https://www.youtube.com/embed/VLP6Z93iNFI"
      />
    </VideoContainer>
  </Layout>
);

export default Music;
