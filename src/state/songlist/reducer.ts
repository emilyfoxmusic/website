import { ListAction, LIST_ADD, LIST_SET } from './actions';
import { ListItem } from './types';

const reducer = (state: ListItem[] = [], action: ListAction): ListItem[] => {
  switch (action.type) {
    case LIST_SET:
      return action.payload;
    case LIST_ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
