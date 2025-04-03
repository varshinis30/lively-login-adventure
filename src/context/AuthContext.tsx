
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserClaims } from '@okta/okta-auth-js';
import oktaAuth, { login as oktaLogin, logout as oktaLogout, isAuthenticated as checkAuth, getUserInfo, handleAuthCallback } from '@/lib/auth';
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

  // Function to fully reset authentication state
  const resetAuthState = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

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
        resetAuthState();
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
      // First reset our internal state
      resetAuthState();
      
      // Then call the improved Okta logout function
      await oktaLogout();
      
      // Reload the page to ensure all Okta state is cleared
      window.location.href = '/';
      
      // Show success toast before reload
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout issue",
        description: "There was a problem logging you out. Please try again.",
        variant: "destructive",
      });
      // Even on error, we should redirect to home and force a page reload
      window.location.href = '/';
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
