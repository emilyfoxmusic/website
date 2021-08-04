// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, TableCell, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import useTable from 'helpers/useTable';
import {
  QueueAction,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_GET,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';
import { RootState } from 'state/types';

const Queue: React.FC<RouteComponentProps> = () => {
  const queuedSongs = useSelector((state: RootState) => state.queue);
  const dispatch = useDispatch<Dispatch<QueueAction>>();

  useEffect(() => {
    dispatch({ type: QUEUE_REQUEST_GET });
  }, [dispatch]);

  const { data } = useTable(queuedSongs, 'priority', 'songId');

  const bumpSong = (songId: string): void => {
    dispatch({
      type: QUEUE_REQUEST_BUMP,
      payload: { songId, position: 1 },
    });
  };

  const removeSong = (songId: string): void => {
    dispatch({ type: QUEUE_REQUEST_CANCEL, payload: { songId } });
  };

  const markSongAsPlayed = (songId: string): void => {
    dispatch({ type: QUEUE_REQUEST_PLAYED, payload: { songId } });
  };

  return (
    <>
      <PageHeading>Current song queue</PageHeading>
      {queuedSongs.length ? (
        <Table>
          <thead>
            <tr>
              <TableHeaderCell>Position</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Artist</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {data.map((song, index) => (
              <tr key={`${song.artist}-${song.title}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>
                  {index !== 0 && (
                    <button type="button" onClick={() => bumpSong(song.songId)}>
                      Bump to #1
                    </button>
                  )}
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={() => markSongAsPlayed(song.songId)}>
                      Mark as played
                    </button>
                  )}
                  <button type="button" onClick={() => removeSong(song.songId)}>
                    Remove
                  </button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>The queue is currently empty.</p>
      )}
    </>
  );
};

export default Queue;
