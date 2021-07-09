import React, { createContext, useCallback, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { httpClient } from 'api';
import { AuthService } from 'api/services';
import { User, UserCreate, UserLogin } from 'api/models/user';
import { toast } from 'react-toastify';
import { AUTH_COOKIE } from 'consts';

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  checkToken: () => Promise<boolean>;
  login: (data: UserLogin) => void;
  logout: () => void;
  register: (data: UserCreate) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const authService: AuthService = new AuthService(httpClient);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(null);
  const [loading, setLoading] = useState(false);

  // ------- Auth methods -------
  const login = useCallback(async ({ email, password }: UserLogin) => {
    setLoading(true);
    const response = await authService.authenticate({
      email,
      password,
    });
    setLoading(false);

    if (response) {
      const { data } = response;
      const { authorization } = response.headers;

      toast(`Welcome ${data.email}`, {
        position: 'top-right',
        type: 'success',
        pauseOnHover: false,
      });

      // saving authorization token on cookies
      setCookie(undefined, AUTH_COOKIE, authorization, {
        sameSite: true,
        maxAge: 60 * 60, // 1h
      });

      // setting authorization token on headers
      httpClient.defaults.headers.Authorization = authorization;

      Router.push('/main');
      setUser(data);
      setToken(authorization);
    }
  }, []);

  const register = useCallback(
    async ({ email, password, role_id }: UserCreate) => {
      setLoading(true);
      const response = await authService.register({ email, password, role_id });
      setLoading(false);

      if (response) {
        toast('Successfully registered, now you can log in', {
          position: 'top-right',
          type: 'success',
          pauseOnHover: false,
        });

        Router.push('/login');
      }
    },
    []
  );

  const logout = useCallback(() => {
    destroyCookie(undefined, AUTH_COOKIE);
    setToken(null);
    setUser(null);
  }, []);

  const checkToken = async () => {
    const checking = new Promise<boolean>((resolve) => {
      const cookies = parseCookies();
      const storedToken = cookies[AUTH_COOKIE];

      if (!storedToken) {
        Router.push('/login');
        resolve(true);
      } else {
        setToken(storedToken);
        resolve(false);
      }
    });

    return checking;
  };
  // ------- Auth methods -------

  return (
    <AuthContext.Provider
      value={{
        checkToken,
        isAuthenticated: !!token,
        user,
        login,
        loading,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
