import { SET_USER, UserAction, CLEAR_USER } from './actions';
import { Principal } from './types';

const anonymousPrincipal: Principal = {
  isAuthenticated: false,
  isAdmin: false,
};

const reducer = (
  state: Principal = anonymousPrincipal,
  action: UserAction
): Principal => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return anonymousPrincipal;
    default:
      return state;
  }
};

export default reducer;
