import { navigate } from 'gatsby';
import { ForkEffect, takeEvery, all, AllEffect } from 'redux-saga/effects';

import { notifyEvent } from 'helpers/notify';
import {
  QueueAddAction,
  QueueBumpAction,
  QueueCancelAction,
  QueueSetPlayedAction,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_CANCEL,
  QUEUE_PLAYED,
} from 'state/queue/actions';
import { ListAddAction, LIST_ADD } from 'state/songlist/actions';

const notifyListAdd = (action: ListAddAction): void =>
  notifyEvent(
    `${action.payload.title} by ${action.payload.artist} has been added to the songlist`,
    () => navigate('/live/songlist')
  );

const notifyQueueAdd = (action: QueueAddAction): void =>
  notifyEvent(
    `Someone requested ${action.payload.title} by ${action.payload.artist}!`,
    () => navigate('/live/queue')
  );

const notifyBump = (action: QueueBumpAction): void =>
  notifyEvent(
    `${action.payload.title} has been bumped to position ${action.payload.position}`,
    () => navigate('/live/queue')
  );

const notifyCancel = (action: QueueCancelAction): void =>
  notifyEvent(`${action.payload.title} has been removed from the queue`, () =>
    navigate('/live/queue')
  );

const notifyPlayed = (action: QueueSetPlayedAction): void =>
  notifyEvent(
    `${action.payload.title} was just played and removed from the queue`,
    () => navigate('/live/queue')
  );

function* notifications(): Generator<AllEffect<ForkEffect>, void, never> {
  yield all([
    takeEvery(LIST_ADD, notifyListAdd),
    takeEvery(QUEUE_ADD, notifyQueueAdd),
    takeEvery(QUEUE_BUMP, notifyBump),
    takeEvery(QUEUE_CANCEL, notifyCancel),
    takeEvery(QUEUE_PLAYED, notifyPlayed),
  ]);
}

export default notifications;
