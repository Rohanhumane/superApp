import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors } from '../theme/colors';
import { sp, br } from '../theme/spacing';

type Variant = 'primary' | 'secondary' | 'outline' | 'link' | 'orange';
interface Props {
  title: string; onPress: () => void; variant?: Variant;
  disabled?: boolean; loading?: boolean; fullWidth?: boolean; style?: ViewStyle;
}

const variantStyles: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.btn.primary, text: colors.btn.primaryText },
  secondary: { bg: 'transparent', text: colors.primary.navy, border: colors.primary.navy },
  outline: { bg: 'transparent', text: colors.text.secondary, border: colors.border.medium },
  link: { bg: 'transparent', text: colors.primary.navy },
  orange: { bg: colors.text.warning, text: colors.white },
};

export const Button: React.FC<Props> = ({ title, onPress, variant = 'primary', disabled, loading, fullWidth = true, style }) => {
  const v = variantStyles[variant];
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: variant === 'link' ? sp.sm : sp.lg, paddingHorizontal: sp.xxl,
        borderRadius: br.xl, backgroundColor: v.bg, opacity: disabled || loading ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
      }, v.border ? { borderWidth: 1, borderColor: v.border } : {}, style]}
      onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}
    >
      {loading ? <ActivityIndicator color={v.text} size="small" /> :
        <Text variant="btnLg" color={v.text}>{title}</Text>}
    </TouchableOpacity>
  );
};
