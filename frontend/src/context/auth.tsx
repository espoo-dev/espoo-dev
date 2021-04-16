import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { errorHandler } from "api/error-handler";
import { httpClient } from "api";
import { AuthService } from "api/services";
import { User, UserLogin } from "api/models/user";
import { toast } from "react-toastify";

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
          position: "top-right",
          type: "success",
          pauseOnHover: false,
        });

        router.replace("/main");

        httpClient.defaults.headers.Authorization = authorization;
        setLoading(false);
        setUser(response.data);
        setToken(authorization);
        localStorage.setItem("token", JSON.stringify(authorization));
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const checkToken = useCallback(() => {
    setLoading(true);

    let storedToken = localStorage.getItem("token");

    if (storedToken) {
      setLoading(false);
    } else {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default function useAuth() {
//   const context = useContext(AuthContext);

//   return context;
// }
