import Axios, { AxiosInstance } from "axios";
import { useAuth } from "hooks";
import { config } from "../config";

/**
 * HTTP client
 */
export const httpClient: AxiosInstance = Axios.create({
  baseURL: config.API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (value) => {
    value.headers.Authorization = useAuth();
    return value;
  },
  (error) => Promise.reject(error)
);
