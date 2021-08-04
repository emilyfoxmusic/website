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

import apiClient from 'api/apiClient';

import { notifyError } from 'helpers/notify';
import {
  AuthenticatedActionGenerator,
  requestAuthenticatedAction,
} from 'helpers/sagaActions';
import { QueueRequestAddAction, QUEUE_REQUEST_ADD } from 'state/queue/actions';
import {
  ListRequestAddAction,
  LIST_REQUEST_GET,
  LIST_REQUEST_ADD,
  LIST_SET,
} from 'state/songlist/actions';

function* requestGet(): Generator<CallEffect | PutEffect, void, never> {
  try {
    const listItems = yield call(apiClient.listGet);
    yield put({ type: LIST_SET, payload: listItems });
  } catch (error) {
    notifyError('Currently unable to fetch the songlist', error);
  }
}

const requestListAdd = (
  action: ListRequestAddAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.listAdd,
    action.payload.title,
    action.payload.artist
  );

const requestQueueAdd = (
  action: QueueRequestAddAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(client => client.queueAdd, action.payload.songId);

function* listManagementSaga(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(LIST_REQUEST_GET);
  yield call(requestGet);
  yield takeEvery(LIST_REQUEST_ADD, requestListAdd);
  yield takeEvery(QUEUE_REQUEST_ADD, requestQueueAdd);
}

export default listManagementSaga;
