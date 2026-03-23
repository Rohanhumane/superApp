
import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';

/**
 * Centralized Icon System — SK Finance Sevak
 *
 * Production setup:
 *   npm install react-native-vector-icons @types/react-native-vector-icons
 *   npx react-native link react-native-vector-icons
 *   (Android) add to android/app/build.gradle:
 *     apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
 *
 * This file auto-detects whether vector icons are installed.
 * If yes → uses MaterialCommunityIcons (1000+ icons).
 * If no  → graceful emoji fallback so app never crashes.
 */

let MCI: any = null;
try { MCI = require('react-native-vector-icons/MaterialCommunityIcons').default; } catch (_) {}

export type IconName =
  | 'car' | 'tractor' | 'truck' | 'equipment' | 'business' | 'home_loan'
  | 'key' | 'lock' | 'face_id' | 'check_circle' | 'timer' | 'warning'
  | 'user' | 'search' | 'bell' | 'back' | 'close' | 'chevron_right'
  | 'phone' | 'email' | 'chat' | 'location' | 'more_horiz'
  | 'calendar' | 'eye' | 'eye_off' | 'edit' | 'download' | 'upload'
  | 'loan' | 'document' | 'mandate' | 'insurance' | 'payment' | 'request' | 'track'
  | 'calculator' | 'eligibility' | 'support' | 'headphones'
  | 'camera' | 'gallery' | 'refresh' | 'share'
  | 'success' | 'error' | 'info' | 'pending' | 'active'
  | 'logout' | 'language' | 'gift' | 'settings';

// MaterialCommunityIcons mapping
const VECTOR: Record<string, string> = {
  car: 'car-side', tractor: 'tractor-variant', truck: 'truck', equipment: 'cog-outline',
  business: 'office-building-outline', home_loan: 'home-outline',
  key: 'key-variant', lock: 'lock-outline', face_id: 'face-recognition',
  check_circle: 'check-circle-outline', timer: 'timer-sand', warning: 'alert-outline',
  user: 'account-circle-outline', search: 'magnify', bell: 'bell-outline',
  back: 'arrow-left', close: 'close', chevron_right: 'chevron-right',
  phone: 'phone-outline', email: 'email-outline', chat: 'chat-outline',
  location: 'map-marker-outline', more_horiz: 'dots-horizontal',
  calendar: 'calendar-outline', eye: 'eye-outline', eye_off: 'eye-off-outline',
  edit: 'pencil-outline', download: 'download-outline', upload: 'upload-outline',
  loan: 'cash-multiple', document: 'file-document-outline',
  mandate: 'bank-outline', insurance: 'shield-check-outline',
  payment: 'credit-card-outline', request: 'file-edit-outline', track: 'clipboard-list-outline',
  calculator: 'calculator-variant-outline', eligibility: 'chart-bar',
  support: 'help-circle-outline', headphones: 'headphones',
  camera: 'camera-outline', gallery: 'image-multiple-outline',
  refresh: 'refresh', share: 'share-variant-outline',
  success: 'check-circle', error: 'close-circle', info: 'information-outline',
  pending: 'clock-outline', active: 'lightning-bolt',
  logout: 'logout', language: 'translate', gift: 'gift-outline', settings: 'cog-outline',
};

// Emoji fallback
const EMOJI: Record<string, string> = {
  car: '🚗', tractor: '🚜', truck: '🚛', equipment: '⚙️', business: '🏢', home_loan: '🏠',
  key: '🔑', lock: '🔒', face_id: '🪪', check_circle: '✅', timer: '⏳', warning: '⚠️',
  user: '👤', search: '🔍', bell: '🔔', back: '←', close: '✕', chevron_right: '›',
  phone: '📞', email: '✉️', chat: '💬', location: '📍', more_horiz: '•••',
  calendar: '📅', eye: '👁', eye_off: '👁', edit: '✏️', download: '⬇', upload: '📤',
  loan: '💰', document: '📄', mandate: '🏛', insurance: '🛡', payment: '💳', request: '📝', track: '📋',
  calculator: '🧮', eligibility: '📊', support: '❓', headphones: '🎧',
  camera: '📷', gallery: '🖼', refresh: '🔄', share: '↗',
  success: '✓', error: '✗', info: 'ⓘ', pending: '🕐', active: '⚡',
  logout: '🚪', language: '🌐', gift: '🎁', settings: '⚙️',
};

// ===== BASE ICON =====
interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#212121' }) => {
  if (MCI && VECTOR[name]) {
    return <MCI name={VECTOR[name]} size={size} color={color} />;
  }
  return <RNText style={{ fontSize: size * 0.85, color, textAlign: 'center' }}>{EMOJI[name] || '•'}</RNText>;
};

// ===== ICON WITH CIRCULAR/ROUNDED BACKGROUND =====
interface IconBadgeProps extends IconProps {
  bgColor?: string;
  containerSize?: number;
  borderRadius?: number;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  name, size = 22, color = '#1A1C4D',
  bgColor = '#FAFAFA', containerSize, borderRadius,
}) => {
  const cs = containerSize || size * 2;
  return (
    <View style={[s.center, { width: cs, height: cs, borderRadius: borderRadius ?? cs / 2, backgroundColor: bgColor }]}>
      <Icon name={name} size={size} color={color} />
    </View>
  );
};

// ===== PRODUCT ICON (colored bg per product type) =====
const PRODUCT_THEME: Record<string, { bg: string; fg: string }> = {
  car: { bg: '#EEF2FF', fg: '#3B5998' },
  tractor: { bg: '#EEF6EE', fg: '#0C8749' },
  truck: { bg: '#E8EAF6', fg: '#1A1C4D' },
  equipment: { bg: '#FFF8E1', fg: '#E65100' },
  business: { bg: '#C9EEDC', fg: '#0C8749' },
  home: { bg: '#FCE4EC', fg: '#C62828' },
  home_loan: { bg: '#FCE4EC', fg: '#C62828' },
};

export const ProductIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 56 }) => {
  const t = PRODUCT_THEME[type] || { bg: '#FAFAFA', fg: '#757575' };
  const iconName = (type === 'home' ? 'home_loan' : type) as IconName;
  return (
    <View style={[s.center, { width: size, height: size, borderRadius: size * 0.21, backgroundColor: t.bg }]}>
      <Icon name={iconName} size={size * 0.45} color={t.fg} />
    </View>
  );
};

// ===== OUTLINED CIRCLE ICON (support bar) =====
export const OutlinedIcon: React.FC<{ name: IconName; size?: number; borderColor?: string }> = ({ name, size = 48, borderColor = '#3D3D3A' }) => (
  <View style={[s.center, s.outlined, { width: size, height: size, borderRadius: size / 2, borderColor }]}>
    <Icon name={name} size={size * 0.42} color={borderColor} />
  </View>
);

const s = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  outlined: { borderWidth: 1.5 },
});
