import React from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Text, Button, Icon, colors, sp } from '@nbfc/ui';
import { useAppSelector } from '@nbfc/core';
import { maskAccount } from '@nbfc/utils';
import { C } from '../../styles/shared';

const LoanIcon = ({ type }: { type: string }) => {
  const lower = type.toLowerCase();
  const cfg: Record<string, { emoji: string; bg: string }> = {
    car: { emoji: '🚗', bg: '#EEF2FF' },
    equipment: { emoji: '⚙️', bg: '#EEF6EE' },
    business: { emoji: '🏢', bg: '#EEF6EE' },
    tractor: { emoji: '🚜', bg: '#EEF6EE' },
    commercial: { emoji: '🚛', bg: '#EEF2FF' },
    home: { emoji: '🏠', bg: '#EEF6EE' },
  };
  const match = Object.keys(cfg).find(k => lower.includes(k));
  const c = match ? cfg[match] : { emoji: '📦', bg: '#FAFAFA' };
  return (
    <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>{c.emoji}</Text>
    </View>
  );
};

export const AccountDiscoveryScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'etb';
  const userName = useAppSelector(s => s.user.profile.fullName);
  const loans = useAppSelector(s => s.loan.loans);
  const activeLoans = loans.filter(l => l.status === 'active');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity
        onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}
        style={{ padding: sp.base }}
      >
        <Icon name="back" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: sp.lg, paddingTop: sp.base, paddingBottom: 40 }}
      >
        <Text variant="h2" style={{ marginBottom: sp.sm }}>
          Hello, {userName.split(' ')[0] || 'User'}
        </Text>

        <Text variant="bodyMd" color={colors.text.secondary} style={{ marginBottom: sp.xl, lineHeight: 22 }}>
          We found {activeLoans.length} active loan account{activeLoans.length !== 1 ? 's' : ''} linked to your mobile number
        </Text>

        {activeLoans.map(loan => (
          <View
            key={loan.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: sp.base,
              borderBottomWidth: 1,
              borderBottomColor: colors.border.light,
            }}
          >
            <LoanIcon type={loan.type} />
            <View style={{ marginLeft: sp.base, flex: 1 }}>
              <Text variant="labelLg">{loan.type}</Text>
              <Text variant="bodySm" color={colors.text.secondary}>
                A/c No: {maskAccount(loan.accountNo)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{
        paddingHorizontal: sp.lg,
        paddingBottom: sp.lg,
        paddingTop: sp.base,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
      }}>
        <Button
          title="Confirm & Proceed"
          onPress={() => navigation.navigate('MPINSetup', { flow })}
        />
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:18001234567')}
          style={{ alignSelf: 'center', marginTop: sp.base, paddingVertical: sp.sm }}
        >
          <Text variant="bodySm" color={colors.text.secondary} align="center">
            If Information is not right, Contact Support.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
