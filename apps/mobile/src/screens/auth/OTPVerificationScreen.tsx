import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { OTPInput, Button, Text, colors, sp } from '@nbfc/ui';
import { useAppDispatch, useAppSelector, setOTPVerified } from '@nbfc/core';
import { APP_CONFIG } from '@nbfc/config';
import { otp as s } from './auth.styles';

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { flow = 'etb', verifyType, mobile, email, productId } = route.params || {};
  const dispatch = useAppDispatch();
  const maskedMobile = useAppSelector(st => st.auth.maskedMobile);
  const authMobile = useAppSelector(st => st.auth.mobileNumber);

  const isVerify = verifyType === 'email' || verifyType === 'mobile';
  const isReset = flow === 'reset';
  const otpLen = isVerify ? APP_CONFIG.OTP_LENGTH_VERIFY : APP_CONFIG.OTP_LENGTH_LOGIN;
  const timerDuration = isVerify ? APP_CONFIG.OTP_EXPIRY_TIMER : APP_CONFIG.OTP_RESEND_TIMER;

  const [timer, setTimer] = useState(timerDuration);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const t = setInterval(() => setTimer(p => p - 1), 1000);
      return () => clearInterval(t);
    }
  }, [timer]);

  const formatTime = (sec: number) =>
    `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;

  const handleComplete = (entered: string) => {
    setOtp(entered);
    if (!isVerify) handleVerify(entered);
  };

  const handleVerify = (_o?: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (isVerify) {
        navigation.navigate('SuccessScreen', {
          title: 'Request Submitted Successfully',
          subtitle: verifyType === 'email'
            ? `Your email address will be updated within ${APP_CONFIG.PROFILE_UPDATE_HOURS} hours.`
            : `Your mobile number will be updated within ${APP_CONFIG.PROFILE_UPDATE_HOURS} hours.`,
          primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' },
          secondaryBtn: { title: 'Back to Home', route: 'MainTabs' },
        });
        return;
      }

      if (isReset) {
        navigation.navigate('MPINSetup', { flow: 'reset', isReset: true });
        return;
      }

      dispatch(setOTPVerified({ userType: flow === 'lead' ? 'lead' : flow === 'ntb' ? 'ntb' : 'etb' }));
      if (flow === 'etb') {
        navigation.navigate('MPINIntro', { flow });
      } else {
        navigation.navigate('KYCForm', { flow, productId });
      }
    }, 800);
  };

  const getTitle = () => {
    if (verifyType === 'email') return 'Verify Your Email';
    if (verifyType === 'mobile') return 'Verify Mobile Number';
    if (isReset) return 'Verify Your Identity';
    return 'We just sent you an SMS';
  };

  const getDisplayContact = () => {
    if (verifyType === 'email') return email || 'your email';
    if (verifyType === 'mobile') return mobile || 'your number';
    return maskedMobile || `xxx${authMobile?.slice(-4) || '3210'}`;
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }} style={s.backBtn}>
          <Text variant="h3">{isVerify ? '←' : '✕'}</Text>
        </TouchableOpacity>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
          <Text variant="h2">{getTitle()}</Text>
          <Text variant="bodyMd" color={colors.text.secondary} style={s.subtitle}>
            Enter the {otpLen}-digit code {isVerify ? 'sent to' : 'we sent to'}{' '}
            <Text variant="labelMd" color={colors.text.primary}>{getDisplayContact()}</Text>
          </Text>

          <View style={s.otpArea}>
            <OTPInput length={otpLen} onComplete={handleComplete} autoSubmit={!isVerify} />
          </View>

          {isVerify ? (
            <View style={s.timerRow}>
              <View style={s.timerLeft}>
                <Text variant="bodySm" color={colors.text.secondary}>🕐 Code expires in </Text>
                <Text variant="labelMd" color={colors.text.primary}>{formatTime(timer)}</Text>
              </View>
              <TouchableOpacity>
                <Text variant="labelMd" color={colors.primary.dark}>Need Help?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={s.resendRow}>
              {timer > 0 ? (
                <Text variant="bodySm" color={colors.text.secondary}>
                  Didn't receive it?{' '}
                  <Text variant="labelMd" color={colors.primary.dark}>Resend in {timer} secs</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={() => setTimer(timerDuration)}>
                  <Text variant="labelMd" color={colors.primary.dark}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        {isVerify && (
          <View style={s.bottomBar}>
            <Button title="Submit" onPress={() => handleVerify()} disabled={otp.length < otpLen} loading={loading} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
