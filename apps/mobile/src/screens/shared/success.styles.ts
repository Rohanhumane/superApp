import { StyleSheet } from 'react-native';
import { C } from '../../styles/shared';

export const successStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.white },
  content: { flexGrow: 1 },
  centerArea: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 32, paddingVertical: 40,
  },

  // Check icon — large stylized checkmark matching Figma
  checkCircle: {
    width: 100, height: 100, borderRadius: 20,
    backgroundColor: '#C9EEDC',
    alignItems: 'center', justifyContent: 'center', marginBottom: 28,
  },
  checkIcon: { fontSize: 40, lineHeight: 52, color: '#0C8749' },

  // Title
  title: { marginBottom: 8 },
  subtitle: { marginBottom: 24, lineHeight: 22, paddingHorizontal: 16 },

  // Details card
  detailsCard: {
    width: '100%', marginTop: 8, padding: 16,
    borderWidth: 1, borderColor: C.borderLight,
    borderRadius: 12, backgroundColor: C.bgPage,
  },
  detailsHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 12, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: C.borderLight,
  },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10,
  },
  detailDivider: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },

  // Bottom buttons
  bottomBar: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12 },
  secondaryBtn: { marginTop: 16, alignSelf: 'center', paddingVertical: 8 },
});
