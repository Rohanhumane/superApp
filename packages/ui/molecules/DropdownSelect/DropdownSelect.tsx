import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { sp, br } from '../../theme/spacing';

export interface DDOption { id: string; label: string; }
export interface DropdownSelectProps { label?: string; value: string; options: readonly DDOption[] | DDOption[]; onSelect: (o: DDOption) => void; placeholder?: string; required?: boolean; error?: string; }

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ label, value, options, onSelect, placeholder = 'Select', required, error }) => {
  const [open, setOpen] = useState(false);
  const sel = (options as DDOption[]).find(o => o.id === value || o.label === value);
  return (
    <View style={{ marginBottom: sp.base }}>
      {label && <View style={{ flexDirection: 'row', marginBottom: sp.sm }}><Text variant="bodySm" color={colors.text.secondary}>{label}</Text>{required && <Text variant="bodySm" color={colors.text.error}> *</Text>}</View>}
      <TouchableOpacity style={[s.box, error ? { borderColor: colors.border.error } : {}]} onPress={() => setOpen(!open)}>
        <Text variant="bodyLg" color={sel ? colors.text.primary : colors.text.secondary} style={{ flex: 1 }}>{sel?.label || placeholder}</Text>
        <Text variant="bodyMd" color={colors.text.secondary}>▾</Text>
      </TouchableOpacity>
      {open && <View style={s.list}>{(options as DDOption[]).map(o => (
        <TouchableOpacity key={o.id} style={[s.item, o.id === value && { backgroundColor: colors.bg.secondary }]} onPress={() => { onSelect(o); setOpen(false); }}>
          <Text variant="bodyMd" color={o.id === value ? colors.primary.dark : colors.text.primary}>{o.label}</Text>
        </TouchableOpacity>
      ))}</View>}
      {error && <Text variant="caption" color={colors.text.error} style={{ marginTop: sp.xs }}>{error}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, backgroundColor: colors.bg.secondary, paddingHorizontal: sp.base, paddingVertical: sp.base + 2 },
  list: { borderWidth: 1, borderColor: colors.border.light, borderRadius: br.sm, backgroundColor: colors.white, marginTop: 4, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  item: { paddingHorizontal: sp.base, paddingVertical: sp.base },
});
