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

function* sendWebsocketMessage(
  wsActionType: string,
  action:
    | QueueRequestBumpAction
    | QueueRequestCancelAction
    | QueueRequestPlayedAction
): Generator<PutEffect, void, never> {
  yield put({
    type: WS_SEND,
    payload: { ...action.payload, action: wsActionType },
  });
}

function* queueManagementSaga(): Generator<
  TakeEffect | CallEffect | AllEffect<ForkEffect>,
  void,
  never
> {
  yield take(QUEUE_REQUEST_GET);
  yield call(requestGet);
  yield all([
    takeEvery(QUEUE_REQUEST_BUMP, sendWebsocketMessage, 'queueBump'),
    takeEvery(QUEUE_REQUEST_CANCEL, sendWebsocketMessage, 'queueCancel'),
    takeEvery(QUEUE_REQUEST_PLAYED, sendWebsocketMessage, 'queuePlayed'),
  ]);
}

export default queueManagementSaga;
