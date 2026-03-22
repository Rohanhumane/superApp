/**
 * Token Manager
 *
 * Handles token storage, retrieval, and refresh logic.
 * In production: replace AsyncStorage with react-native-keychain
 * for secure encrypted storage of tokens.
 */

type TokenListener = (token: string | null) => void;

class TokenManagerClass {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private listeners: TokenListener[] = [];
  private refreshPromise: Promise<string | null> | null = null;

  // Get current access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  // Set tokens after login/refresh
  setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.notifyListeners(access);
  }

  // Clear tokens on logout
  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.notifyListeners(null);
  }

  // Check if user has valid token
  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  // Subscribe to token changes (used by Redux middleware)
  onTokenChange(listener: TokenListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Refresh token with deduplication
  // Multiple 401s won't trigger multiple refresh calls
  async refreshAccessToken(refreshFn: () => Promise<{ accessToken: string; refreshToken: string }>): Promise<string | null> {
    // If already refreshing, wait for existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        if (!this.refreshToken) {
          throw new Error('No refresh token');
        }
        const result = await refreshFn();
        this.setTokens(result.accessToken, result.refreshToken);
        return result.accessToken;
      } catch (error) {
        this.clearTokens();
        return null;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private notifyListeners(token: string | null): void {
    this.listeners.forEach(l => l(token));
  }
}

export const TokenManager = new TokenManagerClass();
