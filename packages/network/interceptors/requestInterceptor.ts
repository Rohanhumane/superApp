import { InternalAxiosRequestConfig } from 'axios';
import { TokenManager } from './tokenManager';

/**
 * Request Interceptor
 *
 * Attaches to every outgoing request:
 * 1. Authorization Bearer token
 * 2. Device ID for device binding
 * 3. Unique request ID for tracing
 * 4. App version header
 * 5. Platform header
 */

let deviceId = 'device_' + Math.random().toString(36).slice(2, 11);

export const setDeviceId = (id: string) => { deviceId = id; };

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Attach auth token
  const token = TokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Attach device + tracing headers
  config.headers['X-Device-Id'] = deviceId;
  config.headers['X-Request-Id'] = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  config.headers['X-Platform'] = 'android'; // TODO: Platform.OS
  config.headers['X-App-Version'] = '1.0';

  // Log in dev
  if (__DEV__) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
};

export const requestErrorInterceptor = (error: any) => {
  if (__DEV__) {
    console.error('[API] Request setup error:', error.message);
  }
  return Promise.reject(error);
};
