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
import { QueueRequestAddAction, QUEUE_REQUEST_ADD } from 'state/queue/actions';
import {
  ListRequestAddAction,
  LIST_REQUEST_GET,
  LIST_REQUEST_ADD,
} from 'state/songlist/actions';

const requestGet = (): void => webSocket.send({ action: 'listGet' });

const requestAdd = (action: ListRequestAddAction): void =>
  webSocket.send({ action: 'listAdd', ...action.payload });

const requestAddToQueue = (action: QueueRequestAddAction): void =>
  webSocket.send({ ...action.payload, action: 'queueAdd' });

function* listManagement(): Generator<
  TakeEffect | CallEffect | AllEffect<ForkEffect>,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(requestGet);
  yield all([
    takeEvery(LIST_REQUEST_ADD, requestAdd),
    takeEvery(QUEUE_REQUEST_ADD, requestAddToQueue),
  ]);
}

export default listManagement;
