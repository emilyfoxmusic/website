/* eslint-disable react/jsx-props-no-spreading */

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import Pagination from 'components/Pagination';
import { Table, TableRow, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import { MobileOnly, LargeBreakpointOnly } from 'helpers/breakpoints';
import { formatTimeAgo } from 'helpers/dates';
import useTable, { SortConfig } from 'helpers/useTable';
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
  VisuallyHiddenSortText,
} from './styles';

import {
  ActionButton,
  LargeBreakpointOnlyHeaderCell,
  LargeBreakpointOnlyCell,
} from '../Shared';
import TitleCell from '../Shared/TitleCell';

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

  const sortConfig: SortConfig<typeof augmentedSongs[0]> = {
    title: {
      otherSortKeys: ['artist'],
    },
    artist: {
      otherSortKeys: ['title'],
    },
    numberOfPlays: {
      otherSortKeys: ['artist', 'title'],
      label: 'number of plays',
      defaultOrder: 'descending',
      ascendingText: 'least popular first',
      descendingText: 'most popular first',
    },
    positionInQueue: {
      otherSortKeys: ['artist', 'title'],
      label: 'position in queue',
    },
    lastPlayed: {
      otherSortKeys: ['artist', 'title'],
      label: 'last played',
      defaultOrder: 'descending',
      ascendingText: 'least recent first',
      descendingText: 'most recent first',
    },
  };

  const { data, sort, pagination } = useTable(
    augmentedSongs,
    sortConfig,
    'artist',
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
        <VisuallyHiddenSortText aria-live="polite">
          Currently sorting by: {sort.currentSortText}
        </VisuallyHiddenSortText>
        <Table>
          <thead>
            <TableRow>
              <LargeBreakpointOnlyHeaderCell
                $width="120px"
                aria-sort={sort.ariaSort('positionInQueue')}>
                <span aria-label="Position in queue">#Queue</span>
                <SortButton sort={sort} sortKey="positionInQueue" />
              </LargeBreakpointOnlyHeaderCell>
              <TableHeaderCell aria-sort={sort.ariaSort('title')}>
                Title
                <SortButton sort={sort} sortKey="title" />
              </TableHeaderCell>
              <TableHeaderCell
                $width="30%"
                $widthLarge="17%"
                aria-sort={sort.ariaSort('artist')}>
                Artist
                <SortButton sort={sort} sortKey="artist" />
              </TableHeaderCell>
              <XLargeBreakpointOnlyHeaderCell
                $width="130px"
                aria-sort={sort.ariaSort('numberOfPlays')}>
                <span aria-label="Number of plays">#Plays</span>
                <SortButton sort={sort} sortKey="numberOfPlays" />
              </XLargeBreakpointOnlyHeaderCell>
              <LargeBreakpointOnlyHeaderCell
                $width="180px"
                aria-sort={sort.ariaSort('lastPlayed')}>
                Last played
                <SortButton sort={sort} sortKey="lastPlayed" />
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
                <TitleCell title={song.title} artist={song.artist} />
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
