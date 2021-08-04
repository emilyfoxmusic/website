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

function* requestAdd(
  action: ListRequestAddAction
): Generator<PutEffect, void, never> {
  console.info('request add');
  yield put({
    type: WS_SEND,
    payload: { ...action.payload, action: 'listAdd' },
  });
}

function* requestAddToQueue(
  action: QueueRequestAddAction
): Generator<PutEffect, void, never> {
  yield put({
    type: WS_SEND,
    payload: { ...action.payload, action: 'queueAdd' },
  });
}

function* listManagement(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(requestGet);
  yield takeEvery(LIST_REQUEST_ADD, requestAdd);
  yield takeEvery(QUEUE_REQUEST_ADD, requestAddToQueue);
}

export default listManagement;
