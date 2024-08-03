import axios, { type CreateAxiosDefaults } from 'axios';

import {
  getAccessToken,
  removeFromStorage,
} from '@/src/services/auth/auth-token-service';
import { authService } from '@/src/services/auth/auth.service';
import { SERVER_URL } from '@/src/config/api.config';

import { errorCatch } from './error';

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config && config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.withCredentials = true;
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'User not authorized') &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage();
      }
    }
    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
