import { Platform, TextStyle } from 'react-native';
const ff = Platform.select({ ios: 'System', android: 'Roboto' });
type W = TextStyle['fontWeight'];
export const typography = {
  h1: { fontFamily: ff, fontSize: 28, fontWeight: '700' as W, lineHeight: 36 },
  h2: { fontFamily: ff, fontSize: 24, fontWeight: '700' as W, lineHeight: 32 },
  h3: { fontFamily: ff, fontSize: 20, fontWeight: '600' as W, lineHeight: 28 },
  h4: { fontFamily: ff, fontSize: 18, fontWeight: '600' as W, lineHeight: 24 },
  bodyLg: { fontFamily: ff, fontSize: 16, fontWeight: '400' as W, lineHeight: 24 },
  bodyMd: { fontFamily: ff, fontSize: 14, fontWeight: '400' as W, lineHeight: 20 },
  bodySm: { fontFamily: ff, fontSize: 12, fontWeight: '400' as W, lineHeight: 16 },
  labelLg: { fontFamily: ff, fontSize: 14, fontWeight: '600' as W, lineHeight: 20 },
  labelMd: { fontFamily: ff, fontSize: 12, fontWeight: '600' as W, lineHeight: 16 },
  labelSm: { fontFamily: ff, fontSize: 10, fontWeight: '600' as W, lineHeight: 14 },
  btnLg: { fontFamily: ff, fontSize: 16, fontWeight: '600' as W, lineHeight: 24 },
  caption: { fontFamily: ff, fontSize: 11, fontWeight: '400' as W, lineHeight: 14 },
  currency: { fontFamily: ff, fontSize: 20, fontWeight: '700' as W, lineHeight: 28 },
  currencySm: { fontFamily: ff, fontSize: 16, fontWeight: '600' as W, lineHeight: 24 },
} as const;
export type TypoKey = keyof typeof typography;
