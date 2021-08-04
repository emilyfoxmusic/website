// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import {
  ListAction,
  LIST_REQUEST_ADD,
  LIST_REQUEST_GET,
} from 'state/songlist/actions';
import { RootState } from 'state/types';

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

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={artist}
          onChange={e => setArtist(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {songs.map(song => (
        <div>
          {song.title} by {song.artist}
        </div>
      ))}
    </>
  );
};

export default Songlist;
