import { StyleSheet, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// SK Finance brand colors (single source of truth — matches Styles and Themes doc)
export const C = {
  navy: '#1A1C4D',
  blue: '#2E3192',
  blueLight: '#EDEFFB',
  green: '#1EA862',
  greenDark: '#0C8749',
  greenLight: '#C9EEDC',
  white: '#FFFFFF',
  black: '#212121',
  gray50: '#FAFAFA',
  gray200: '#E0E0E0',
  gray500: '#757575',
  error: '#D32F2F',
  success: '#0C8749',
  warning: '#E65100',
  info: '#1A1C4D',
  bgCard: '#FFFFFF',
  bgPage: '#FAFAFA',
  borderLight: '#E0E0E0',
  borderFocus: '#2E3192',
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

  // Cards (radius 8, padding 16, level 1 shadow per style guide)
  card: {
    backgroundColor: C.white, borderRadius: 8, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  cardFlat: {
    backgroundColor: C.white, borderRadius: 8, padding: 16,
    borderWidth: 1, borderColor: C.borderLight,
  },

  // Rows
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  // Sections
  sectionTitle: { fontSize: 16, fontWeight: '600', color: C.black, paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },

  // Bottom button area
  bottomBar: {
    paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: C.borderLight,
  },

  // Center content
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },

  // Divider
  divider: { height: 1, backgroundColor: C.borderLight, marginVertical: 16 },
});
