import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Alert, Linking } from 'react-native';
import { Text, Avatar, Icon, ProductIcon, IconBadge, SectionHeader, colors, sp } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, fullReset } from '@nbfc/core';
import { LOAN_TYPES, APP_CONFIG } from '@nbfc/config';

// ===== GRID ITEM (for products/services) =====
const GridItem = ({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={{ alignItems: 'center', width: '33.3%', marginBottom: 20 }}>
    {icon}
    <Text variant="caption" color={colors.text.primary} align="center" style={{ marginTop: 6 }} numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);


// ===== SETTINGS ROW =====
const SettingsRow = ({ icon, label, onPress, trailing }: { icon: string; label: string; onPress: () => void; trailing?: string }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6}
    style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: sp.base }}>
    <Text style={{ fontSize: 18, marginRight: 12, width: 26, textAlign: 'center' }}>{icon}</Text>
    <Text variant="bodyMd" color={colors.text.primary} style={{ flex: 1 }}>{label}</Text>
    {trailing ? (
      <Text variant="labelSm" color={colors.primary.dark}>{trailing}</Text>
    ) : (
      <Icon name="chevron_right" size={16} color={colors.text.secondary} />
    )}
  </TouchableOpacity>
);

// ===== SOCIAL ICON =====
const SocialIcon = ({ emoji, label, bg, onPress }: { emoji: string; label: string; bg: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={{ alignItems: 'center' }}>
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
    <Text variant="caption" color={colors.text.secondary} style={{ marginTop: 4 }}>{label}</Text>
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.dark} />

      {/* ===== DARK HEADER ===== */}
      <View style={{ backgroundColor: colors.primary.dark, paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sp.base }}>
          <Text variant="h3" color="#FFFFFF">Menu</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity><Icon name="search" size={20} color="#FFFFFF" /></TouchableOpacity>
            <TouchableOpacity><Icon name="bell" size={20} color="#FFFFFF" /></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => nav('MyProfile')} activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar uri={profile.photo} name={profile.fullName} size={44} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text variant="labelLg" color="#FFFFFF">{profile.fullName || 'User'}</Text>
            <Text variant="caption" color="rgba(255,255,255,0.7)">Manage My Account</Text>
          </View>
          <Icon name="chevron_right" size={18} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        {/* ===== OUR PRODUCTS ===== */}
        <SectionHeader title="Our Products" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: sp.base }}>
          {LOAN_TYPES.map(p => (
            <GridItem key={p.id} label={p.label} icon={<ProductIcon type={p.icon} size={48} />}
              onPress={() => nav('ProductDetail', { productId: p.id, productLabel: p.label })} />
          ))}
        </View>

        {/* ===== OUR SERVICES ===== */}
        <SectionHeader title="Our Services" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: sp.base }}>
          <GridItem label="Upcoming EMI" icon={<IconBadge name="calendar" bgColor="#EEF2FF" color={colors.primary.dark} />} onPress={() => nav('PayEMI')} />
          <GridItem label="Autopay" icon={<IconBadge name="refresh" bgColor="#EEF6EE" color={colors.secondary.dark} />} onPress={() => nav('ViewMandate')} />
          <GridItem label="Relationship" icon={<IconBadge name="user" bgColor="#EEF2FF" color={colors.primary.dark} />} onPress={() => nav('LoanDetails', { loanId: loans[0]?.id })} />
          <GridItem label="Documents" icon={<IconBadge name="document" bgColor="#EEF6EE" color={colors.secondary.dark} />} onPress={() => nav('DocumentsStatement')} />
          <GridItem label="Customer Care" icon={<IconBadge name="headphones" bgColor="#EEF2FF" color={colors.primary.dark} />} onPress={() => nav('CustomerCare')} />
        </View>

        {/* ===== RAISE REQUEST ===== */}
        <SectionHeader title="Raise Request" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: sp.base }}>
          <GridItem label={'Create Service\nRequest'} icon={<IconBadge name="request" bgColor="#EEF6EE" color={colors.secondary.dark} />} onPress={() => nav('ServiceRequests')} />
          <GridItem label={'Track Service\nRequests'} icon={<IconBadge name="track" bgColor="#EEF2FF" color={colors.primary.dark} />} onPress={() => nav('TrackRequests')} />
        </View>

        {/* ===== SETTINGS AND PREFERENCES ===== */}
        <SectionHeader title="Settings and preferences" />
        <SettingsRow icon="🔄" label="App update" onPress={() => Alert.alert('App Update', 'You are on the latest version.')} trailing="Update" />
        <SettingsRow icon="⚙️" label="App Settings" onPress={() => nav('LanguagePreference')} />
        <SettingsRow icon="🔒" label="Security Settings" onPress={() => nav('ChangeMPIN')} />
        <SettingsRow icon="💳" label="Payments Settings" onPress={() => nav('ViewMandate')} />

        {/* ===== ABOUT ===== */}
        <SectionHeader title="About" />
        <SettingsRow icon="🛡️" label="Privacy Policy" onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy will open in browser.')} />
        <SettingsRow icon="📜" label="Terms of Service" onPress={() => Alert.alert('Terms of Service', 'Terms of Service will open in browser.')} />
        <SettingsRow icon="👥" label="About US" onPress={() => Alert.alert('About Us', 'SK Finance — Saath Aapke... Hamesha')} />
        <SettingsRow icon="⭐" label="Rate Us" onPress={() => Alert.alert('Rate Us', 'Rate us on the Play Store.')} />

        {/* ===== CONNECT WITH US ===== */}
        <SectionHeader title="Connect With Us" />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 32, paddingVertical: 8 }}>
          <SocialIcon emoji="📘" label="Facebook" bg="#E8F0FE" onPress={() => Linking.openURL('https://facebook.com/skfinance')} />
          <SocialIcon emoji="📷" label="Instagram" bg="#FFEEF1" onPress={() => Linking.openURL('https://instagram.com/skfinance')} />
          <SocialIcon emoji="▶️" label="Youtube" bg="#FFEBEE" onPress={() => Linking.openURL('https://youtube.com/skfinance')} />
        </View>

        {/* ===== LOGOUT ===== */}
        <TouchableOpacity
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => dispatch(fullReset()) },
          ])}
          activeOpacity={0.6}
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: sp.base, marginTop: 16 }}>
          <Text style={{ fontSize: 18, marginRight: 12, width: 26, textAlign: 'center' }}>↩</Text>
          <Text variant="labelMd" color={colors.text.primary}>Logout</Text>
        </TouchableOpacity>

        {/* ===== APP VERSION ===== */}
        <Text variant="caption" color={colors.text.secondary} align="center" style={{ marginTop: sp.lg, paddingBottom: sp.base }}>
          APP VERSION {APP_CONFIG.APP_VERSION}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
