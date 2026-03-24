import React from 'react';
import { Text as RNText } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@nbfc/core';

import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { LoginMobileScreen } from '../screens/auth/LoginMobileScreen';
import { OTPVerificationScreen } from '../screens/auth/OTPVerificationScreen';
import { MPINIntroScreen, MPINSetupScreen, MPINConfirmScreen, BiometricSetupScreen, LoginSuccessScreen } from '../screens/auth/MPINScreens';
import { MPINLoginScreen, ForgotMPINScreen, AccountLockedScreen, SessionExpiredScreen } from '../screens/auth/SubsequentLoginScreens';
import { ProductPageScreen, ProductDetailScreen, KYCFormScreen, SelfieCaptureScreen } from '../screens/lead/LeadScreens';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { ServicesHomeScreen, ServiceRequestsScreen, SelectLoanScreen, OtherRequestScreen, TrackRequestsScreen } from '../screens/services/ServiceScreens';
import { PayEMIScreen, LoanDetailsScreen, LoanCardScreen, ViewMandateScreen, SetUpAutoDebitScreen, AuthorizeMandateScreen, DocumentsStatementScreen } from '../screens/payments/PaymentScreens';
import { MyProfileScreen, PersonalInfoScreen, UpdateMobileScreen, UpdateEmailScreen, AddressScreen, ConfirmAddressScreen, LanguagePreferenceScreen, ChangeMPINScreen, ReferEarnScreen, CustomerCareScreen } from '../screens/profile/ProfileScreens';
import { EMICalculatorScreen, EligibilityCalculatorScreen } from '../screens/calculators/CalculatorScreens';
import { SuccessScreen } from '../screens/shared/SuccessScreen';
import { OffersScreen } from '../screens/offers/OffersScreen';
import { MenuScreen as MenuTabScreen } from '../screens/menu/MenuScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const noHeader = { headerShown: false };

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = { Home: '🏠', Services: '🔧', Offers: '🎁', Menu: '☰' };
  return <RNText style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icons[name] || '📱'}</RNText>;
};

// Offers and Menu are now full screens imported from their own files




const MainTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
    tabBarActiveTintColor: '#2E3192', tabBarInactiveTintColor: '#757575',
    tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E0E0E0', height: 60, paddingBottom: 8 },
    tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
  })}>
    <Tab.Screen name="Home" component={DashboardScreen} />
    <Tab.Screen name="Services" component={ServicesHomeScreen} />
    <Tab.Screen name="Offers" component={OffersScreen} />
    <Tab.Screen name="Menu" component={MenuTabScreen} />
  </Tab.Navigator>
);

export const RootNavigator = () => {
  const { status, hasCompletedSetup, isFirstTimeSetup } = useAppSelector(s => s.auth);
  const isAuth = status === 'authenticated';
  const isLocked = status === 'locked';
  const isExpired = status === 'session_expired';

  // KEY FIX: This key forces full navigator remount when auth state changes
  // Without this, logout dispatches fullReset() but the old navigator stays mounted
  const navKey = isAuth ? 'authenticated' : isLocked ? 'locked' : isExpired ? 'expired'
    : hasCompletedSetup && !isFirstTimeSetup ? 'returning' : 'fresh';

  return (
    <Stack.Navigator key={navKey} screenOptions={{ ...noHeader, animation: 'slide_from_right' }}>
      {isAuth ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="UpdateMobile" component={UpdateMobileScreen} />
          <Stack.Screen name="UpdateEmail" component={UpdateEmailScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} />
          <Stack.Screen name="LanguagePreference" component={LanguagePreferenceScreen} />
          <Stack.Screen name="ChangeMPIN" component={ChangeMPINScreen} />
          <Stack.Screen name="ReferEarn" component={ReferEarnScreen} />
          <Stack.Screen name="CustomerCare" component={CustomerCareScreen} />
          <Stack.Screen name="PayEMI" component={PayEMIScreen} />
          <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
          <Stack.Screen name="LoanCard" component={LoanCardScreen} />
          <Stack.Screen name="ViewMandate" component={ViewMandateScreen} />
          <Stack.Screen name="SetUpAutoDebit" component={SetUpAutoDebitScreen} />
          <Stack.Screen name="AuthorizeMandate" component={AuthorizeMandateScreen} />
          <Stack.Screen name="DocumentsStatement" component={DocumentsStatementScreen} />
          <Stack.Screen name="ServiceRequests" component={ServiceRequestsScreen} />
          <Stack.Screen name="SelectLoan" component={SelectLoanScreen} />
          <Stack.Screen name="OtherRequest" component={OtherRequestScreen} />
          <Stack.Screen name="TrackRequests" component={TrackRequestsScreen} />
          <Stack.Screen name="EMICalculator" component={EMICalculatorScreen} />
          <Stack.Screen name="EligibilityCalculator" component={EligibilityCalculatorScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="MPINSetup" component={MPINSetupScreen} />
          <Stack.Screen name="MPINConfirm" component={MPINConfirmScreen} />
        </>
      ) : isLocked ? (
        <>
          <Stack.Screen name="AccountLocked" component={AccountLockedScreen} />
          <Stack.Screen name="ForgotMPIN" component={ForgotMPINScreen} />
          <Stack.Screen name="MPINLogin" component={MPINLoginScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="MPINSetup" component={MPINSetupScreen} />
          <Stack.Screen name="MPINConfirm" component={MPINConfirmScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </>
      ) : isExpired ? (
        <>
          <Stack.Screen name="SessionExpired" component={SessionExpiredScreen} />
          <Stack.Screen name="MPINLogin" component={MPINLoginScreen} />
        </>
      ) : hasCompletedSetup && !isFirstTimeSetup ? (
        <>
          <Stack.Screen name="MPINLogin" component={MPINLoginScreen} />
          <Stack.Screen name="ForgotMPIN" component={ForgotMPINScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="MPINSetup" component={MPINSetupScreen} />
          <Stack.Screen name="MPINConfirm" component={MPINConfirmScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ProductPage" component={ProductPageScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="LoginMobile" component={LoginMobileScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="KYCForm" component={KYCFormScreen} />
          <Stack.Screen name="SelfieCapture" component={SelfieCaptureScreen} />
          <Stack.Screen name="MPINIntro" component={MPINIntroScreen} />
          <Stack.Screen name="MPINSetup" component={MPINSetupScreen} />
          <Stack.Screen name="MPINConfirm" component={MPINConfirmScreen} />
          <Stack.Screen name="BiometricSetup" component={BiometricSetupScreen} />
          <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="EMICalculator" component={EMICalculatorScreen} />
          <Stack.Screen name="EligibilityCalculator" component={EligibilityCalculatorScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
