// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Table, TableCell, TableHeaderCell } from 'components/Table';
import { PageHeading } from 'components/Typography';
import useTable from 'helpers/useTable';
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
  const songs = useSelector((state: RootState) => state.songlist);
  const dispatch = useDispatch<Dispatch<ListAction>>();

  useEffect(() => {
    dispatch({ type: LIST_REQUEST_GET });
  }, [dispatch]);

  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const submit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch({ type: LIST_REQUEST_ADD, payload: { title, artist } });
    setTitle('');
    setArtist('');
  };

  const {
    data,
    pagination: { currentPage, lastPage, setNextPage, setPreviousPage },
  } = useTable(songs, 'artist');

  return (
    <>
      <PageHeading>Song list</PageHeading>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Artist</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map(song => (
            <tr key={`${song.artist}-${song.title}`}>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
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
