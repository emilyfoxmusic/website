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
  QueueRequestBumpAction,
  QueueRequestCancelAction,
  QueueRequestPlayedAction,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_GET,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';

const requestGet = (): void => webSocket.send({ action: 'queueGet' });

const requestBump = (action: QueueRequestBumpAction): void =>
  webSocket.send({ ...action.payload, action: 'queueBump' });

const requestCancel = (action: QueueRequestCancelAction): void =>
  webSocket.send({ ...action.payload, action: 'queueCancel' });

const requestPlayed = (action: QueueRequestPlayedAction): void =>
  webSocket.send({
    ...action.payload,
    action: 'queuePlayed',
  });

function* queueManagement(): Generator<
  TakeEffect | CallEffect | AllEffect<ForkEffect>,
  void,
  never
> {
  yield take(QUEUE_REQUEST_GET);
  yield call(requestGet);
  yield all([
    takeEvery(QUEUE_REQUEST_BUMP, requestBump),
    takeEvery(QUEUE_REQUEST_CANCEL, requestCancel),
    takeEvery(QUEUE_REQUEST_PLAYED, requestPlayed),
  ]);
}

export default queueManagement;
