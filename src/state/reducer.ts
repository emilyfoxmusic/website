import { combineReducers } from 'redux';

import queueReducer from './queue/reducer';
import songlistReducer from './songlist/reducer';

const reducer = combineReducers({
  songlist: songlistReducer,
  queue: queueReducer,
});

export default reducer;
