import React from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Icon, colors } from '@nbfc/ui';
import { useAppDispatch, setAuthenticated } from '@nbfc/core';
import { successStyles as s } from './success.styles';

export const SuccessScreen = ({ navigation, route }: any) => {
  const { title, subtitle, details, primaryBtn, secondaryBtn, showDownload, completeAuth } = route.params || {};
  const dispatch = useAppDispatch();

  const nav = (target: string) => {
    // If this screen was reached from BiometricSetup (lead flow), complete authentication
    // before navigating. setAuthenticated triggers navigator remount to authenticated stack,
    // which auto-shows MainTabs — no manual navigation needed for MainTabs target.
    if (completeAuth && (target === 'MainTabs' || target === 'Dashboard')) {
      dispatch(setAuthenticated({ accessToken: 'tok_' + Date.now(), refreshToken: 'ref_' + Date.now() }));
      // Explicitly reset to MainTabs as well — don't rely only on navigator remount
      try { navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }); } catch (_) {}
      return;
    }
    if (!target) { navigation.goBack(); return; }
    if (target === 'MainTabs' || target === 'Dashboard') {
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } else if (target === 'MPINLogin') {
      navigation.reset({ index: 0, routes: [{ name: 'MPINLogin' }] });
    } else {
      navigation.navigate(target);
    }
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.centerArea}>
          <View style={s.checkCircle}>
            <Icon name="success" size={40} color="#0C8749" />
          </View>
          <Text variant="h3" align="center" style={s.title}>{title || 'Success!'}</Text>
          {subtitle && (
            <Text variant="bodyMd" color="#757575" align="center" style={s.subtitle}>{subtitle}</Text>
          )}
          {details && details.length > 0 && (
            <View style={s.detailsCard}>
              {showDownload && (
                <View style={s.detailsHeader}>
                  <Text variant="labelLg" color="#212121">Confirm Details</Text>
                  <TouchableOpacity><Text variant="bodyMd" color="#757575">⬇</Text></TouchableOpacity>
                </View>
              )}
              {details.map((d: any, i: number) => (
                <View key={i} style={[s.detailRow, i < details.length - 1 && s.detailDivider]}>
                  <Text variant="bodySm" color="#757575">{d.label}</Text>
                  <Text variant="labelMd" color="#212121">{d.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={s.bottomBar}>
        <Button title={primaryBtn?.title || 'Done'} onPress={() => nav(primaryBtn?.route)} />
        {secondaryBtn && (
          <TouchableOpacity onPress={() => nav(secondaryBtn.route)} style={s.secondaryBtn}>
            <Text variant="labelMd" color="#757575">{secondaryBtn.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
