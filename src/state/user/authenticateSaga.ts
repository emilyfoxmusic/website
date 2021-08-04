import { navigate } from 'gatsby';
import {
  put,
  PutEffect,
  takeEvery,
  ForkEffect,
  call,
  CallEffect,
  select,
  SelectEffect,
} from 'redux-saga/effects';

import { authorize } from 'helpers/auth';
import { notifyError } from 'helpers/notify';
import { RootState } from 'state/types';
import {
  AUTHENTICATE,
  AuthenticateAction,
  AuthenticateRefreshAction,
  AUTHENTICATE_REFRESH,
  CLEAR_USER,
  LOAD_AUTHENTICATION,
  SET_USER,
} from 'state/user/actions';

import { AuthenticatedPrincipal, Principal } from './types';

const principalStorageKey = 'PRINCIPAL';

const getStoredPrincipal = (): AuthenticatedPrincipal => {
  const storedValue = localStorage.getItem(principalStorageKey);
  return storedValue ? JSON.parse(storedValue) : null;
};

const storePrincipal = (principal: AuthenticatedPrincipal): void =>
  localStorage.setItem(principalStorageKey, JSON.stringify(principal));

const clearPrincipal = (): void => localStorage.removeItem(principalStorageKey);

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
    yield call(storePrincipal, principal);
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

function* loadAuthentication(): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  never
> {
  const user = yield select((state: RootState) => state.user);
  console.info(user);
  if ((user as Principal).isAuthenticated) {
    console.info('nope');
    return;
  }
  const storedPrincipal = (yield call(
    getStoredPrincipal
  )) as AuthenticatedPrincipal;
  if (storedPrincipal) {
    if (new Date(storedPrincipal.expiryTime) > new Date()) {
      yield put({ type: SET_USER, payload: storedPrincipal });
    } else {
      yield call(clearPrincipal);
    }
  }
}

function* authSaga(): Generator<ForkEffect<never>, void, never> {
  yield takeEvery([AUTHENTICATE, AUTHENTICATE_REFRESH], authenticate);
  yield takeEvery([LOAD_AUTHENTICATION], loadAuthentication);
}

export default authSaga;
