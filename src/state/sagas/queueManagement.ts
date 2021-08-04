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
  QueueAddAction,
  QueueBumpAction,
  QueueRemoveAction,
  QueueRequestAddAction,
  QueueRequestBumpAction,
  QueueRequestCancelAction,
  QueueRequestPlayedAction,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_REMOVE,
  QUEUE_REQUEST_ADD,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_GET,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';

const requestGet = (): void => webSocket.send({ action: 'queueGet' });

const requestAdd = (action: QueueRequestAddAction): void =>
  webSocket.send({ ...action.payload, action: 'queueAdd' });

const notifyAdd = (action: QueueAddAction): unknown =>
  toast.dark(
    `Someone requested ${action.payload.title} by ${action.payload.artist}!`
  );

const requestBump = (action: QueueRequestBumpAction): void =>
  webSocket.send({ ...action.payload, action: 'queueBump' });

const notifyBump = (action: QueueBumpAction): unknown =>
  toast.dark(
    `TODO SONG has been bumped to position ${action.payload.priority}`
  );

const requestCancel = (action: QueueRequestCancelAction): void =>
  webSocket.send({ ...action.payload, action: 'queueRemove' });

const requestPlayed = (action: QueueRequestPlayedAction): void =>
  webSocket.send({
    ...action.payload,
    action: 'queueRemove',
    songPlayed: true,
  });

const notifyRemove = (action: QueueRemoveAction): unknown =>
  toast.dark(
    action.payload.songPlayed
      ? 'TODO SONG was just played and removed from the queue'
      : 'TODO SONG has been removed from the queue'
  );

function* queueManagement(): Generator<
  TakeEffect | CallEffect | AllEffect<ForkEffect>,
  void,
  never
> {
  yield take(QUEUE_REQUEST_GET);
  yield call(requestGet);
  yield all([
    takeEvery(QUEUE_REQUEST_ADD, requestAdd),
    takeEvery(QUEUE_ADD, notifyAdd),
    takeEvery(QUEUE_REQUEST_BUMP, requestBump),
    takeEvery(QUEUE_BUMP, notifyBump),
    takeEvery(QUEUE_REQUEST_CANCEL, requestCancel),
    takeEvery(QUEUE_REQUEST_PLAYED, requestPlayed),
    takeEvery(QUEUE_REMOVE, notifyRemove),
  ]);
}

export default queueManagement;
