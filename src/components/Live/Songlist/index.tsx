// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LIST_ADD } from 'state/songlist/actions';
import { StoreState } from 'state/types';

const Songlist: React.FC<RouteComponentProps> = () => {
  const songs = useSelector((state: StoreState) => state.songlist);
  const dispatch = useDispatch();
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
