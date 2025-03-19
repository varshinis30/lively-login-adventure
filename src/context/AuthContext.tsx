
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import oktaAuth, { getAuthState, getUserInfo, loginWithRedirect, logout } from '@/lib/auth';

interface User {
  name?: string;
  email?: string;
  username?: string;
  sub?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Handle callback from Okta
        if (location.pathname === '/login/callback') {
          await oktaAuth.handleRedirectCallback();
          navigate('/video');
          return;
        }

        const authState = await getAuthState();
        
        if (authState.isAuthenticated) {
          const userInfo = await getUserInfo();
          setUser(userInfo);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          
          // Redirect to home if trying to access protected routes
          if (
            location.pathname === '/video' || 
            location.pathname === '/profile'
          ) {
            toast({
              title: "Authentication Required",
              description: "Please log in to access this page.",
              variant: "destructive",
            });
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  // Login handler
  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "There was a problem logging in with Okta.",
        variant: "destructive",
      });
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was a problem logging out.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
