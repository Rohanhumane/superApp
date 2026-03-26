import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, Modal, Animated, Dimensions } from 'react-native';
import { Text, Button, Input, Checkbox, FormTemplate, DropdownSelect, ProductTile, Icon, colors, sp } from '@nbfc/ui';
import { useAppDispatch, useAppSelector, setProfile } from '@nbfc/core';
import { LOAN_TYPES, PRODUCT_TYPES, EMPLOYMENT_TYPES } from '@nbfc/config';
import { validators } from '@nbfc/utils';
import { leadStyles as s } from './lead.styles';
import { C, SCREEN_WIDTH } from '../../styles/shared';

const logo = require('../../assets/logo.png');

// ===== DATE PICKER MODAL =====
const DatePickerModal = ({ visible, onClose, onSelect }: { visible: boolean; onClose: () => void; onSelect: (date: string) => void }) => {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleDone = () => {
    if (day && month && year) {
      const monthIdx = months.indexOf(month) + 1;
      onSelect(`${day.padStart(2, '0')}/${String(monthIdx).padStart(2, '0')}/${year}`);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={s.dateModal}>
        <View style={s.dateModalContent}>
          <View style={s.dateModalHeader}>
            <TouchableOpacity onPress={onClose}><Text variant="labelMd" color={colors.text.secondary}>Cancel</Text></TouchableOpacity>
            <Text variant="labelLg">Select Date of Birth</Text>
            <TouchableOpacity onPress={handleDone}><Text variant="labelMd" color={colors.primary.dark}>Done</Text></TouchableOpacity>
          </View>
          <View style={s.dateColumnsRow}>
            {[
              { label: 'Day', flex: 1, data: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')), val: day, set: setDay },
              { label: 'Month', flex: 1.5, data: months, val: month, set: setMonth },
              { label: 'Year', flex: 1.2, data: Array.from({ length: 60 }, (_, i) => String(currentYear - 18 - i)), val: year, set: setYear },
            ].map(col => (
              <View key={col.label} style={{ flex: col.flex }}>
                <Text variant="caption" color={colors.text.secondary} style={s.dateColumnLabel}>{col.label}</Text>
                <ScrollView style={s.dateColumn} showsVerticalScrollIndicator={false}>
                  {col.data.map(item => (
                    <TouchableOpacity key={item} style={[s.dateItem, col.val === item && s.dateItemSelected]} onPress={() => col.set(item)}>
                      <Text variant="bodyMd" color={col.val === item ? '#fff' : colors.text.primary} align="center">{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ===== PRODUCT PAGE =====
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const LOGO_W = 70;
const LOGO_H = 35;
// Final position: top-left corner of hero (left:20, top:10)
const FINAL_LEFT = 20;
const FINAL_TOP = 10;
// Start position: screen center (logo center aligns with screen center)
const START_LEFT = (SCREEN_W - LOGO_W) / 2;
const START_TOP = (SCREEN_H - LOGO_H) / 2;

export const ProductPageScreen = ({ navigation }: any) => {
  const animProgress = useRef(new Animated.Value(0)).current; // 0 = big center, 1 = small corner

  useEffect(() => {
    Animated.timing(animProgress, { toValue: 1, duration: 1200, useNativeDriver: false }).start();
  }, []);

  // Interpolate position: center → top-left
  const logoLeft = animProgress.interpolate({ inputRange: [0, 1], outputRange: [START_LEFT, FINAL_LEFT] });
  const logoTop = animProgress.interpolate({ inputRange: [0, 1], outputRange: [START_TOP, FINAL_TOP] });
  // Interpolate size: big → small
  const logoWidth = animProgress.interpolate({ inputRange: [0, 1], outputRange: [LOGO_W * 3.5, LOGO_W] });
  const logoHeight = animProgress.interpolate({ inputRange: [0, 1], outputRange: [LOGO_H * 3.5, LOGO_H] });

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      <ScrollView>
        <View style={s.heroSection}>
          {/* Placeholder space for logo so layout stays correct */}
          <View style={{ width: LOGO_W, height: LOGO_H, marginBottom: 16 }} />
          <Text variant="h2" color={colors.text.white} style={s.heroTitle}>Get Instant Vehicle{'\n'}Loan Approval</Text>
          <Text variant="bodyMd" color={colors.text.white} style={s.heroSubtitle}>Get approval in minutes</Text>
          <TouchableOpacity style={s.applyPill} onPress={() => navigation.navigate('LoginMobile', { flow: 'lead' })}>
            <Text variant="labelMd" color={C.navy}>Apply Now ➜</Text>
          </TouchableOpacity>
        </View>
        <View style={s.productsArea}>
          <Text variant="h4" style={s.productsTitle}>Our Products</Text>
          <View style={s.productsGrid}>
            {LOAN_TYPES.map(p => <ProductTile key={p.id} label={p.label} icon={p.icon} onPress={() => navigation.navigate('ProductDetail', { productId: p.id, productLabel: p.label })} />)}
          </View>
          <Text variant="h4" style={{ marginTop: sp.lg, marginBottom: sp.base }}>Tools & Services</Text>
          <View style={s.toolsRow}>
            {[{ t: 'EMI Calculator', i: '🧮', r: 'EMICalculator' }, { t: 'Eligibility Calculator', i: '📊', r: 'EligibilityCalculator' }].map(c => (
              <TouchableOpacity key={c.t} style={s.toolCard} onPress={() => navigation.navigate(c.r)}>
                <Text variant="labelMd">{c.t}</Text><Text style={s.toolIcon}>{c.i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={s.bottomBar}><Button title="Create Account" onPress={() => navigation.navigate('LoginMobile', { flow: 'ntb' })} /></View>

      {/* Animated logo: starts BIG at screen center, shrinks to top-left corner */}
      <Animated.Image
        source={logo}
        style={{
          position: 'absolute',
          zIndex: 99,
          left: logoLeft,
          top: logoTop,
          width: logoWidth,
          height: logoHeight,
          resizeMode: 'contain',
        }}
      />
    </SafeAreaView>
  );
};

// ===== PRODUCT DETAIL =====
export const ProductDetailScreen = ({ navigation, route }: any) => {
  const { productId, productLabel = 'Car Loan' } = route.params || {};
  const isAuthenticated = useAppSelector(st => st.auth.status === 'authenticated');
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={{ padding: sp.lg }}>
        <TouchableOpacity onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }} style={s.backBtn}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <View style={s.detailIcon}><Text style={s.detailIconText}>🚗</Text></View>
        <Text variant="h2">{productLabel}</Text>
        <Text variant="bodyMd" color={colors.text.secondary} style={s.detailDesc}>
          At SK Finance, we offer {productLabel.toLowerCase()}s to help you fulfill your dream of buying your very own personal or commercial vehicle without worrying about finances.
          {'\n\n'}Be it a hatchback, sedan, or SUV, you can avail loan on any of your new car ex-showroom or existing car value at the most competitive interest rates with minimal paperwork.
          {'\n\n'}So, why wait? Apply for your {productLabel.toLowerCase()} now!
        </Text>
        <Text variant="h4" style={{ marginTop: sp.lg }}>Features & Benefits</Text>
        {['Loans for all owner profiles.', 'Attractive interest rates.', '100% transparency in loan process.', 'Loan up to 90% of the car value.'].map((f, i) => (
          <View key={i} style={s.featureRow}>
            <Text variant="bodyMd" color={colors.secondary.base} style={s.featureCheck}>✓</Text>
            <Text variant="bodyMd" color={colors.text.secondary}>{f}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={s.bottomBar}><Button title="Apply Now" onPress={() => {
        if (isAuthenticated) {
          navigation.navigate('KYCForm', { flow: 'lead', productId });
        } else {
          navigation.navigate('LoginMobile', { flow: 'lead', productId });
        }
      }} /></View>
    </SafeAreaView>
  );
};

// ===== KYC FORM =====
export const KYCFormScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'ntb';
  const preSelectedProduct = route.params?.productId || '';
  const isLead = flow === 'lead';
  const dispatch = useAppDispatch();
  const authMobile = useAppSelector(st => st.auth.mobileNumber);
  const authMasked = useAppSelector(st => st.auth.maskedMobile);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [f, setF] = useState({ name: '', dob: '', pan: '', email: '', pin: '', loanType: preSelectedProduct, prodType: '', empType: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const upd = (k: string, v: any) => { setF(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = 'Name is required';
    else if (!validators.isValidName(f.name)) e.name = 'Enter a valid name (letters, spaces, dots only)';
    if (!f.dob) e.dob = 'Date of birth is required';
    if (!f.pan) e.pan = 'PAN is required';
    else if (!validators.isValidPAN(f.pan)) e.pan = 'Invalid PAN (e.g. ABCDE1234F)';
    if (!f.consent) e.consent = 'Please accept the terms';
    if (isLead) {
      if (f.email && !validators.isValidEmail(f.email)) e.email = 'Invalid email';
      if (f.pin && !validators.isValidPincode(f.pin)) e.pin = 'Invalid pincode';
      if (!f.loanType) e.loanType = 'Select loan type';
      if (!f.empType) e.empType = 'Select employment type';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(setProfile({ fullName: f.name, dob: f.dob, pan: f.pan.toUpperCase(), maskedPAN: 'xxxxxx' + f.pan.slice(-4).toUpperCase(), email: f.email || '', mobile: authMobile, maskedMobile: authMasked || ('xxxxxx' + authMobile.slice(-4)) }));
    navigation.navigate('MPINSetup', { flow });
  };

  const isValid = isLead ? (f.name && f.dob && f.pan && f.consent && f.loanType && f.empType) : (f.name && f.dob && f.pan && f.consent);

  return (
    <FormTemplate title="Tell us more about you" subtitle={isLead ? 'Help us connect you with the right loan expert' : 'This helps us verify your identity'}
      onBack={() => { if (navigation.canGoBack()) navigation.goBack(); }} btnTitle="Continue" onSubmit={handleSubmit} btnDisabled={!isValid}>
      <Input label="Full Name (as per PAN Card)" required placeholder="e.g Rahul Sharma" value={f.name} onChangeText={t => upd('name', t)} error={errors.name} />

      <View style={s.dobField}>
        <View style={s.dobLabelRow}>
          <Text variant="bodySm" color={colors.text.secondary}>Date of birth</Text>
          <Text variant="bodySm" color={colors.text.error}> *</Text>
        </View>
        <TouchableOpacity style={[s.dobInput, errors.dob ? s.dobInputError : s.dobInputNormal]} onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
          <Text variant="bodyLg" color={f.dob ? C.black : C.gray500} style={s.dobPlaceholder}>{f.dob || 'DD/MM/YYYY'}</Text>
          <Text variant="bodyMd" color={colors.text.secondary}>📅</Text>
        </TouchableOpacity>
        {errors.dob && <Text variant="caption" color={colors.text.error} style={{ marginTop: 4 }}>{errors.dob}</Text>}
      </View>

      <DatePickerModal visible={showDatePicker} onClose={() => setShowDatePicker(false)} onSelect={d => upd('dob', d)} />

      <Input label="PAN Number" required placeholder="ABCDE1234F" value={f.pan} onChangeText={t => upd('pan', t.toUpperCase())} error={errors.pan} autoCapitalize="characters" maxLength={10} />

      {isLead && (
        <>
          <Input label="Email" placeholder="email@example.com" value={f.email} onChangeText={t => upd('email', t)} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Pin Code" placeholder="Enter pincode" value={f.pin} onChangeText={t => upd('pin', t.replace(/[^0-9]/g, ''))} error={errors.pin} keyboardType="number-pad" maxLength={6} />
          <DropdownSelect label="Loan Type" required value={f.loanType} error={errors.loanType} options={LOAN_TYPES.map(l => ({ id: l.id, label: l.label }))} onSelect={o => upd('loanType', o.id)} placeholder="Select Loan Type" />
          <DropdownSelect label="Product Type" value={f.prodType} options={[...PRODUCT_TYPES]} onSelect={o => upd('prodType', o.id)} placeholder="Select Product Type" />
          <DropdownSelect label="Employment Type" required value={f.empType} error={errors.empType} options={[...EMPLOYMENT_TYPES]} onSelect={o => upd('empType', o.id)} placeholder="Select Employment Type" />
        </>
      )}

      <Checkbox checked={f.consent} onToggle={() => upd('consent', !f.consent)} label="The information provided will be used for processing your loan enquiry." />
      {errors.consent && <Text variant="caption" color={colors.text.error} style={{ marginTop: -8 }}>{errors.consent}</Text>}
    </FormTemplate>
  );
};

// ===== SELFIE CAPTURE =====
export const SelfieCaptureScreen = ({ navigation, route }: any) => {
  const flow = route.params?.flow || 'ntb';
  const fromBiometric = route.params?.fromBiometric || false;
  const isAuthenticated = useAppSelector(st => st.auth.status === 'authenticated');
  const [captured, setCaptured] = useState(false);

  const FRAME_SIZE = SCREEN_WIDTH * 0.65;

  const handleCapture = () => {
    setCaptured(true);
    // Simulate capture delay then proceed
    setTimeout(() => {
      if (isAuthenticated && !fromBiometric) {
        // Already logged in — applying for a new loan, skip MPIN/biometric setup
        navigation.navigate('SuccessScreen', {
          title: 'Application Submitted Successfully',
          subtitle: 'Our team will review and contact you soon.',
          primaryBtn: { title: 'Back to Home', route: 'MainTabs' },
        });
      } else if (fromBiometric) {
        // Coming from Enable Face ID — face captured, complete auth and go to dashboard
        if (flow === 'lead') {
          navigation.replace('SuccessScreen', {
            title: 'Application Submitted Successfully',
            subtitle: 'Our team will review and contact you soon.',
            primaryBtn: { title: 'Go to Dashboard', route: 'MainTabs' },
            completeAuth: true,
          });
        } else {
          navigation.replace('LoginSuccess', { flow });
        }
      } else {
        navigation.navigate('MPINSetup', { flow });
      }
    }, 1200);
  };

  const handleRetry = () => {
    setCaptured(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      {/* Camera preview area */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' }}>
        {/* Oval face frame */}
        <View style={{
          width: FRAME_SIZE, height: FRAME_SIZE * 1.2,
          borderRadius: FRAME_SIZE * 0.6,
          borderWidth: 3, borderColor: captured ? '#1EA862' : '#1EA862',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: captured ? '#E8F5E9' : '#FAFAFA',
          overflow: 'hidden',
        }}>
          {captured ? (
            <View style={{ alignItems: 'center' }}>
              <Icon name="success" size={64} color="#1EA862" />
              <Text variant="labelMd" color="#1EA862" style={{ marginTop: 8 }}>Photo Captured</Text>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Icon name="user" size={80} color="#BDBDBD" />
              <Text variant="caption" color={colors.text.secondary} style={{ marginTop: 8 }}>Position your face here</Text>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 24, paddingHorizontal: 40, backgroundColor: colors.white }}>
        {/* Close button */}
        <TouchableOpacity
          onPress={() => { if (navigation.canGoBack()) navigation.goBack(); }}
          style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        {/* Shutter button */}
        <TouchableOpacity
          onPress={handleCapture}
          disabled={captured}
          style={{
            width: 72, height: 72, borderRadius: 36,
            borderWidth: 4, borderColor: '#1A1C4D',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: captured ? '#E0E0E0' : colors.white,
          }}
        >
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: captured ? '#BDBDBD' : colors.white }} />
        </TouchableOpacity>

        {/* Retry button */}
        <TouchableOpacity
          onPress={handleRetry}
          style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="refresh" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
