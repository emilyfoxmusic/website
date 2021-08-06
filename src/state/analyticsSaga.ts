import { ForkEffect, takeEvery } from 'redux-saga/effects';

import { trackAction } from 'helpers/goatcounter';
import {
  QUEUE_REQUEST_ADD,
  QUEUE_REQUEST_BUMP,
  QUEUE_REQUEST_CANCEL,
  QUEUE_REQUEST_PLAYED,
} from 'state/queue/actions';
import { LIST_REQUEST_ADD } from 'state/songlist/actions';

import { STATUS_REQUEST_UPDATE } from './requestStatus/actions';

function* analyticsSaga(): Generator<ForkEffect, void, never> {
  yield takeEvery(LIST_REQUEST_ADD, trackAction, 'List add');
  yield takeEvery(QUEUE_REQUEST_ADD, trackAction, 'Queue add');
  yield takeEvery(QUEUE_REQUEST_BUMP, trackAction, 'Queue bump');
  yield takeEvery(QUEUE_REQUEST_CANCEL, trackAction, 'Queue cancel');
  yield takeEvery(QUEUE_REQUEST_PLAYED, trackAction, 'Queue played');
  yield takeEvery(STATUS_REQUEST_UPDATE, trackAction, 'Status updated');
}

export default analyticsSaga;
