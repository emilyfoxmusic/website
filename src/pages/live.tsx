import { PageProps } from 'gatsby';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styled from 'styled-components';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { largeBreakpoint } from 'helpers/breakpoints';

const TwitchEmbedWrapper = styled.div`
  margin-top: 24px;

  ${largeBreakpoint`
    position: relative;
    margin-top: -150px;
 `}
`;

const Live: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout>
      <SEO
        description="Catch Emily Fox Music live on twitch."
        location={location}
      />
      <TwitchEmbedWrapper>
        <ReactTwitchEmbedVideo channel="EmIsThePenguin" width="100%" />
      </TwitchEmbedWrapper>
    </Layout>
  );
};

export default Live;
