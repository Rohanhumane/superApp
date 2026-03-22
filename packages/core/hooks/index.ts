import { useEffect, useRef, useState, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { refreshSession, setSessionExpired } from '../store/slices/authSlice';

export const useAuth = () => {
  const auth = useAppSelector(s => s.auth);
  const user = useAppSelector(s => s.user.profile);
  return {
    isAuthenticated: auth.status === 'authenticated', isLocked: auth.status === 'locked',
    isExpired: auth.status === 'session_expired', isFirstTime: auth.isFirstTimeSetup,
    hasSetup: auth.hasCompletedSetup, userType: auth.userType, userName: user.fullName,
    maskedMobile: auth.maskedMobile, biometric: auth.biometricEnabled,
  };
};

export const useSessionMonitor = () => {
  const dispatch = useAppDispatch();
  const { status, sessionExpiry } = useAppSelector(s => s.auth);
  useEffect(() => {
    if (status !== 'authenticated') return;
    const t = setInterval(() => { if (sessionExpiry && Date.now() > sessionExpiry) dispatch(setSessionExpired()); }, 30000);
    return () => clearInterval(t);
  }, [status, sessionExpiry, dispatch]);
  return { recordActivity: useCallback(() => { if (status === 'authenticated') dispatch(refreshSession()); }, [status, dispatch]) };
};

export const useTimer = (initial: number) => {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setInterval(() => setSeconds(p => { if (p <= 1) { setRunning(false); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [running, seconds]);
  return { seconds, expired: seconds === 0, reset: (n?: number) => { setSeconds(n ?? initial); setRunning(true); } };
};
