import React from 'react';
import { View } from 'react-native';
import { MPINInput } from './MPINInput';

export default { title: 'Molecules/MPINInput', component: MPINInput };

export const SetMPIN = () => (
  <View style={{ padding: 16 }}>
    <MPINInput label="Enter MPIN" onComplete={(mpin) => console.log('MPIN:', mpin)} />
  </View>
);

export const SecureMode = () => (
  <View style={{ padding: 16 }}>
    <MPINInput label="Login with mPIN" secure onComplete={() => {}} />
  </View>
);

export const WithError = () => (
  <View style={{ padding: 16 }}>
    <MPINInput label="Confirm MPIN" onComplete={() => {}} error="MPIN does not match" />
  </View>
);
