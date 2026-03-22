import React from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, colors } from '@nbfc/ui';
import { successStyles as s } from './success.styles';

export const SuccessScreen = ({ navigation, route }: any) => {
  const { title, subtitle, details, primaryBtn, secondaryBtn, showDownload } = route.params || {};

  const nav = (target: string) => {
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
            <Text style={s.checkIcon}>✓</Text>
          </View>
          <Text variant="h3" align="center" style={s.title}>{title || 'Success!'}</Text>
          {subtitle && (
            <Text variant="bodyMd" color="#666666" align="center" style={s.subtitle}>{subtitle}</Text>
          )}
          {details && details.length > 0 && (
            <View style={s.detailsCard}>
              {showDownload && (
                <View style={s.detailsHeader}>
                  <Text variant="labelLg" color="#1A1A1A">Confirm Details</Text>
                  <TouchableOpacity><Text variant="bodyMd" color="#666">⬇</Text></TouchableOpacity>
                </View>
              )}
              {details.map((d: any, i: number) => (
                <View key={i} style={[s.detailRow, i < details.length - 1 && s.detailDivider]}>
                  <Text variant="bodySm" color="#999999">{d.label}</Text>
                  <Text variant="labelMd" color="#1A1A1A">{d.value}</Text>
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
            <Text variant="labelMd" color="#666666">{secondaryBtn.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
