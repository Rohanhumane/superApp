import { getApiClient } from '../client';
import { TokenManager } from '../interceptors/tokenManager';
import type { ApiResponse, SendOTPRequest, SendOTPResponse, VerifyOTPRequest, VerifyOTPResponse, SetMPINRequest, VerifyMPINRequest } from '../types';

export const AuthService = {
  /** Send OTP to mobile number */
  sendOTP: async (req: SendOTPRequest): Promise<ApiResponse<SendOTPResponse>> => {
    return getApiClient().post('/auth/otp/send', req);
  },

  /** Verify OTP and get tokens */
  verifyOTP: async (req: VerifyOTPRequest): Promise<ApiResponse<VerifyOTPResponse>> => {
    const res = await getApiClient().post('/auth/otp/verify', req);
    // Auto-store tokens on successful verify
    if (res.success && res.data) {
      TokenManager.setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res;
  },

  /** Set MPIN for first time */
  setMPIN: async (req: SetMPINRequest): Promise<ApiResponse<void>> => {
    return getApiClient().post('/auth/mpin/set', req);
  },

  /** Verify MPIN for login */
  verifyMPIN: async (req: VerifyMPINRequest): Promise<ApiResponse<VerifyOTPResponse>> => {
    const res = await getApiClient().post('/auth/mpin/verify', req);
    if (res.success && res.data) {
      TokenManager.setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res;
  },

  /** Reset MPIN after OTP verification */
  resetMPIN: async (req: SetMPINRequest): Promise<ApiResponse<void>> => {
    return getApiClient().post('/auth/mpin/reset', req);
  },

  /** Logout — clear tokens */
  logout: async (): Promise<void> => {
    try {
      await getApiClient().post('/auth/logout');
    } catch (_) {
      // Ignore logout API failure — clear tokens anyway
    }
    TokenManager.clearTokens();
  },
};
