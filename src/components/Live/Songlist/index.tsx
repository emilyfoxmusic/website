/* eslint-disable react/jsx-props-no-spreading */

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import Pagination from 'components/Pagination';
import SEO from 'components/SEO';
import { Table, TableRow, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import { buildTwitchRedirectUrl } from 'helpers/auth';
import { MobileOnly, LargeBreakpointOnly } from 'helpers/breakpoints';
import { formatTimeAgo } from 'helpers/dates';
import { count } from 'helpers/goatcounter';
import useTable, { SortConfig } from 'helpers/useTable';
import { QueueRequestAddAction, QUEUE_REQUEST_ADD } from 'state/queue/actions';
import { RootState } from 'state/types';
import { lightRed } from 'styles/colors';

import AddSongForm from './AddSongForm';
import SortButton from './SortButton';
import {
  TableBlock,
  XLargeBreakpointOnlyHeaderCell,
  XLargeBreakpointOnlyCell,
  VisuallyHiddenSortText,
  TwitchIcon,
  TwitchLoginButton,
} from './styles';

import {
  ActionButton,
  LargeBreakpointOnlyHeaderCell,
  LargeBreakpointOnlyCell,
  MedBreakpointOnlyCell,
  MedBreakpointOnlyHeaderCell,
} from '../Shared';
import TitleCell from '../Shared/TitleCell';

const Songlist: React.FC<RouteComponentProps> = () => {
  const { songlist: songs, queue, user, requestStatus } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch<Dispatch<QueueRequestAddAction>>();

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

  const enableRequests =
    user.isAuthenticated && (requestStatus.requestsOpen || user.isAdmin);

  return (
    <>
      <SEO
        title="Song list"
        description="Song list for Emily Fox's live performances on Twitch."
        location={window.location}
      />
      <PageHeading>Song list</PageHeading>
      <p>
        These are the current 'official' songs in my repertoire. If you pop into
        a stream, feel free to suggest something not on the list and if I know
        it I <i>might</i> give it a shot!
      </p>
      {!user.isAuthenticated && (
        <TwitchLoginButton
          onClick={() => {
            navigate(buildTwitchRedirectUrl());
            count({
              path: 'live: authenticate with twitch',
              title: 'authenticate',
              event: true,
            });
          }}>
          <TwitchIcon />
          Sign in with twitch to request a song
        </TwitchLoginButton>
      )}
      <TableBlock>
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
                $widthLarge="18%"
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
              <MedBreakpointOnlyHeaderCell
                $width="123px"
                $widthLarge="180px"
                aria-sort={sort.ariaSort('lastPlayed')}>
                Last played
                <SortButton sort={sort} sortKey="lastPlayed" />
              </MedBreakpointOnlyHeaderCell>
              {enableRequests && (
                <TableHeaderCell $width="42px" $widthLarge="96px" />
              )}
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
                <MedBreakpointOnlyCell>
                  {formatTimeAgo(song.lastPlayed)}
                </MedBreakpointOnlyCell>
                {enableRequests && (
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
                )}
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Pagination {...pagination} />
      </TableBlock>

      {user.isAdmin && <AddSongForm />}
    </>
  );
};

export default Songlist;
