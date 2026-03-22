import { MPINTracker, SecureStorage, DataMasking, ScreenshotPrevention } from './index';

// ─── MPINTracker ───────────────────────────────────────────────────────────────

describe('MPINTracker', () => {
  beforeEach(() => {
    MPINTracker.reset();
  });

  it('first failed attempt returns locked=false with 2 left', () => {
    const result = MPINTracker.record();
    expect(result.locked).toBe(false);
    expect(result.left).toBe(2);
  });

  it('second failed attempt returns locked=false with 1 left', () => {
    MPINTracker.record();
    const result = MPINTracker.record();
    expect(result.locked).toBe(false);
    expect(result.left).toBe(1);
  });

  it('third failed attempt locks the tracker', () => {
    MPINTracker.record();
    MPINTracker.record();
    const result = MPINTracker.record();
    expect(result.locked).toBe(true);
    expect(result.left).toBe(0);
  });

  it('isLocked returns true after 3 failures', () => {
    MPINTracker.record();
    MPINTracker.record();
    MPINTracker.record();
    expect(MPINTracker.isLocked()).toBe(true);
  });

  it('isLocked returns false before max attempts', () => {
    MPINTracker.record();
    expect(MPINTracker.isLocked()).toBe(false);
  });

  it('record returns locked=true when already locked', () => {
    MPINTracker.record();
    MPINTracker.record();
    MPINTracker.record();
    const result = MPINTracker.record(); // 4th attempt while locked
    expect(result.locked).toBe(true);
    expect(result.left).toBe(0);
  });

  it('reset clears attempts and lock', () => {
    MPINTracker.record();
    MPINTracker.record();
    MPINTracker.record();
    MPINTracker.reset();
    expect(MPINTracker.isLocked()).toBe(false);
    const result = MPINTracker.record();
    expect(result.locked).toBe(false);
    expect(result.left).toBe(2);
  });

  it('isLocked returns false with no attempts', () => {
    expect(MPINTracker.isLocked()).toBe(false);
  });
});

// ─── SecureStorage ─────────────────────────────────────────────────────────────

describe('SecureStorage', () => {
  beforeEach(async () => {
    await SecureStorage.clear();
  });

  it('stores and retrieves a value', async () => {
    await SecureStorage.set('token', 'abc123');
    const val = await SecureStorage.get('token');
    expect(val).toBe('abc123');
  });

  it('returns null for missing key', async () => {
    const val = await SecureStorage.get('nonexistent');
    expect(val).toBeNull();
  });

  it('removes a key', async () => {
    await SecureStorage.set('key1', 'value1');
    await SecureStorage.remove('key1');
    const val = await SecureStorage.get('key1');
    expect(val).toBeNull();
  });

  it('clears all stored values', async () => {
    await SecureStorage.set('a', '1');
    await SecureStorage.set('b', '2');
    await SecureStorage.clear();
    expect(await SecureStorage.get('a')).toBeNull();
    expect(await SecureStorage.get('b')).toBeNull();
  });

  it('overwrites existing key on set', async () => {
    await SecureStorage.set('mpin', '1234');
    await SecureStorage.set('mpin', '9999');
    const val = await SecureStorage.get('mpin');
    expect(val).toBe('9999');
  });

  it('stores multiple keys independently', async () => {
    await SecureStorage.set('k1', 'v1');
    await SecureStorage.set('k2', 'v2');
    expect(await SecureStorage.get('k1')).toBe('v1');
    expect(await SecureStorage.get('k2')).toBe('v2');
  });
});

// ─── DataMasking ───────────────────────────────────────────────────────────────

describe('DataMasking', () => {
  describe('mobile', () => {
    it('masks all but last 4 digits of a 10-digit number', () => {
      expect(DataMasking.mobile('9876543210')).toBe('xxxxxx3210');
    });

    it('masks correctly for any 10-digit number', () => {
      expect(DataMasking.mobile('6000001234')).toBe('xxxxxx1234');
    });

    it('returns short strings as-is (less than 4 chars)', () => {
      expect(DataMasking.mobile('123')).toBe('123');
    });
  });

  describe('pan', () => {
    it('masks all but last 4 chars of a PAN', () => {
      expect(DataMasking.pan('ABCDE1234F')).toBe('xxxxxx234F');
    });

    it('returns short PAN as-is', () => {
      expect(DataMasking.pan('AB')).toBe('AB');
    });
  });

  describe('account', () => {
    it('masks account showing only last 4 digits', () => {
      expect(DataMasking.account('5010067541234')).toBe('XXXX XXXX 1234');
    });

    it('returns short account number as-is', () => {
      expect(DataMasking.account('123')).toBe('123');
    });
  });

  describe('email', () => {
    it('masks middle of email username', () => {
      expect(DataMasking.email('rahul@skfinance.com')).toBe('ra***l@skfinance.com');
    });

    it('handles email with short username', () => {
      const result = DataMasking.email('ab@domain.com');
      expect(result).toContain('@domain.com');
    });

    it('returns string unchanged if no @ symbol', () => {
      expect(DataMasking.email('invalidemail')).toBe('invalidemail');
    });
  });
});

// ─── ScreenshotPrevention ──────────────────────────────────────────────────────

describe('ScreenshotPrevention', () => {
  it('lists all sensitive screens', () => {
    const screens = ScreenshotPrevention.sensitiveScreens;
    expect(screens).toContain('MPINSetup');
    expect(screens).toContain('MPINConfirm');
    expect(screens).toContain('MPINLogin');
    expect(screens).toContain('PayEMI');
    expect(screens).toContain('PersonalInfo');
    expect(screens).toContain('ViewMandate');
  });

  it('enable and disable do not throw', () => {
    expect(() => ScreenshotPrevention.enable()).not.toThrow();
    expect(() => ScreenshotPrevention.disable()).not.toThrow();
  });

  it('check enables prevention for sensitive screen', () => {
    const enableSpy = jest.spyOn(ScreenshotPrevention, 'enable');
    ScreenshotPrevention.check('MPINLogin');
    expect(enableSpy).toHaveBeenCalled();
    enableSpy.mockRestore();
  });

  it('check disables prevention for non-sensitive screen', () => {
    const disableSpy = jest.spyOn(ScreenshotPrevention, 'disable');
    ScreenshotPrevention.check('Dashboard');
    expect(disableSpy).toHaveBeenCalled();
    disableSpy.mockRestore();
  });

  it('check handles all sensitive screens', () => {
    const enableSpy = jest.spyOn(ScreenshotPrevention, 'enable');
    ScreenshotPrevention.sensitiveScreens.forEach(screen => {
      ScreenshotPrevention.check(screen);
    });
    expect(enableSpy).toHaveBeenCalledTimes(ScreenshotPrevention.sensitiveScreens.length);
    enableSpy.mockRestore();
  });
});
