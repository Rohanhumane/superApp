import React, { useState } from 'react';
import { AuthTemplate, PhoneInput, Button } from '@nbfc/ui';
import { useAppDispatch, setMobileNumber, setOTPSent } from '@nbfc/core';
import { validators } from '@nbfc/utils';

export const LoginMobileScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  const productId = route.params?.productId || '';
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const isETB = flow === 'etb';

  const handleGetOTP = () => {
    if (!validators.isValidMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    dispatch(setMobileNumber(mobile));
    dispatch(setOTPSent());
    navigation.navigate('OTPVerification', { flow, mobile, productId });
  };

  return (
    <AuthTemplate
      title={isETB ? 'Welcome back' : 'Get started'}
      subtitle={isETB ? 'Enter the phone number associated with your SK Finance account' : "We'll send a secure OTP to verify your number."}
      onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      showTerms
      bottomContent={<Button title={isETB ? 'Get Started' : 'Get OTP'} onPress={handleGetOTP} disabled={mobile.length < 10} />}
    >
      <PhoneInput value={mobile} onChangeText={t => { setMobile(t); setError(''); }} error={error} />
    </AuthTemplate>
  );
};
