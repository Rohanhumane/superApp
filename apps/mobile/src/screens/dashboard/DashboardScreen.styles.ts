import { StyleSheet } from 'react-native';
import { C, SCREEN_WIDTH } from '../../styles/shared';

export const ds = StyleSheet.create({
  // ETB card
  card: {
    backgroundColor: C.white, borderRadius: 8, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },

  // Navy section (continuous header for Lead/NTB)
  navySection: { backgroundColor: C.navy, paddingTop: 8 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8 },
  avatarCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Hero content
  heroContent: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, minHeight: 140,
  },
  carArea: { width: 100, height: 80, justifyContent: 'center', alignItems: 'center' },
  applyBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.white,
    borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14,
    alignSelf: 'flex-start', marginTop: 14,
  },
  applyBtnIcon: {
    width: 18, height: 18, borderRadius: 9, backgroundColor: C.navy,
    alignItems: 'center', justifyContent: 'center', marginLeft: 6,
  },

  // Dots
  dotOn: { width: 20, height: 5, borderRadius: 3, backgroundColor: C.white },
  dotOff: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 20, gap: 6 },

  // White content area
  contentArea: { backgroundColor: C.bgPage, paddingTop: 20 },

  // Status card
  statusCard: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.white,
    borderRadius: 8, padding: 16, marginHorizontal: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  statusIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EBEBEB', alignItems: 'center', justifyContent: 'center',
  },
  orangeBtn: {
    backgroundColor: C.warning, borderRadius: 16,
    paddingVertical: 7, paddingHorizontal: 18,
    alignSelf: 'flex-start', marginTop: 10,
  },

  // Products
  sectionTitle: {
    fontSize: 16, fontWeight: '600', color: C.black,
    paddingHorizontal: 16, marginTop: 24, marginBottom: 12,
  },
  prodItem: { width: (SCREEN_WIDTH - 48) / 4, alignItems: 'center', marginBottom: 20 },

  // Tools
  toolCard: {
    flex: 1, backgroundColor: C.white, borderRadius: 8, padding: 16,
    minHeight: 140, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  toolBubble: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },

  // Support
  supIcon: {
    width: 48, height: 48, borderRadius: 24,
    borderWidth: 1.5, borderColor: '#3D3D3A',
    alignItems: 'center', justifyContent: 'center',
  },
});
