import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { br } from '../../theme/spacing';
import { typography } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  autoSubmit?: boolean;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete, autoSubmit, error }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<TextInput[]>([]);

  // Responsive sizing: smaller boxes for 6 digits
  const boxSize = length >= 6
    ? { width: 44, height: 50, fontSize: 18 }
    : { width: 52, height: 56, fontSize: 22 };
  const gap = length >= 6 ? 8 : 12;

  const handleChange = (text: string, i: number) => {
    const n = [...otp]; n[i] = text; setOtp(n);
    if (text && i < length - 1) refs.current[i + 1]?.focus();
    const full = n.join('');
    if (full.length === length) { Keyboard.dismiss(); onComplete(full); }
  };

  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
      const n = [...otp]; n[i - 1] = ''; setOtp(n);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap }}>
        {Array(length).fill(0).map((_, i) => (
          <TextInput
            key={i}
            ref={r => { if (r) refs.current[i] = r; }}
            style={[
              {
                width: boxSize.width,
                height: boxSize.height,
                borderWidth: 1,
                borderColor: error ? colors.border.error : otp[i] ? colors.border.focus : colors.border.light,
                borderRadius: br.md,
                textAlign: 'center',
                fontSize: boxSize.fontSize,
                fontWeight: '600',
                color: colors.text.primary,
                backgroundColor: colors.white,
              },
            ]}
            value={otp[i]}
            onChangeText={t => handleChange(t.slice(-1), i)}
            onKeyPress={e => handleKey(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
      {error && <Text variant="caption" color={colors.text.error} align="center" style={{ marginTop: 8 }}>{error}</Text>}
    </View>
  );
};
