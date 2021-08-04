import axios, { AxiosRequestConfig } from 'axios';

import { QueueItem } from 'state/queue/types';
import { RequestStatus } from 'state/requestStatus/types';
import { ListItem } from 'state/songlist/types';

type AuthorizeResponse = {
  token: string;
  isAdmin: boolean;
};

type ListGetResponse = ListItem[];
type QueueGetResponse = QueueItem[];

type ApiClient = {
  authorize: (code: string) => Promise<AuthorizeResponse>;
  listGet: () => Promise<ListGetResponse>;
  queueGet: () => Promise<QueueGetResponse>;
  statusGet: () => Promise<RequestStatus>;
};

const config: AxiosRequestConfig = {
  baseURL: process.env.GATSBY_API_URL,
};

const apiClient: ApiClient = {
  authorize: code =>
    axios.get(`/authorize?code=${code}`, config).then(res => res.data),
  listGet: () => axios.get('/list', config).then(res => res.data),
  queueGet: () => axios.get('/queue', config).then(res => res.data),
  statusGet: () => axios.get('/status', config).then(res => res.data),
};

export default apiClient;
