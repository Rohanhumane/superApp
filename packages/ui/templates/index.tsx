import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { colors } from '../theme/colors';
import { sp } from '../theme/spacing';

// ===== AUTH TEMPLATE =====
interface AuthTplProps { title: string; subtitle?: string; children: React.ReactNode; onBack?: () => void; onClose?: () => void; bottomContent?: React.ReactNode; showTerms?: boolean; }
export const AuthTemplate: React.FC<AuthTplProps> = ({ title, subtitle, children, onBack, onClose, bottomContent, showTerms }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {(onBack || onClose) && <TouchableOpacity onPress={onBack || onClose} style={{ paddingHorizontal: sp.lg, paddingTop: sp.base, paddingBottom: sp.sm }}>
        <Icon name={onClose ? 'close' : 'back'} size={24} color={colors.text.primary} />
      </TouchableOpacity>}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sp.lg, paddingTop: sp.base }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="h2">{title}</Text>
        {subtitle && <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: sp.sm }}>{subtitle}</Text>}
        <View style={{ marginTop: sp.lg }}>{children}</View>
      </ScrollView>
      {(bottomContent || showTerms) && <View style={{ paddingHorizontal: sp.lg, paddingBottom: sp.lg }}>
        {showTerms && <Text variant="caption" color={colors.text.secondary} align="center" style={{ marginBottom: sp.base }}>
          By proceeding, you agree with SK Finance <Text variant="caption" color={colors.primary.dark}>Terms and conditions</Text> and <Text variant="caption" color={colors.primary.dark}>Privacy Policy</Text>.
        </Text>}
        {bottomContent}
      </View>}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

// ===== FORM TEMPLATE =====
interface FormTplProps { title: string; subtitle?: string; headerTitle?: string; children: React.ReactNode; onBack?: () => void; btnTitle?: string; onSubmit?: () => void; btnDisabled?: boolean; btnLoading?: boolean; }
export const FormTemplate: React.FC<FormTplProps> = ({ title, subtitle, headerTitle, children, onBack, btnTitle, onSubmit, btnDisabled, btnLoading }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        {onBack && <TouchableOpacity onPress={onBack} style={{ paddingHorizontal: sp.lg }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>}
        {headerTitle && <Text variant="labelLg" style={{ marginLeft: onBack ? sp.sm : sp.lg }}>{headerTitle}</Text>}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sp.lg, paddingTop: sp.base, paddingBottom: sp.xl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {title ? <Text variant="h2">{title}</Text> : null}
        {subtitle && <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: sp.sm }}>{subtitle}</Text>}
        <View style={{ marginTop: sp.lg }}>{children}</View>
      </ScrollView>
      {btnTitle && onSubmit && <View style={{ paddingHorizontal: sp.lg, paddingBottom: sp.lg, paddingTop: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title={btnTitle} onPress={onSubmit} disabled={btnDisabled} loading={btnLoading} />
      </View>}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

// ===== DASHBOARD TEMPLATE =====
interface DashTplProps { userName?: string; headerTitle?: string; children: React.ReactNode; onProfile?: () => void; onSearch?: () => void; onNotify?: () => void; }
export const DashboardTemplate: React.FC<DashTplProps> = ({ userName, headerTitle, children, onProfile, onSearch, onNotify }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary.dark }}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary.dark} />
    <View style={{ backgroundColor: colors.primary.dark, paddingBottom: sp.base }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp.lg, paddingTop: sp.base }}>
        {userName ? <>
          <TouchableOpacity onPress={onProfile} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="user" size={20} color={colors.primary.dark} /></TouchableOpacity>
          <Text variant="bodyLg" color={colors.text.white} style={{ flex: 1, marginLeft: sp.sm }}>Hello, {userName}</Text>
        </> : <Text variant="h4" color={colors.text.white} style={{ flex: 1 }}>{headerTitle || 'Services'}</Text>}
        <View style={{ flexDirection: 'row', gap: sp.base }}>
          {onSearch && <TouchableOpacity onPress={onSearch}><Icon name="search" size={24} color={colors.text.white} /></TouchableOpacity>}
          {onNotify && <TouchableOpacity onPress={onNotify}><Icon name="bell" size={24} color={colors.text.white} /></TouchableOpacity>}
        </View>
      </View>
    </View>
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.secondary }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </SafeAreaView>
);

// ===== SUCCESS TEMPLATE =====
interface SuccTplProps { title: string; subtitle?: string; details?: { label: string; value: string }[]; primaryBtn: { title: string; onPress: () => void }; secondaryBtn?: { title: string; onPress: () => void }; showDownload?: boolean; }
export const SuccessTemplate: React.FC<SuccTplProps> = ({ title, subtitle, details, primaryBtn, secondaryBtn, showDownload }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: sp.xl }}>
      <Icon name="success" size={64} color={colors.secondary.base} />
      <Text variant="h3" align="center" style={{ marginTop: sp.lg }}>{title}</Text>
      {subtitle && <Text variant="bodyMd" color={colors.text.secondary} align="center" style={{ marginTop: sp.sm }}>{subtitle}</Text>}
      {details && details.length > 0 && <View style={{ width: '100%', marginTop: sp.lg, padding: sp.base, borderWidth: 1, borderColor: colors.border.light, borderRadius: 12 }}>
        {showDownload && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><Text variant="labelLg">Confirm Details</Text><Text variant="bodyMd" color={colors.text.secondary}>⬇</Text></View>}
        {details.map((d, i) => <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp.sm }}>
          <Text variant="bodySm" color={colors.text.secondary}>{d.label}</Text><Text variant="labelMd">{d.value}</Text></View>)}
      </View>}
    </View>
    <View style={{ paddingHorizontal: sp.lg, paddingBottom: sp.lg }}>
      <Button title={primaryBtn.title} onPress={primaryBtn.onPress} />
      {secondaryBtn && <TouchableOpacity onPress={secondaryBtn.onPress} style={{ marginTop: sp.base, alignSelf: 'center' }}>
        <Text variant="labelMd" color={colors.text.secondary}>{secondaryBtn.title}</Text></TouchableOpacity>}
    </View>
  </SafeAreaView>
);
