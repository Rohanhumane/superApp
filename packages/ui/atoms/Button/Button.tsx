import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'orange';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const VARIANTS: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.btn.primary, text: colors.btn.primaryText },
  secondary: { bg: 'transparent', text: colors.primary.dark, border: colors.primary.dark },
  outline: { bg: 'transparent', text: colors.text.secondary, border: colors.border.light },
  link: { bg: 'transparent', text: colors.primary.dark },
  orange: { bg: colors.text.warning, text: colors.white },
};

export const Button: React.FC<ButtonProps> = ({
  title, onPress, variant = 'primary', disabled, loading, fullWidth = true, style, testID,
}) => {
  const v = VARIANTS[variant];
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.base,
        { backgroundColor: v.bg, opacity: disabled || loading ? 0.5 : 1, width: fullWidth ? '100%' : undefined },
        v.border ? { borderWidth: 1, borderColor: v.border } : {},
        variant === 'link' ? { paddingVertical: sp.sm } : {},
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" testID={`${testID}-loader`} />
      ) : (
        <Text variant="btnLg" color={v.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: sp.base, paddingHorizontal: sp.lg, borderRadius: br.lg,
  },
});
