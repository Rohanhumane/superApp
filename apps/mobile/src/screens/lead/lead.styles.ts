import { StyleSheet } from 'react-native';
import { C } from '../../styles/shared';

export const leadStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.white },

  // Product Page - Navy header
  heroSection: {
    backgroundColor: C.navy, padding: 20,
    paddingTop: 32, paddingBottom: 40,
  },
  heroLogo: { width: 80, height: 40, resizeMode: 'contain', marginBottom: 16 },
  heroTitle: { lineHeight: 28 },
  heroSubtitle: { opacity: 0.7, marginTop: 4 },
  applyPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.white,
    borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16,
    alignSelf: 'flex-start', marginTop: 16,
  },

  // Product grid area
  productsArea: { padding: 20, backgroundColor: C.bgPage },
  productsTitle: { marginBottom: 16 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  toolsRow: { flexDirection: 'row', gap: 12 },
  toolCard: {
    flex: 1, backgroundColor: C.white, borderRadius: 12,
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
    borderRadius: 8, backgroundColor: C.gray50,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  dobInputError: { borderColor: C.error },
  dobInputNormal: { borderColor: C.borderLight },
  dobPlaceholder: { flex: 1 },
  dobIcon: {},

  // Date picker modal
  dateModal: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  dateModalContent: {
    backgroundColor: C.white, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: 20, paddingBottom: 40,
  },
  dateModalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
  },
  dateColumnsRow: { flexDirection: 'row', gap: 12 },
  dateColumn: { borderWidth: 1, borderColor: C.borderLight, borderRadius: 8, height: 150 },
  dateColumnLabel: { marginBottom: 4 },
  dateItem: { padding: 10, borderRadius: 4 },
  dateItemSelected: { backgroundColor: C.navy },
});
