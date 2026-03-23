import React, { useState, useRef } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { FormTemplate, Text, Button, MPINInput, Icon, colors } from '@nbfc/ui';
import { useAppDispatch, useAppSelector, setMPINCreated, setCurrentMPIN, setAuthenticated, setBiometricEnabled } from '@nbfc/core';
import { mpin as s } from './auth.styles';

// ===== MPIN INTRO =====
export const MPINIntroScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }} style={s.backBtn}>
        <Icon name="back" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <View style={s.centerArea}>
        <Icon name="key" size={80} color={colors.primary.dark} />
        <Text variant="h3" align="center" style={s.title}>Set Your App MPIN</Text>
        <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.subtitle}>
          Create a 4-digit PIN for quick login
        </Text>
      </View>
      <View style={s.bottomBar}>
        <Button title="Continue" onPress={() => navigation.navigate('MPINSetup', { flow })} />
      </View>
    </SafeAreaView>
  );
};

// ===== MPIN SETUP =====
export const MPINSetupScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  const isReset = route.params?.isReset || false;
  const [mpin, setMpin] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (mpin.length < 4) { setError('Please enter 4-digit MPIN'); return; }
    // All same digits (0000, 1111, etc.)
    if (/^(\d)\1{3}$/.test(mpin)) { setError('MPIN cannot have all same digits'); return; }
    // Sequential ascending (1234, 2345, etc.) or descending (9876, 4321, etc.)
    const isSeq = (s: string, dir: number) => s.split('').every((c, i, a) => i === 0 || Number(c) - Number(a[i - 1]) === dir);
    if (isSeq(mpin, 1) || isSeq(mpin, -1)) { setError('MPIN cannot be a sequential number'); return; }
    // All 4 digits must be unique (no repeats like 1333, 1212, 2212)
    if (new Set(mpin).size < 4) { setError('All 4 digits must be different'); return; }
    setError('');
    navigation.replace('MPINConfirm', { flow, mpin, isReset });
  };

  return (
    <FormTemplate title={isReset ? 'Set New MPIN' : 'Set MPIN'}
      subtitle="Create a 4-digit MPIN for quick and secure access to your account."
      onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="Next" onSubmit={handleNext} btnDisabled={mpin.length < 4}>
      <MPINInput label="Enter MPIN" onComplete={m => { setMpin(m); setError(''); }} error={error} />
    </FormTemplate>
  );
};

// ===== MPIN CONFIRM =====
export const MPINConfirmScreen = ({ navigation, route }: any) => {
  const { flow = 'etb', mpin: original, isReset } = route.params || {};
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(st => st.auth.status === 'authenticated');
  const [error, setError] = useState('');
  const hasNavigated = useRef(false);

  const handleConfirm = (confirmed: string) => {
    if (hasNavigated.current) return;
    if (confirmed !== original) { setError('MPIN does not match. Please try again.'); return; }
    hasNavigated.current = true;
    setError('');
    dispatch(setCurrentMPIN(confirmed));
    if (!isReset) {
      dispatch(setMPINCreated());
    }

    if (isReset && isAuthenticated) {
      // Change MPIN while logged in — stay authenticated, go back to dashboard
      navigation.replace('SuccessScreen', {
        title: 'MPIN Changed Successfully',
        subtitle: 'Your new MPIN is now active.',
        primaryBtn: { title: 'Back to Home', route: 'MainTabs' },
      });
    } else if (isReset) {
      // Forgot MPIN from locked/returning screen — send to login
      navigation.replace('SuccessScreen', {
        title: 'MPIN Reset Successfully',
        subtitle: "Please click the 'Login' button to proceed.",
        primaryBtn: { title: 'Login', route: 'MPINLogin' },
      });
    } else {
      navigation.replace('BiometricSetup', { flow });
    }
  };

  return (
    <FormTemplate title="Confirm MPIN" subtitle="Enter the same 4-digit MPIN again to confirm."
      onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="" onSubmit={() => {}}>
      <MPINInput label="Confirm MPIN" onComplete={handleConfirm} error={error} />
    </FormTemplate>
  );
};

// ===== BIOMETRIC SETUP =====
export const BiometricSetupScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  const dispatch = useAppDispatch();

  const completeSetup = (biometric: boolean) => {
    dispatch(setBiometricEnabled(biometric));
    // DO NOT dispatch setAuthenticated here — it remounts the navigator via key={navKey},
    // destroying this screen before navigation can complete. Authentication is triggered
    // in LoginSuccess / SuccessScreen when the user taps the final button.
    if (flow === 'lead') {
      navigation.replace('SuccessScreen', {
        title: 'Application Submitted Successfully',
        subtitle: 'Our team will review and contact you soon.',
        primaryBtn: { title: 'Go to Dashboard', route: 'MainTabs' },
        completeAuth: true,
      });
    } else {
      // replace removes BiometricSetup from stack — only LoginSuccess remains,
      // so no previous MPIN screens flash when navigator remounts on authentication
      navigation.replace('LoginSuccess', { flow });
    }
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={s.skipRow}>
        <TouchableOpacity onPress={() => completeSetup(false)} style={s.skipBtn}>
          <Text variant="labelMd" color={colors.text.secondary}>SKIP ›</Text>
        </TouchableOpacity>
      </View>
      <View style={s.centerArea}>
        <Icon name="face_id" size={80} color={colors.primary.dark} />
        <Text variant="h3" align="center" style={s.title}>Enable Face ID</Text>
        <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.subtitle}>
          Use Face ID for faster, secure access. You can change this anytime in settings.
        </Text>
      </View>
      <View style={s.bottomBar}>
        <Button title="Enable Face ID" onPress={() => completeSetup(true)} />
      </View>
    </SafeAreaView>
  );
};

// ===== LOGIN SUCCESS =====
export const LoginSuccessScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const handleGo = () => {
    dispatch(setAuthenticated({ accessToken: 'tok_' + Date.now(), refreshToken: 'ref_' + Date.now() }));
    // Explicitly reset to MainTabs — this navigates immediately on the current stack.
    // The key-based remount will also fire, creating a fresh authenticated stack at MainTabs.
    // Both point to MainTabs so the transition is seamless.
    try { navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }); } catch (_) {}
  };
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={s.centerArea}>
        <Icon name="success" size={80} color={colors.secondary.base} />
        <Text variant="h3" align="center" style={s.title}>Login Successful!</Text>
        <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.subtitle}>
          You can access your dashboard quickly and safely.
        </Text>
      </View>
      <View style={s.bottomBar}>
        <Button title="Go to dashboard" onPress={handleGo} />
      </View>
    </SafeAreaView>
  );
};
