import { StyleSheet } from 'react-native';
import { C } from './styles/shared';

export const appStyles = StyleSheet.create({
  // Splash
  splashScreen: { flex: 1, backgroundColor: C.navy, justifyContent: 'center', alignItems: 'center' },
  splashLogo: { width: 180, height: 100, resizeMode: 'contain' },
  splashLoader: {
    marginTop: 40, width: 120, height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2, overflow: 'hidden',
  },
  splashLoaderFill: { width: '100%', height: '100%', backgroundColor: C.green, borderRadius: 2 },

  // Error boundary
  errorScreen: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: C.white,
  },
  errorIcon: { fontSize: 48 },
  errorTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, color: C.black },
  errorMessage: { fontSize: 12, color: C.gray500, marginTop: 8, textAlign: 'center' },
});
