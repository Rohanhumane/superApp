import authReducer, {
  setMobileNumber, setOTPSent, setOTPVerified, setMPINCreated,
  setAuthenticated, incrementMPINAttempts, setSessionExpired, logout,
} from './authSlice';

describe('authSlice', () => {
  const initial = authReducer(undefined, { type: '' });

  it('has correct initial state', () => {
    expect(initial.status).toBe('idle');
    expect(initial.userType).toBe('guest');
    expect(initial.isFirstTimeSetup).toBe(true);
    expect(initial.accessToken).toBeNull();
  });

  it('sets mobile number and masks it', () => {
    const state = authReducer(initial, setMobileNumber('9876543210'));
    expect(state.mobileNumber).toBe('9876543210');
    expect(state.maskedMobile).toBe('xxx3210');
  });

  it('transitions through OTP flow', () => {
    let state = authReducer(initial, setOTPSent());
    expect(state.status).toBe('otp_sent');

    state = authReducer(state, setOTPVerified({ userType: 'etb' }));
    expect(state.status).toBe('otp_verified');
    expect(state.userType).toBe('etb');
  });

  it('sets MPIN created', () => {
    const state = authReducer(initial, setMPINCreated());
    expect(state.status).toBe('mpin_set');
  });

  it('authenticates user', () => {
    const state = authReducer(initial, setAuthenticated({ accessToken: 'tok', refreshToken: 'ref' }));
    expect(state.status).toBe('authenticated');
    expect(state.accessToken).toBe('tok');
    expect(state.hasCompletedSetup).toBe(true);
    expect(state.isFirstTimeSetup).toBe(false);
    expect(state.sessionExpiry).toBeGreaterThan(0);
  });

  it('locks after 3 failed MPIN attempts', () => {
    let state = initial;
    state = authReducer(state, incrementMPINAttempts());
    expect(state.mpinAttempts).toBe(1);
    state = authReducer(state, incrementMPINAttempts());
    expect(state.mpinAttempts).toBe(2);
    state = authReducer(state, incrementMPINAttempts());
    expect(state.status).toBe('locked');
    expect(state.lockoutUntil).toBeGreaterThan(0);
  });

  it('sets session expired', () => {
    const authed = authReducer(initial, setAuthenticated({ accessToken: 'tok', refreshToken: 'ref' }));
    const state = authReducer(authed, setSessionExpired());
    expect(state.status).toBe('session_expired');
    expect(state.accessToken).toBeNull();
  });

  it('logout preserves setup flags', () => {
    const authed = authReducer(initial, setAuthenticated({ accessToken: 'tok', refreshToken: 'ref' }));
    const state = authReducer(authed, logout());
    expect(state.status).toBe('idle');
    expect(state.accessToken).toBeNull();
    expect(state.hasCompletedSetup).toBe(true);
    expect(state.isFirstTimeSetup).toBe(false);
  });
});
