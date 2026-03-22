import { validators, formatCurrency, formatCurrencyCompact, maskMobile, maskPAN, calculateEMI, calculateEligibility, formatTimer, generateRefId, generateTicketId, formatDate } from './index';

describe('@nbfc/utils', () => {
  describe('validators', () => {
    it('validates mobile numbers', () => {
      expect(validators.isValidMobile('9876543210')).toBe(true);
      expect(validators.isValidMobile('1234567890')).toBe(false);
      expect(validators.isValidMobile('987654321')).toBe(false);
      expect(validators.isValidMobile('6000000000')).toBe(true);
    });

    it('validates PAN numbers', () => {
      expect(validators.isValidPAN('ABCDE1234F')).toBe(true);
      expect(validators.isValidPAN('abcde1234f')).toBe(true);
      expect(validators.isValidPAN('12345ABCDE')).toBe(false);
      expect(validators.isValidPAN('ABC')).toBe(false);
    });

    it('validates email', () => {
      expect(validators.isValidEmail('rahul@skf.com')).toBe(true);
      expect(validators.isValidEmail('invalid')).toBe(false);
      expect(validators.isValidEmail('a@b.c')).toBe(true);
    });

    it('validates IFSC', () => {
      expect(validators.isValidIFSC('HDFC0001234')).toBe(true);
      expect(validators.isValidIFSC('INVALID')).toBe(false);
    });

    it('validates pincode', () => {
      expect(validators.isValidPincode('400001')).toBe(true);
      expect(validators.isValidPincode('000000')).toBe(false);
      expect(validators.isValidPincode('12345')).toBe(false);
    });

    it('validates MPIN', () => {
      expect(validators.isValidMPIN('3635')).toBe(true);
      expect(validators.isValidMPIN('123')).toBe(false);
      expect(validators.isValidMPIN('abcd')).toBe(false);
    });
  });

  describe('formatCurrency', () => {
    it('formats with rupee symbol', () => {
      expect(formatCurrency(500000)).toContain('₹');
      expect(formatCurrency(500000)).toContain('5');
    });

    it('formats without symbol', () => {
      expect(formatCurrency(500000, false)).not.toContain('₹');
    });
  });

  describe('formatCurrencyCompact', () => {
    it('formats crores', () => {
      expect(formatCurrencyCompact(10000000)).toContain('Cr');
    });

    it('formats lakhs', () => {
      expect(formatCurrencyCompact(500000)).toContain('L');
    });

    it('formats thousands', () => {
      expect(formatCurrencyCompact(50000)).toContain('K');
    });
  });

  describe('masking', () => {
    it('masks mobile number', () => {
      expect(maskMobile('9876543210')).toBe('xxxxxx3210');
    });

    it('masks PAN', () => {
      expect(maskPAN('ABCDE1234F')).toBe('xxxxxx234F');
    });
  });

  describe('calculateEMI', () => {
    it('calculates correct EMI', () => {
      const emi = calculateEMI(500000, 9.9, 36);
      expect(emi).toBeGreaterThan(0);
      expect(emi).toBeLessThan(500000);
    });

    it('handles zero rate', () => {
      const emi = calculateEMI(120000, 0, 12);
      expect(emi).toBe(10000);
    });
  });

  describe('calculateEligibility', () => {
    it('returns positive amount for valid inputs', () => {
      const elig = calculateEligibility(100000, 0, 9.9, 12);
      expect(elig).toBeGreaterThan(0);
    });

    it('returns 0 when EMIs exceed income', () => {
      const elig = calculateEligibility(20000, 15000, 9.9, 12);
      expect(elig).toBe(0);
    });
  });

  describe('formatTimer', () => {
    it('formats seconds as MM:SS', () => {
      expect(formatTimer(30)).toBe('00:30');
      expect(formatTimer(90)).toBe('01:30');
      expect(formatTimer(0)).toBe('00:00');
    });
  });

  describe('ID generators', () => {
    it('generates reference IDs starting with SK', () => {
      expect(generateRefId()).toMatch(/^SK\d{6}$/);
    });

    it('generates ticket IDs starting with IPR', () => {
      expect(generateTicketId()).toMatch(/^IPR-\d{4}$/);
    });
  });
});
