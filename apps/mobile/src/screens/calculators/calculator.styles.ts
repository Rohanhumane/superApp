import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

export const calcStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  // Header — just a back arrow
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
  },

  // Content
  content: { padding: 20, paddingBottom: 40 },

  // Sliders area — no background card, white bg matching Figma
  sliderArea: {
    marginTop: 16,
  },

  // Result area
  resultRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 24, paddingTop: 16,
    borderTopWidth: 1, borderTopColor: colors.border.light,
  },
  resultLabel: { color: colors.text.secondary },
  resultValue: { fontSize: 24, fontWeight: '700', color: colors.text.primary },

  // Breakdown
  breakdownRow: {
    flexDirection: 'row', marginTop: 20,
  },
  breakdownItem: { flex: 1, alignItems: 'center' },
  breakdownLabel: { color: colors.text.secondary, marginBottom: 4, textAlign: 'center' },
  breakdownValue: { fontWeight: '600', color: colors.text.primary },

  // Donut area
  donutArea: { alignItems: 'center', marginVertical: 20 },

  // Eligibility result card — blue border, light blue bg matching Figma
  eligibilityCard: {
    borderRadius: 12, padding: 24,
    marginTop: 20, alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1.5, borderColor: colors.primary.dark,
  },
  eligibilityAmount: { fontSize: 28, fontWeight: '700', color: colors.text.primary, marginTop: 4 },
  eligibilityLabel: { marginTop: 8, color: colors.text.secondary },

  // Apply button
  applyBtn: {},
});
