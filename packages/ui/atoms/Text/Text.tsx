import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { typography, TypoKey } from '../../theme';
import { colors } from '../../theme/colors';

export interface SKTextProps extends TextProps {
  variant?: TypoKey;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Text: React.FC<SKTextProps> = ({
  variant = 'bodyMd',
  color = colors.text.primary,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const variantStyle = typography[variant];
  const flat = StyleSheet.flatten(style);
  // When custom fontSize exceeds the variant's lineHeight, auto-adjust to prevent clipping.
  // This fixes emoji/icon rendering where fontSize: 80 was clipped by bodyMd's lineHeight: 20.
  const needsLineHeightFix = flat?.fontSize && flat.fontSize > (variantStyle.lineHeight as number) && !flat.lineHeight;
  const lineHeightOverride = needsLineHeightFix ? { lineHeight: Math.ceil(flat.fontSize * 1.3) } : undefined;

  return (
    <RNText
      style={[variantStyle, { color, textAlign: align }, lineHeightOverride, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
