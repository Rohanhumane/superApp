import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

export const leadStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  // Product Page - Navy header
  heroSection: {
    backgroundColor: colors.primary.dark, paddingHorizontal: 20,
    paddingTop: 10, paddingBottom: 40,
  },
  heroLogo: { width: 70, height: 35, resizeMode: 'contain', marginBottom: 16, alignSelf: 'flex-start' },
  heroTitle: { lineHeight: 28 },
  heroSubtitle: { opacity: 0.7, marginTop: 4 },
  applyPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16,
    alignSelf: 'flex-start', marginTop: 16,
  },

  // Product grid area
  productsArea: { padding: 20, backgroundColor: colors.bg.secondary },
  productsTitle: { marginBottom: 16 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  toolsRow: { flexDirection: 'row', gap: 12 },
  toolCard: {
    flex: 1, backgroundColor: colors.white, borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  toolIcon: { fontSize: 32, marginTop: 8 },

  // Product Detail
  backBtn: { marginBottom: 8 },
  detailIcon: { alignItems: 'center', marginVertical: 32 },
  detailIconText: { fontSize: 64 },
  detailDesc: { marginTop: 16, lineHeight: 22 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  featureCheck: { marginRight: 8 },
  bottomBar: { padding: 16 },

  // KYC Form
  dobField: { marginBottom: 16 },
  dobLabelRow: { flexDirection: 'row', marginBottom: 8 },
  dobInput: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderRadius: 8, backgroundColor: colors.bg.secondary,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  dobInputError: { borderColor: colors.text.error },
  dobInputNormal: { borderColor: colors.border.light },
  dobPlaceholder: { flex: 1 },
  dobIcon: {},

  // Date picker modal
  dateModal: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  dateModalContent: {
    backgroundColor: colors.white, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: 20, paddingBottom: 40,
  },
  dateModalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
  },
  dateColumnsRow: { flexDirection: 'row', gap: 12 },
  dateColumn: { borderWidth: 1, borderColor: colors.border.light, borderRadius: 8, height: 150 },
  dateColumnLabel: { marginBottom: 4 },
  dateItem: { padding: 10, borderRadius: 4 },
  dateItemSelected: { backgroundColor: colors.primary.dark },
});
