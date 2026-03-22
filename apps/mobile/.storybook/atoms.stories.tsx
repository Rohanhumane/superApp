import React from 'react';
import { View } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge, Avatar, Checkbox, RadioButton } from '../atoms/FormElements';

// ===== TEXT STORIES =====
export default { title: 'Atoms' };

export const Typography = () => (
  <View style={{ padding: 16, gap: 12 }}>
    <Text variant="h1">Heading 1 - SK Finance</Text>
    <Text variant="h2">Heading 2 - Sevak App</Text>
    <Text variant="h3">Heading 3 - Welcome</Text>
    <Text variant="h4">Heading 4 - Section</Text>
    <Text variant="bodyLg">Body Large - Main content text</Text>
    <Text variant="bodyMd">Body Medium - Secondary text</Text>
    <Text variant="bodySm">Body Small - Helper text</Text>
    <Text variant="labelLg">Label Large - Bold label</Text>
    <Text variant="labelMd">Label Medium - Action text</Text>
    <Text variant="caption">Caption - Smallest text</Text>
    <Text variant="currency" color="#2D8B57">₹5,00,000</Text>
  </View>
);

export const Buttons = () => (
  <View style={{ padding: 16, gap: 12 }}>
    <Button title="Primary Button" onPress={() => {}} />
    <Button title="Secondary Button" onPress={() => {}} variant="secondary" />
    <Button title="Outline Button" onPress={() => {}} variant="outline" />
    <Button title="Orange Button" onPress={() => {}} variant="orange" />
    <Button title="Disabled" onPress={() => {}} disabled />
    <Button title="Loading..." onPress={() => {}} loading />
    <Button title="Small" onPress={() => {}} fullWidth={false} />
  </View>
);

export const Inputs = () => (
  <View style={{ padding: 16, gap: 8 }}>
    <Input label="Full Name" required placeholder="Enter name" value="" onChangeText={() => {}} />
    <Input label="Email" placeholder="email@example.com" value="rahul@skf.com" onChangeText={() => {}} />
    <Input label="Error State" error="This field is required" value="" onChangeText={() => {}} />
    <Input label="Disabled" value="Cannot edit" disabled onChangeText={() => {}} />
  </View>
);

export const Badges = () => (
  <View style={{ padding: 16, flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    <Badge label="Active" variant="active" />
    <Badge label="Pending" variant="pending" />
    <Badge label="In Progress" variant="inProgress" />
    <Badge label="Resolved" variant="resolved" />
    <Badge label="Failed" variant="failed" />
  </View>
);

export const Avatars = () => (
  <View style={{ padding: 16, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
    <Avatar name="Rahul Kumar" size={40} />
    <Avatar name="Rahul Kumar" size={60} />
    <Avatar name="Rahul Kumar" size={80} onEdit={() => {}} />
  </View>
);

export const FormControls = () => {
  const [checked, setChecked] = React.useState(false);
  const [selected, setSelected] = React.useState('a');
  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Checkbox checked={checked} onToggle={() => setChecked(!checked)} label="I agree to the terms and conditions" />
      <RadioButton selected={selected === 'a'} onPress={() => setSelected('a')} label="Savings Account" />
      <RadioButton selected={selected === 'b'} onPress={() => setSelected('b')} label="Current Account" />
    </View>
  );
};
