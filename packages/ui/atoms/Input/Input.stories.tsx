import React from 'react';
import { View } from 'react-native';
import { Input } from './Input';
import { Text } from '../Text';

export default { title: 'Atoms/Input', component: Input };

export const AllStates = () => (
  <View style={{ padding: 16, gap: 4 }}>
    <Input label="Full Name" required placeholder="e.g Rahul Sharma" value="" onChangeText={() => {}} />
    <Input label="PAN Number" placeholder="ABCDE1234F" value="CNZPD5786D" onChangeText={() => {}} />
    <Input label="Email" error="Invalid email address" value="invalid" onChangeText={() => {}} />
    <Input label="Disabled Field" value="Cannot edit" disabled onChangeText={() => {}} />
    <Input label="With Icon" placeholder="DD/MM/YYYY" value="" onChangeText={() => {}} rightIcon={<Text variant="bodyMd">📅</Text>} />
  </View>
);
