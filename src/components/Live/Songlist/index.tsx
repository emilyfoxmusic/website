/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import ScreenreaderPagination from 'components/Pagination/ScreenreaderPagination';
import SEO from 'components/SEO';
import { Table, TableRow, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import { buildTwitchRedirectUrl } from 'helpers/auth';
import { MobileOnly, LargeBreakpointOnly } from 'helpers/breakpoints';
import { formatTimeAgo } from 'helpers/dates';
import { trackAction } from 'helpers/goatcounter';
import useTable, { SortConfig } from 'helpers/useTable';
import { QueueRequestAddAction, QUEUE_REQUEST_ADD } from 'state/queue/actions';
import { RootState } from 'state/types';
import { lightRed } from 'styles/colors';

import AddSongForm from './AddSongForm';
import SortButton from './SortButton';
import {
  UnderConstructionBanner,
  TableBlock,
  XLargeBreakpointOnlyHeaderCell,
  XLargeBreakpointOnlyCell,
  VisuallyHiddenSortText,
  TwitchIcon,
  TwitchLoginButton,
  TableControls,
  SelectWithMargin,
} from './styles';

import {
  ActionButton,
  LargeBreakpointOnlyHeaderCell,
  LargeBreakpointOnlyCell,
  MedBreakpointOnlyCell,
  MedBreakpointOnlyHeaderCell,
} from '../Shared';
import TitleCell from '../Shared/TitleCell';

const Songlist: React.FC<RouteComponentProps> = ({ location }) => {
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

  const resetPagination = (): void => pagination.setPage(1);

  return (
    <Layout liveLayout>
      <SEO
        title="Song list"
        description="Song list for Emily Fox's live performances on Twitch."
        location={location}
      />
      <PageHeading>Song list</PageHeading>
      <p>
        These are the current 'official' songs in my repertoire. If you pop into
        a stream, feel free to suggest something not on the list and if I know
        it I <i>might</i> give it a shot!
      </p>
      <UnderConstructionBanner>
        <FontAwesomeIcon icon="tools" />
        Please note: we are just starting out so this list is under
        construction.
      </UnderConstructionBanner>
      {!user.isAuthenticated && (
        <TwitchLoginButton
          onClick={() => {
            navigate(buildTwitchRedirectUrl());
            trackAction('Authenticate');
          }}>
          <TwitchIcon />
          Sign in with twitch to request a song
        </TwitchLoginButton>
      )}
      {songs.length ? (
        <TableBlock>
          <TableControls>
            <label htmlFor="pageSize">
              Results per page
              <SelectWithMargin
                id="pageSize"
                name="pageSize"
                value={pagination.pageSize?.toString()}
                onChange={e => pagination.setPageSize(Number(e.target.value))}>
                {[10, 20, 30, 40, 50, 100].map(size => (
                  <option key={size} value={size.toString()}>
                    {size}
                  </option>
                ))}
              </SelectWithMargin>
            </label>
            <ScreenreaderPagination
              announceChanges
              pageSize={pagination.pageSize ?? 0}
              currentPage={pagination.currentPage}
              total={songs.length}
            />
            <Pagination {...pagination} />
          </TableControls>
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
                  <SortButton
                    sort={sort}
                    sortKey="positionInQueue"
                    onSort={resetPagination}
                  />
                </LargeBreakpointOnlyHeaderCell>
                <TableHeaderCell aria-sort={sort.ariaSort('title')}>
                  Title
                  <SortButton
                    sort={sort}
                    sortKey="title"
                    onSort={resetPagination}
                  />
                </TableHeaderCell>
                <TableHeaderCell
                  $widthLarge="18%"
                  aria-sort={sort.ariaSort('artist')}>
                  Artist
                  <SortButton
                    sort={sort}
                    sortKey="artist"
                    onSort={resetPagination}
                  />
                </TableHeaderCell>
                <XLargeBreakpointOnlyHeaderCell
                  $width="130px"
                  aria-sort={sort.ariaSort('numberOfPlays')}>
                  <span aria-label="Number of plays">#Plays</span>
                  <SortButton
                    sort={sort}
                    sortKey="numberOfPlays"
                    onSort={resetPagination}
                  />
                </XLargeBreakpointOnlyHeaderCell>
                <MedBreakpointOnlyHeaderCell
                  $width="123px"
                  $widthLarge="180px"
                  aria-sort={sort.ariaSort('lastPlayed')}>
                  Last played
                  <SortButton
                    sort={sort}
                    sortKey="lastPlayed"
                    onSort={resetPagination}
                  />
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
          <ScreenreaderPagination
            pageSize={pagination.pageSize ?? 0}
            currentPage={pagination.currentPage}
            total={songs.length}
          />
          <Pagination {...pagination} />
        </TableBlock>
      ) : (
        <p>No songs loaded 😭</p>
      )}

      {user.isAdmin && <AddSongForm />}
    </Layout>
  );
};

export default Songlist;
