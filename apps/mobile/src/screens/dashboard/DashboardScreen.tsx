import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Alert, Linking } from 'react-native';
import { DashboardTemplate, Text, LoanCard, SectionHeader, QuickLinkCard, RecommendCard, ProductIcon, Icon, colors, sp } from '@nbfc/ui';
import { useAppSelector } from '@nbfc/core';
import { LOAN_TYPES } from '@nbfc/config';
import { ds } from './DashboardScreen.styles';
import { SCREEN_WIDTH } from '../../styles/shared';

export const DashboardScreen = ({ navigation }: any) => {
  const userType = useAppSelector(s => s.auth.userType);
  const userName = useAppSelector(s => s.user.profile.fullName);
  const loans = useAppSelector(s => s.loan.loans);
  const leadStatus = useAppSelector(s => s.service.leadStatus);
  const isETB = userType === 'etb';

  const nav = (screen: string, params?: any) => {
    try { navigation.getParent()?.navigate(screen, params); } catch (_) {
      try { navigation.navigate(screen, params); } catch (_) {}
    }
  };

  if (isETB) {
    return (
      <DashboardTemplate userName={userName.split(' ')[0]} onProfile={() => nav('MyProfile')} onSearch={() => {}} onNotify={() => {}}>
        {loans.length > 0 && <View style={{ marginTop: sp.base }}><ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
          {loans.map(l => <LoanCard key={l.id} type={l.type} number={l.number} status={l.status} amount={l.amount} emi={l.emi} onView={() => nav('LoanDetails', { loanId: l.id })} onPay={() => nav('PayEMI', { loanId: l.id })} />)}
        </ScrollView></View>}
        <SectionHeader title="Payments & Reminders" />
        <TouchableOpacity style={[ds.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: sp.base }]} onPress={() => nav('SetUpAutoDebit')}>
          <Text style={{ fontSize: 24, marginRight: sp.base }}>🔄</Text><View style={{ flex: 1 }}><Text variant="bodySm">Never miss an EMI. Set up auto-debit.</Text><Text variant="labelSm" color={colors.primary.dark}>Set Up Auto-Debit</Text></View>
        </TouchableOpacity>
        <SectionHeader title="Recommended for You" />
        <RecommendCard title="Pre-Approved Two-Wheeler Loan" sub="Get up to ₹1,50,000 instantly" onPress={() => nav('ProductDetail', { productId: 'two_wheeler_loan', productLabel: 'Two-Wheeler Loan' })} />
        <SectionHeader title="Quick Links" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: sp.base }}>
          {[{ l: 'My Loans', i: 'loan', r: 'LoanDetails' }, { l: 'Documents', i: 'document', r: 'DocumentsStatement' }, { l: 'Mandate', i: 'mandate', r: 'ViewMandate' }].map(q =>
            <QuickLinkCard key={q.l} label={q.l} icon={q.i} onPress={() => nav(q.r, q.r === 'LoanDetails' ? { loanId: loans[0]?.id } : undefined)} />)}
          <QuickLinkCard label="Insurance" icon="insurance" onPress={() => Alert.alert('Coming Soon', 'Insurance services will be available soon.')} />
        </View>
      </DashboardTemplate>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary.dark }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.dark} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={ds.navySection}>
          <View style={ds.topBar}>
            <TouchableOpacity style={ds.avatarCircle} onPress={() => nav('MyProfile')}><Icon name="user" size={20} color="#fff" /></TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={{ marginRight: 16 }}><Icon name="search" size={22} color="#fff" /></TouchableOpacity>
            <TouchableOpacity><Icon name="bell" size={22} color="#fff" /></TouchableOpacity>
          </View>
          <View style={ds.heroContent}>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color="#FFFFFF" style={{ lineHeight: 28, fontSize: 20 }}>Get Instant Vehicle{'\n'}Loan Approval</Text>
              <Text variant="bodySm" color="rgba(255,255,255,0.6)" style={{ marginTop: 4 }}>Get approval in minutes</Text>
              <TouchableOpacity style={ds.applyBtn} onPress={() => nav('ProductDetail', { productId: 'car_loan', productLabel: 'Car Loan' })}>
                <Text variant="labelSm" color={colors.primary.dark}>Apply Now</Text>
                <View style={ds.applyBtnIcon}><Text variant="caption" color="#fff">➜</Text></View>
              </TouchableOpacity>
            </View>
            <View style={ds.carArea}>
              <Text style={{ fontSize: 50 }}>🚚</Text>
              <View style={{ position: 'absolute', top: -10, right: 4 }}><Text style={{ fontSize: 22 }}>📦</Text></View>
            </View>
          </View>
          <View style={ds.dotsRow}><View style={ds.dotOff} /><View style={ds.dotOn} /><View style={ds.dotOff} /></View>
        </View>
        <View style={ds.contentArea}>
          {leadStatus !== 'none' && <View style={ds.statusCard}>
            <View style={ds.statusIcon}><Icon name="user" size={22} color={colors.primary.dark} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text.primary }}>
                {leadStatus === 'completed' ? 'Your application is approved!' : leadStatus === 'rejected' ? 'Application not approved' : 'Your request is in progress.'}
              </Text>
              <Text style={{ fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
                {leadStatus === 'completed' ? 'Check your loan details.' : leadStatus === 'rejected' ? 'Contact support for more info.' : 'Our team will contact you soon..'}
              </Text>
              <TouchableOpacity style={ds.orangeBtn} onPress={() => nav('CustomerCare')}><Text style={{ fontSize: 11, fontWeight: '600', color: '#fff' }}>Contact Support</Text></TouchableOpacity>
            </View>
          </View>}
          <Text style={ds.sectionTitle}>Our Products</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 }}>
            {LOAN_TYPES.map(p => (
              <TouchableOpacity key={p.id} style={ds.prodItem} onPress={() => nav('ProductDetail', { productId: p.id, productLabel: p.label })} activeOpacity={0.7}>
                <ProductIcon type={p.icon} />
                <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 6, color: colors.text.primary }} numberOfLines={2}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[ds.sectionTitle, { fontStyle: 'italic' }]}>Tools & Services</Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 12 }}>
            <TouchableOpacity style={ds.toolCard} onPress={() => nav('EMICalculator')} activeOpacity={0.7}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text.primary }}>EMI{'\n'}Calculator</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 8 }}><View style={[ds.toolBubble, { backgroundColor: '#F5ECD7' }]}><Text style={{ fontSize: 36 }}>🧮</Text></View></View>
            </TouchableOpacity>
            <TouchableOpacity style={ds.toolCard} onPress={() => nav('EligibilityCalculator')} activeOpacity={0.7}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text.primary }}>Eligibility{'\n'}Calculator</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 8 }}><View style={[ds.toolBubble, { backgroundColor: '#E2F0E2' }]}><Text style={{ fontSize: 36 }}>📊</Text></View></View>
            </TouchableOpacity>
          </View>
          <Text style={ds.sectionTitle}>Support</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 32 }}>
            {[{ l: 'Chat support', i: '💬', action: () => Alert.alert('Chat Support', 'Chat support will be available soon.') }, { l: 'Email', i: '✉️', action: () => Linking.openURL('mailto:support@skfinance.in') }, { l: 'Call Us', i: '📞', action: () => Linking.openURL('tel:18001234567') }, { l: 'Locate Us', i: '📍', action: () => Linking.openURL('https://maps.google.com/?q=SK+Finance') }].map(s => (
              <TouchableOpacity key={s.l} style={{ alignItems: 'center', width: (SCREEN_WIDTH - 48) / 4 }} activeOpacity={0.7} onPress={s.action}>
                <View style={ds.supIcon}><Text style={{ fontSize: 20 }}>{s.i}</Text></View>
                <Text style={{ fontSize: 10, color: colors.text.secondary, textAlign: 'center', marginTop: 6 }}>{s.l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};