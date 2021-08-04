// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import LiveHeader from 'components/LiveHeader';
import SEO from 'components/SEO';
import useTable from 'helpers/useTable';
import { RootState } from 'state/types';

import {
  SectionHeading,
  HeadingRow,
  PageContainer,
  Table,
  OverlayRose,
} from './styles';

import TitleCell from '../Shared/TitleCell';

const Overlay: React.FC<RouteComponentProps> = () => {
  const queue = useSelector((state: RootState) =>
    state.queue.sort((a, b) => a.priority - b.priority).slice(0, 3)
  );

  const { data: topOfQueue } = useTable(queue, {}, 'priority', 3);

  return (
    <>
      <SEO title="Overlay" location={window.location} hideFromCrawlers />
      <header>
        <LiveHeader />
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
            {topOfQueue.map((song, i) => (
              <Fragment key={`${song.songId}-${song.priority}`}>
                <tr>
                  <TitleCell title={song.title} artist={song.artist} />
                  <td>{song.artist}</td>
                  <td>{song.requestedBy}</td>
                </tr>
                {i === 0 && (
                  <tr>
                    <th colSpan={3}>
                      <SectionHeading>Up next</SectionHeading>
                    </th>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
        <OverlayRose />
      </PageContainer>
    </>
  );
};

export default Overlay;
