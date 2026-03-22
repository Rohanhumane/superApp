import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';

export interface RadioButtonProps { selected: boolean; onPress: () => void; label: string; }

export const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress, label }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.md, paddingHorizontal: sp.lg, borderRadius: br.md, borderWidth: 1, borderColor: colors.border.light, marginBottom: sp.sm, backgroundColor: colors.white }} onPress={onPress} activeOpacity={0.7}>
    <View style={[{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border.medium, alignItems: 'center', justifyContent: 'center', marginRight: sp.md }, selected && { borderColor: colors.primary.navy }]}>
      {selected && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary.navy }} />}
    </View>
    <Text variant="bodyMd" color={colors.text.primary}>{label}</Text>
  </TouchableOpacity>
);
