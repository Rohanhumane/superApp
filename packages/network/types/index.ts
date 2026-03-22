// ===== COMMON =====
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiError {
  status: number;
  message: string;
  errorCode?: string;
  details?: Record<string, string>;
}

// ===== AUTH =====
export interface SendOTPRequest { mobile: string; flow: 'etb' | 'ntb' | 'lead'; }
export interface SendOTPResponse { requestId: string; expiresIn: number; }

export interface VerifyOTPRequest { mobile: string; otp: string; requestId: string; }
export interface VerifyOTPResponse { accessToken: string; refreshToken: string; userType: 'etb' | 'ntb' | 'lead'; isNewUser: boolean; }

export interface RefreshTokenRequest { refreshToken: string; }
export interface RefreshTokenResponse { accessToken: string; refreshToken: string; }

export interface SetMPINRequest { mpin: string; deviceId: string; }
export interface VerifyMPINRequest { mpin: string; deviceId: string; }

// ===== USER =====
export interface UserProfile {
  id: string;
  fullName: string;
  mobile: string;
  maskedMobile: string;
  email?: string;
  dob?: string;
  pan?: string;
  maskedPAN?: string;
  photo?: string;
}

export interface UpdateMobileRequest { newMobile: string; otp: string; }
export interface UpdateEmailRequest { newEmail: string; otp: string; }
export interface UpdateAddressRequest { addressLine1: string; addressLine2?: string; city: string; state: string; pincode: string; type: 'communication' | 'permanent'; }

// ===== LOANS =====
export interface LoanAccount {
  id: string;
  loanNumber: string;
  loanAccountNo: string;
  loanType: string;
  status: 'active' | 'closed' | 'overdue';
  loanAmount: number;
  emiAmount: number;
  tenure: number;
  remainingTenure: number;
  nextInstallmentDate: string;
  loanClosureDate: string;
  disbursalDate: string;
  interestRate: number;
  emiPaid: number;
  totalEMI: number;
  amountPaid: number;
  amountRemaining: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'received' | 'failed' | 'pending';
  installmentNumber: number;
}

// ===== PAYMENTS =====
export interface PayEMIRequest { loanId: string; amount: number; paymentType: string; }
export interface PayEMIResponse { transactionId: string; referenceNo: string; status: 'success' | 'failed'; }

// ===== MANDATE =====
export interface Mandate {
  id: string;
  loanId: string;
  bankName: string;
  accountNumber: string;
  maskedAccount: string;
  ifscCode: string;
  accountHolder: string;
  emiAmount: number;
  startDate: string;
  endDate: string;
  accountType: 'savings' | 'current';
  status: 'active' | 'inactive' | 'pending';
}

export interface SetupMandateRequest { loanId: string; bankName: string; accountNumber: string; ifscCode: string; accountType: 'savings' | 'current'; holderName: string; }

// ===== LEAD =====
export interface SubmitLeadRequest {
  fullName: string;
  mobile: string;
  dob: string;
  pan: string;
  email?: string;
  pincode?: string;
  loanType: string;
  productType?: string;
  employmentType: string;
}
export interface SubmitLeadResponse { leadId: string; status: string; }

// ===== SERVICE REQUESTS =====
export interface CreateTicketRequest { loanId: string; category: string; subCategory?: string; description: string; }
export interface ServiceTicket {
  id: string;
  referenceId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  category: string;
  createdDate: string;
  lastUpdate: string;
  expectedResponse: string;
}
