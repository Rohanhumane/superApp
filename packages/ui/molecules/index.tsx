import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Text } from '../atoms/Text';
import { colors } from '../theme/colors';
import { sp, br } from '../theme/spacing';
import { typography } from '../theme';

// ===== OTP INPUT (configurable 5/6 digit) =====
interface OTPProps { length: number; onComplete: (otp: string) => void; autoSubmit?: boolean; error?: string; }
export const OTPInput: React.FC<OTPProps> = ({ length, onComplete, autoSubmit, error }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<TextInput[]>([]);
  const handleChange = (text: string, i: number) => {
    const n = [...otp]; n[i] = text; setOtp(n);
    if (text && i < length - 1) refs.current[i + 1]?.focus();
    const full = n.join('');
    if (full.length === length) { Keyboard.dismiss(); onComplete(full); }
  };
  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus(); const n = [...otp]; n[i - 1] = ''; setOtp(n);
    }
  };
  return <View>
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
      {Array(length).fill(0).map((_, i) => (
        <TextInput key={i} ref={r => { if (r) refs.current[i] = r; }}
          style={[s.otpBox, otp[i] ? s.otpFilled : {}, error ? { borderColor: colors.border.error } : {}]}
          value={otp[i]} onChangeText={t => handleChange(t.slice(-1), i)}
          onKeyPress={e => handleKey(e, i)} keyboardType="number-pad" maxLength={1} selectTextOnFocus />
      ))}
    </View>
    {error && <Text variant="caption" color={colors.text.error} align="center" style={{ marginTop: sp.sm }}>{error}</Text>}
  </View>;
};

// ===== MPIN INPUT (4-digit secure) =====
interface MPINProps { length?: number; onComplete: (mpin: string) => void; secure?: boolean; error?: string; label?: string; }
export const MPINInput: React.FC<MPINProps> = ({ length = 4, onComplete, secure, error, label }) => {
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
      refs.current[i - 1]?.focus(); const n = [...mpin]; n[i - 1] = ''; setMpin(n);
    }
  };
  return <View>
    {label && <Text variant="labelLg" color={colors.text.primary} style={{ marginBottom: sp.base }}>{label}</Text>}
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
      {Array(length).fill(0).map((_, i) => (
        <TextInput key={i} ref={r => { if (r) refs.current[i] = r; }}
          style={[s.mpinBox, mpin[i] ? s.otpFilled : {}, error ? { borderColor: colors.border.error } : {}]}
          value={secure && mpin[i] ? '●' : mpin[i]}
          onChangeText={t => handleChange(t.replace(/[^0-9]/g, '').slice(-1), i)}
          onKeyPress={e => handleKey(e, i)} keyboardType="number-pad" maxLength={1} secureTextEntry={secure} selectTextOnFocus />
      ))}
    </View>
    {error && <Text variant="caption" color={colors.text.error} align="center" style={{ marginTop: sp.sm }}>{error}</Text>}
  </View>;
};

// ===== PHONE INPUT (+91) =====
interface PhoneProps { value: string; onChangeText: (t: string) => void; error?: string; }
export const PhoneInput: React.FC<PhoneProps> = ({ value, onChangeText, error }) => {
  const [focused, setFocused] = useState(false);
  return <View style={{ marginBottom: sp.base }}>
    <View style={[s.phoneBox, { borderColor: error ? colors.border.error : focused ? colors.border.focus : colors.border.light }]}>
      <View style={{ paddingHorizontal: sp.base, paddingVertical: sp.base + 2 }}>
        <Text variant="bodyLg" color={colors.text.primary}>+91</Text>
      </View>
      <View style={{ width: 1, height: 24, backgroundColor: colors.border.light }} />
      <TextInput style={s.phoneInput} value={value}
        onChangeText={t => onChangeText(t.replace(/[^0-9]/g, '').slice(0, 10))}
        placeholder="Enter Mobile Number" placeholderTextColor={colors.text.secondary}
        keyboardType="phone-pad" maxLength={10}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </View>
    {error && <Text variant="caption" color={colors.text.error} style={{ marginTop: sp.xs }}>{error}</Text>}
  </View>;
};

// ===== DROPDOWN SELECT =====
interface DDOption { id: string; label: string; }
interface DDProps { label?: string; value: string; options: readonly DDOption[] | DDOption[]; onSelect: (o: DDOption) => void; placeholder?: string; required?: boolean; error?: string; }
export const DropdownSelect: React.FC<DDProps> = ({ label, value, options, onSelect, placeholder = 'Select', required, error }) => {
  const [open, setOpen] = useState(false);
  const sel = (options as DDOption[]).find(o => o.id === value || o.label === value);
  return <View style={{ marginBottom: sp.base }}>
    {label && <View style={{ flexDirection: 'row', marginBottom: sp.sm }}>
      <Text variant="bodySm" color={colors.text.secondary}>{label}</Text>
      {required && <Text variant="bodySm" color={colors.text.error}> *</Text>}
    </View>}
    <TouchableOpacity style={[s.ddBox, error ? { borderColor: colors.border.error } : {}]} onPress={() => setOpen(!open)}>
      <Text variant="bodyLg" color={sel ? colors.text.primary : colors.text.secondary} style={{ flex: 1 }}>{sel?.label || placeholder}</Text>
      <Text variant="bodyMd" color={colors.text.secondary}>▾</Text>
    </TouchableOpacity>
    {open && <View style={s.ddList}>
      {(options as DDOption[]).map(o => (
        <TouchableOpacity key={o.id} style={[s.ddItem, o.id === value && { backgroundColor: colors.bg.secondary }]}
          onPress={() => { onSelect(o); setOpen(false); }}>
          <Text variant="bodyMd" color={o.id === value ? colors.primary.dark : colors.text.primary}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>}
    {error && <Text variant="caption" color={colors.text.error} style={{ marginTop: sp.xs }}>{error}</Text>}
  </View>;
};

// ===== SLIDER WITH VALUE =====
interface SliderProps { label: string; value: number; min: number; max: number; step?: number; formatValue: (v: number) => string; formatMin?: string; formatMax?: string; onValueChange: (v: number) => void; }
export const SliderWithValue: React.FC<SliderProps> = ({ label, value, min, max, step = 1, formatValue, formatMin, formatMax, onValueChange }) => {
  const progress = Math.min(Math.max((value - min) / (max - min), 0), 1);
  return <View style={{ marginBottom: sp.lg }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sp.base }}>
      <Text variant="bodyMd" color={colors.text.secondary}>{label}</Text>
      <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 14, borderWidth: 1, borderColor: colors.border.light }}>
        <Text variant="labelMd">{formatValue(value)}</Text>
      </View>
    </View>
    <View style={{ height: 40, justifyContent: 'center' }}
      onTouchEnd={(e) => {
        // Simple touch-based slider
        const { locationX } = e.nativeEvent;
        const ratio = Math.min(Math.max(locationX / 280, 0), 1); // approximate
        let nv = min + ratio * (max - min);
        nv = Math.round(nv / step) * step;
        onValueChange(Math.min(Math.max(nv, min), max));
      }}>
      <View style={{ height: 4, backgroundColor: colors.border.light, borderRadius: 2, overflow: 'hidden' }}>
        <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: colors.secondary.base, borderRadius: 2 }} />
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text variant="caption" color={colors.text.secondary}>{formatMin || formatValue(min)}</Text>
      <Text variant="caption" color={colors.text.secondary}>{formatMax || formatValue(max)}</Text>
    </View>
  </View>;
};

const s = StyleSheet.create({
  otpBox: { width: 52, height: 56, borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, textAlign: 'center', ...typography.h3, color: colors.text.primary, backgroundColor: colors.white },
  otpFilled: { borderColor: colors.border.focus },
  mpinBox: { width: 60, height: 64, borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, textAlign: 'center', ...typography.h2, color: colors.text.primary, backgroundColor: colors.white },
  phoneBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: br.sm, backgroundColor: colors.bg.secondary, overflow: 'hidden' },
  phoneInput: { flex: 1, paddingHorizontal: sp.base, ...typography.bodyLg, color: colors.text.primary, paddingVertical: sp.base + 2 },
  ddBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, backgroundColor: colors.bg.secondary, paddingHorizontal: sp.base, paddingVertical: sp.base + 2 },
  ddList: { borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, backgroundColor: colors.white, marginTop: 4, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  ddItem: { paddingHorizontal: sp.base, paddingVertical: sp.base },
});
