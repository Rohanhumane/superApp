import { getApiClient } from '../client';
import type { ApiResponse, UserProfile, UpdateMobileRequest, UpdateEmailRequest, UpdateAddressRequest } from '../types';

export const ProfileService = {
  /** Get user profile */
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    return getApiClient().get('/user/profile');
  },

  /** Update mobile number (after OTP) */
  updateMobile: async (req: UpdateMobileRequest): Promise<ApiResponse<void>> => {
    return getApiClient().put('/user/mobile', req);
  },

  /** Send OTP for mobile/email update */
  sendVerificationOTP: async (type: 'mobile' | 'email', value: string): Promise<ApiResponse<{ requestId: string }>> => {
    return getApiClient().post('/user/verify/send', { type, value });
  },

  /** Update email (after OTP) */
  updateEmail: async (req: UpdateEmailRequest): Promise<ApiResponse<void>> => {
    return getApiClient().put('/user/email', req);
  },

  /** Update address */
  updateAddress: async (req: UpdateAddressRequest): Promise<ApiResponse<void>> => {
    return getApiClient().put('/user/address', req);
  },

  /** Update language preference */
  updateLanguage: async (language: string): Promise<ApiResponse<void>> => {
    return getApiClient().put('/user/language', { language });
  },

  /** Upload profile photo */
  uploadPhoto: async (photoUri: string): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('photo', { uri: photoUri, type: 'image/jpeg', name: 'profile.jpg' } as any);
    return getApiClient().post('/user/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /** Submit referral */
  submitReferral: async (data: { name: string; contact: string; loanType: string }): Promise<ApiResponse<void>> => {
    return getApiClient().post('/user/referral', data);
  },
};
