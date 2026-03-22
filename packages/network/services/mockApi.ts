/**
 * Mock API
 *
 * Used in development when backend is unavailable.
 * Returns data in the same shape as real API.
 *
 * Usage in screens:
 *   import { useMockApi } from '@nbfc/network';
 *   const api = useMockApi ? MockApi : RealApi;
 *
 * Toggle: set USE_MOCK_API = true/false in index.ts
 */

const delay = (ms = 800) => new Promise(r => setTimeout(r, ms));

export const MockApi = {
  auth: {
    sendOTP: async (mobile: string) => {
      await delay();
      return { success: true, data: { requestId: 'req_' + Date.now(), expiresIn: 60 } };
    },

    verifyOTP: async (mobile: string, otp: string) => {
      await delay();
      // Any OTP works in mock mode
      return {
        success: true,
        data: {
          accessToken: 'mock_access_' + Date.now(),
          refreshToken: 'mock_refresh_' + Date.now(),
          userType: 'etb' as const,
          isNewUser: false,
        },
      };
    },

    verifyMPIN: async (mpin: string) => {
      await delay(400);
      return {
        success: true,
        data: {
          accessToken: 'mock_access_' + Date.now(),
          refreshToken: 'mock_refresh_' + Date.now(),
          userType: 'etb' as const,
          isNewUser: false,
        },
      };
    },
  },

  loans: {
    getLoans: async () => {
      await delay();
      return {
        success: true,
        data: [{
          id: '1', loanNumber: 'SK101010', loanAccountNo: 'L-88392001',
          loanType: 'Car Loan', status: 'active', loanAmount: 500000,
          emiAmount: 11634, tenure: 36, remainingTenure: 24,
          nextInstallmentDate: '2026-04-05', loanClosureDate: '2030-04-05',
          disbursalDate: '2023-03-05', interestRate: 9.9,
          emiPaid: 12, totalEMI: 36, amountPaid: 261686, amountRemaining: 581314,
        }],
      };
    },

    getTransactions: async () => {
      await delay();
      return {
        success: true,
        data: [
          { id: 't1', date: '2026-03-05', description: 'Installment 12', amount: 15300, status: 'received', installmentNumber: 12 },
          { id: 't2', date: '2026-02-05', description: 'Installment 11', amount: 15300, status: 'received', installmentNumber: 11 },
          { id: 't3', date: '2026-01-05', description: 'Installment 10', amount: 15300, status: 'failed', installmentNumber: 10 },
        ],
      };
    },
  },

  payments: {
    payEMI: async (data: any) => {
      await delay(1500);
      return {
        success: true,
        data: {
          transactionId: 'txn_' + Date.now(),
          referenceNo: String(Math.floor(1e8 + Math.random() * 9e8)),
          status: 'success',
        },
      };
    },

    getMandate: async () => {
      await delay();
      return {
        success: true,
        data: {
          id: 'm1', loanId: '1', bankName: 'HDFC Bank', accountNumber: '5010067541234',
          maskedAccount: 'XXXX XXXX 5623', ifscCode: 'HDFC0001929', accountHolder: 'Rajesh Kumar',
          emiAmount: 11634, startDate: '2026-04-01', endDate: '2029-06-01',
          accountType: 'savings', status: 'active',
        },
      };
    },
  },

  profile: {
    getProfile: async () => {
      await delay();
      return {
        success: true,
        data: {
          id: 'u1', fullName: 'Rajesh Kumar', mobile: '9876543210',
          maskedMobile: 'xxx3210', email: 'rajesh@example.com',
          dob: '15/06/1990', pan: 'ABCDE1234F', maskedPAN: 'xxxxxx234F',
        },
      };
    },
  },

  tickets: {
    createTicket: async (data: any) => {
      await delay();
      return {
        success: true,
        data: {
          id: 'tk_' + Date.now(),
          referenceId: 'IPR-' + Math.floor(1000 + Math.random() * 9000),
          title: data.category || 'Service Request',
          description: data.description, status: 'pending',
          category: data.category, createdDate: new Date().toISOString().split('T')[0],
          lastUpdate: new Date().toISOString().split('T')[0],
          expectedResponse: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        },
      };
    },

    getTickets: async () => {
      await delay();
      return {
        success: true,
        data: [
          { id: 'tk1', referenceId: 'IPR-8997', title: 'Address Change', description: 'Update residential address', status: 'in_progress', category: 'Account', createdDate: '2026-03-12', lastUpdate: '2026-03-14', expectedResponse: '2026-03-16' },
          { id: 'tk2', referenceId: 'IPR-8856', title: 'Account Statement', description: 'Request loan statement FY 2023-24', status: 'pending', category: 'Documents', createdDate: '2026-03-10', lastUpdate: '2026-03-10', expectedResponse: '2026-03-12' },
        ],
      };
    },
  },
};
