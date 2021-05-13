import Axios, { AxiosInstance } from 'axios';
import { useAuth } from 'hooks';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL;

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
    newConfig.headers.Authorization = useAuth();
    return newConfig;
  },
  (error) => Promise.reject(error)
);
