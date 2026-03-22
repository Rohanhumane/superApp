import {
  APP_CONFIG,
  LOAN_TYPES,
  PRODUCT_TYPES,
  EMPLOYMENT_TYPES,
  INCOME_SOURCES,
  LANGUAGES,
  SERVICE_CATEGORIES,
  ACCOUNT_TYPES,
  PAYMENT_TYPES,
  DOCUMENT_TYPES,
  SUPPORT_OPTIONS,
  EMI_LIMITS,
  ELIGIBILITY_LIMITS,
} from './index';

describe('@nbfc/config', () => {
  describe('APP_CONFIG', () => {
    it('has correct app identity', () => {
      expect(APP_CONFIG.APP_NAME).toBe('SK Finance');
      expect(APP_CONFIG.APP_VERSION).toBe('1.0');
    });

    it('has correct OTP lengths', () => {
      expect(APP_CONFIG.OTP_LENGTH_LOGIN).toBe(5);
      expect(APP_CONFIG.OTP_LENGTH_VERIFY).toBe(6);
    });

    it('has correct MPIN length', () => {
      expect(APP_CONFIG.MPIN_LENGTH).toBe(4);
    });

    it('has correct session timeout (5 minutes in ms)', () => {
      expect(APP_CONFIG.SESSION_TIMEOUT_MS).toBe(5 * 60 * 1000);
    });

    it('has correct max MPIN attempts', () => {
      expect(APP_CONFIG.MAX_MPIN_ATTEMPTS).toBe(3);
    });

    it('has correct lockout duration (30 minutes in ms)', () => {
      expect(APP_CONFIG.MPIN_LOCKOUT_MS).toBe(30 * 60 * 1000);
    });

    it('has correct OTP timers', () => {
      expect(APP_CONFIG.OTP_RESEND_TIMER).toBe(30);
      expect(APP_CONFIG.OTP_EXPIRY_TIMER).toBe(60);
    });

    it('has Indian country code', () => {
      expect(APP_CONFIG.COUNTRY_CODE).toBe('+91');
    });

    it('has valid API base URL', () => {
      expect(APP_CONFIG.API_BASE_URL).toContain('skfinance.com');
      expect(APP_CONFIG.API_BASE_URL).toContain('https://');
    });
  });

  describe('LOAN_TYPES', () => {
    it('has 6 loan types', () => {
      expect(LOAN_TYPES).toHaveLength(6);
    });

    it('includes Car Loan', () => {
      expect(LOAN_TYPES.find(l => l.id === 'car_loan')).toBeDefined();
      expect(LOAN_TYPES.find(l => l.id === 'car_loan')?.label).toBe('Car Loan');
    });

    it('includes Tractor Loan', () => {
      expect(LOAN_TYPES.find(l => l.id === 'tractor_loan')).toBeDefined();
    });

    it('every loan type has id, label, icon', () => {
      LOAN_TYPES.forEach(loan => {
        expect(loan.id).toBeTruthy();
        expect(loan.label).toBeTruthy();
        expect(loan.icon).toBeTruthy();
      });
    });
  });

  describe('LANGUAGES', () => {
    it('has 7 supported languages', () => {
      expect(LANGUAGES).toHaveLength(7);
    });

    it('includes English and Hindi as primary', () => {
      expect(LANGUAGES.find(l => l.id === 'en')).toBeDefined();
      expect(LANGUAGES.find(l => l.id === 'hi')).toBeDefined();
    });

    it('includes all Indian regional languages', () => {
      const ids = LANGUAGES.map(l => l.id);
      expect(ids).toContain('bn'); // Bengali
      expect(ids).toContain('ta'); // Tamil
      expect(ids).toContain('kn'); // Kannada
      expect(ids).toContain('mr'); // Marathi
      expect(ids).toContain('gu'); // Gujarati
    });

    it('every language has native name', () => {
      LANGUAGES.forEach(lang => {
        expect(lang.native).toBeTruthy();
      });
    });
  });

  describe('EMI_LIMITS', () => {
    it('has valid amount range', () => {
      expect(EMI_LIMITS.AMOUNT_MIN).toBe(50000);
      expect(EMI_LIMITS.AMOUNT_MAX).toBe(4000000);
      expect(EMI_LIMITS.AMOUNT_MIN).toBeLessThan(EMI_LIMITS.AMOUNT_MAX);
    });

    it('has valid rate range', () => {
      expect(EMI_LIMITS.RATE_MIN).toBe(5);
      expect(EMI_LIMITS.RATE_MAX).toBe(20);
      expect(EMI_LIMITS.RATE_MIN).toBeLessThan(EMI_LIMITS.RATE_MAX);
    });

    it('has valid tenure range in months', () => {
      expect(EMI_LIMITS.TENURE_MIN).toBe(12);
      expect(EMI_LIMITS.TENURE_MAX).toBe(84);
      expect(EMI_LIMITS.TENURE_MIN).toBeLessThan(EMI_LIMITS.TENURE_MAX);
    });
  });

  describe('ELIGIBILITY_LIMITS', () => {
    it('has valid income range', () => {
      expect(ELIGIBILITY_LIMITS.INCOME_MIN).toBe(20000);
      expect(ELIGIBILITY_LIMITS.INCOME_MAX).toBe(1000000);
    });

    it('other EMI minimum is 0', () => {
      expect(ELIGIBILITY_LIMITS.OTHER_EMI_MIN).toBe(0);
    });
  });

  describe('SERVICE_CATEGORIES', () => {
    it('has 6 categories', () => {
      expect(SERVICE_CATEGORIES).toHaveLength(6);
    });

    it('includes payments and documents', () => {
      const ids = SERVICE_CATEGORIES.map(s => s.id);
      expect(ids).toContain('payments');
      expect(ids).toContain('documents');
      expect(ids).toContain('account');
      expect(ids).toContain('loan');
    });
  });

  describe('PAYMENT_TYPES', () => {
    it('has 4 payment types', () => {
      expect(PAYMENT_TYPES).toHaveLength(4);
    });

    it('includes advance and overdue EMI', () => {
      const ids = PAYMENT_TYPES.map(p => p.id);
      expect(ids).toContain('advance_emi');
      expect(ids).toContain('overdue_emi');
      expect(ids).toContain('foreclosure');
      expect(ids).toContain('part_payment');
    });
  });

  describe('DOCUMENT_TYPES', () => {
    it('has 6 document types', () => {
      expect(DOCUMENT_TYPES).toHaveLength(6);
    });

    it('includes loan agreement', () => {
      expect(DOCUMENT_TYPES.find(d => d.id === 'loan_agreement')).toBeDefined();
    });
  });

  describe('SUPPORT_OPTIONS', () => {
    it('has 3 support channels', () => {
      expect(SUPPORT_OPTIONS).toHaveLength(3);
    });

    it('includes email, call, and chat', () => {
      const ids = SUPPORT_OPTIONS.map(s => s.id);
      expect(ids).toContain('email');
      expect(ids).toContain('call');
      expect(ids).toContain('chat');
    });

    it('every support option has subtitle', () => {
      SUPPORT_OPTIONS.forEach(opt => {
        expect(opt.subtitle).toBeTruthy();
      });
    });
  });

  describe('PRODUCT_TYPES', () => {
    it('has 4 product types', () => {
      expect(PRODUCT_TYPES).toHaveLength(4);
    });

    it('includes new, refinance, used, top_up', () => {
      const ids = PRODUCT_TYPES.map(p => p.id);
      expect(ids).toContain('new');
      expect(ids).toContain('refinance');
      expect(ids).toContain('used');
      expect(ids).toContain('top_up');
    });
  });

  describe('ACCOUNT_TYPES', () => {
    it('has savings and current', () => {
      expect(ACCOUNT_TYPES).toHaveLength(2);
      const ids = ACCOUNT_TYPES.map(a => a.id);
      expect(ids).toContain('savings');
      expect(ids).toContain('current');
    });
  });

  describe('EMPLOYMENT_TYPES', () => {
    it('has 4 employment types', () => {
      expect(EMPLOYMENT_TYPES).toHaveLength(4);
    });

    it('includes salaried and self_employed', () => {
      const ids = EMPLOYMENT_TYPES.map(e => e.id);
      expect(ids).toContain('salaried');
      expect(ids).toContain('self_employed');
    });
  });
});
