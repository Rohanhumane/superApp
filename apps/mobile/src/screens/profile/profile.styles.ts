import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

export const profileStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  headerTitle: { marginLeft: 12 },

  // Avatar section
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarName: { marginTop: 12 },

  // Section label
  sectionLabel: { paddingHorizontal: 16, marginBottom: 8, marginTop: 12 },

  // Personal info
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { marginBottom: 4 },
  fieldRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  eyeIcon: { marginLeft: 8 },

  // Update links
  updateRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },

  // Disclaimer box
  disclaimer: {
    backgroundColor: colors.bg.secondary, borderRadius: 8, padding: 12,
    flexDirection: 'row', marginTop: 20,
  },
  disclaimerIcon: { marginRight: 8 },

  // Update mobile/email
  formTitle: { marginBottom: 8 },
  formSubtitle: { marginBottom: 24, lineHeight: 22 },
  bottomBar: {
    paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: colors.border.light,
  },

  // Mandate info box
  infoBox: {
    backgroundColor: '#FFF8E1', borderRadius: 8, padding: 12,
    marginTop: 16, borderWidth: 1, borderColor: '#FFE082',
  },

  // Refer form
  referFormArea: { padding: 20 },

  // Customer care
  careHeader: { alignItems: 'center', paddingVertical: 48 },
  careIcon: { fontSize: 64 },
  careTitle: { marginTop: 16 },
  optionsLabel: { paddingHorizontal: 20, marginBottom: 12 },
});
