import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, Image, Linking } from 'react-native';
import { Text, Button, MPINInput, SupportBar, AuthTemplate, Icon, colors } from '@nbfc/ui';
import { useAppDispatch, useAppSelector, setAuthenticated, incrementMPINAttempts } from '@nbfc/core';
import { APP_CONFIG } from '@nbfc/config';
import { subsequent as s } from './auth.styles';

const logo = require('../../assets/logo.png');

// ===== MPIN LOGIN =====
export const MPINLoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(st => st.user.profile.fullName);
  const { biometricEnabled, currentMPIN } = useAppSelector(st => st.auth);
  const [error, setError] = useState('');

  const handleLogin = (mpin: string) => {
    if (mpin === currentMPIN) {
      // setAuthenticated changes navKey → navigator remounts to authenticated stack with MainTabs as first screen
      dispatch(setAuthenticated({ accessToken: 'tok_' + Date.now(), refreshToken: 'ref_' + Date.now() }));
    } else {
      dispatch(incrementMPINAttempts());
      setError('Incorrect MPIN. Please try again.');
    }
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={s.logoBar}>
        <Image source={logo} style={s.logo} />
      </View>
      <View style={s.centerArea}>
        <View style={s.avatarCircle}>
          <Icon name="user" size={24} color={colors.primary.dark} />
        </View>
        <Text variant="h4" color={colors.text.secondary} style={s.welcomeText}>Welcome,</Text>
        <Text variant="h3">{userName}</Text>
        <View style={s.mpinBox}>
          <Text variant="labelMd" style={s.mpinLabel}>Login with mPIN</Text>
          <MPINInput secure onComplete={handleLogin} error={error} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotMPIN')} style={s.forgotLink}>
            <Text variant="labelMd" color={colors.primary.dark}>Forgot mPIN?</Text>
          </TouchableOpacity>
          {biometricEnabled && (
            <TouchableOpacity
              onPress={() => {
                dispatch(setAuthenticated({ accessToken: 'tok_' + Date.now(), refreshToken: 'ref_' + Date.now() }));
              }}
              style={s.faceIdBtn}
            >
              <Text variant="bodyMd" color={colors.text.secondary}><Icon name="face_id" size={16} color={colors.text.secondary} /> Use Face ID</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text variant="caption" color={colors.text.secondary} align="center" style={s.versionText}>
        App Ver {APP_CONFIG.APP_VERSION}
      </Text>
      <SupportBar
        items={[
          { id: 'support', label: 'Support', icon: 'support' },
          { id: 'call', label: 'Call Us', icon: 'phone' },
          { id: 'locate', label: 'Locate Us', icon: 'location' },
          { id: 'more', label: 'More', icon: 'more' },
        ]}
        onPress={(id: string) => {
          if (id === 'call') Linking.openURL('tel:18001234567');
          else if (id === 'support') Linking.openURL('mailto:support@skfinance.in');
          else if (id === 'locate') Linking.openURL('https://maps.google.com/?q=SK+Finance');
        }}
      />
    </SafeAreaView>
  );
};

// ===== FORGOT MPIN =====
export const ForgotMPINScreen = ({ navigation }: any) => {
  const masked = useAppSelector(st => st.auth.maskedMobile) || 'XXXXXX3210';
  return (
    <AuthTemplate
      title="Forgot mPIN"
      subtitle="To reset your MPIN, you need to verify your registered mobile number through OTP."
      onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      bottomContent={<Button title="Continue" onPress={() => navigation.navigate('OTPVerification', { flow: 'reset' })} />}
    >
      <View style={s.maskedBox}>
        <Text variant="caption" color={colors.text.secondary}>Registered Mobile Number</Text>
        <Text variant="labelLg" style={s.maskedLabel}>{masked}</Text>
      </View>
    </AuthTemplate>
  );
};

// ===== ACCOUNT LOCKED =====
export const AccountLockedScreen = ({ navigation }: any) => (
  <SafeAreaView style={s.screen}>
    <StatusBar barStyle="dark-content" />
    <View style={s.centerArea}>
      <Icon name="lock" size={80} color={colors.primary.dark} />
      <Text variant="h3" align="center" style={s.lockTitle}>Account temporarily locked</Text>
      <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.lockSubtitle}>
        Too many incorrect PIN attempts. For your security, access has been locked. Try again after 30 minutes.
      </Text>
    </View>
    <View style={s.bottomBar}>
      <Button title="Reset MPIN" onPress={() => navigation.navigate('ForgotMPIN')} />
      <TouchableOpacity style={s.supportLink} onPress={() => Linking.openURL('tel:18001234567')}>
        <Text variant="labelMd" color={colors.text.secondary}><Icon name="phone" size={14} color={colors.text.secondary} /> Call Support</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// ===== SESSION EXPIRED =====
export const SessionExpiredScreen = ({ navigation }: any) => (
  <SafeAreaView style={s.screen}>
    <StatusBar barStyle="dark-content" />
    <View style={s.centerArea}>
      <Icon name="timer" size={80} color={colors.primary.dark} />
      <Text variant="h3" align="center" style={s.lockTitle}>Session expired</Text>
      <Text variant="bodyMd" color={colors.text.secondary} align="center" style={s.lockSubtitle}>
        For your security, you've been logged out due to inactivity. Please log in again to continue.
      </Text>
    </View>
    <View style={s.bottomBar}>
      <Button title="Log in again" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MPINLogin' }] })} />
    </View>
  </SafeAreaView>
);
