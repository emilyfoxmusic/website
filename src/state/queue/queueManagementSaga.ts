import {
  CallEffect,
  call,
  ForkEffect,
  takeEvery,
  put,
  PutEffect,
} from 'redux-saga/effects';

import apiClient from 'api/apiClient';

import { notifyError } from 'helpers/notify';
import {
  AuthenticatedActionGenerator,
  requestAuthenticatedAction,
} from 'helpers/sagaActions';
import {
  QueueRequestBumpAction,
  QueueRequestCancelAction,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_GET,
  QUEUE_REQUEST_PLAYED,
  QUEUE_SET,
} from 'state/queue/actions';

function* requestGet(): Generator<CallEffect | PutEffect, void, never> {
  try {
    const queueItems = yield call(apiClient.queueGet);
    yield put({ type: QUEUE_SET, payload: queueItems });
  } catch (error) {
    notifyError('Currently unable to fetch the queue', error);
  }
}

const requestQueueBump = (
  action: QueueRequestBumpAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.queueBump,
    'Failed to bump song',
    action.payload.songId,
    action.payload.position
  );

const requestQueueCancel = (
  action: QueueRequestCancelAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.queueCancel,
    'Failed to cancel song',
    action.payload.songId
  );

const requestQueuePlayed = (
  action: QueueRequestCancelAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.queuePlayed,
    'Failed to mark song as played',
    action.payload.songId
  );

function* queueManagementSaga(): Generator<ForkEffect, void, never> {
  yield takeEvery(QUEUE_REQUEST_GET, requestGet);
  yield takeEvery(QUEUE_REQUEST_BUMP, requestQueueBump);
  yield takeEvery(QUEUE_REQUEST_CANCEL, requestQueueCancel);
  yield takeEvery(QUEUE_REQUEST_PLAYED, requestQueuePlayed);
}

export default queueManagementSaga;
