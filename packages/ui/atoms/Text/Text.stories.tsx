import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';

export default { title: 'Atoms/Text', component: Text };

export const AllVariants = () => (
  <View style={{ padding: 16, gap: 8 }}>
    <Text variant="h1">H1 — SK Finance Sevak</Text>
    <Text variant="h2">H2 — Welcome Back</Text>
    <Text variant="h3">H3 — Section Title</Text>
    <Text variant="h4">H4 — Card Header</Text>
    <Text variant="bodyLg">Body Large — Primary content</Text>
    <Text variant="bodyMd">Body Medium — Secondary info</Text>
    <Text variant="bodySm">Body Small — Helper text</Text>
    <Text variant="labelLg">Label Large — Bold action</Text>
    <Text variant="labelMd">Label Medium — Button text</Text>
    <Text variant="labelSm">Label Small — Badge text</Text>
    <Text variant="caption">Caption — Smallest text</Text>
    <Text variant="currency" color="#2D8B57">₹5,00,000</Text>
    <Text variant="currencySm">₹11,634</Text>
  </View>
);
