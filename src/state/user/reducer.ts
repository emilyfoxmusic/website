import { SET_USER, UserAction, CLEAR_USER } from './actions';
import { Principal } from './types';

const anonymousPrincipal: Principal = {
  isAuthenticated: false,
  isAdmin: false,
};

const authenticatedPrincipal = (username: string): Principal => ({
  username,
  isAuthenticated: true,
  isAdmin: username === process.env.GATSBY_ADMIN_USERNAME,
});

const reducer = (
  state: Principal = anonymousPrincipal,
  action: UserAction
): Principal => {
  switch (action.type) {
    case SET_USER:
      return authenticatedPrincipal(action.payload.username);
    case CLEAR_USER:
      return anonymousPrincipal;
    default:
      return state;
  }
};

export default reducer;
