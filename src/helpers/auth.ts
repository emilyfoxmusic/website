import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

import apiClient from 'clients/apiClient';

import { Principal } from 'state/user/types';

const stateKey = 'AUTH_STATE';

export const buildTwitchRedirectUrl = (): string => {
  const state = uuidv4();
  sessionStorage.setItem(stateKey, state);
  return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.GATSBY_TWITCH_CLIENT_ID}&redirect_uri=${process.env.GATSBY_SITE_URL}/redirect/&response_type=code&scope=openid&claims={"id_token":{"preferred_username":null}}&state=${state}`;
};

type Token = {
  preferred_username: string;
  exp: number;
};

export const authorize = async (
  code: string,
  state: string
): Promise<Principal> => {
  const expectedState = sessionStorage.getItem(stateKey);

  if (state !== expectedState) {
    throw new Error('Authentication: state mismatch');
  }

  sessionStorage.removeItem(stateKey);
  const authResponse = await apiClient.authorize(code);
  const decodedToken = jwtDecode<Token>(authResponse.token);
  return {
    isAuthenticated: true,
    token: authResponse.token,
    isAdmin: authResponse.isAdmin,
    username: decodedToken.preferred_username,
    expiryTime: new Date(decodedToken.exp * 1000),
  };
};
