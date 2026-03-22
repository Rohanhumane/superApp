import { getApiClient } from '../client';
import type { ApiResponse, SubmitLeadRequest, SubmitLeadResponse } from '../types';

export const LeadService = {
  /** Submit new loan application */
  submitLead: async (req: SubmitLeadRequest): Promise<ApiResponse<SubmitLeadResponse>> => {
    return getApiClient().post('/leads', req);
  },

  /** Check lead/application status */
  getLeadStatus: async (leadId: string): Promise<ApiResponse<{ status: string; updatedAt: string }>> => {
    return getApiClient().get(`/leads/${leadId}/status`);
  },

  /** Get all leads for current user */
  getMyLeads: async (): Promise<ApiResponse<SubmitLeadResponse[]>> => {
    return getApiClient().get('/leads/me');
  },
};
