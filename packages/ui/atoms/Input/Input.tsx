import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';
import { typography } from '../../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label, error, required, rightIcon, onRightIconPress, disabled, style, onFocus, onBlur, ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.border.error : focused ? colors.border.focus : colors.border.light;

  return (
    <View style={{ marginBottom: sp.base }}>
      {label && (
        <View style={{ flexDirection: 'row', marginBottom: sp.sm }}>
          <Text variant="bodySm" color={colors.text.secondary}>{label}</Text>
          {required && <Text variant="bodySm" color={colors.text.error}> *</Text>}
        </View>
      )}
      <View style={[s.box, { borderColor }, disabled && { opacity: 0.6 }]}>
        <TextInput
          style={[s.input, style]}
          placeholderTextColor={colors.text.secondary}
          editable={!disabled}
          onFocus={e => { setFocused(true); onFocus?.(e); }}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ padding: sp.sm }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text variant="caption" color={colors.text.error} style={{ marginTop: sp.xs }}>{error}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: br.sm, backgroundColor: colors.bg.secondary, paddingHorizontal: sp.base },
  input: { flex: 1, ...typography.bodyLg, color: colors.text.primary, paddingVertical: sp.base + 2 },
});
