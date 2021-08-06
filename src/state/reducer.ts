import { combineReducers } from 'redux';

import queueReducer from './queue/reducer';
import requestStatusReducer from './requestStatus/reducer';
import songlistReducer from './songlist/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
  songlist: songlistReducer,
  queue: queueReducer,
  user: userReducer,
  requestStatus: requestStatusReducer,
});

export default reducer;
