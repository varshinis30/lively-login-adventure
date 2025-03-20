
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserClaims } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import oktaAuth, { login as oktaLogin, isAuthenticated as checkAuth, getUserInfo, handleAuthCallback } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const { oktaAuth: oktaAuthFromHook } = useOktaAuth();

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Clear any stale authentication state
        if (location.pathname !== '/login/callback') {
          // Only clear if not in callback to prevent disrupting the auth flow
          const existingTokens = await oktaAuth.tokenManager.getTokens();
          if (!existingTokens) {
            oktaAuth.tokenManager.clear();
          }
        }
        
        // Handle callback if on callback route
        if (location.pathname === '/login/callback') {
          await handleAuthCallback();
          navigate('/video');
          return; // Prevent further checks during callback processing
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
      console.log("Starting Okta login process...");
      await oktaLogin();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "We couldn't log you in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // First update local state
      setIsAuthenticated(false);
      setUser(null);
      
      // Use the useOktaAuth hook's signOut method
      await oktaAuthFromHook.signOut();
      
      // Show success toast
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      // Additional cleanup
      localStorage.removeItem('okta-token-storage');
      sessionStorage.clear();
      
      // Redirect to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout issue",
        description: "There was a problem logging you out. Please try again.",
        variant: "destructive",
      });
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
