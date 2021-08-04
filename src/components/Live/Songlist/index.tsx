/* eslint-disable react/jsx-props-no-spreading */

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import Pagination from 'components/Pagination';
import { Table, TableRow, TableHeaderCell } from 'components/Table';
import Tag from 'components/Tag';
import { PageHeading } from 'components/Typography';
import { MobileOnly, LargeBreakpointOnly } from 'helpers/breakpoints';
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
import { lightRed } from 'styles/colors';

import SortButton from './SortButton';
import {
  Label,
  FormHeading,
  FullWidthInput,
  SecretAdminSection,
  SubmitSongButton,
  TableSection,
  XLargeBreakpointOnlyHeaderCell,
  XLargeBreakpointOnlyCell,
  SmallRose,
} from './styles';

import {
  ActionButton,
  LargeBreakpointOnlyHeaderCell,
  LargeBreakpointOnlyCell,
} from '../Shared';

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

  const { data, sort, pagination } = useTable(
    augmentedSongs,
    'artist',
    'title',
    10
  );

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
      <TableSection>
        <Pagination {...pagination} />
        <Table>
          <thead>
            <TableRow>
              <LargeBreakpointOnlyHeaderCell $width="120px">
                <span aria-label="Position in queue">#Queue</span>
                <SortButton sort={sort} sortKey="positionInQueue" />
              </LargeBreakpointOnlyHeaderCell>
              <TableHeaderCell>
                Title
                <SortButton sort={sort} sortKey="title" />
              </TableHeaderCell>
              <TableHeaderCell $width="30%" $widthLarge="17%">
                Artist
                <SortButton sort={sort} sortKey="artist" />
              </TableHeaderCell>
              <XLargeBreakpointOnlyHeaderCell $width="130px">
                <span aria-label="Number of plays">#Plays</span>
                <SortButton
                  sort={sort}
                  sortKey="numberOfPlays"
                  switchDefaultOrder
                />
              </XLargeBreakpointOnlyHeaderCell>
              <LargeBreakpointOnlyHeaderCell $width="180px">
                Last played
                <SortButton
                  sort={sort}
                  sortKey="lastPlayed"
                  switchDefaultOrder
                />
              </LargeBreakpointOnlyHeaderCell>
              <TableHeaderCell $width="42px" $widthLarge="96px" />
            </TableRow>
          </thead>
          <tbody>
            {data.map(song => (
              <TableRow
                key={`${song.artist}-${song.title}`}
                $background={song.isInQueue ? lightRed : undefined}>
                <LargeBreakpointOnlyCell>
                  {song.isInQueue ? song.positionInQueue : ''}
                </LargeBreakpointOnlyCell>
                <td>
                  <span>{song.title}</span>
                  {song.artist === 'Emily Fox' && (
                    <>
                      {[
                        'Where Feelings Grow',
                        'Toxic',
                        'Faces (No One Else Is Counting)',
                        'Original Human',
                        'gods',
                        'House Song',
                        'Cry',
                        'One Part',
                        "Don't know why I'm here",
                      ].includes(song.title) && <SmallRose />}
                      <Tag>Original</Tag>
                    </>
                  )}
                </td>
                <td>{song.artist}</td>
                <XLargeBreakpointOnlyCell>
                  {song.numberOfPlays}
                </XLargeBreakpointOnlyCell>
                <LargeBreakpointOnlyCell>
                  {formatTimeAgo(song.lastPlayed)}
                </LargeBreakpointOnlyCell>
                <td>
                  {!song.isInQueue && (
                    <ActionButton
                      aria-label={`Request ${song.title} by ${song.artist}`}
                      type="button"
                      onClick={() => requestSong(song.id)}>
                      <MobileOnly>Req</MobileOnly>
                      <LargeBreakpointOnly>Request</LargeBreakpointOnly>
                    </ActionButton>
                  )}
                </td>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Pagination {...pagination} />
      </TableSection>

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
