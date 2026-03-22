import axios, { AxiosInstance } from 'axios';
import { requestInterceptor, requestErrorInterceptor } from './interceptors/requestInterceptor';
import { responseInterceptor, responseErrorInterceptor, setAuthCallbacks } from './interceptors/responseInterceptor';
import { TokenManager } from './interceptors/tokenManager';

/**
 * API Client Configuration
 *
 * Environment-based URLs:
 * - DEV:     https://dev-api.skfinance.com/v1
 * - STAGING: https://staging-api.skfinance.com/v1
 * - PROD:    https://api.skfinance.com/v1
 */
const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'https://dev-api.skfinance.com/v1'
    : 'https://api.skfinance.com/v1',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
};

let clientInstance: AxiosInstance | null = null;

/**
 * Create and configure the Axios instance
 * Called once during app initialization
 */
export const createApiClient = (config?: {
  baseURL?: string;
  onSessionExpired?: () => void;
  onAccountLocked?: () => void;
}): AxiosInstance => {
  const client = axios.create({
    baseURL: config?.baseURL || API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor (attach token, device ID, etc.)
  client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

  // Response interceptor (handle 401, retry, error mapping)
  client.interceptors.response.use(
    responseInterceptor,
    (error) => responseErrorInterceptor(
      error,
      client,
      // Token refresh function — calls the auth refresh endpoint
      async () => {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');
        const res = await axios.post(`${config?.baseURL || API_CONFIG.BASE_URL}/auth/refresh`, { refreshToken });
        return res.data.data;
      },
    ),
  );

  // Set auth callbacks for session/lock handling
  setAuthCallbacks({
    onSessionExpired: config?.onSessionExpired,
    onAccountLocked: config?.onAccountLocked,
  });

  clientInstance = client;
  return client;
};

/**
 * Get the existing API client instance
 * Throws if not initialized (call createApiClient first)
 */
export const getApiClient = (): AxiosInstance => {
  if (!clientInstance) {
    throw new Error('[Network] API client not initialized. Call createApiClient() in App.tsx first.');
  }
  return clientInstance;
};
