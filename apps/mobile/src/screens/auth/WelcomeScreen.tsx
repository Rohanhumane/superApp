import React from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import { Text, Button, colors } from '@nbfc/ui';
import { welcome as s } from './auth.styles';

const logo = require('../../assets/logo.png');

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={s.logoArea}>
        <Image source={logo} style={{ width: 200, height: 112, resizeMode: 'contain' }} />
        <View style={{ marginTop: 16 }}>
          <Text variant="h2" color={colors.primary.dark}>Sevak</Text>
        </View>
      </View>
      <View style={s.bottomArea}>
        <Button title="Get Started" onPress={() => navigation.navigate('ProductPage')} />
        <View style={s.btnGap} />
        <Button title="Log in" onPress={() => navigation.navigate('LoginMobile', { flow: 'etb' })} variant="secondary" />
        <Text variant="caption" color={colors.text.secondary} align="center" style={s.terms}>
          By creating an account, you confirm that you have read and understood our Privacy Policies
        </Text>
      </View>
    </SafeAreaView>
  );
};
