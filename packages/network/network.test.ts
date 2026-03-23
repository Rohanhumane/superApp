import { TokenManager } from './interceptors/tokenManager';

describe('@nbfc/network', () => {
  describe('TokenManager', () => {
    beforeEach(() => {
      TokenManager.clearTokens();
    });

    it('should start with no tokens', () => {
      expect(TokenManager.getAccessToken()).toBeNull();
      expect(TokenManager.getRefreshToken()).toBeNull();
      expect(TokenManager.isAuthenticated()).toBe(false);
    });

    it('should store and retrieve tokens', () => {
      TokenManager.setTokens('access_123', 'refresh_456');
      expect(TokenManager.getAccessToken()).toBe('access_123');
      expect(TokenManager.getRefreshToken()).toBe('refresh_456');
      expect(TokenManager.isAuthenticated()).toBe(true);
    });

    it('should clear tokens', () => {
      TokenManager.setTokens('access_123', 'refresh_456');
      TokenManager.clearTokens();
      expect(TokenManager.getAccessToken()).toBeNull();
      expect(TokenManager.getRefreshToken()).toBeNull();
      expect(TokenManager.isAuthenticated()).toBe(false);
    });

    it('should notify listeners on token change', () => {
      const listener = jest.fn();
      const unsub = TokenManager.onTokenChange(listener);

      TokenManager.setTokens('access_new', 'refresh_new');
      expect(listener).toHaveBeenCalledWith('access_new');

      TokenManager.clearTokens();
      expect(listener).toHaveBeenCalledWith(null);

      unsub();
      TokenManager.setTokens('access_after', 'refresh_after');
      expect(listener).toHaveBeenCalledTimes(2);
    });

    it('should deduplicate refresh calls', async () => {
      TokenManager.setTokens('old_access', 'old_refresh');
      let callCount = 0;
      const refreshFn = async () => {
        callCount++;
        return { accessToken: 'new_access', refreshToken: 'new_refresh' };
      };

      const [r1, r2] = await Promise.all([
        TokenManager.refreshAccessToken(refreshFn),
        TokenManager.refreshAccessToken(refreshFn),
      ]);

      expect(callCount).toBe(1);
      expect(r1).toBe('new_access');
      expect(r2).toBe('new_access');
    });

    it('should return null and clear tokens on refresh failure', async () => {
      TokenManager.setTokens('old_access', 'old_refresh');
      const refreshFn = async () => { throw new Error('refresh failed'); };

      const result = await TokenManager.refreshAccessToken(refreshFn);
      expect(result).toBeNull();
      expect(TokenManager.isAuthenticated()).toBe(false);
    });

    it('should return null when no refresh token exists', async () => {
      const refreshFn = jest.fn();
      const result = await TokenManager.refreshAccessToken(refreshFn);
      expect(result).toBeNull();
      expect(refreshFn).not.toHaveBeenCalled();
    });
  });
});
