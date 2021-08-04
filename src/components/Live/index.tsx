// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { largeBreakpoint } from 'helpers/breakpoints';
import { twitch } from 'utils/links';

const TwitchEmbedWrapper = styled.div`
  margin: 24px 0;

  ${largeBreakpoint`
    position: relative;
    margin-top: -150px;
    margin-bottom: 36px;
 `}

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const TwitchEmbed: React.FC<RouteComponentProps> = ({ location }) => (
  <Layout liveLayout>
    <SEO
      title="Live on Twitch"
      description="Watch Emily Fox live on Twitch."
      location={location}
    />
    <TwitchEmbedWrapper>
      <ReactPlayer
        url={twitch}
        width="100%"
        height="0"
        style={{ position: 'relative', paddingBottom: '56.25%' }}
        controls
      />
    </TwitchEmbedWrapper>
  </Layout>
);

export default TwitchEmbed;
