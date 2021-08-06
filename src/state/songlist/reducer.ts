import { QueueSetPlayedAction, QUEUE_PLAYED } from 'state/queue/actions';

import { ListAction, LIST_ADD, LIST_SET } from './actions';
import { ListItem } from './types';

const reducer = (
  state: ListItem[] = [],
  action: ListAction | QueueSetPlayedAction
): ListItem[] => {
  switch (action.type) {
    case LIST_SET:
      return action.payload;
    case LIST_ADD:
      return [...state, action.payload];
    case QUEUE_PLAYED:
      return state.map(song =>
        song.id === action.payload.songId
          ? {
              ...song,
              numberOfPlays: action.payload.numberOfPlays,
              lastPlayed: action.payload.lastPlayed,
            }
          : song
      );
    default:
      return state;
  }
};

export default reducer;
