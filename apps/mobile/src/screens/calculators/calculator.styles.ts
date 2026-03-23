import { StyleSheet } from 'react-native';
import { C } from '../../styles/shared';

export const calcStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.white },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: C.borderLight,
  },
  headerTitle: { marginLeft: 12 },

  // Content
  content: { padding: 20, paddingBottom: 40 },

  // Sliders area
  sliderArea: {
    backgroundColor: C.bgPage, borderRadius: 12, padding: 16, marginTop: 16,
  },
  sliderHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  sliderValueBadge: {
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 14, borderWidth: 1, borderColor: C.borderLight,
  },
  sliderTrack: {
    height: 4, backgroundColor: C.borderLight,
    borderRadius: 2, overflow: 'hidden',
  },
  sliderFill: { height: '100%', backgroundColor: C.green, borderRadius: 2 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },

  // Result area
  resultRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 20,
  },
  resultLabel: { color: C.gray500 },
  resultValue: { fontSize: 24, fontWeight: '700', color: C.green },

  // Breakdown
  breakdownRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginTop: 16, paddingTop: 16,
    borderTopWidth: 1, borderTopColor: C.borderLight,
  },
  breakdownItem: { alignItems: 'center' },
  breakdownLabel: { color: C.gray500, marginBottom: 4 },
  breakdownValue: { fontWeight: '600' },

  // Donut area
  donutArea: { alignItems: 'center', marginVertical: 16 },

  // Eligibility result
  eligibilityCard: {
    backgroundColor: C.bgPage, borderRadius: 12, padding: 20,
    marginTop: 16, alignItems: 'center',
  },
  eligibilityAmount: { fontSize: 28, fontWeight: '700', color: C.green, marginTop: 8 },
  eligibilityLabel: { marginTop: 4, color: C.gray500 },

  // Apply button
  applyBtn: { marginTop: 20 },
});
