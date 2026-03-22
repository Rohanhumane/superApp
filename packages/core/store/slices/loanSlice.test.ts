import loanReducer, {
  setLoans,
  addTransaction,
  updateMandate,
  LoanAccount,
  Transaction,
  Mandate,
} from './loanSlice';

const mockLoan: LoanAccount = {
  id: '99', number: 'SK999999', accountNo: 'L-00000001', type: 'Business Loan',
  status: 'active', amount: 1000000, emi: 20000, tenure: 60, remainingTenure: 48,
  nextDate: '2026-05-01', closeDate: '2031-04-01', disbursalDate: '2021-04-01',
  firstEMIDate: '2021-05-01', bank: 'SBI', emiPaid: 12, totalEMI: 60,
  amountPaid: 240000, amountRemaining: 760000, rate: 12.5,
};

const mockTransaction: Transaction = {
  id: 'tx99', date: '2026-03-22', desc: 'Due for Installment 15',
  amount: 20000, status: 'received', installment: 15,
};

const mockMandate: Mandate = {
  id: 'm99', loanId: '99', bank: 'SBI', accountNo: '1234567890',
  masked: 'XXXX XXXX 7890', ifsc: 'SBIN0001234', holder: 'Rahul Kumar',
  emi: 20000, endDate: '2031-04-01', startDate: '2026-05-01',
  accType: 'savings', status: 'active',
};

describe('loanSlice', () => {
  const initial = loanReducer(undefined, { type: '' });

  describe('initial state', () => {
    it('has one default active Car Loan', () => {
      expect(initial.loans).toHaveLength(1);
      expect(initial.loans[0].type).toBe('Car Loan');
      expect(initial.loans[0].status).toBe('active');
      expect(initial.loans[0].number).toBe('SK101010');
      expect(initial.loans[0].amount).toBe(500000);
      expect(initial.loans[0].rate).toBe(9.9);
    });

    it('has three default transactions', () => {
      expect(initial.transactions).toHaveLength(3);
      expect(initial.transactions[0].status).toBe('received');
      expect(initial.transactions[2].status).toBe('failed');
    });

    it('has one default mandate', () => {
      expect(initial.mandates).toHaveLength(1);
      expect(initial.mandates[0].bank).toBe('HDFC Bank');
      expect(initial.mandates[0].accType).toBe('savings');
    });

    it('has two default associates', () => {
      expect(initial.associates).toHaveLength(2);
      expect(initial.associates[0].role).toBe('Co-Borrower');
      expect(initial.associates[1].role).toBe('Guarantor');
    });
  });

  describe('setLoans', () => {
    it('replaces all loans with new array', () => {
      const state = loanReducer(initial, setLoans([mockLoan]));
      expect(state.loans).toHaveLength(1);
      expect(state.loans[0].id).toBe('99');
      expect(state.loans[0].type).toBe('Business Loan');
    });

    it('can set empty loans array', () => {
      const state = loanReducer(initial, setLoans([]));
      expect(state.loans).toHaveLength(0);
    });

    it('can set multiple loans', () => {
      const loan2: LoanAccount = { ...mockLoan, id: '100', number: 'SK100100' };
      const state = loanReducer(initial, setLoans([mockLoan, loan2]));
      expect(state.loans).toHaveLength(2);
    });
  });

  describe('addTransaction', () => {
    it('prepends transaction to front of list', () => {
      const state = loanReducer(initial, addTransaction(mockTransaction));
      expect(state.transactions[0].id).toBe('tx99');
      expect(state.transactions).toHaveLength(4);
    });

    it('preserves existing transactions after adding', () => {
      const state = loanReducer(initial, addTransaction(mockTransaction));
      expect(state.transactions[1].id).toBe('t1');
      expect(state.transactions[2].id).toBe('t2');
      expect(state.transactions[3].id).toBe('t3');
    });

    it('adds multiple transactions in order', () => {
      const tx1: Transaction = { ...mockTransaction, id: 'txA', installment: 16 };
      const tx2: Transaction = { ...mockTransaction, id: 'txB', installment: 17 };
      let state = loanReducer(initial, addTransaction(tx1));
      state = loanReducer(state, addTransaction(tx2));
      expect(state.transactions[0].id).toBe('txB');
      expect(state.transactions[1].id).toBe('txA');
    });
  });

  describe('updateMandate', () => {
    it('updates existing mandate by id', () => {
      const updated: Mandate = { ...initial.mandates[0], bank: 'ICICI Bank', ifsc: 'ICIC0001234' };
      const state = loanReducer(initial, updateMandate(updated));
      expect(state.mandates).toHaveLength(1);
      expect(state.mandates[0].bank).toBe('ICICI Bank');
      expect(state.mandates[0].ifsc).toBe('ICIC0001234');
    });

    it('appends a new mandate if id not found', () => {
      const state = loanReducer(initial, updateMandate(mockMandate));
      expect(state.mandates).toHaveLength(2);
      expect(state.mandates[1].id).toBe('m99');
    });

    it('only updates the matched mandate, not others', () => {
      const withTwo = loanReducer(initial, updateMandate(mockMandate));
      const updated: Mandate = { ...mockMandate, bank: 'Axis Bank' };
      const state = loanReducer(withTwo, updateMandate(updated));
      expect(state.mandates[1].bank).toBe('Axis Bank');
      expect(state.mandates[0].bank).toBe('HDFC Bank');
    });
  });
});
