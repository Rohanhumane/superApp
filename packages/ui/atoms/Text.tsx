import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { typography, TypoKey } from '../theme';
import { colors } from '../theme/colors';

interface Props extends TextProps {
  variant?: TypoKey;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Text: React.FC<Props> = ({ variant = 'bodyMd', color = colors.text.primary, align = 'left', style, children, ...rest }) => (
  <RNText style={[typography[variant], { color, textAlign: align }, style]} {...rest}>{children}</RNText>
);
