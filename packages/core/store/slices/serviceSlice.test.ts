import serviceReducer, {
  addTicket,
  setLeadStatus,
  ServiceTicket,
} from './serviceSlice';

const mockTicket: ServiceTicket = {
  id: '99', refId: 'IPR-0001', title: 'Change Bank Account',
  desc: 'Update auto-debit bank account details', category: 'payments',
  status: 'pending', created: '2026-03-22', updated: '2026-03-22',
  expected: '2026-03-25', loanId: '1',
};

describe('serviceSlice', () => {
  const initial = serviceReducer(undefined, { type: '' });

  describe('initial state', () => {
    it('has three default service tickets', () => {
      expect(initial.tickets).toHaveLength(3);
    });

    it('first ticket is Address Change in_progress', () => {
      expect(initial.tickets[0].title).toBe('Address Change');
      expect(initial.tickets[0].status).toBe('in_progress');
      expect(initial.tickets[0].category).toBe('account');
      expect(initial.tickets[0].refId).toBe('IPR-8997');
    });

    it('second ticket is Account Statement pending', () => {
      expect(initial.tickets[1].title).toBe('Account Statement');
      expect(initial.tickets[1].status).toBe('pending');
      expect(initial.tickets[1].category).toBe('documents');
    });

    it('third ticket is NOC Request resolved', () => {
      expect(initial.tickets[2].title).toBe('NOC Request');
      expect(initial.tickets[2].status).toBe('resolved');
    });

    it('has leadStatus as none', () => {
      expect(initial.leadStatus).toBe('none');
    });
  });

  describe('addTicket', () => {
    it('prepends new ticket to the front of the list', () => {
      const state = serviceReducer(initial, addTicket(mockTicket));
      expect(state.tickets[0].id).toBe('99');
      expect(state.tickets[0].refId).toBe('IPR-0001');
      expect(state.tickets).toHaveLength(4);
    });

    it('preserves existing tickets after adding', () => {
      const state = serviceReducer(initial, addTicket(mockTicket));
      expect(state.tickets[1].title).toBe('Address Change');
      expect(state.tickets[2].title).toBe('Account Statement');
      expect(state.tickets[3].title).toBe('NOC Request');
    });

    it('adding multiple tickets stacks newest first', () => {
      const ticketA: ServiceTicket = { ...mockTicket, id: 'A', title: 'Ticket A' };
      const ticketB: ServiceTicket = { ...mockTicket, id: 'B', title: 'Ticket B' };
      let state = serviceReducer(initial, addTicket(ticketA));
      state = serviceReducer(state, addTicket(ticketB));
      expect(state.tickets[0].title).toBe('Ticket B');
      expect(state.tickets[1].title).toBe('Ticket A');
    });

    it('stores all ticket fields correctly', () => {
      const state = serviceReducer(initial, addTicket(mockTicket));
      const added = state.tickets[0];
      expect(added.category).toBe('payments');
      expect(added.loanId).toBe('1');
      expect(added.expected).toBe('2026-03-25');
    });
  });

  describe('setLeadStatus', () => {
    it('sets leadStatus to in_progress', () => {
      const state = serviceReducer(initial, setLeadStatus('in_progress'));
      expect(state.leadStatus).toBe('in_progress');
    });

    it('sets leadStatus to completed', () => {
      const state = serviceReducer(initial, setLeadStatus('completed'));
      expect(state.leadStatus).toBe('completed');
    });

    it('sets leadStatus to rejected', () => {
      const state = serviceReducer(initial, setLeadStatus('rejected'));
      expect(state.leadStatus).toBe('rejected');
    });

    it('can reset leadStatus back to none', () => {
      let state = serviceReducer(initial, setLeadStatus('completed'));
      state = serviceReducer(state, setLeadStatus('none'));
      expect(state.leadStatus).toBe('none');
    });
  });
});
