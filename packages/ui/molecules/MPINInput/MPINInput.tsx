import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';
import { typography } from '../../theme';

export interface MPINInputProps { length?: number; onComplete: (mpin: string) => void; secure?: boolean; error?: string; label?: string; }

export const MPINInput: React.FC<MPINInputProps> = ({ length = 4, onComplete, secure, error, label }) => {
  const [mpin, setMpin] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<TextInput[]>([]);

  const handleChange = (text: string, i: number) => {
    const n = [...mpin]; n[i] = text; setMpin(n);
    if (text && i < length - 1) refs.current[i + 1]?.focus();
    const full = n.join('');
    if (full.length === length) { Keyboard.dismiss(); onComplete(full); }
  };

  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === 'Backspace' && !mpin[i] && i > 0) {
      refs.current[i - 1]?.focus();
      const n = [...mpin]; n[i - 1] = ''; setMpin(n);
    }
  };

  return (
    <View>
      {label && <Text variant="labelLg" color={colors.text.primary} style={{ marginBottom: sp.base }}>{label}</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        {Array(length).fill(0).map((_, i) => (
          <TextInput key={i} ref={r => { if (r) refs.current[i] = r; }}
            style={[s.box, mpin[i] ? s.filled : {}, error ? { borderColor: colors.border.error } : {}]}
            value={secure && mpin[i] ? '●' : mpin[i]}
            onChangeText={t => handleChange(t.replace(/[^0-9]/g, '').slice(-1), i)}
            onKeyPress={e => handleKey(e, i)} keyboardType="number-pad" maxLength={1} secureTextEntry={secure} selectTextOnFocus />
        ))}
      </View>
      {error && <Text variant="caption" color={colors.text.error} align="center" style={{ marginTop: sp.sm }}>{error}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  box: { width: 52, height: 60, borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, textAlign: 'center', ...typography.h2, color: colors.text.primary, backgroundColor: colors.white, letterSpacing: 2 },
  filled: { borderColor: colors.border.focus },
});
