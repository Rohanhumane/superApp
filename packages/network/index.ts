/**
 * @nbfc/network
 *
 * Production API layer for SK Finance Sevak app.
 *
 * Setup in App.tsx:
 *   import { initNetwork } from '@nbfc/network';
 *   initNetwork({ onSessionExpired: () => dispatch(setSessionExpired()) });
 *
 * Usage in screens/thunks:
 *   import { AuthService, LoanService } from '@nbfc/network';
 *   const result = await AuthService.sendOTP({ mobile: '9876543210', flow: 'etb' });
 */

// Toggle mock API for development
export const USE_MOCK_API = __DEV__;

// Client setup
export { createApiClient, getApiClient } from './client';
export { TokenManager } from './interceptors/tokenManager';
export { setDeviceId } from './interceptors/requestInterceptor';
export { setAuthCallbacks } from './interceptors/responseInterceptor';

// Services
export { AuthService } from './services/authService';
export { LoanService } from './services/loanService';
export { PaymentService } from './services/paymentService';
export { ProfileService } from './services/profileService';
export { LeadService } from './services/leadService';
export { TicketService } from './services/ticketService';
export { MockApi } from './services/mockApi';

// Types
export * from './types';

// ===== CONVENIENCE INIT FUNCTION =====
import { createApiClient } from './client';

/**
 * Initialize the network layer. Call once in App.tsx.
 *
 * @param config.baseURL - API base URL (defaults to env-based)
 * @param config.onSessionExpired - Called when 401 + refresh fails
 * @param config.onAccountLocked - Called on 403
 */
export const initNetwork = (config?: {
  baseURL?: string;
  onSessionExpired?: () => void;
  onAccountLocked?: () => void;
}) => {
  return createApiClient(config);
};
