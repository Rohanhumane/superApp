import { APP_CONFIG } from '@nbfc/config';

class SessionManagerImpl {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private onExpire: (() => void) | null = null;
  private lastActivity = Date.now();

  init(cb: () => void) { this.onExpire = cb; this.reset(); }
  reset() {
    if (this.timer) clearTimeout(this.timer);
    this.lastActivity = Date.now();
    this.timer = setTimeout(() => this.onExpire?.(), APP_CONFIG.SESSION_TIMEOUT_MS);
  }
  recordActivity() { this.reset(); }
  destroy() { if (this.timer) clearTimeout(this.timer); this.timer = null; }
}
export const SessionManager = new SessionManagerImpl();

class MPINTrackerImpl {
  private attempts = 0;
  private lockedUntil: number | null = null;

  record(): { locked: boolean; left: number } {
    if (this.isLocked()) return { locked: true, left: 0 };
    this.attempts++;
    if (this.attempts >= APP_CONFIG.MAX_MPIN_ATTEMPTS) {
      this.lockedUntil = Date.now() + APP_CONFIG.MPIN_LOCKOUT_MS;
      return { locked: true, left: 0 };
    }
    return { locked: false, left: APP_CONFIG.MAX_MPIN_ATTEMPTS - this.attempts };
  }
  isLocked(): boolean {
    if (!this.lockedUntil) return false;
    if (Date.now() > this.lockedUntil) { this.reset(); return false; }
    return true;
  }
  reset() { this.attempts = 0; this.lockedUntil = null; }
}
export const MPINTracker = new MPINTrackerImpl();

// Secure Storage abstraction (swap with react-native-keychain in production)
export const SecureStorage = {
  _store: new Map<string, string>(),
  async set(k: string, v: string) { this._store.set(k, v); },
  async get(k: string): Promise<string | null> { return this._store.get(k) ?? null; },
  async remove(k: string) { this._store.delete(k); },
  async clear() { this._store.clear(); },
};

export const DataMasking = {
  mobile: (n: string) => n.length < 4 ? n : 'x'.repeat(n.length - 4) + n.slice(-4),
  pan: (p: string) => p.length < 4 ? p : 'x'.repeat(p.length - 4) + p.slice(-4),
  account: (a: string) => a.length < 4 ? a : `XXXX XXXX ${a.slice(-4)}`,
  email: (e: string) => { const [u, d] = e.split('@'); return d ? `${u.slice(0,2)}***${u.slice(-1)}@${d}` : e; },
};

export const ScreenshotPrevention = {
  sensitiveScreens: ['MPINSetup','MPINConfirm','MPINLogin','PayEMI','PersonalInfo','ViewMandate'],
  enable() { /* FLAG_SECURE in production */ },
  disable() {},
  check(screen: string) { if (this.sensitiveScreens.includes(screen)) this.enable(); else this.disable(); },
};
