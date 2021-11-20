import { AUTH_COOKIE } from 'consts';
import { parseCookies } from 'nookies';

export const useAuth = () => {
  const cookies = parseCookies();
  const token = cookies[AUTH_COOKIE];

  return token;
};
