import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, Animated, SafeAreaView, Image, Dimensions } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, useSessionMonitor, useAppSelector } from '@nbfc/core';
import { RootNavigator } from './src/navigation/RootNavigator';
const SHOW_STORYBOOK = false; // Change to true to see Storybook

const logo = require('./src/assets/logo.png');
export const navigationRef = createNavigationContainerRef();

// ===== SPLASH SCREEN =====
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    // Hold then fade out
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onFinish());
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center',
      zIndex: 999, opacity,
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Image source={logo} style={{ width: 240, height: 135, resizeMode: 'contain' }} />
    </Animated.View>
  );
};

// ===== ERROR BOUNDARY =====
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 48 }}>⚠️</Text>
          <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 16, color: '#212121' }}>Something went wrong</Text>
          <Text style={{ fontSize: 12, color: '#757575', marginTop: 8, textAlign: 'center' }}>{String(this.state.error?.message || 'Unknown error')}</Text>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

// ===== APP CONTENT WITH SESSION MONITORING =====
const AppContent = () => {
  useSessionMonitor();
  const authStatus = useAppSelector(s => s.auth.status);
  const hasCompletedSetup = useAppSelector(s => s.auth.hasCompletedSetup);

  // Key the NavigationContainer on auth state so the ENTIRE navigation tree
  // (including native stack internal state) resets when auth status changes.
  // Without this, dispatching logout() changes the rendered screens but
  // NavigationContainer keeps stale navigation state from the old stack.
  const navContainerKey = authStatus === 'authenticated' ? 'auth'
    : authStatus === 'locked' ? 'locked'
    : authStatus === 'session_expired' ? 'expired'
    : hasCompletedSetup ? 'returning' : 'fresh';

  return (
    <NavigationContainer key={navContainerKey} ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

// ===== MAIN APP =====
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Provider store={store}>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </Provider>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};


export default App;
