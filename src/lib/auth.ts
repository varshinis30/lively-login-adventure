
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { AuthState } from '@okta/okta-auth-js';

// Okta configuration
const oktaAuth = new OktaAuth({
  issuer: `https://cdw-oie.oktapreview.com/oauth2/default`,
  clientId: '0oakfraa1hdPlNx8H1d7',
  redirectUri: window.location.origin + '/login/callback',
  pkce: true,
  scopes: ['openid', 'profile', 'email'],
  transformAuthState: async (oktaAuth, authState) => {
    if (!authState.isAuthenticated) {
      return authState;
    }
    
    return authState;
  },
});

// Get user info from Okta
export const getUserInfo = async () => {
  try {
    const user = await oktaAuth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

// Login with Okta
export const loginWithRedirect = async () => {
  try {
    await oktaAuth.signInWithRedirect();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout from Okta
export const logout = async () => {
  try {
    await oktaAuth.signOut();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Get auth state
export const getAuthState = async (): Promise<AuthState> => {
  return await oktaAuth.authStateManager.getAuthState();
};

// Handle authentication callback
export const handleAuthentication = async () => {
  try {
    await oktaAuth.handleRedirectCallback();
    return true;
  } catch (error) {
    console.error('Error handling authentication callback:', error);
    return false;
  }
};

export default oktaAuth;
