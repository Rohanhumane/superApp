import React, { useRef, useCallback } from 'react';
import { View, SafeAreaView, StatusBar, Image, Animated, Dimensions } from 'react-native';
import { Text, Button, colors } from '@nbfc/ui';
import { welcome as s } from './auth.styles';

const logo = require('../../assets/logo.png');
const { width: SW, height: SH } = Dimensions.get('window');

const LOGO_W = 200;
const LOGO_H = 112;
const END_SCALE = 0.4;

export const WelcomeScreen = ({ navigation }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const animatingRef = useRef(false);
  const logoLayoutRef = useRef({ px: 0, py: 0 });

  const onLogoLayout = useCallback(() => {
    // Measure logo's absolute position on screen after layout
    logoViewRef.current?.measureInWindow((px: number, py: number) => {
      logoLayoutRef.current = { px, py };
    });
  }, []);

  const logoViewRef = useRef<View>(null);

  const handlePress = (screen: string, params?: any) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    // Target: top-left (20px from left, 50px from top)
    // Logo center is at (px + LOGO_W/2, py + LOGO_H/2)
    // We want the scaled logo's top-left at (20, 50)
    // Scaled size: LOGO_W * END_SCALE, LOGO_H * END_SCALE
    // Scaled center should be at: (20 + scaledW/2, 50 + scaledH/2)
    const scaledW = LOGO_W * END_SCALE;
    const scaledH = LOGO_H * END_SCALE;
    const targetCenterX = 20 + scaledW / 2;
    const targetCenterY = 50 + scaledH / 2;
    const currentCenterX = logoLayoutRef.current.px + LOGO_W / 2;
    const currentCenterY = logoLayoutRef.current.py + LOGO_H / 2;

    const dx = targetCenterX - currentCenterX;
    const dy = targetCenterY - currentCenterY;

    // Fade out content fast, animate logo to top-left, then navigate
    Animated.parallel([
      Animated.timing(contentOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: dx, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: dy, duration: 500, useNativeDriver: true }),
      Animated.timing(scale, { toValue: END_SCALE, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate(screen, params);
      // Reset for when user comes back
      setTimeout(() => {
        translateX.setValue(0);
        translateY.setValue(0);
        scale.setValue(1);
        contentOpacity.setValue(1);
        animatingRef.current = false;
      }, 300);
    });
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={s.logoArea}>
        <Animated.View
          ref={logoViewRef}
          onLayout={onLogoLayout}
          style={{
            alignItems: 'center',
            transform: [{ translateX }, { translateY }, { scale }],
          }}
        >
          <Image source={logo} style={{ width: LOGO_W, height: LOGO_H, resizeMode: 'contain' }} />
        </Animated.View>
        <Animated.View style={{ opacity: contentOpacity, marginTop: 16 }}>
          <Text variant="h2" color={colors.primary.dark}>Sevak</Text>
        </Animated.View>
      </View>
      <Animated.View style={[s.bottomArea, { opacity: contentOpacity }]}>
        <Button title="Get Started" onPress={() => handlePress('ProductPage')} />
        <View style={s.btnGap} />
        <Button title="Log in" onPress={() => handlePress('LoginMobile', { flow: 'etb' })} variant="secondary" />
        <Text variant="caption" color={colors.text.secondary} align="center" style={s.terms}>
          By creating an account, you confirm that you have read and understood our Privacy Policies
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};
