
import { OktaAuth, OktaAuthOptions, UserClaims } from '@okta/okta-auth-js';

const OKTA_DOMAIN = 'cdw-oie.oktapreview.com';
const OKTA_CLIENT_ID = '0oakfraa1hdPlNx8H1d7';
// Using protocol-relative URL to ensure the correct protocol is used
const REDIRECT_URI = `${window.location.origin}/login/callback`;

export const oktaAuthConfig: OktaAuthOptions = {
  issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
  clientId: OKTA_CLIENT_ID,
  redirectUri: REDIRECT_URI,
  pkce: true,
  scopes: ['openid', 'profile', 'email'],
  tokenManager: {
    storage: 'localStorage',
    autoRenew: true,
  },
  cookies: {
    secure: true,
    sameSite: 'none',
  },
  // Ensure we're not reusing an existing auth state
  transformAuthState: async (oktaAuth, authState) => {
    if (!authState.isAuthenticated) {
      return authState;
    }
    return authState;
  }
};

const oktaAuth = new OktaAuth(oktaAuthConfig);

export const login = async () => {
  try {
    // Clear any existing transactions before starting a new one
    oktaAuth.tokenManager.clear();
    await oktaAuth.signInWithRedirect({
      originalUri: '/',
    });
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const authState = await oktaAuth.isAuthenticated();
    return authState;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const handleAuthCallback = async () => {
  try {
    if (window.location.pathname.includes('/login/callback')) {
      // Parse the tokens from the URL
      const tokens = await oktaAuth.token.parseFromUrl();
      oktaAuth.tokenManager.setTokens(tokens.tokens);
      
      return tokens;
    }
    return null;
  } catch (error) {
    console.error('Error handling redirect callback:', error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserClaims | null> => {
  try {
    if (await isAuthenticated()) {
      const user = await oktaAuth.getUser();
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

export default oktaAuth;
