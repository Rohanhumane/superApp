import { StyleSheet } from 'react-native';
import { C } from '../../styles/shared';

export const serviceStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.white },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: C.borderLight,
  },
  headerTitle: { marginLeft: 12 },

  // Service request cards
  requestCard: {
    backgroundColor: C.white, borderRadius: 12, padding: 20,
    marginTop: 20, borderWidth: 1, borderColor: C.borderLight,
  },
  requestCardRow: { flexDirection: 'row', alignItems: 'center' },
  requestIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  createIcon: { backgroundColor: '#E8F5E9' },
  trackIcon: { backgroundColor: '#FFF3E0' },

  // Tabs (active/inactive loans)
  tabRow: {
    flexDirection: 'row', marginTop: 20,
    backgroundColor: C.bgPage, borderRadius: 20, padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 18, alignItems: 'center' },
  tabActive: { backgroundColor: C.navy },

  // Loan select card
  loanSelectCard: {
    backgroundColor: C.white, borderRadius: 12, padding: 16,
    marginTop: 16, borderWidth: 1, borderColor: C.borderLight,
  },
  loanSelectAmounts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },

  // Filter tabs
  filterRow: { flexDirection: 'row', padding: 16, gap: 8 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterActive: { backgroundColor: C.navy },

  // Ticket card
  ticketCard: {
    backgroundColor: C.white, borderRadius: 12, padding: 16,
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  ticketHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  ticketFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 8, paddingTop: 8,
    borderTopWidth: 1, borderTopColor: C.borderLight,
  },

  // Upload area
  uploadArea: {
    alignItems: 'center', paddingVertical: 20,
    borderWidth: 1, borderColor: C.borderLight,
    borderRadius: 12, borderStyle: 'dashed', marginTop: 8,
  },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 48 },

  // Knowledge center
  knowledgeCard: {
    flex: 1, alignItems: 'center', backgroundColor: C.white,
    borderRadius: 12, padding: 16,
  },

  // Support section
  supportSection: { alignItems: 'center', paddingVertical: 32 },
  supportIcon: { fontSize: 48 },
  supportBtnRow: { flexDirection: 'row', gap: 16, marginTop: 12 },
});
