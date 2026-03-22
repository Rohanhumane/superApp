import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { FormTemplate, Text, Button, MPINInput, colors } from '@nbfc/ui';
import { useAppDispatch, setMPINCreated, setCurrentMPIN, setAuthenticated, setBiometricEnabled } from '@nbfc/core';
import { mpin as s } from './auth.styles';

// ===== MPIN INTRO =====
export const MPINIntroScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }} style={s.backBtn}>
        <Text variant="h3">←</Text>
      </TouchableOpacity>
      <View style={s.centerArea}>
        <Text style={s.bigIcon}>🔑</Text>
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
    const weak = ['1234', '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'];
    if (weak.includes(mpin)) { setError('Please choose a more secure MPIN'); return; }
    setError('');
    navigation.navigate('MPINConfirm', { flow, mpin, isReset });
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
  const [error, setError] = useState('');

  const handleConfirm = (confirmed: string) => {
    if (confirmed !== original) { setError('MPIN does not match. Please try again.'); return; }
    setError('');
    dispatch(setCurrentMPIN(confirmed));
    dispatch(setMPINCreated());

    if (isReset) {
      navigation.navigate('SuccessScreen', {
        title: 'MPIN Reset Successfully',
        subtitle: "Please click the 'Login' button to proceed.",
        primaryBtn: { title: 'Login', route: 'MPINLogin' },
      });
    } else {
      navigation.navigate('BiometricSetup', { flow });
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
    dispatch(setAuthenticated({ accessToken: 'tok_' + Date.now(), refreshToken: 'ref_' + Date.now() }));
    if (flow === 'lead') {
      navigation.navigate('SuccessScreen', {
        title: 'Application Submitted Successfully',
        subtitle: 'Our team will review and contact you soon.',
        primaryBtn: { title: 'Go to Dashboard', route: 'MainTabs' },
      });
    } else {
      navigation.navigate('LoginSuccess', { flow });
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
        <Text style={s.bigIcon}>🪪</Text>
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
export const LoginSuccessScreen = ({ navigation }: any) => (
  <SafeAreaView style={s.screen}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <View style={s.centerArea}>
      <Text style={s.bigIcon}>✅</Text>
      <Text variant="h3" align="center" style={s.title}>Login Successful!</Text>
      <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.subtitle}>
        You can access your dashboard quickly and safely.
      </Text>
    </View>
    <View style={s.bottomBar}>
      <Button title="Go to dashboard" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })} />
    </View>
  </SafeAreaView>
);
