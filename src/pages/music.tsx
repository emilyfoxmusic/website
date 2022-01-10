import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { StandardLayout } from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading, PageSubheading } from 'components/Typography';
import Video from 'components/Video';
import { trackSocialsMusicClick } from 'helpers/goatcounter';
import { bandcamp, youtube } from 'utils/links';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BandcampEmbed = styled.iframe`
  border: none;
  width: 600px;
  height: 440px;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const CenteredParagraph = styled.p`
  text-align: center;
  margin-top: 12px;
`;

const Music: React.FC<PageProps> = ({ location }) => (
  <StandardLayout>
    <SEO
      title="Music"
      description="Find the latest music from Emily Fox, original releases and YouTube covers."
      location={location}
    />
    <PageHeading>Music</PageHeading>

    <PageSubheading>Latest album: Where Feelings Grow</PageSubheading>
    <CenteredParagraph>
      All my original music is available on{' '}
      <TextLink
        href={bandcamp}
        onClick={(): void => trackSocialsMusicClick('Bandcamp')}>
        my bandcamp page
      </TextLink>
      .
    </CenteredParagraph>
    <CenteredContainer>
      <BandcampEmbed
        src="https://bandcamp.com/EmbeddedPlayer/album=1322260653/size=large/bgcol=ffffff/linkcol=de270f/artwork=small/transparent=true/"
        seamless>
        <a href="https://emilyfoxmusic.bandcamp.com/album/where-feelings-grow">
          Where Feelings Grow by Emily Fox
        </a>
      </BandcampEmbed>
    </CenteredContainer>

    <PageSubheading>YouTube videos</PageSubheading>
    <CenteredParagraph>
      Visit{' '}
      <TextLink
        href={youtube}
        onClick={(): void => trackSocialsMusicClick('YouTube')}>
        my YouTube channel
      </TextLink>{' '}
      for the full selection.
    </CenteredParagraph>
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
  </StandardLayout>
);

export default Music;
