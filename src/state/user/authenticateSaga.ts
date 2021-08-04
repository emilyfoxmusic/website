import { navigate } from 'gatsby';
import {
  put,
  PutEffect,
  takeEvery,
  ForkEffect,
  call,
  CallEffect,
} from 'redux-saga/effects';

import { authorize } from 'helpers/auth';
import { notifyError } from 'helpers/notify';
import {
  AUTHENTICATE,
  AuthenticateAction,
  AuthenticateRefreshAction,
  AUTHENTICATE_REFRESH,
  CLEAR_USER,
  SET_USER,
} from 'state/user/actions';

function* authenticate(
  action: AuthenticateAction | AuthenticateRefreshAction
): Generator<CallEffect | PutEffect, void, never> {
  try {
    const principal = yield call(
      authorize,
      action.payload.code,
      action.payload.state
    );
    yield put({ type: SET_USER, payload: principal });
  } catch (error) {
    notifyError('Sign in failed', error);
    yield put({ type: CLEAR_USER });
  } finally {
    // We don't redirect if we're refreshing since the twitch magic happened in an iframe
    if (action.type !== AUTHENTICATE_REFRESH) {
      yield call(url => navigate(url, { replace: true }), '/live/songlist/');
    }
  }
}

function* authSaga(): Generator<ForkEffect<never>, void, never> {
  yield takeEvery([AUTHENTICATE, AUTHENTICATE_REFRESH], authenticate);
}

export default authSaga;
