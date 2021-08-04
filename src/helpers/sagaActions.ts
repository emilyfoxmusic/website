import {
  CallEffect,
  PutEffect,
  SelectEffect,
  select,
  put,
  call,
} from 'redux-saga/effects';

import authenticatedApiClient, {
  AuthenticatedClient,
} from 'api/authenticatedApiClient';

import { RootState } from 'state/types';
import { CLEAR_USER } from 'state/user/actions';
import { Principal } from 'state/user/types';

import { notifyError } from './notify';

export type AuthenticatedActionGenerator = Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  never
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* requestAuthenticatedAction<Fn extends (...args: any[]) => any>(
  buildFn: (client: AuthenticatedClient) => Fn,
  errorMessage: string,
  ...params: Parameters<Fn>
): AuthenticatedActionGenerator {
  try {
    const user: Principal = yield select((state: RootState) => state.user);
    const client = authenticatedApiClient(user);
    yield call(buildFn(client), ...params);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put({ type: CLEAR_USER });
      notifyError('You must be signed in to do that', error);
    } else {
      notifyError(errorMessage, error);
    }
  }
}
