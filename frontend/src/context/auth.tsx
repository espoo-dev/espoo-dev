import React, { createContext, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { errorHandler } from 'api/error-handler';
import { httpClient } from 'api';
import { AuthService } from 'api/services';
import { User, UserCreate, UserLogin } from 'api/models/user';
import { toast } from 'react-toastify';

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  checkToken: () => Promise<boolean>;
  login: (data: UserLogin) => void;
  logout: () => void;
  register: (data: UserCreate) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const authService = new AuthService(httpClient);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async (data: UserLogin) => {
    setLoading(true);
    const response = await authService.authenticate(data);
    setLoading(false);

    if (response) {
      const { authorization } = response.headers;

      toast(`Welcome ${response.data.email}`, {
        position: 'top-right',
        type: 'success',
        pauseOnHover: false,
      });

      router.replace('/main');

      httpClient.defaults.headers.Authorization = authorization;

      setUser(response.data);
      setToken(authorization);
      localStorage.setItem('token', authorization);
    }
  }, []);

  const register = useCallback(async (data: UserCreate) => {
    setLoading(true);
    const response = await authService.register(data);
    setLoading(false);

    if (response) {
      toast('Successfully registered, now you can log in', {
        position: 'top-right',
        type: 'success',
        pauseOnHover: false,
      });

      router.replace('/login');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const checkToken = async () => {
    const checking = new Promise<boolean>((resolve) => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        router.replace('/login');
        resolve(true);
      } else {
        setToken(storedToken);
        resolve(false);
      }
    });

    return checking;
  };

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
