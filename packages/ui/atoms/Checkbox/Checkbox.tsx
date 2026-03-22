import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';
import { sp } from '../../theme/spacing';

export interface CheckboxProps { checked: boolean; onToggle: () => void; label?: string; }

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle, label }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: sp.sm }} onPress={onToggle} activeOpacity={0.7}>
    <View style={[{ width: 22, height: 22, borderRadius: 4, borderWidth: 1.5, borderColor: colors.border.medium, alignItems: 'center', justifyContent: 'center', marginRight: sp.md }, checked && { backgroundColor: colors.primary.navy, borderColor: colors.primary.navy }]}>
      {checked && <Text variant="caption" color={colors.white}>✓</Text>}
    </View>
    {label && <Text variant="bodySm" color={colors.text.secondary} style={{ flex: 1, lineHeight: 18 }}>{label}</Text>}
  </TouchableOpacity>
);
