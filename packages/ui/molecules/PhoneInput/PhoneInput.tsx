import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';
import { typography } from '../../theme';

export interface PhoneInputProps { value: string; onChangeText: (t: string) => void; error?: string; }

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChangeText, error }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: sp.base }}>
      <View style={[s.box, { borderColor: error ? colors.border.error : focused ? colors.border.focus : colors.border.light }]}>
        <View style={{ paddingHorizontal: sp.base, paddingVertical: sp.base + 2 }}>
          <Text variant="bodyLg" color={colors.text.primary}>+91</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: colors.border.light }} />
        <TextInput style={s.input} value={value}
          onChangeText={t => onChangeText(t.replace(/[^0-9]/g, '').slice(0, 10))}
          placeholder="Enter Mobile Number" placeholderTextColor={colors.text.secondary}
          keyboardType="phone-pad" maxLength={10}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      </View>
      {error && <Text variant="caption" color={colors.text.error} style={{ marginTop: sp.xs }}>{error}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: br.sm, backgroundColor: colors.bg.secondary, overflow: 'hidden' },
  input: { flex: 1, paddingHorizontal: sp.base, ...typography.bodyLg, color: colors.text.primary, paddingVertical: sp.base + 2 },
});
