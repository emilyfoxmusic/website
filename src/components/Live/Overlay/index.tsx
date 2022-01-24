// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';

import SEO from 'components/SEO';
import useTable from 'helpers/useTable';
import { RootState } from 'state/types';
import { red, green } from 'styles/colors';

import {
  BarLabel,
  BarValue,
  RequestIcon,
  SocialIcon,
  UnderlinedText,
  BottomBar,
  Requests,
  Youtube,
  Instagram,
  Bandcamp,
  Website,
} from './styles';

const Overlay: React.FC<RouteComponentProps> = ({ location }) => {
  const { queue, requestStatus } = useSelector((state: RootState) => state);

  const { data: topOfQueue } = useTable(queue, {}, 'priority', undefined, 2);

  return (
    <>
      <SEO title="Overlay" location={location} hideFromCrawlers />
      <header>
        <Youtube>
          <SocialIcon icon={['fab', 'youtube']} />
          <span>youtube.com/c/emilyfoxmusic</span>
        </Youtube>
        <Instagram>
          <SocialIcon icon={['fab', 'instagram']} />
          <span style={{ marginTop: '3px' }}>@emilyfox.music</span>
        </Instagram>
        <Bandcamp>
          <SocialIcon icon={['fab', 'bandcamp']} />
          <span>emilyfoxmusic.bandcamp.com</span>
        </Bandcamp>
        <Website>
          <SocialIcon icon="globe" />
          <span>emilyfoxmusic.co.uk</span>
        </Website>
      </header>
      <BottomBar>
        <Requests>
          Requests are{' '}
          <UnderlinedText>
            {requestStatus.requestsOpen ? 'open' : 'closed'}
          </UnderlinedText>
          <RequestIcon
            icon="circle"
            style={{ color: requestStatus.requestsOpen ? green : red }}
          />
        </Requests>
        <div>
          <BarLabel>Currently playing: </BarLabel>
          <BarValue>
            {topOfQueue.length
              ? `${topOfQueue[0].title} - ${topOfQueue[0].artist}`
              : '-'}
          </BarValue>
        </div>
        <div>
          <BarLabel>Up next: </BarLabel>
          <BarValue>
            {topOfQueue.length > 1
              ? `${topOfQueue[1].title} - ${topOfQueue[1].artist}`
              : '-'}
          </BarValue>
        </div>
      </BottomBar>
    </>
  );
};

export default Overlay;
