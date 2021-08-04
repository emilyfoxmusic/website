import {
  CallEffect,
  call,
  TakeEffect,
  ForkEffect,
  take,
  takeEvery,
  PutEffect,
  put,
} from 'redux-saga/effects';

import { QueueRequestAddAction, QUEUE_REQUEST_ADD } from 'state/queue/actions';
import {
  ListRequestAddAction,
  LIST_REQUEST_GET,
  LIST_REQUEST_ADD,
} from 'state/songlist/actions';
import { WS_SEND } from 'state/websocket/actions';

function* requestGet(): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { action: 'listGet' } });
}

function* sendWebsocketMessage(
  wsActionType: string,
  action: QueueRequestAddAction | ListRequestAddAction
): Generator<PutEffect, void, never> {
  yield put({
    type: WS_SEND,
    payload: { ...action.payload, action: wsActionType },
  });
}

function* listManagementSaga(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(requestGet);
  yield takeEvery(LIST_REQUEST_ADD, sendWebsocketMessage, 'listAdd');
  yield takeEvery(QUEUE_REQUEST_ADD, sendWebsocketMessage, 'queueAdd');
}

export default listManagementSaga;
