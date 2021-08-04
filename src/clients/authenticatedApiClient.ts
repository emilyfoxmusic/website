import axios, { AxiosRequestConfig } from 'axios';

import { QueueItem } from 'state/queue/types';
import { ListItem } from 'state/songlist/types';
import { AuthenticatedPrincipal, Principal } from 'state/user/types';

type AuthenticatedClientFactory = (user: Principal) => AuthenticatedClient;

type QueueItemUpdate = Omit<QueueItem, 'requestedBy'>;

export type AuthenticatedClient = {
  listAdd: (title: string, artist: string) => Promise<ListItem>;
  queueAdd: (songId: string) => Promise<QueueItemUpdate>;
  queueBump: (songId: string, toPosition: number) => Promise<QueueItemUpdate>;
  queueCancel: (songId: string) => Promise<void>;
  queuePlayed: (songId: string) => Promise<void>;
  statusUpdate: (requestsOpen: boolean) => Promise<void>;
};

const buildConfig = (user: AuthenticatedPrincipal): AxiosRequestConfig => ({
  baseURL: process.env.GATSBY_API_URL,
  headers: { Authorization: user.token },
});

const authenticatedApiClient: AuthenticatedClientFactory = (
  user: Principal
) => {
  if (!user.isAuthenticated) {
    throw new Error('User is not authenticated');
  }
  const config = buildConfig(user);
  return {
    listAdd: (title, artist) =>
      axios.post('/list', { title, artist }, config).then(res => res.data),
    queueAdd: (songId: string) =>
      axios.post(`/queue/${songId}`, {}, config).then(res => res.data),
    queueBump: (songId: string, toPosition: number) =>
      axios
        .patch(`/queue/${songId}/bump`, { toPosition }, config)
        .then(res => res.data),
    queueCancel: (songId: string) => axios.delete(`/queue/${songId}`, config),
    queuePlayed: (songId: string) =>
      axios.patch(`/queue/${songId}/played`, {}, config),
    statusUpdate: (requestsOpen: boolean) =>
      axios.post('/status', { requestsOpen }, config),
  };
};

export default authenticatedApiClient;
