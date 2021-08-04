import {
  QueueAction,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_CANCEL,
  QUEUE_PLAYED,
  QUEUE_SET,
} from './actions';
import { QueueItem } from './types';

const reducer = (state: QueueItem[] = [], action: QueueAction): QueueItem[] => {
  switch (action.type) {
    case QUEUE_SET:
      return action.payload;
    case QUEUE_CANCEL:
    case QUEUE_PLAYED:
      return state.filter(
        queueItem => queueItem.songId !== action.payload.songId
      );
    case QUEUE_ADD:
      return [...state, action.payload];
    case QUEUE_BUMP:
      return state.map(queueItem =>
        queueItem.songId === action.payload.songId
          ? { ...queueItem, priority: action.payload.priority }
          : queueItem
      );
    default:
      return state;
  }
};

export default reducer;
