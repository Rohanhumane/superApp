/**
 * Screen Content Constants
 * 
 * All data arrays, menu items, and content configuration
 * extracted from individual screens into one manageable file.
 * 
 * i18n keys reference: packages/i18n/locales/en.json
 */

import type { IconName } from '@nbfc/ui';

// ===== DASHBOARD =====
export const DASHBOARD_SUPPORT_ITEMS = [
  { id: 'chat', labelKey: 'dashboard.chat_support', icon: 'chat' as IconName },
  { id: 'email', labelKey: 'dashboard.email', icon: 'email_icon' as IconName },
  { id: 'call', labelKey: 'dashboard.call_us', icon: 'phone' as IconName },
  { id: 'locate', labelKey: 'dashboard.locate_us', icon: 'location' as IconName },
];

export const DASHBOARD_QUICK_LINKS = [
  { id: 'my_loans', labelKey: 'quick_links.my_loans', icon: 'loan' as IconName, route: 'LoanDetails' },
  { id: 'documents', labelKey: 'quick_links.documents', icon: 'document' as IconName, route: 'DocumentsStatement' },
  { id: 'mandate', labelKey: 'quick_links.mandate', icon: 'mandate' as IconName, route: 'ViewMandate' },
  { id: 'insurance', labelKey: 'quick_links.insurance', icon: 'insurance' as IconName, route: '' },
];

// ===== PROFILE MENU =====
export const PROFILE_MENU_SECTIONS = [
  {
    titleKey: 'profile.account_info',
    items: [
      { icon: 'user' as IconName, labelKey: 'profile.personal_info', route: 'PersonalInfo' },
      { icon: 'location' as IconName, labelKey: 'profile.address', route: 'Address' },
    ],
  },
  {
    titleKey: 'profile.settings',
    items: [
      { icon: 'lock' as IconName, labelKey: 'profile.change_mpin', route: 'ChangeMPIN' },
      { icon: 'location' as IconName, labelKey: 'profile.language_pref', route: 'LanguagePreference' },
    ],
  },
  {
    titleKey: 'profile.others',
    items: [
      { icon: 'package' as IconName, labelKey: 'profile.refer_earn', route: 'ReferEarn' },
      { icon: 'headphones' as IconName, labelKey: 'profile.customer_care', route: 'CustomerCare' },
    ],
  },
];

// ===== PRODUCT FEATURES =====
export const PRODUCT_FEATURES = [
  'products.feature_1',
  'products.feature_2',
  'products.feature_3',
  'products.feature_4',
];

// ===== PRE-LOGIN SUPPORT BAR =====
export const PRE_LOGIN_BAR_ITEMS = [
  { id: 'support', labelKey: 'common.support', icon: 'support' as IconName },
  { id: 'call', labelKey: 'dashboard.call_us', icon: 'phone' as IconName },
  { id: 'locate', labelKey: 'dashboard.locate_us', icon: 'location' as IconName },
  { id: 'more', labelKey: 'common.more', icon: 'more' as IconName },
];

// ===== SERVICES QUICK LINKS =====
export const SERVICES_QUICK_LINKS = [
  { id: 'pay_emi', labelKey: 'services.pay_loan_emi', icon: 'payment' as IconName, route: 'PayEMI' },
  { id: 'raise_request', labelKey: 'services.raise_request', icon: 'request' as IconName, route: 'ServiceRequests' },
  { id: 'track_application', labelKey: 'services.track_application', icon: 'track' as IconName, route: 'TrackRequests' },
];

// ===== SERVICE REQUEST TYPES =====
export const SERVICE_REQUEST_TYPES = [
  {
    titleKey: 'service_requests.create_title',
    subKey: 'service_requests.create_sub',
    icon: 'success' as IconName,
    bgColor: '#E8F5E9',
    route: 'SelectLoan',
  },
  {
    titleKey: 'service_requests.track_title',
    subKey: 'service_requests.track_sub',
    icon: 'track' as IconName,
    bgColor: '#FFF3E0',
    route: 'TrackRequests',
  },
];

// ===== TICKET FILTER TABS =====
export const TICKET_FILTERS = ['All', 'Pending', 'Active', 'Done'];

// ===== KNOWLEDGE CENTER =====
export const KNOWLEDGE_ITEMS = [
  { titleKey: 'services.how_pay_emi', icon: 'payment' as IconName },
  { titleKey: 'services.how_update_mandate', icon: 'mandate' as IconName },
];

// ===== ACCOUNT MANAGEMENT MENU =====
export const ACCOUNT_MANAGEMENT_ITEMS = [
  { icon: 'user' as IconName, labelKey: 'services.profile_details', route: 'MyProfile' },
  { icon: 'payment' as IconName, labelKey: 'services.manage_autopay', route: 'ViewMandate' },
  { icon: 'download' as IconName, labelKey: 'services.download_statement', route: 'DocumentsStatement' },
];

// ===== WEAK MPINS =====
export const WEAK_MPINS = ['1234', '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'];

// ===== REFER LOAN OPTIONS =====
export const REFER_LOAN_OPTIONS = [
  { id: 'car', label: 'Car loan' },
  { id: 'tractor', label: 'Tractor loan' },
  { id: 'business', label: 'Business loan' },
];

// ===== BANK OPTIONS =====
export const BANK_OPTIONS = [
  { id: 'hdfc', label: 'HDFC Bank' },
  { id: 'sbi', label: 'SBI' },
  { id: 'axis', label: 'Axis Bank' },
  { id: 'icici', label: 'ICICI Bank' },
];

// ===== SUB CATEGORY OPTIONS =====
export const SUB_CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'urgent', label: 'Urgent' },
];
