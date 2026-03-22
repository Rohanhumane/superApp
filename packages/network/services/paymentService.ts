import { getApiClient } from '../client';
import type { ApiResponse, PayEMIRequest, PayEMIResponse, Mandate, SetupMandateRequest } from '../types';

export const PaymentService = {
  /** Make EMI payment */
  payEMI: async (req: PayEMIRequest): Promise<ApiResponse<PayEMIResponse>> => {
    return getApiClient().post('/payments/emi', req);
  },

  /** Get active mandate for a loan */
  getMandate: async (loanId: string): Promise<ApiResponse<Mandate>> => {
    return getApiClient().get(`/mandates/${loanId}`);
  },

  /** Get all mandates */
  getAllMandates: async (): Promise<ApiResponse<Mandate[]>> => {
    return getApiClient().get('/mandates');
  },

  /** Setup new auto-debit mandate */
  setupMandate: async (req: SetupMandateRequest): Promise<ApiResponse<{ mandateId: string }>> => {
    return getApiClient().post('/mandates/setup', req);
  },

  /** Authorize mandate (after bank redirect) */
  authorizeMandate: async (mandateId: string): Promise<ApiResponse<void>> => {
    return getApiClient().post(`/mandates/${mandateId}/authorize`);
  },
};
