import React, { useState } from 'react';
import { profileStyles as ps } from "./profile.styles";
import { View, ScrollView, SafeAreaView, TouchableOpacity, Alert, StatusBar, Linking } from 'react-native';
import { Text, Button, Input, Avatar, Checkbox, RadioButton, Divider, MenuItem, FormTemplate, DropdownSelect, colors, sp, Icon } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, setLanguage, logout, updateMobile, updateEmail } from '@nbfc/core';
import { LANGUAGES, SUPPORT_OPTIONS } from '@nbfc/config';
import { validators } from '@nbfc/utils';

// ===== MY PROFILE =====
export const MyProfileScreen = ({ navigation }: any) => {
  const p = useAppSelector(s => s.user.profile);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={{ marginLeft: sp.base }}>My Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ alignItems: 'center', paddingVertical: sp.lg }}>
          <Avatar uri={p.photo} name={p.fullName} size={80} onEdit={() => Alert.alert('Change Photo', '', [{ text: 'Take a photo' }, { text: 'Gallery' }, { text: 'Cancel', style: 'cancel' }])} />
          <Text variant="h4" style={{ marginTop: sp.base }}>{p.fullName}</Text>
        </View>
        <Text variant="labelMd" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, marginBottom: sp.sm }}>Account Information</Text>
        <MenuItem icon="👤" label="Personal Information" onPress={() => navigation.navigate('PersonalInfo')} />
        <MenuItem icon="📍" label="Address" onPress={() => navigation.navigate('Address')} />
        <Divider gap={8} />
        <Text variant="labelMd" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, marginTop: sp.base, marginBottom: sp.sm }}>Settings</Text>
        <MenuItem icon="🔒" label="Change MPIN" onPress={() => navigation.navigate('ChangeMPIN')} />
        <MenuItem icon="🌐" label="Language Preference" onPress={() => navigation.navigate('LanguagePreference')} />
        <Divider gap={8} />
        <Text variant="labelMd" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, marginTop: sp.base, marginBottom: sp.sm }}>Others</Text>
        <MenuItem icon="🎁" label="Refer & Earn" onPress={() => navigation.navigate('ReferEarn')} />
        <MenuItem icon="🎧" label="Contact Customer Care" onPress={() => navigation.navigate('CustomerCare')} />
        <Divider gap={8} />
        <MenuItem icon="🚪" label="Logout" onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: () => {
            // fullReset clears ALL state back to initial
            // key={navKey} in RootNavigator forces remount → Welcome screen
            dispatch(logout());
          }},
        ])} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== PERSONAL INFO — with mobile Change button =====
export const PersonalInfoScreen = ({ navigation }: any) => {
  const p = useAppSelector(s => s.user.profile);
  const [showPAN, setShowPAN] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={{ marginLeft: sp.base }}>Personal Information</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: sp.lg, paddingBottom: 40 }}>
        {/* Read-only: Name */}
        <View style={{ marginBottom: sp.lg }}>
          <Text variant="caption" color={colors.text.secondary}>Full Name</Text>
          <Text variant="bodyLg" style={{ marginTop: 4 }}>{p.fullName || '—'}</Text>
        </View>

        {/* Read-only: DOB */}
        <View style={{ marginBottom: sp.lg }}>
          <Text variant="caption" color={colors.text.secondary}>Date of Birth</Text>
          <Text variant="bodyLg" style={{ marginTop: 4 }}>{p.dob || '—'}</Text>
        </View>

        {/* Masked: PAN */}
        <View style={{ marginBottom: sp.lg }}>
          <Text variant="caption" color={colors.text.secondary}>PAN Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text variant="bodyLg">{showPAN ? (p.pan || '—') : (p.maskedPAN || '—')}</Text>
            <TouchableOpacity onPress={() => setShowPAN(!showPAN)}>
              <Text variant="bodyMd" color={colors.text.secondary} style={{ marginLeft: 8 }}>{showPAN ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Number — with CHANGE button */}
        <View style={{ marginBottom: sp.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="caption" color={colors.text.secondary}>Mobile Number</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateMobile')}>
              <Text variant="labelMd" color={colors.primary.dark}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text variant="bodyLg">{showMobile ? (p.mobile || '—') : (p.maskedMobile || '—')}</Text>
            <TouchableOpacity onPress={() => setShowMobile(!showMobile)}>
              <Text variant="bodyMd" color={colors.text.secondary} style={{ marginLeft: 8 }}>{showMobile ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alternate Mobile — Add link */}
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}
          onPress={() => navigation.navigate('UpdateMobile')}
        >
          <Text variant="bodyMd">Alternate Mobile Number</Text>
          <Text variant="labelMd" color={colors.primary.dark}>Add</Text>
        </TouchableOpacity>

        {/* Email — Add/Update link */}
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light, marginTop: sp.sm }}
          onPress={() => navigation.navigate('UpdateEmail')}
        >
          <Text variant="bodyMd">Email ID</Text>
          <Text variant="labelMd" color={colors.primary.dark}>{p.email ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={{ backgroundColor: colors.bg.secondary, borderRadius: 8, padding: sp.base, flexDirection: 'row', marginTop: sp.lg }}>
          <Text variant="bodyMd" color={colors.text.secondary} style={{ marginRight: 8 }}>ⓘ</Text>
          <View style={{ flex: 1 }}>
            <Text variant="labelSm">Disclaimer</Text>
            <Text variant="caption" color={colors.text.secondary}>Updates made here will only apply to your profile information.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== UPDATE MOBILE NUMBER =====
export const UpdateMobileScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={{ marginLeft: sp.base }}>Update Mobile Number</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp.lg }} keyboardShouldPersistTaps="handled">
        <Text variant="h2" style={{ marginBottom: sp.sm }}>Update Mobile Number</Text>
        <Text variant="bodyMd" color={colors.text.secondary} style={{ marginBottom: sp.lg, lineHeight: 22 }}>
          Enter your new mobile number. A verification code will be sent to confirm the change.
        </Text>
        <Input label="New Mobile Number" required placeholder="Enter new mobile number"
          value={mobile} onChangeText={t => { setMobile(t.replace(/[^0-9]/g, '').slice(0, 10)); setError(''); }}
          error={error} keyboardType="phone-pad" maxLength={10} />
        <Checkbox checked={consent} onToggle={() => setConsent(!consent)}
          label="I agree that SKF will share the new mobile number entered by me with external agencies for verification purpose." />
      </ScrollView>
      <View style={{ paddingHorizontal: sp.lg, paddingBottom: sp.lg, paddingTop: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title="Continue" onPress={() => {
          if (!mobile || mobile.length < 10) { setError('Enter 10-digit mobile number'); return; }
          if (!validators.isValidMobile(mobile)) { setError('Enter valid mobile number starting with 6-9'); return; }
          dispatch(updateMobile(mobile));
          navigation.navigate('OTPVerification', { verifyType: 'mobile', mobile });
        }} disabled={!mobile || mobile.length < 10 || !consent} />
      </View>
    </SafeAreaView>
  );
};

// ===== UPDATE EMAIL =====
export const UpdateEmailScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={{ marginLeft: sp.base }}>Update Email ID</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp.lg }} keyboardShouldPersistTaps="handled">
        <Text variant="h2" style={{ marginBottom: sp.sm }}>Update Email Address</Text>
        <Text variant="bodyMd" color={colors.text.secondary} style={{ marginBottom: sp.lg, lineHeight: 22 }}>Enter your new email address.</Text>
        <Input label="New Email Address" required placeholder="Enter new email address" value={email}
          onChangeText={t => { setEmail(t); setError(''); }} error={error} keyboardType="email-address" autoCapitalize="none" />
      </ScrollView>
      <View style={{ paddingHorizontal: sp.lg, paddingBottom: sp.lg, paddingTop: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title="Continue" onPress={() => {
          if (!validators.isValidEmail(email)) { setError('Enter valid email'); return; }
          dispatch(updateEmail(email));
          navigation.navigate('OTPVerification', { verifyType: 'email', email });
        }} disabled={!email} />
      </View>
    </SafeAreaView>
  );
};

// ===== ADDRESS =====
export const AddressScreen = ({ navigation }: any) => {
  const addrs = useAppSelector(s => s.user.addresses);
  return (
    <FormTemplate title="" headerTitle="Address" onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }} subtitle="">
      {addrs.map((a, i) => (
        <View key={i} style={{ marginBottom: sp.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}>
            <Text variant="caption" color={colors.primary.dark}>{a.type === 'communication' ? 'Communication Address' : 'Permanent Address'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ConfirmAddress')}><Text variant="labelMd" color={colors.primary.dark}>Update</Text></TouchableOpacity>
          </View>
          <Text variant="bodyMd">{a.full}</Text>
        </View>
      ))}
    </FormTemplate>
  );
};

export const ConfirmAddressScreen = ({ navigation }: any) => {
  const p = useAppSelector(s => s.user.profile);
  const a = useAppSelector(s => s.user.addresses);
  return (
    <FormTemplate title="Confirm Your Address" subtitle="We found the following address from your document."
      headerTitle="Confirm Your Address" onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="Confirm" onSubmit={() => navigation.navigate('SuccessScreen', {
        title: 'Request Submitted Successfully', subtitle: 'Your address will be updated within 24 hours.',
        primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' }, secondaryBtn: { title: 'Back to Home', route: 'MainTabs' },
      })}>
      {[{ i: '📅', t: `DOB - ${p.dob || '—'}` }, { i: '👤', t: `Father name: ${p.fatherName || '—'}` }, { i: '🏠', t: a[0]?.full || '—' }].map((x, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: sp.lg }}>
          <Text style={{ fontSize: 20, marginRight: sp.base }}>{x.i}</Text><Text variant="bodyMd" style={{ flex: 1 }}>{x.t}</Text>
        </View>
      ))}
    </FormTemplate>
  );
};

export const LanguagePreferenceScreen = ({ navigation }: any) => {
  const cur = useAppSelector(s => s.user.language);
  const dispatch = useAppDispatch();
  const [sel, setSel] = useState(cur);
  return (
    <FormTemplate title="Language Preference" subtitle="Select your preferred language"
      headerTitle="Language Preference" onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="Submit" onSubmit={() => { dispatch(setLanguage(sel)); navigation.navigate('SuccessScreen', {
        title: 'Request Submitted Successfully', subtitle: 'Your Language Preference will be updated within 24 hours.',
        primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' }, secondaryBtn: { title: 'Back to Home', route: 'MainTabs' },
      }); }}>
      {LANGUAGES.map(l => <RadioButton key={l.id} selected={sel === l.id} onPress={() => setSel(l.id)} label={`${l.native} (${l.label})`} />)}
    </FormTemplate>
  );
};

export const ChangeMPINScreen = ({ navigation }: any) => {
  const masked = useAppSelector(s => s.auth.maskedMobile) || 'XXXXXX3210';
  return (
    <FormTemplate title="Change MPIN" subtitle="To change your MPIN, verify your registered mobile number through OTP."
      headerTitle="Change MPIN" onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="Continue" onSubmit={() => navigation.navigate('OTPVerification', { flow: 'reset' })}>
      <View style={{ backgroundColor: colors.bg.secondary, borderRadius: 12, padding: sp.base }}>
        <Text variant="caption" color={colors.text.secondary}>Registered Mobile Number</Text>
        <Text variant="labelLg" style={{ marginTop: sp.xs }}>{masked}</Text>
      </View>
    </FormTemplate>
  );
};

export const ReferEarnScreen = ({ navigation }: any) => {
  const [f, setF] = useState({ name: '', contact: '', loan: '' });
  return (
    <FormTemplate title="Enter your friend's details" subtitle="Your friend's details are safe."
      headerTitle="Fill referral form" onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }}
      btnTitle="Submit referral" onSubmit={() => navigation.navigate('SuccessScreen', {
        title: 'Referral submitted successfully', subtitle: "We'll contact your friend shortly", primaryBtn: { title: 'Done', route: 'MainTabs' },
      })} btnDisabled={!f.name || !f.contact}>
      <Input label="Friend's name" placeholder="Enter name" value={f.name} onChangeText={t => setF(p => ({ ...p, name: t }))} />
      <Input label="Contact details" placeholder="Enter mobile number" value={f.contact} onChangeText={t => setF(p => ({ ...p, contact: t }))} keyboardType="phone-pad" maxLength={10} />
      <DropdownSelect label="Interested Loan" value={f.loan} options={[{ id: 'car', label: 'Car loan' }, { id: 'tractor', label: 'Tractor loan' }, { id: 'business', label: 'Business loan' }]} onSelect={o => setF(p => ({ ...p, loan: o.id }))} placeholder="Select loan type" />
    </FormTemplate>
  );
};

export const CustomerCareScreen = ({ navigation }: any) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <StatusBar barStyle="dark-content" />
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
      <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
      <Text variant="labelLg" style={{ marginLeft: sp.base }}>Contact Customer Care</Text>
    </View>
    <View style={{ alignItems: 'center', paddingVertical: sp.xl }}><Text style={{ fontSize: 64 }}>🎧</Text><Text variant="h4" style={{ marginTop: sp.base }}>Talk to our team</Text></View>
    <Text variant="labelMd" style={{ paddingHorizontal: sp.lg, marginBottom: sp.base }}>All Options</Text>
    {SUPPORT_OPTIONS.map(o => <MenuItem key={o.id} icon={o.icon === 'email' ? '✉️' : o.icon === 'phone' ? '📞' : '💬'} label={`${o.label}\n${o.subtitle}`} onPress={() => {
      if (o.id === 'email') Linking.openURL('mailto:support@skfinance.in');
      else if (o.id === 'call') Linking.openURL('tel:18001234567');
      else Alert.alert('Chat Support', 'Chat support coming soon');
    }} />)}
  </SafeAreaView>
);
