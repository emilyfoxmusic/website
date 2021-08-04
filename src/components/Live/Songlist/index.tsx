// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LIST_ADD, LIST_REQUEST_GET } from 'state/songlist/actions';
import { RootState } from 'state/types';

const Songlist: React.FC<RouteComponentProps> = () => {
  const songs = useSelector((state: RootState) => state.songlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LIST_REQUEST_GET });
  });

  return (
    <>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: LIST_ADD,
            payload: {
              title: 'test',
              artist: 'song',
              id: 'xx',
            },
          })
        }>
        Add song
      </button>
      {songs.map(song => (
        <div>
          {song.title} by {song.artist}
        </div>
      ))}
    </>
  );
};

export default Songlist;
