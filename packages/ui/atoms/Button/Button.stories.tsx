import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';

export default { title: 'Atoms/Button', component: Button };

export const AllVariants = () => (
  <View style={{ padding: 16, gap: 12 }}>
    <Button title="Primary — Get OTP" onPress={() => {}} />
    <Button title="Secondary — Log in" onPress={() => {}} variant="secondary" />
    <Button title="Outline — Cancel" onPress={() => {}} variant="outline" />
    <Button title="Orange — Contact Support" onPress={() => {}} variant="orange" />
    <Button title="Link — Skip" onPress={() => {}} variant="link" />
    <Button title="Disabled" onPress={() => {}} disabled />
    <Button title="Loading..." onPress={() => {}} loading />
    <Button title="Small Width" onPress={() => {}} fullWidth={false} />
  </View>
);
