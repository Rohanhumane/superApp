import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { colors } from '../theme/colors';
import { sp } from '../theme/spacing';

// ===== AUTH TEMPLATE =====
interface AuthTplProps { title: string; subtitle?: string; children: React.ReactNode; onBack?: () => void; onClose?: () => void; bottomContent?: React.ReactNode; showTerms?: boolean; }
export const AuthTemplate: React.FC<AuthTplProps> = ({ title, subtitle, children, onBack, onClose, bottomContent, showTerms }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {(onBack || onClose) && <TouchableOpacity onPress={onBack || onClose} style={{ paddingHorizontal: sp.xl, paddingTop: sp.md, paddingBottom: sp.sm }}>
        <Text variant="h3">{onClose ? '✕' : '←'}</Text>
      </TouchableOpacity>}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sp.xl, paddingTop: sp.lg }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="h2">{title}</Text>
        {subtitle && <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: sp.sm }}>{subtitle}</Text>}
        <View style={{ marginTop: sp.xxl }}>{children}</View>
      </ScrollView>
      {(bottomContent || showTerms) && <View style={{ paddingHorizontal: sp.xl, paddingBottom: sp.xxl }}>
        {showTerms && <Text variant="caption" color={colors.text.tertiary} align="center" style={{ marginBottom: sp.md }}>
          By proceeding, you agree with SK Finance <Text variant="caption" color={colors.primary.navy}>Terms and conditions</Text> and <Text variant="caption" color={colors.primary.navy}>Privacy Policy</Text>.
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
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.md, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        {onBack && <TouchableOpacity onPress={onBack} style={{ paddingHorizontal: sp.xl }}><Text variant="h3">←</Text></TouchableOpacity>}
        {headerTitle && <Text variant="labelLg" style={{ marginLeft: onBack ? sp.sm : sp.xl }}>{headerTitle}</Text>}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sp.xl, paddingTop: sp.lg, paddingBottom: sp.xxxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {title ? <Text variant="h2">{title}</Text> : null}
        {subtitle && <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: sp.sm }}>{subtitle}</Text>}
        <View style={{ marginTop: sp.xxl }}>{children}</View>
      </ScrollView>
      {btnTitle && onSubmit && <View style={{ paddingHorizontal: sp.xl, paddingBottom: sp.xxl, paddingTop: sp.md, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title={btnTitle} onPress={onSubmit} disabled={btnDisabled} loading={btnLoading} />
      </View>}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

// ===== DASHBOARD TEMPLATE =====
interface DashTplProps { userName?: string; headerTitle?: string; children: React.ReactNode; onProfile?: () => void; onSearch?: () => void; onNotify?: () => void; }
export const DashboardTemplate: React.FC<DashTplProps> = ({ userName, headerTitle, children, onProfile, onSearch, onNotify }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary.navy }}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary.navy} />
    <View style={{ backgroundColor: colors.primary.navy, paddingBottom: sp.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp.xl, paddingTop: sp.md }}>
        {userName ? <>
          <TouchableOpacity onPress={onProfile} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <Text variant="bodyLg" color={colors.primary.navy}>👤</Text></TouchableOpacity>
          <Text variant="bodyLg" color={colors.text.white} style={{ flex: 1, marginLeft: sp.sm }}>Hello, {userName}</Text>
        </> : <Text variant="h4" color={colors.text.white} style={{ flex: 1 }}>{headerTitle || 'Services'}</Text>}
        <View style={{ flexDirection: 'row', gap: sp.lg }}>
          {onSearch && <TouchableOpacity onPress={onSearch}><Text variant="h3" color={colors.text.white}>🔍</Text></TouchableOpacity>}
          {onNotify && <TouchableOpacity onPress={onNotify}><Text variant="h3" color={colors.text.white}>🔔</Text></TouchableOpacity>}
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: sp.xxxl }}>
      <Text style={{ fontSize: 64 }}>✅</Text>
      <Text variant="h3" align="center" style={{ marginTop: sp.xl }}>{title}</Text>
      {subtitle && <Text variant="bodyMd" color={colors.text.secondary} align="center" style={{ marginTop: sp.sm }}>{subtitle}</Text>}
      {details && details.length > 0 && <View style={{ width: '100%', marginTop: sp.xl, padding: sp.lg, borderWidth: 1, borderColor: colors.border.light, borderRadius: 12 }}>
        {showDownload && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><Text variant="labelLg">Confirm Details</Text><Text variant="bodyMd" color={colors.text.secondary}>⬇</Text></View>}
        {details.map((d, i) => <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp.sm }}>
          <Text variant="bodySm" color={colors.text.secondary}>{d.label}</Text><Text variant="labelMd">{d.value}</Text></View>)}
      </View>}
    </View>
    <View style={{ paddingHorizontal: sp.xl, paddingBottom: sp.xxl }}>
      <Button title={primaryBtn.title} onPress={primaryBtn.onPress} />
      {secondaryBtn && <TouchableOpacity onPress={secondaryBtn.onPress} style={{ marginTop: sp.md, alignSelf: 'center' }}>
        <Text variant="labelMd" color={colors.text.secondary}>{secondaryBtn.title}</Text></TouchableOpacity>}
    </View>
  </SafeAreaView>
);
