
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserClaims } from '@okta/okta-auth-js';
import oktaAuth, { login as oktaLogin, logout as oktaLogout, isAuthenticated as checkAuth, getUserInfo, handleAuthCallback } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserClaims | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserClaims | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Handle callback if on callback route
        if (location.pathname === '/login/callback') {
          await handleAuthCallback();
          navigate('/video');
        }

        const authenticated = await checkAuth();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const userInfo = await getUserInfo();
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [navigate, location.pathname]);

  const login = async () => {
    setIsLoading(true);
    try {
      await oktaLogin();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await oktaLogout();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
