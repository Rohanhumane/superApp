import React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';

export type BadgeVariant = 'active' | 'pending' | 'inProgress' | 'resolved' | 'failed';

export interface BadgeProps { label: string; variant: BadgeVariant; }

export const Badge: React.FC<BadgeProps> = ({ label, variant }) => {
  const c = colors.status[variant];
  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1, backgroundColor: c.bg, borderColor: c.border }}>
      <Text variant="labelSm" color={c.text}>{label}</Text>
    </View>
  );
};
