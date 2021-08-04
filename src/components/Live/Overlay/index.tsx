// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import SEO from 'components/SEO';
import useTable from 'helpers/useTable';
import { RootState } from 'state/types';
import { red, green } from 'styles/colors';

import {
  RequestStatus,
  RequestIcon,
  Social,
  SocialIcon,
  UnderlinedText,
  UnderlinedTextWithMargin,
  SectionHeading,
  HeadingRow,
  PageContainer,
  Table,
} from './styles';

const Overlay: React.FC<RouteComponentProps> = () => {
  const { queue, requestStatus } = useSelector((state: RootState) => state);

  const { data: topOfQueue } = useTable(queue, {}, 'priority', 2);

  return (
    <>
      <SEO title="Overlay" location={window.location} hideFromCrawlers />
      <header>
        <RequestStatus>
          Requests are
          <UnderlinedTextWithMargin>
            {requestStatus.requestsOpen ? 'open' : 'closed'}
          </UnderlinedTextWithMargin>
          <RequestIcon
            icon="circle"
            style={{ color: requestStatus.requestsOpen ? green : red }}
          />
        </RequestStatus>
        <Social>
          <SocialIcon icon={['fab', 'youtube']} />
          <SocialIcon icon={['fab', 'facebook']} />
          <SocialIcon icon={['fab', 'twitch']} />
          <SocialIcon icon={['fab', 'bandcamp']} />
          <UnderlinedText>emilyfox</UnderlinedText>music
        </Social>
      </header>
      <PageContainer>
        <Table>
          <thead>
            <tr>
              <th colSpan={3}>
                <SectionHeading>Currently playing</SectionHeading>
              </th>
            </tr>
            <HeadingRow>
              <th>Title</th>
              <th>Artist</th>
              <th>Requested by</th>
            </HeadingRow>
          </thead>
          <tbody>
            {topOfQueue.length ? (
              topOfQueue.map((song, i) => (
                <Fragment key={`${song.songId}-${song.priority}`}>
                  <tr>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.requestedBy}</td>
                  </tr>
                  {i === 0 && (
                    <>
                      <tr>
                        <th colSpan={3}>
                          <SectionHeading>Up next</SectionHeading>
                        </th>
                      </tr>
                      {topOfQueue.length === 1 && (
                        <tr>
                          <td colSpan={3}>-</td>
                        </tr>
                      )}
                    </>
                  )}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={3}>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      </PageContainer>
    </>
  );
};

export default Overlay;
