import { toast } from 'react-toastify';
import {
  CallEffect,
  call,
  TakeEffect,
  ForkEffect,
  take,
  takeEvery,
  all,
  AllEffect,
} from 'redux-saga/effects';

import { webSocket } from 'helpers/webSocketConnection';
import {
  ListRequestAddAction,
  LIST_REQUEST_GET,
  LIST_REQUEST_ADD,
  LIST_ADD,
  ListAddAction,
} from 'state/songlist/actions';

const requestGet = (): void => webSocket.send({ action: 'listGet' });

const requestAdd = (action: ListRequestAddAction): void =>
  webSocket.send({ action: 'listAdd', ...action.payload });

const notifyAdd = (action: ListAddAction): unknown =>
  toast.dark(
    `${action.payload.title} by ${action.payload.artist} has been added to the songlist`
  );

function* listManagement(): Generator<
  TakeEffect | CallEffect | AllEffect<ForkEffect>,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(requestGet);
  yield all([
    takeEvery(LIST_REQUEST_ADD, requestAdd),
    takeEvery(LIST_ADD, notifyAdd),
  ]);
}

export default listManagement;
