import { combineReducers } from 'redux';

import queueReducer from './queue/reducer';
import songlistReducer from './songlist/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
  songlist: songlistReducer,
  queue: queueReducer,
  user: userReducer,
});

export default reducer;
