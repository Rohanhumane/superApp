import { StyleSheet } from 'react-native';
import { colors } from '@nbfc/ui';

// ===== WELCOME SCREEN =====
export const welcome = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  logoArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 80, resizeMode: 'contain' as const },
  appName: { marginTop: 24 },
  bottomArea: { paddingHorizontal: 20, paddingBottom: 32 },
  btnGap: { height: 12 },
  terms: { marginTop: 20 },
});

// ===== OTP VERIFICATION =====
export const otp = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  kav: { flex: 1 },
  backBtn: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  subtitle: { marginTop: 8, lineHeight: 22 },
  otpArea: { marginTop: 24 },
  timerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  timerLeft: { flexDirection: 'row', alignItems: 'center' },
  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  bottomBar: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12 },
});

// ===== MPIN SCREENS =====
export const mpin = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  backBtn: { padding: 16 },
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  bigIcon: { fontSize: 80 },
  title: { marginTop: 20 },
  subtitle: { marginTop: 8 },
  bottomBar: { paddingHorizontal: 20, paddingBottom: 24 },
  // Biometric
  skipRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 12 },
  skipBtn: { padding: 8 },
});

// ===== SUBSEQUENT LOGIN =====
export const subsequent = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  logoBar: { padding: 20 },
  logo: { width: 80, height: 40, resizeMode: 'contain' as const },
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  avatarCircle: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2, borderColor: colors.primary.dark,
    alignItems: 'center', justifyContent: 'center',
  },
  welcomeText: { marginTop: 16 },
  mpinBox: {
    width: '100%', marginTop: 32,
    backgroundColor: colors.bg.secondary, borderRadius: 16, padding: 20,
  },
  mpinLabel: { marginBottom: 16 },
  forgotLink: { marginTop: 16 },
  faceIdBtn: { alignSelf: 'center', marginTop: 16 },
  versionText: { marginBottom: 12 },
  bottomBar: { paddingHorizontal: 20, paddingBottom: 24 },
  // Forgot
  maskedBox: { backgroundColor: colors.bg.secondary, borderRadius: 12, padding: 16 },
  maskedLabel: { marginTop: 4 },
  // Locked / Expired
  bigIcon: { fontSize: 80 },
  lockTitle: { marginTop: 20 },
  lockSubtitle: { marginTop: 8 },
  supportLink: { alignSelf: 'center', marginTop: 16 },
});
