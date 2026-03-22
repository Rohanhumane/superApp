import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Animated, SafeAreaView, Image } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from '@nbfc/core';
import { RootNavigator } from './src/navigation/RootNavigator';
const SHOW_STORYBOOK = false; // Change to true to see Storybook


const logo = require('./src/assets/logo.png');
export const navigationRef = createNavigationContainerRef();

// ===== SPLASH SCREEN =====
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onFinish());
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1B2B5E', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1B2B5E" />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        <Image source={logo} style={{ width: 180, height: 100, resizeMode: 'contain' }} />
        <View style={{ marginTop: 40, width: 120, height: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <Animated.View style={{ width: '100%', height: '100%', backgroundColor: '#2D8B57', borderRadius: 2, opacity: fadeAnim }} />
        </View>
      </Animated.View>
    </View>
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
          <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 16, color: '#1A1A1A' }}>Something went wrong</Text>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 8, textAlign: 'center' }}>{String(this.state.error?.message || 'Unknown error')}</Text>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

// ===== MAIN APP =====
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};


export default App;
