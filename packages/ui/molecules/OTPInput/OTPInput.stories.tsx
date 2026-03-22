import React from 'react';
import { View } from 'react-native';
import { OTPInput } from './OTPInput';
import { Text } from '../../atoms/Text';

export default { title: 'Molecules/OTPInput', component: OTPInput };

export const FiveDigitLogin = () => (
  <View style={{ padding: 16 }}>
    <Text variant="h4" style={{ marginBottom: 12 }}>Login OTP (5 digits, auto-submit)</Text>
    <OTPInput length={5} onComplete={(otp) => console.log('OTP:', otp)} autoSubmit />
  </View>
);

export const SixDigitVerify = () => (
  <View style={{ padding: 16 }}>
    <Text variant="h4" style={{ marginBottom: 12 }}>Verify OTP (6 digits, manual submit)</Text>
    <OTPInput length={6} onComplete={(otp) => console.log('OTP:', otp)} />
  </View>
);

export const WithError = () => (
  <View style={{ padding: 16 }}>
    <OTPInput length={5} onComplete={() => {}} error="Invalid OTP. Please try again." />
  </View>
);
