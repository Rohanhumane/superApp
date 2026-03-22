import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceTicket {
  id: string; refId: string; title: string; desc: string; category: string; status: string;
  created: string; updated: string; expected: string; loanId: string;
}

interface ServiceState { tickets: ServiceTicket[]; leadStatus: string; }

const init: ServiceState = {
  tickets: [
    { id: '1', refId: 'IPR-8997', title: 'Address Change', desc: 'Update residential address in loan documents', category: 'account', status: 'in_progress', created: '2026-03-12', updated: '2026-03-14', expected: '2026-03-15', loanId: '1' },
    { id: '2', refId: 'IPR-8856', title: 'Account Statement', desc: 'Request loan statement for FY 2023-24', category: 'documents', status: 'pending', created: '2026-03-10', updated: '2026-03-10', expected: '2026-03-11', loanId: '1' },
    { id: '3', refId: 'IPR-8721', title: 'NOC Request', desc: 'No Objection Certificate for vehicle', category: 'documents', status: 'resolved', created: '2026-03-05', updated: '2026-03-08', expected: '2026-03-06', loanId: '1' },
  ],
  leadStatus: 'none',
};

const slice = createSlice({
  name: 'service', initialState: init,
  reducers: {
    addTicket(s, a: PayloadAction<ServiceTicket>) { s.tickets.unshift(a.payload); },
    setLeadStatus(s, a: PayloadAction<string>) { s.leadStatus = a.payload; },
  },
});
export const { addTicket, setLeadStatus } = slice.actions;
export default slice.reducer;
