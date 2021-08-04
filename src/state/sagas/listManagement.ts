import {
  CallEffect,
  call,
  TakeEffect,
  ForkEffect,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { webSocket } from 'helpers/webSocketConnection';
import {
  ListRequestAddAction,
  LIST_REQUEST_GET,
  LIST_REQUEST_ADD,
} from 'state/songlist/actions';

const listRequestGet = (): void => webSocket.send({ action: 'listGet' });
const listRequestAdd = (payload: ListRequestAddAction['payload']): void =>
  webSocket.send({ action: 'listAdd', ...payload });

function* listAddHandler(
  action: ListRequestAddAction
): Generator<CallEffect, void, never> {
  yield call(listRequestAdd, action.payload);
}

function* listManagement(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(listRequestGet);
  yield takeEvery(LIST_REQUEST_ADD, listAddHandler);
}

export default listManagement;
