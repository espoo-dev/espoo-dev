import Axios, { AxiosInstance } from 'axios';
import { useAuth } from 'hooks';
import { config } from '../config';

/**
 * HTTP client
 */
export const httpClient: AxiosInstance = Axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (requestConfig) => {
    const newConfig = requestConfig;
    newConfig.headers.Authorization = useAuth();
    return newConfig;
  },
  (error) => Promise.reject(error)
);
