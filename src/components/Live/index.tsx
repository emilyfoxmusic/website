// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';

const TwitchEmbedWrapper = styled.div`
  margin-top: 24px;

  ${largeBreakpoint`
    position: relative;
    margin-top: -150px;
 `}
`;

const TwitchEmbed: React.FC<RouteComponentProps> = () => {
  return (
    <TwitchEmbedWrapper>
      <ReactTwitchEmbedVideo
        channel={process.env.TWITCH_CHANNEL}
        width="100%"
      />
    </TwitchEmbedWrapper>
  );
};

export default TwitchEmbed;
