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
    notifyError('Currently unable to fetch the requests status', error);
  }
}

const requestStatusUpdate = (
  action: StatusRequestUpdateAction
): AuthenticatedActionGenerator =>
  requestAuthenticatedAction(
    client => client.statusUpdate,
    action.payload.requestsOpen
  );

function* requestStatusSaga(): Generator<
  TakeEffect | CallEffect | ForkEffect,
  void,
  never
> {
  yield take(STATUS_REQUEST_GET);
  yield call(requestGet);
  yield takeEvery(STATUS_REQUEST_UPDATE, requestStatusUpdate);
}

export default requestStatusSaga;
