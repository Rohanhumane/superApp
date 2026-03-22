import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = 'guest' | 'etb' | 'ntb' | 'lead';
export type AuthStatus = 'idle' | 'otp_sent' | 'otp_verified' | 'mpin_set' | 'authenticated' | 'locked' | 'session_expired';

interface AuthState {
  status: AuthStatus;
  userType: UserType;
  isFirstTimeSetup: boolean;
  hasCompletedSetup: boolean;
  mobileNumber: string;
  maskedMobile: string;
  accessToken: string | null;
  refreshToken: string | null;
  mpinAttempts: number;
  lockoutUntil: number | null;
  biometricEnabled: boolean;
  sessionExpiry: number | null;
  currentMPIN: string;
}

const init: AuthState = {
  status: 'idle', userType: 'guest', isFirstTimeSetup: true, hasCompletedSetup: false,
  mobileNumber: '', maskedMobile: '', accessToken: null, refreshToken: null,
  mpinAttempts: 0, lockoutUntil: null, biometricEnabled: false, sessionExpiry: null,
  currentMPIN: '',
};

const SESSION_MS = 5 * 60 * 1000;
const LOCKOUT_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 3;

const slice = createSlice({
  name: 'auth', initialState: init,
  reducers: {
    setMobileNumber(s, a: PayloadAction<string>) { s.mobileNumber = a.payload; s.maskedMobile = 'xxx' + a.payload.slice(-4); },
    setOTPSent(s) { s.status = 'otp_sent'; },
    setOTPVerified(s, a: PayloadAction<{ userType: UserType }>) { s.status = 'otp_verified'; s.userType = a.payload.userType; },
    setMPINCreated(s) { s.status = 'mpin_set'; },
    setCurrentMPIN(s, a: PayloadAction<string>) { s.currentMPIN = a.payload; },
    setAuthenticated(s, a: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      s.status = 'authenticated'; s.accessToken = a.payload.accessToken; s.refreshToken = a.payload.refreshToken;
      s.hasCompletedSetup = true; s.isFirstTimeSetup = false; s.mpinAttempts = 0; s.lockoutUntil = null;
      s.sessionExpiry = Date.now() + SESSION_MS;
    },
    refreshSession(s) { s.sessionExpiry = Date.now() + SESSION_MS; },
    incrementMPINAttempts(s) {
      s.mpinAttempts++;
      if (s.mpinAttempts >= MAX_ATTEMPTS) { s.status = 'locked'; s.lockoutUntil = Date.now() + LOCKOUT_MS; }
    },
    resetMPINAttempts(s) { s.mpinAttempts = 0; s.lockoutUntil = null; s.status = 'idle'; },
    setSessionExpired(s) { s.status = 'session_expired'; s.accessToken = null; s.sessionExpiry = null; },
    setBiometricEnabled(s, a: PayloadAction<boolean>) { s.biometricEnabled = a.payload; },
    logout() { return init; },
    fullReset() { return init; },
  },
});

export const {
  setMobileNumber, setOTPSent, setOTPVerified, setMPINCreated, setCurrentMPIN,
  setAuthenticated, refreshSession, incrementMPINAttempts, resetMPINAttempts,
  setSessionExpired, setBiometricEnabled, logout, fullReset,
} = slice.actions;
export default slice.reducer;