import { StyleSheet, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// SK Finance brand colors (single source of truth)
export const C = {
  navy: '#1B2B5E',
  green: '#2D8B57',
  orange: '#F5A623',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray1: '#F8F8F8',
  gray2: '#F5F5F5',
  gray3: '#E8E8E8',
  gray4: '#CCCCCC',
  gray5: '#999999',
  gray6: '#666666',
  gray7: '#333333',
  error: '#E53935',
  success: '#2D8B57',
  warning: '#F5A623',
  info: '#1565C0',
  bgInput: '#F8F8F8',
  bgCard: '#FFFFFF',
  bgPage: '#F5F5F5',
  borderLight: '#E8E8E8',
  borderFocus: '#1B2B5E',
};

// Reusable layout patterns
export const shared = StyleSheet.create({
  // Screen containers
  screen: { flex: 1, backgroundColor: C.white },
  screenGray: { flex: 1, backgroundColor: C.bgPage },

  // Headers
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: C.borderLight,
  },
  headerTitle: { marginLeft: 12, fontSize: 16, fontWeight: '600', color: C.black },

  // Cards
  card: {
    backgroundColor: C.white, borderRadius: 14, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  cardFlat: {
    backgroundColor: C.white, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: C.borderLight,
  },

  // Rows
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  // Sections
  sectionTitle: { fontSize: 16, fontWeight: '600', color: C.black, paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },

  // Bottom button area
  bottomBar: {
    paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: C.borderLight,
  },

  // Center content
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },

  // Divider
  divider: { height: 1, backgroundColor: C.borderLight, marginVertical: 16 },
});
