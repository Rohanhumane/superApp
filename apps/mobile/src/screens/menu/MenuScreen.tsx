import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Alert, Linking } from 'react-native';
import { Text, Avatar, Icon, Divider, colors, sp } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, fullReset } from '@nbfc/core';
import { C } from '../../styles/shared';

const MenuRow = ({ icon, label, onPress, color }: { icon: string; label: string; onPress: () => void; color?: string }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: sp.base }}
  >
    <Text style={{ fontSize: 20, marginRight: 14, width: 28, textAlign: 'center' }}>{icon}</Text>
    <Text variant="bodyMd" color={color || colors.text.primary} style={{ flex: 1 }}>{label}</Text>
    <Icon name="chevron_right" size={18} color={colors.text.secondary} />
  </TouchableOpacity>
);

export const MenuScreen = ({ navigation }: any) => {
  const profile = useAppSelector(s => s.user.profile);
  const loans = useAppSelector(s => s.loan.loans);
  const dispatch = useAppDispatch();

  const nav = (screen: string, params?: any) => {
    try { navigation.getParent()?.navigate(screen, params); } catch (_) {
      try { navigation.navigate(screen, params); } catch (_) {}
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      {/* Header with user info */}
      <View style={{ backgroundColor: C.navy, paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.lg }}>
        <Text variant="h3" color="#FFFFFF" style={{ marginBottom: sp.base }}>Menu</Text>
        <TouchableOpacity
          onPress={() => nav('MyProfile')}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Avatar uri={profile.photo} name={profile.fullName} size={48} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text variant="labelLg" color="#FFFFFF">{profile.fullName || 'User'}</Text>
            <Text variant="caption" color="rgba(255,255,255,0.7)">{profile.maskedMobile || ''}</Text>
          </View>
          <Icon name="chevron_right" size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Account */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.lg, paddingBottom: sp.xs }}>ACCOUNT</Text>
        <MenuRow icon="👤" label="My Profile" onPress={() => nav('MyProfile')} />
        <MenuRow icon="📋" label="Personal Information" onPress={() => nav('PersonalInfo')} />
        <MenuRow icon="📍" label="Address" onPress={() => nav('Address')} />

        <Divider gap={8} />

        {/* Loan Management */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.xs }}>LOAN MANAGEMENT</Text>
        <MenuRow icon="💰" label="My Loans" onPress={() => nav('LoanDetails', { loanId: loans[0]?.id })} />
        <MenuRow icon="💳" label="Pay EMI" onPress={() => nav('PayEMI')} />
        <MenuRow icon="📄" label="Documents & Statements" onPress={() => nav('DocumentsStatement')} />
        <MenuRow icon="🏦" label="Manage Auto-Debit" onPress={() => nav('ViewMandate')} />

        <Divider gap={8} />

        {/* Services */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.xs }}>SERVICES</Text>
        <MenuRow icon="📝" label="Raise Service Request" onPress={() => nav('ServiceRequests')} />
        <MenuRow icon="📋" label="Track Service Requests" onPress={() => nav('TrackRequests')} />
        <MenuRow icon="🎁" label="Refer & Earn" onPress={() => nav('ReferEarn')} />

        <Divider gap={8} />

        {/* Tools */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.xs }}>TOOLS</Text>
        <MenuRow icon="🧮" label="EMI Calculator" onPress={() => nav('EMICalculator')} />
        <MenuRow icon="📊" label="Eligibility Calculator" onPress={() => nav('EligibilityCalculator')} />

        <Divider gap={8} />

        {/* Settings */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.xs }}>SETTINGS</Text>
        <MenuRow icon="🔒" label="Change MPIN" onPress={() => nav('ChangeMPIN')} />
        <MenuRow icon="🌐" label="Language Preference" onPress={() => nav('LanguagePreference')} />

        <Divider gap={8} />

        {/* Support */}
        <Text variant="labelSm" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.xs }}>SUPPORT</Text>
        <MenuRow icon="🎧" label="Contact Customer Care" onPress={() => nav('CustomerCare')} />
        <MenuRow icon="📞" label="Call Us" onPress={() => Linking.openURL('tel:18001234567')} />
        <MenuRow icon="✉️" label="Email Us" onPress={() => Linking.openURL('mailto:support@skfinance.in')} />

        <Divider gap={8} />

        {/* Logout */}
        <TouchableOpacity
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => dispatch(fullReset()) },
          ])}
          activeOpacity={0.6}
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: sp.base, marginTop: sp.sm }}
        >
          <Text style={{ fontSize: 20, marginRight: 14, width: 28, textAlign: 'center' }}>🚪</Text>
          <Text variant="labelMd" color="#D32F2F">Logout</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text variant="caption" color={colors.text.secondary} align="center" style={{ marginTop: sp.lg, paddingBottom: sp.base }}>
          SK Finance Sevak v1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
