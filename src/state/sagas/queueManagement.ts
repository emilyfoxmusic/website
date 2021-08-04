import {
  CallEffect,
  call,
  TakeEffect,
  ForkEffect,
  take,
  takeEvery,
  all,
  AllEffect,
  put,
  PutEffect,
} from 'redux-saga/effects';

import {
  QueueRequestBumpAction,
  QueueRequestCancelAction,
  QueueRequestPlayedAction,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_GET,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';
import { WS_SEND } from 'state/websocket/actions';

function* requestGet(): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { action: 'queueGet' } });
}

function* requestBump(
  action: QueueRequestBumpAction
): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { ...action.payload, action: 'queueBump' } });
}

function* requestCancel(
  action: QueueRequestCancelAction
): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { ...action.payload, action: 'queueCancel' } });
}

function* requestPlayed(
  action: QueueRequestPlayedAction
): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { ...action.payload, action: 'queuePlayed' } });
}

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
