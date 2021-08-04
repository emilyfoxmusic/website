// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Table, TableCell, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import { formatTimeAgo } from 'helpers/dates';
import useTable from 'helpers/useTable';
import {
  QueueRequestAddAction,
  QueueRequestGetAction,
  QUEUE_REQUEST_ADD,
  QUEUE_REQUEST_GET,
} from 'state/queue/actions';
import {
  ListAction,
  LIST_REQUEST_ADD,
  LIST_REQUEST_GET,
} from 'state/songlist/actions';
import { RootState } from 'state/types';

import {
  Label,
  FormHeading,
  FullWidthInput,
  SecretAdminSection,
  SubmitSongButton,
} from './styles';

const Songlist: React.FC<RouteComponentProps> = () => {
  const { songlist: songs, queue } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<
    Dispatch<ListAction | QueueRequestGetAction | QueueRequestAddAction>
  >();

  useEffect(() => {
    dispatch({ type: LIST_REQUEST_GET });
    dispatch({ type: QUEUE_REQUEST_GET });
  }, [dispatch]);

  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const submit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch({ type: LIST_REQUEST_ADD, payload: { title, artist } });
    setTitle('');
    setArtist('');
  };

  const augmentedSongs = songs.map(song => {
    const queueIndex = queue.findIndex(s => s.songId === song.id);
    const isInQueue = queueIndex > -1;
    return {
      ...song,
      lastPlayed: song.lastPlayed ?? '',
      positionInQueue: isInQueue ? queueIndex + 1 : Number.MAX_VALUE,
      isInQueue,
    };
  });

  const {
    data,
    sort: { toggleSort },
    pagination: { currentPage, lastPage, setNextPage, setPreviousPage },
  } = useTable(augmentedSongs, 'artist', 10);

  const requestSong = (songId: string): void => {
    dispatch({ type: QUEUE_REQUEST_ADD, payload: { songId } });
  };

  return (
    <>
      <PageHeading>Song list</PageHeading>
      <p>
        These are the current 'official' songs in my repertoire. If you pop into
        a stream, feel free to suggest something not on the list and if I know
        it I <i>might</i> give it a shot!
      </p>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell>
              Queue position
              <button
                type="button"
                onClick={() => toggleSort('positionInQueue')}>
                sort
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              Title
              <button type="button" onClick={() => toggleSort('title')}>
                sort
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              Artist
              <button type="button" onClick={() => toggleSort('artist')}>
                sort
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              Number of plays
              <button
                type="button"
                onClick={() => toggleSort('numberOfPlays', false)}>
                sort
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              Last played
              <button
                type="button"
                onClick={() => toggleSort('lastPlayed', false)}>
                sort
              </button>
            </TableHeaderCell>
            <TableHeaderCell>Request</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map(song => (
            <tr key={`${song.artist}-${song.title}`}>
              <TableCell $highlight={song.isInQueue}>
                {song.isInQueue ? song.positionInQueue : ''}
              </TableCell>
              <TableCell $highlight={song.isInQueue}>{song.title}</TableCell>
              <TableCell $highlight={song.isInQueue}>{song.artist}</TableCell>
              <TableCell $highlight={song.isInQueue}>
                {song.numberOfPlays}
              </TableCell>
              <TableCell $highlight={song.isInQueue}>
                {formatTimeAgo(song.lastPlayed)}
              </TableCell>
              <TableCell $highlight={song.isInQueue}>
                {!song.isInQueue && (
                  <button type="button" onClick={() => requestSong(song.id)}>
                    Request
                  </button>
                )}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      {currentPage}/{lastPage}
      <button type="button" onClick={setPreviousPage}>
        Prev page
      </button>
      <button type="button" onClick={setNextPage}>
        Next page
      </button>
      <SecretAdminSection>
        <FormHeading>Secret admin section</FormHeading>
        <form onSubmit={submit}>
          <Label htmlFor="title">Title</Label>
          <FullWidthInput
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Label htmlFor="artist">Artist</Label>
          <FullWidthInput
            id="artist"
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
          />

          <SubmitSongButton type="submit">Add song</SubmitSongButton>
        </form>
      </SecretAdminSection>
    </>
  );
};

export default Songlist;
