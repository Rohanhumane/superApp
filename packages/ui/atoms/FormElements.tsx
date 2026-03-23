import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from './Text';
import { colors } from '../theme/colors';
import { sp, br } from '../theme/spacing';

type BadgeVariant = 'active' | 'pending' | 'inProgress' | 'resolved' | 'failed';
export const Badge: React.FC<{ label: string; variant: BadgeVariant }> = ({ label, variant }) => {
  const c = colors.status[variant];
  return <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1, backgroundColor: c.bg, borderColor: c.border }}>
    <Text variant="labelSm" color={c.text}>{label}</Text>
  </View>;
};

export const Avatar: React.FC<{ uri?: string | null; name?: string; size?: number; onEdit?: () => void }> = ({ uri, name, size = 80, onEdit }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';
  return <View style={{ alignItems: 'center', position: 'relative' }}>
    {uri ? <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} /> :
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.bg.secondary, borderWidth: 1, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center' }}>
        <Text variant="h3" color={colors.text.secondary}>{initials}</Text></View>}
    {onEdit && <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: -4, backgroundColor: colors.white, borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.light }} onPress={onEdit}>
      <Text variant="caption" color={colors.text.secondary}>✎</Text></TouchableOpacity>}
  </View>;
};

export const Checkbox: React.FC<{ checked: boolean; onToggle: () => void; label?: string }> = ({ checked, onToggle, label }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: sp.sm }} onPress={onToggle} activeOpacity={0.7}>
    <View style={[{ width: 22, height: 22, borderRadius: 4, borderWidth: 1.5, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center', marginRight: sp.base }, checked && { backgroundColor: colors.primary.dark, borderColor: colors.primary.dark }]}>
      {checked && <Text variant="caption" color={colors.white}>✓</Text>}
    </View>
    {label && <Text variant="bodySm" color={colors.text.secondary} style={{ flex: 1, lineHeight: 18 }}>{label}</Text>}
  </TouchableOpacity>
);

export const RadioButton: React.FC<{ selected: boolean; onPress: () => void; label: string }> = ({ selected, onPress, label }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.base, paddingHorizontal: sp.base, borderRadius: br.sm, borderWidth: 1, borderColor: colors.border.light, marginBottom: sp.sm, backgroundColor: colors.white }} onPress={onPress} activeOpacity={0.7}>
    <View style={[{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center', marginRight: sp.base }, selected && { borderColor: colors.primary.dark }]}>
      {selected && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary.dark }} />}
    </View>
    <Text variant="bodyMd" color={colors.text.primary}>{label}</Text>
  </TouchableOpacity>
);

export const Divider: React.FC<{ gap?: number }> = ({ gap = 16 }) => <View style={{ height: 1, backgroundColor: colors.border.light, marginVertical: gap }} />;

export const MenuItem: React.FC<{ icon: string; label: string; onPress: () => void }> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.base, paddingHorizontal: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }} onPress={onPress} activeOpacity={0.7}>
    <Text variant="bodyLg" style={{ marginRight: sp.base }}>{icon}</Text>
    <Text variant="bodyMd" color={colors.text.primary} style={{ flex: 1 }}>{label}</Text>
    <Text variant="bodyMd" color={colors.text.secondary}>›</Text>
  </TouchableOpacity>
);
