import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { errorHandler } from 'api/error-handler';
import { httpClient } from 'api';
import { AuthService } from 'api/services';
import { User, UserLogin } from 'api/models/user';
import { toast } from 'react-toastify';

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: UserLogin) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const authService = new AuthService(httpClient);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = useCallback(async (data: UserLogin) => {
    try {
      setLoading(true);
      const response = await authService.authenticate(data);

      if (response) {
        const { authorization } = response.headers;

        toast(`Welcome ${response.data.email}`, {
          position: 'top-right',
          type: 'success',
          pauseOnHover: false,
        });

        router.replace('/main');

        httpClient.defaults.headers.Authorization = authorization;

        setLoading(false);
        setUser(response.data);
        setToken(authorization);
        localStorage.setItem('token', JSON.stringify(authorization));
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const checkToken = useCallback(() => {
    setLoading(true);

    const storedToken = localStorage.getItem('token');
    setLoading(false);

    if (!storedToken) {
      router.replace('/login');
    } else {
      setToken(storedToken);
    }
  }, [router, setToken]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
