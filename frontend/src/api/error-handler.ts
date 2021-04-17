import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface CustomError {
  error?: string;
}

export const errorHandler = (errorInstance: AxiosError<CustomError>) => {
  const { response, message } = errorInstance;

  // TODO: Maybe in the future we can integrate the app with
  // some tool to keep track of errors and notify the devs
  if (response && response.data && response.data.error) {
    const { error } = response.data;
    createErrorToast(error);
  } else if (message) {
    createErrorToast(message);
  } else {
    createErrorToast('Opss... something went wrong');
  }
};

const createErrorToast = (message: string) => toast(message, {
  position: 'top-right',
  type: 'error',
  pauseOnHover: false,
});
