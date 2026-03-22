import { getApiClient } from '../client';
import type { ApiResponse, LoanAccount, Transaction } from '../types';

export const LoanService = {
  /** Get all loan accounts for current user */
  getLoans: async (): Promise<ApiResponse<LoanAccount[]>> => {
    return getApiClient().get('/loans');
  },

  /** Get single loan details */
  getLoanDetails: async (loanId: string): Promise<ApiResponse<LoanAccount>> => {
    return getApiClient().get(`/loans/${loanId}`);
  },

  /** Get transactions for a loan */
  getTransactions: async (loanId: string): Promise<ApiResponse<Transaction[]>> => {
    return getApiClient().get(`/loans/${loanId}/transactions`);
  },

  /** Get loan repayment schedule */
  getRepaymentSchedule: async (loanId: string): Promise<ApiResponse<any>> => {
    return getApiClient().get(`/loans/${loanId}/schedule`);
  },

  /** Download loan document */
  downloadDocument: async (loanId: string, docType: string): Promise<ApiResponse<{ url: string }>> => {
    return getApiClient().get(`/loans/${loanId}/documents/${docType}`);
  },
};
