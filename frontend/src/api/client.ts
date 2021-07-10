import Axios, { AxiosInstance } from 'axios';
import { AUTH_COOKIE } from 'consts';
import { useAuth } from 'hooks';
import Router from 'next/router';
import nookies from 'nookies';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL;

const openEndpoints = ['/users/sign_in'];

/**
 * HTTP client
 */
export const httpClient: AxiosInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (requestConfig) => {
    const newConfig = requestConfig;

    if (!openEndpoints.includes(newConfig.url)) {
      newConfig.headers.Authorization = useAuth();
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response.status === 401) {
      nookies.destroy(undefined, AUTH_COOKIE);
      Router.push('/login');
    }

    return Promise.reject(error);
  }
);
