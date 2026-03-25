import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoanAccount {
  id: string; number: string; accountNo: string; type: string; status: 'active' | 'closed';
  amount: number; emi: number; tenure: number; remainingTenure: number; nextDate: string; closeDate: string;
  disbursalDate: string; firstEMIDate: string; bank: string; emiPaid: number; totalEMI: number;
  amountPaid: number; amountRemaining: number; rate: number;
}
export interface Transaction { id: string; date: string; desc: string; amount: number; status: 'received' | 'failed' | 'pending'; installment: number; }
export interface Mandate { id: string; loanId: string; bank: string; accountNo: string; masked: string; ifsc: string; holder: string; emi: number; endDate: string; startDate: string; accType: string; status: string; }
export interface Insurance { id: string; loanId: string; provider: string; policyNo: string; validTill: string; status: 'active' | 'expired'; }

interface LoanState { loans: LoanAccount[]; transactions: Transaction[]; mandates: Mandate[]; associates: { id: string; name: string; role: string }[]; insurances: Insurance[]; }

const init: LoanState = {
  loans: [{
    id: '1', number: 'SK101010', accountNo: 'L-88393945', type: 'Car Loan', status: 'active',
    amount: 500000, emi: 11634, tenure: 36, remainingTenure: 24, nextDate: '2026-04-05', closeDate: '2030-04-05',
    disbursalDate: '2023-03-05', firstEMIDate: '2023-04-05', bank: 'Axis Bank', emiPaid: 12, totalEMI: 36,
    amountPaid: 261686, amountRemaining: 581314, rate: 9.9,
  }, {
    id: '2', number: 'SK201020', accountNo: 'L-88392786', type: 'Equipment Loan', status: 'active',
    amount: 800000, emi: 18500, tenure: 48, remainingTenure: 36, nextDate: '2026-04-10', closeDate: '2029-04-10',
    disbursalDate: '2023-04-10', firstEMIDate: '2023-05-10', bank: 'SBI', emiPaid: 12, totalEMI: 48,
    amountPaid: 222000, amountRemaining: 666000, rate: 10.5,
  }, {
    id: '3', number: 'SK301030', accountNo: 'L-88393028', type: 'Business Loan', status: 'active',
    amount: 1200000, emi: 26200, tenure: 60, remainingTenure: 48, nextDate: '2026-04-15', closeDate: '2031-04-15',
    disbursalDate: '2023-04-15', firstEMIDate: '2023-05-15', bank: 'HDFC Bank', emiPaid: 12, totalEMI: 60,
    amountPaid: 314400, amountRemaining: 1257600, rate: 11.0,
  }],
  transactions: [
    { id: 't1', date: '2026-03-05', desc: 'Due for Installment 12', amount: 15300, status: 'received', installment: 12 },
    { id: 't2', date: '2026-02-05', desc: 'Due for Installment 11', amount: 15300, status: 'received', installment: 11 },
    { id: 't3', date: '2026-01-05', desc: 'Due for Installment 10', amount: 15300, status: 'failed', installment: 10 },
  ],
  mandates: [{ id: 'm1', loanId: '1', bank: 'HDFC Bank', accountNo: '5010067541234', masked: 'xxx xxx 5623', ifsc: 'HDFC0001929', holder: 'Rajesh Kumar', emi: 11634, endDate: '2029-06-01', startDate: '2026-04-01', accType: 'savings', status: 'active' }],
  associates: [{ id: 'a1', name: 'Smita Agarwal', role: 'Co-Borrower' }, { id: 'a2', name: 'Prakash Kumar', role: 'Guarantor' }],
  insurances: [{ id: 'ins1', loanId: '1', provider: 'Axis Max', policyNo: '1234567890123', validTill: '2026-02-05', status: 'active' }],
};

const slice = createSlice({
  name: 'loan', initialState: init,
  reducers: {
    setLoans(s, a: PayloadAction<LoanAccount[]>) { s.loans = a.payload; },
    addTransaction(s, a: PayloadAction<Transaction>) { s.transactions.unshift(a.payload); },
    updateMandate(s, a: PayloadAction<Mandate>) { const i = s.mandates.findIndex(m => m.id === a.payload.id); if (i >= 0) s.mandates[i] = a.payload; else s.mandates.push(a.payload); },
  },
});
export const { setLoans, addTransaction, updateMandate } = slice.actions;
export default slice.reducer;
