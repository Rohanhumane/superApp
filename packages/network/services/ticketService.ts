import { getApiClient } from '../client';
import type { ApiResponse, CreateTicketRequest, ServiceTicket } from '../types';

export const TicketService = {
  /** Create new service request */
  createTicket: async (req: CreateTicketRequest): Promise<ApiResponse<ServiceTicket>> => {
    return getApiClient().post('/tickets', req);
  },

  /** Get all service tickets */
  getTickets: async (status?: string): Promise<ApiResponse<ServiceTicket[]>> => {
    const params = status && status !== 'all' ? { status } : {};
    return getApiClient().get('/tickets', { params });
  },

  /** Get single ticket details */
  getTicketDetails: async (ticketId: string): Promise<ApiResponse<ServiceTicket>> => {
    return getApiClient().get(`/tickets/${ticketId}`);
  },
};
