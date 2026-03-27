import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

export const paymentStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  headerTitle: { marginLeft: 12 },

  // Tabs
  tabRow: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 12 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  tabActive: { backgroundColor: '#1EA862' },
  tabInactive: { backgroundColor: 'transparent' },

  // Loan card in details
  loanCard: {
    backgroundColor: colors.white, borderRadius: 8, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  loanHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  loanAmounts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  loanActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },

  // Mandate card
  mandateCard: {
    backgroundColor: colors.white, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: colors.border.light,
  },
  mandateHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  mandateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  changeBankBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12,
  },

  // Bank account form
  accountTypeRow: { flexDirection: 'row', gap: 12 },
  accountTypeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 8, borderWidth: 1,
  },
  accountTypeBtnActive: { borderColor: colors.primary.base },
  accountTypeBtnInactive: { borderColor: colors.border.light },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.base },

  // NACH section
  nachCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 8, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  nachIcon: { fontSize: 24, marginRight: 12 },

  // Warning box
  warningBox: {
    backgroundColor: '#FFF8E1', borderRadius: 8, padding: 12,
    marginTop: 16, borderWidth: 1, borderColor: '#FFE082',
  },

  // Authorize - detail row
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});
