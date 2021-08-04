import {
  call,
  CallEffect,
  ForkEffect,
  take,
  TakeEffect,
  takeEvery,
} from 'redux-saga/effects';

import {
  ListRequestAddAction,
  LIST_REQUEST_ADD,
  LIST_REQUEST_GET,
} from './songlist/actions';
import { ws } from './websocketListenerSaga';

function* listRequestAdd(
  action: ListRequestAddAction
): Generator<CallEffect, void, never> {
  yield call(
    ws.send,
    JSON.stringify({
      action: 'listAdd',
      ...action.payload,
    })
  );
}

const method = (): void => {
  console.info('Sending to:', ws);
  ws.send(
    JSON.stringify({
      action: 'listGet',
    })
  );
};

function* websocketListRequestSaga(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  // eslint-disable-next-line no-console
  console.info('this is the socket', ws);
  yield call(method);
  yield takeEvery(LIST_REQUEST_ADD, listRequestAdd);
}

export default websocketListRequestSaga;
