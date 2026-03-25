import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceTicket {
  id: string; refId: string; title: string; desc: string; category: string; status: string;
  created: string; updated: string; expected: string; loanId: string;
}

interface ServiceState { tickets: ServiceTicket[]; leadStatus: string; }

const init: ServiceState = {
  tickets: [],
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
