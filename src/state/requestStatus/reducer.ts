import { RequestStatusAction, STATUS_SET } from './actions';
import { RequestStatus } from './types';

const initialRequestStatus = {
  requestsOpen: false,
};

const reducer = (
  state: RequestStatus = initialRequestStatus,
  action: RequestStatusAction
): RequestStatus => {
  switch (action.type) {
    case STATUS_SET:
      return { requestsOpen: action.payload.requestsOpen };
    default:
      return state;
  }
};

export default reducer;
