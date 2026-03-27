import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

export const serviceStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  headerTitle: { marginLeft: 12 },

  // Service request cards
  requestCard: {
    backgroundColor: colors.white, borderRadius: 12, padding: 20,
    marginTop: 20, borderWidth: 1, borderColor: colors.border.light,
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
    backgroundColor: colors.bg.secondary, borderRadius: 20, padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 18, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary.dark },

  // Loan select card
  loanSelectCard: {
    backgroundColor: colors.white, borderRadius: 12, padding: 16,
    marginTop: 16, borderWidth: 1, borderColor: colors.border.light,
  },
  loanSelectAmounts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },

  // Filter tabs
  filterRow: { flexDirection: 'row', padding: 16, gap: 8 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterActive: { backgroundColor: colors.primary.dark },

  // Ticket card
  ticketCard: {
    backgroundColor: colors.white, borderRadius: 12, padding: 16,
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  ticketHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  ticketFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 8, paddingTop: 8,
    borderTopWidth: 1, borderTopColor: colors.border.light,
  },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: colors.border.light,
  },

  // Select Request Type - Radio rows
  radioRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  radioIconWrap: {
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#BDBDBD',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: colors.primary.dark,
  },
  radioInner: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: colors.primary.dark,
  },

  // Upload area
  uploadArea: {
    alignItems: 'center', paddingVertical: 20,
    borderWidth: 1, borderColor: colors.border.light,
    borderRadius: 12, borderStyle: 'dashed', marginTop: 8,
  },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 48 },

  // Knowledge center
  knowledgeCard: {
    flex: 1, alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 12, padding: 16,
  },
  playIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 1.5, borderColor: colors.primary.dark,
    alignItems: 'center', justifyContent: 'center',
  },

  // Support section
  supportSection: { alignItems: 'center', paddingVertical: 32 },
  supportIcon: { fontSize: 48 },
  supportBtnRow: { flexDirection: 'row', gap: 16, marginTop: 12 },
});
