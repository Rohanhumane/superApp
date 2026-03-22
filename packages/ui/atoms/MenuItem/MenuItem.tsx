import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';
import { sp } from '../../theme/spacing';

export interface MenuItemProps { icon: string; label: string; onPress: () => void; }

export const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.lg, paddingHorizontal: sp.lg, borderBottomWidth: 1, borderBottomColor: colors.border.light }} onPress={onPress} activeOpacity={0.7}>
    <Text variant="bodyLg" style={{ marginRight: sp.md }}>{icon}</Text>
    <Text variant="bodyMd" color={colors.text.primary} style={{ flex: 1 }}>{label}</Text>
    <Text variant="bodyMd" color={colors.text.tertiary}>›</Text>
  </TouchableOpacity>
);
