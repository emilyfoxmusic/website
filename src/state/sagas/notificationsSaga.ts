import { toast } from 'react-toastify';
import { ForkEffect, takeEvery, all, AllEffect } from 'redux-saga/effects';

import {
  QueueAddAction,
  QueueBumpAction,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_CANCEL,
  QUEUE_PLAYED,
} from 'state/queue/actions';
import { ListAddAction, LIST_ADD } from 'state/songlist/actions';

const notifyListAdd = (action: ListAddAction): unknown =>
  toast.dark(
    `${action.payload.title} by ${action.payload.artist} has been added to the songlist`
  );

const notifyQueueAdd = (action: QueueAddAction): unknown =>
  toast.dark(
    `Someone requested ${action.payload.title} by ${action.payload.artist}!`
  );

const notifyBump = (action: QueueBumpAction): unknown =>
  toast.dark(
    `TODO SONG has been bumped to position ${action.payload.priority}`
  );

const notifyCancel = (): unknown =>
  toast.dark('TODO SONG has been removed from the queue');

const notifyPlayed = (): unknown =>
  toast.dark('TODO SONG was just played and removed from the queue');

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
