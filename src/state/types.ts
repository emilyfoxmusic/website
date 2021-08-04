import { QueueAction } from './queue/actions';
import reducer from './reducer';
import { ListAction } from './songlist/actions';

export type RootState = ReturnType<typeof reducer>;
export type RootAction = ListAction | QueueAction;
