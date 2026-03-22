export const APP_CONFIG = {
  APP_NAME: 'SK Finance',
  APP_TAGLINE: 'Saath Aapke... Hamesha',
  APP_SUBTITLE: 'Sevak',
  APP_VERSION: '1.0',
  OTP_LENGTH_LOGIN: 5,
  OTP_LENGTH_VERIFY: 6,
  MPIN_LENGTH: 4,
  OTP_RESEND_TIMER: 30,
  OTP_EXPIRY_TIMER: 60,
  SESSION_TIMEOUT_MS: 5 * 60 * 1000,
  MAX_MPIN_ATTEMPTS: 3,
  MPIN_LOCKOUT_MS: 30 * 60 * 1000,
  PROFILE_UPDATE_HOURS: 24,
  MAX_UPLOAD_SIZE_MB: 10,
  COUNTRY_CODE: '+91',
  API_BASE_URL: 'https://api.skfinance.com/v1',
} as const;

export const LOAN_TYPES = [
  { id: 'car_loan', label: 'Car Loan', icon: 'car' },
  { id: 'tractor_loan', label: 'Tractor Loan', icon: 'tractor' },
  { id: 'commercial_vehicle', label: 'Commercial Vehicle Loan', icon: 'truck' },
  { id: 'equipment_loan', label: 'Equipment Loan', icon: 'equipment' },
  { id: 'business_loan', label: 'Business Loan', icon: 'business' },
  { id: 'home_repair', label: 'Home Repair Loan', icon: 'home' },
] as const;

export const PRODUCT_TYPES = [
  { id: 'new', label: 'New' }, { id: 'refinance', label: 'Refinance' },
  { id: 'used', label: 'Used' }, { id: 'top_up', label: 'Top Up' },
] as const;

export const EMPLOYMENT_TYPES = [
  { id: 'salaried', label: 'Salaried' }, { id: 'self_employed', label: 'Self Employed' },
  { id: 'business', label: 'Business' }, { id: 'professional', label: 'Professional' },
] as const;

export const INCOME_SOURCES = [
  { id: 'salaried', label: 'Salaried' }, { id: 'self_employed', label: 'Self Employed' },
  { id: 'business', label: 'Business Owner' },
] as const;

export const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'hi', label: 'Hindi', native: 'हिंदी' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
] as const;

export const SERVICE_CATEGORIES = [
  { id: 'payments', label: 'Payments' }, { id: 'documents', label: 'Documents' },
  { id: 'account', label: 'Account' }, { id: 'loan', label: 'Loan' },
  { id: 'insurance', label: 'Insurance' }, { id: 'other', label: 'Other' },
] as const;

export const ACCOUNT_TYPES = [
  { id: 'savings', label: 'Savings' }, { id: 'current', label: 'Current' },
] as const;

export const PAYMENT_TYPES = [
  { id: 'advance_emi', label: 'Advance EMI' }, { id: 'overdue_emi', label: 'Overdue EMI' },
  { id: 'foreclosure', label: 'Foreclosure' }, { id: 'part_payment', label: 'Part Payment' },
] as const;

export const DOCUMENT_TYPES = [
  { id: 'loan_agreement', label: 'Loan agreement' },
  { id: 'repayment_schedule', label: 'Repayment Schedule' },
  { id: 'key_fact_statement', label: 'Key Fact Statement' },
  { id: 'welcome_letter', label: 'Welcome Letter' },
  { id: 'scheduled_emi', label: 'Scheduled EMI' },
  { id: 'payment_receipts', label: 'Payment Receipts' },
] as const;

export const SUPPORT_OPTIONS = [
  { id: 'email', label: 'Email Us', subtitle: "We'll reply in 1 working day.", icon: 'email' },
  { id: 'call', label: 'Call Us', subtitle: 'Available Mon-Fri.', icon: 'phone' },
  { id: 'chat', label: 'Chat With Us', subtitle: 'Available 24/7.', icon: 'chat' },
] as const;

export const EMI_LIMITS = { AMOUNT_MIN: 50000, AMOUNT_MAX: 4000000, RATE_MIN: 5, RATE_MAX: 20, TENURE_MIN: 12, TENURE_MAX: 84 } as const;
export const ELIGIBILITY_LIMITS = { INCOME_MIN: 20000, INCOME_MAX: 1000000, OTHER_EMI_MIN: 0, OTHER_EMI_MAX: 500000, RATE_MIN: 5, RATE_MAX: 20, TENURE_MIN: 12, TENURE_MAX: 84 } as const;
