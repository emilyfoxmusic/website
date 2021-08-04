// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { Table, TableCell, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import useTable from 'helpers/useTable';
import { RootState } from 'state/types';

const Queue: React.FC<RouteComponentProps> = () => {
  const queuedSongs = useSelector((state: RootState) => state.queue);

  const { data } = useTable(queuedSongs, 'priority');

  return (
    <>
      <PageHeading>Current song queue</PageHeading>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Artist</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map((song, index) => (
            <tr key={`${song.artist}-${song.title}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Queue;
