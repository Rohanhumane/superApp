import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Text, Icon, colors, sp } from '@nbfc/ui';
import { useAppSelector } from '@nbfc/core';
import { C } from '../../styles/shared';

const OFFERS = [
  {
    id: '1', type: 'pre_approved', tag: 'Pre-Approved',
    title: 'Two-Wheeler Loan', subtitle: 'Get up to ₹1,50,000 instantly',
    rate: '9.5% p.a.', tenure: 'Up to 36 months', icon: 'car' as const,
    bgColor: '#EEF6EE', tagColor: '#0C8749',
  },
  {
    id: '2', type: 'seasonal', tag: 'Limited Offer',
    title: 'Top-Up on Car Loan', subtitle: 'Get additional ₹2,00,000 on your existing loan',
    rate: '10.5% p.a.', tenure: 'Up to 48 months', icon: 'car' as const,
    bgColor: '#FFF8E1', tagColor: '#E65100',
  },
  {
    id: '3', type: 'referral', tag: 'Refer & Earn',
    title: 'Refer a Friend', subtitle: 'Earn ₹500 for every successful referral',
    rate: '', tenure: '', icon: 'gift' as const,
    bgColor: '#F3E5F5', tagColor: '#7B1FA2',
  },
  {
    id: '4', type: 'pre_approved', tag: 'Pre-Approved',
    title: 'Business Loan', subtitle: 'Grow your business with up to ₹10,00,000',
    rate: '12.0% p.a.', tenure: 'Up to 60 months', icon: 'business' as const,
    bgColor: '#E8EAF6', tagColor: '#1A1C4D',
  },
];

const FILTERS = ['All', 'Pre-Approved', 'Seasonal', 'Referral'];

export const OffersScreen = ({ navigation }: any) => {
  const userName = useAppSelector(s => s.user.profile.fullName);
  const [filter, setFilter] = useState('All');

  const filtered = OFFERS.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'Pre-Approved') return o.type === 'pre_approved';
    if (filter === 'Seasonal') return o.type === 'seasonal';
    if (filter === 'Referral') return o.type === 'referral';
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      {/* Header */}
      <View style={{ backgroundColor: C.navy, paddingHorizontal: sp.base, paddingTop: sp.base, paddingBottom: sp.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="h3" color="#FFFFFF">Offers</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity><Icon name="search" size={22} color="#fff" /></TouchableOpacity>
            <TouchableOpacity><Icon name="bell" size={22} color="#fff" /></TouchableOpacity>
          </View>
        </View>
        <Text variant="bodyMd" color="rgba(255,255,255,0.7)" style={{ marginTop: 4 }}>
          {userName ? `Hi ${userName.split(' ')[0]}, ` : ''}check out these exclusive offers
        </Text>
      </View>

      {/* Filter tabs */}
      <View style={{ flexDirection: 'row', paddingHorizontal: sp.base, paddingVertical: sp.sm, gap: 8, backgroundColor: colors.white }}>
        {FILTERS.map(f => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={{
                paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
                backgroundColor: active ? C.navy : '#F5F5F5',
              }}
            >
              <Text variant="labelSm" color={active ? '#fff' : colors.text.secondary}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Offer cards */}
      <ScrollView contentContainerStyle={{ padding: sp.base, paddingBottom: 100, gap: 16 }} showsVerticalScrollIndicator={false}>
        {filtered.map(offer => (
          <TouchableOpacity
            key={offer.id}
            activeOpacity={0.7}
            onPress={() => {
              if (offer.type === 'referral') {
                try { navigation.getParent()?.navigate('ReferEarn'); } catch (_) {}
              } else {
                Alert.alert(offer.title, 'Apply for this offer?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Apply Now', onPress: () => {
                    try { navigation.getParent()?.navigate('ProductDetail', { productId: offer.id, productLabel: offer.title }); } catch (_) {}
                  }},
                ]);
              }
            }}
            style={{
              backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden',
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
            }}
          >
            {/* Tag strip */}
            <View style={{ backgroundColor: offer.bgColor, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name={offer.icon} size={24} color={offer.tagColor} />
                <Text variant="labelMd" color={offer.tagColor}>{offer.tag}</Text>
              </View>
              <Icon name="chevron_right" size={20} color={offer.tagColor} />
            </View>

            {/* Content */}
            <View style={{ padding: 16 }}>
              <Text variant="labelLg">{offer.title}</Text>
              <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 4 }}>{offer.subtitle}</Text>
              {offer.rate ? (
                <View style={{ flexDirection: 'row', gap: 24, marginTop: 12 }}>
                  <View>
                    <Text variant="caption" color={colors.text.secondary}>Interest Rate</Text>
                    <Text variant="labelMd" color={C.green}>{offer.rate}</Text>
                  </View>
                  <View>
                    <Text variant="caption" color={colors.text.secondary}>Tenure</Text>
                    <Text variant="labelMd">{offer.tenure}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 48 }}>
            <Icon name="gift" size={48} color={colors.text.secondary} />
            <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 12 }}>No offers in this category</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
