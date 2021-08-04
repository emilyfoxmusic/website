// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { Table, TableHeaderCell, TableRow } from 'components/Table';
import { PageHeading } from 'components/Typography';
import useTable from 'helpers/useTable';
import {
  QueueAction,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';
import { QueueItem } from 'state/queue/types';
import { RootState } from 'state/types';

import { Bump1Button, Bump2Button, Bump3Button, TableBlock } from './styles';

import {
  LargeBreakpointOnlyHeaderCell,
  LargeBreakpointOnlyCell,
  ActionButton,
  MedBreakpointOnlyHeaderCell,
  MedBreakpointOnlyCell,
} from '../Shared';
import TitleCell from '../Shared/TitleCell';

const Queue: React.FC<RouteComponentProps> = () => {
  const { queue: queuedSongs, user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch<QueueAction>>();

  const { data } = useTable(queuedSongs, {}, 'priority');

  const bumpSong = (songId: string, position: number): void => {
    dispatch({
      type: QUEUE_REQUEST_BUMP,
      payload: { songId, position },
    });
  };

  const removeSong = (song: QueueItem): void => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const confirmRemove = confirm(
      `Are you sure you want to remove '${song.title}' from the queue?`
    );
    if (confirmRemove) {
      dispatch({
        type: QUEUE_REQUEST_CANCEL,
        payload: { songId: song.songId },
      });
    }
  };

  const markSongAsPlayed = (songId: string): void => {
    dispatch({ type: QUEUE_REQUEST_PLAYED, payload: { songId } });
  };

  return (
    <Layout liveLayout>
      <SEO
        title="Song queue"
        description="Song queue for Emily Fox's live performances on Twitch."
        location={window.location}
      />
      <PageHeading>Current queue</PageHeading>
      {queuedSongs.length ? (
        <TableBlock>
          <Table>
            <thead>
              <TableRow>
                <TableHeaderCell
                  $width="30px"
                  $widthLarge="50px"
                  aria-label="Position in queue">
                  #
                </TableHeaderCell>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell>Artist</TableHeaderCell>
                <MedBreakpointOnlyHeaderCell>
                  Requested by
                </MedBreakpointOnlyHeaderCell>
                {user.isAdmin && (
                  <LargeBreakpointOnlyHeaderCell>
                    Actions
                  </LargeBreakpointOnlyHeaderCell>
                )}
              </TableRow>
            </thead>
            <tbody>
              {data.map((song, index) => (
                <TableRow key={`${song.artist}-${song.title}`}>
                  <td>{index + 1}</td>
                  <TitleCell title={song.title} artist={song.artist} />
                  <td>{song.artist}</td>
                  <MedBreakpointOnlyCell>
                    {song.requestedBy}
                  </MedBreakpointOnlyCell>
                  {user.isAdmin && (
                    <LargeBreakpointOnlyCell>
                      {index !== 0 && (
                        <Bump1Button
                          onClick={() => bumpSong(song.songId, 1)}
                          aria-label={`Bump ${song.title} to position 1`}>
                          #1
                        </Bump1Button>
                      )}
                      {index > 1 && (
                        <Bump2Button
                          onClick={() => bumpSong(song.songId, 2)}
                          aria-label={`Bump ${song.title} to position 2`}>
                          #2
                        </Bump2Button>
                      )}
                      {index > 2 && (
                        <Bump3Button
                          onClick={() => bumpSong(song.songId, 3)}
                          aria-label={`Bump ${song.title} to position 3`}>
                          #3
                        </Bump3Button>
                      )}
                      {index === 0 && (
                        <ActionButton
                          onClick={() => markSongAsPlayed(song.songId)}
                          aria-label={`Mark ${song.title} as played`}>
                          Played
                        </ActionButton>
                      )}
                      <ActionButton
                        onClick={() => removeSong(song)}
                        aria-label={`Remove ${song.title} from the queue`}>
                        Remove
                      </ActionButton>
                    </LargeBreakpointOnlyCell>
                  )}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableBlock>
      ) : (
        <p>The queue is currently empty.</p>
      )}
    </Layout>
  );
};

export default Queue;
