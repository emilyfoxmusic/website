import {
  CallEffect,
  call,
  ForkEffect,
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

import {
  StatusRequestUpdateAction,
  STATUS_REQUEST_GET,
  STATUS_REQUEST_UPDATE,
  STATUS_SET,
} from './actions';

function* requestGet(): Generator<CallEffect | PutEffect, void, never> {
  try {
    const status = yield call(apiClient.statusGet);
    yield put({ type: STATUS_SET, payload: status });
  } catch (error) {
    notifyError('Currently unable to fetch the request status', error);
  }
}

const requestStatusUpdate = (
  action: StatusRequestUpdateAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.statusUpdate,
    'Failed to update request status',
    action.payload.requestsOpen
  );

function* requestStatusSaga(): Generator<ForkEffect, void, never> {
  yield takeEvery(STATUS_REQUEST_GET, requestGet);
  yield takeEvery(STATUS_REQUEST_UPDATE, requestStatusUpdate);
}

export default requestStatusSaga;
