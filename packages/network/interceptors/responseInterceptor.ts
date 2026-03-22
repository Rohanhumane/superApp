import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { TokenManager } from './tokenManager';
import { ApiError } from '../types';

// Callbacks set by the app layer (Redux actions)
let onSessionExpired: (() => void) | null = null;
let onAccountLocked: (() => void) | null = null;

export const setAuthCallbacks = (callbacks: {
  onSessionExpired?: () => void;
  onAccountLocked?: () => void;
}) => {
  onSessionExpired = callbacks.onSessionExpired || null;
  onAccountLocked = callbacks.onAccountLocked || null;
};

// Queue of requests waiting for token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

/**
 * Response Success Interceptor
 * Unwraps API response envelope
 */
export const responseInterceptor = (response: AxiosResponse): any => {
  if (__DEV__) {
    console.log(`[API] ✓ ${response.status} ${response.config.url}`);
  }
  // If API returns { success, data, message } envelope, unwrap it
  if (response.data?.success !== undefined) {
    return response.data;
  }
  return response.data;
};

/**
 * Response Error Interceptor
 * Handles: 401 (token refresh), 403 (locked), 429 (rate limit), 5xx (retry)
 */
export const responseErrorInterceptor = async (
  error: AxiosError,
  axiosInstance: any, // passed from client setup
  refreshTokenFn: () => Promise<{ accessToken: string; refreshToken: string }>,
): Promise<any> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number };
  const status = error.response?.status;

  if (__DEV__) {
    console.error(`[API] ✗ ${status || 'NETWORK'} ${originalRequest?.url}`, error.message);
  }

  // === 401: Token expired → refresh and retry ===
  if (status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    if (isRefreshing) {
      // Queue this request until refresh completes
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const newToken = await TokenManager.refreshAccessToken(refreshTokenFn);
      if (newToken) {
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        processQueue(new Error('Refresh failed'), null);
        onSessionExpired?.();
        return Promise.reject(mapError(error));
      }
    } catch (refreshError) {
      processQueue(refreshError, null);
      onSessionExpired?.();
      return Promise.reject(mapError(error));
    } finally {
      isRefreshing = false;
    }
  }

  // === 403: Account locked ===
  if (status === 403) {
    onAccountLocked?.();
    return Promise.reject(mapError(error));
  }

  // === 429: Rate limited → wait and retry ===
  if (status === 429) {
    const retryAfter = parseInt(error.response?.headers?.['retry-after'] || '5', 10);
    await new Promise(r => setTimeout(r, retryAfter * 1000));
    return axiosInstance(originalRequest);
  }

  // === 5xx: Server error → retry with backoff (max 3) ===
  if (status && status >= 500 && (originalRequest._retryCount || 0) < 3) {
    originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
    const delay = 1000 * Math.pow(2, originalRequest._retryCount);
    await new Promise(r => setTimeout(r, delay));
    return axiosInstance(originalRequest);
  }

  // === Network error (no response) → retry once ===
  if (!error.response && !originalRequest._retry) {
    originalRequest._retry = true;
    await new Promise(r => setTimeout(r, 2000));
    return axiosInstance(originalRequest);
  }

  return Promise.reject(mapError(error));
};

/**
 * Map Axios error to clean ApiError
 */
const mapError = (error: AxiosError): ApiError => {
  if (!error.response) {
    return {
      status: 0,
      message: 'Network error. Please check your internet connection.',
      errorCode: 'NETWORK_ERROR',
    };
  }

  const data = error.response.data as any;
  return {
    status: error.response.status,
    message: data?.message || getDefaultMessage(error.response.status),
    errorCode: data?.errorCode || `HTTP_${error.response.status}`,
    details: data?.details,
  };
};

const getDefaultMessage = (status: number): string => {
  switch (status) {
    case 400: return 'Invalid request. Please check your input.';
    case 401: return 'Session expired. Please login again.';
    case 403: return 'Access denied.';
    case 404: return 'Resource not found.';
    case 429: return 'Too many requests. Please wait.';
    case 500: return 'Server error. Please try again later.';
    default: return 'Something went wrong.';
  }
};
