import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Alert, Linking } from 'react-native';
import { Text, Button, Input, DashboardTemplate, FormTemplate, LoanCard, SectionHeader, RecommendCard, MenuItem, ServiceTicketCard, DropdownSelect, Icon, IconBadge, colors, sp } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, addTicket } from '@nbfc/core';
import { SERVICE_CATEGORIES } from '@nbfc/config';
import { generateTicketId, formatDate } from '@nbfc/utils';
import { serviceStyles as s } from './service.styles';
import { C } from '../../styles/shared';

export const ServicesHomeScreen = ({ navigation }: any) => {
  const loans = useAppSelector(st => st.loan.loans);
  return (
    <DashboardTemplate headerTitle="Services" onSearch={() => {}} onNotify={() => {}}>
      {loans.length > 0 && <View style={{ marginTop: sp.base }}><Text variant="labelMd" color={colors.text.secondary} style={{ paddingHorizontal: sp.base, marginBottom: sp.sm }}>Your Relationships</Text>
        <LoanCard type={loans[0].type} number={loans[0].number} status={loans[0].status} amount={loans[0].amount} emi={loans[0].emi} onView={() => navigation.navigate('LoanDetails', { loanId: loans[0].id })} onPay={() => navigation.navigate('PayEMI')} /></View>}
      <SectionHeader title="Recommended for You" />
      <RecommendCard title="Pre-Approved Two-Wheeler Loan" sub="Get up to ₹1,50,000 instantly" onPress={() => navigation.navigate('ProductDetail', { productId: 'two_wheeler_loan', productLabel: 'Two-Wheeler Loan' })} />
      <SectionHeader title="Account Management" />
      <MenuItem icon="👤" label="Profile Details" onPress={() => navigation.navigate('MyProfile')} />
      <SectionHeader title="Knowledge Center" />
      <View style={{ flexDirection: 'row', paddingHorizontal: sp.base, gap: sp.base }}>
        {['How to pay EMI', 'How to update mandate'].map((t, i) => <TouchableOpacity key={i} style={s.knowledgeCard} onPress={() => Alert.alert('Video', 'This video will be available soon.')}>
          <View style={s.playIconCircle}><Icon name="play" size={18} color={colors.primary.dark} /></View>
          <Text variant="caption" align="center" style={{ marginTop: 8 }}>{t}</Text>
        </TouchableOpacity>)}
      </View>
      <SectionHeader title="Support" />
      <View style={s.supportSection}><Text style={s.supportIcon}>🎧</Text><Text variant="labelMd">Need Assistance?</Text><Text variant="caption" color={colors.text.secondary}>Available Mon-Fri.</Text>
        <View style={s.supportBtnRow}><Button title="Call Now" onPress={() => Linking.openURL('tel:18001234567')} fullWidth={false} style={{ paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }} /><TouchableOpacity><Text variant="labelMd" color={colors.text.secondary}>FAQs</Text></TouchableOpacity></View></View>
    </DashboardTemplate>
  );
};

export const ServiceRequestsScreen = ({ navigation }: any) => (
  <SafeAreaView style={s.screen}>
    <StatusBar barStyle="dark-content" />
    <View style={s.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
      <Text variant="labelLg" style={s.headerTitle}>Service Requests</Text>
    </View>
    <View style={{ padding: sp.lg }}>
      <Text variant="h3">Service Requests</Text>
      <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 4 }}>How can we help you today?</Text>
      {[
        { t: 'Create Service Request', sub: 'Submit a new request for assistance', icon: 'request' as const, bg: '#FFF3E0', fg: '#BF6A02', r: 'SelectLoan' },
        { t: 'Track Service Requests', sub: 'View status of your existing requests', icon: 'track' as const, bg: '#FFF3E0', fg: '#BF6A02', r: 'TrackRequests' },
      ].map(x => (
        <TouchableOpacity key={x.t} style={s.requestCard} onPress={() => navigation.navigate(x.r)}>
          <View style={s.requestCardRow}>
            <View style={[s.requestIcon, { backgroundColor: x.bg }]}>
              <Icon name={x.icon} size={20} color={x.fg} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="labelLg">{x.t}</Text>
              <Text variant="caption" color={colors.text.secondary} style={{ marginTop: 2 }}>{x.sub}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </SafeAreaView>
);

export const SelectLoanScreen = ({ navigation }: any) => {
  const loans = useAppSelector(st => st.loan.loans);
  const [tab, setTab] = useState<'active' | 'inactive'>('active');
  const filtered = loans.filter(l => tab === 'active' ? l.status === 'active' : l.status !== 'active');
  return (
    <SafeAreaView style={s.screen}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={s.headerTitle}>Create Service Request</Text>
      </View>
      <View style={{ padding: sp.lg }}>
        <Text variant="h3">Select Loan Account</Text>
        <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 4 }}>Choose the loan for this service request</Text>
        <View style={s.tabRow}>
          {(['active', 'inactive'] as const).map(t => (
            <TouchableOpacity key={t} style={[s.tab, tab === t ? s.tabActive : {}]} onPress={() => setTab(t)}>
              <Text variant="labelMd" color={tab === t ? C.white : colors.text.secondary}>{t === 'active' ? 'Active Loans' : 'Inactive Loans'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {filtered.map(l => (
          <TouchableOpacity key={l.id} style={s.loanSelectCard} onPress={() => navigation.navigate('SelectRequestType', { loanId: l.id, loanType: l.type, loanNumber: l.number })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <IconBadge name={(l.type === 'car' ? 'car' : l.type === 'tractor' ? 'tractor' : l.type === 'truck' ? 'truck' : 'loan') as any} size={18} bgColor="#EEF2FF" color="#2E3192" containerSize={36} />
              <View style={{ marginLeft: 12 }}>
                <Text variant="caption" color={colors.text.secondary}>{l.type.toUpperCase().replace('_', ' ')} LOAN</Text>
                <Text variant="labelLg">{l.number}</Text>
              </View>
            </View>
            <View style={s.loanSelectAmounts}>
              <View>
                <Text variant="caption" color={colors.text.secondary}>LOAN AMOUNT</Text>
                <Text variant="labelMd">₹{l.amount.toLocaleString('en-IN')}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="caption" color={colors.text.secondary}>EMI AMOUNT</Text>
                <Text variant="labelMd">₹{l.emi.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 48 }}>
            <Text variant="bodyMd" color={colors.text.secondary}>No {tab} loans found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// ===== REQUEST TYPES (Image 3 from Figma) =====
const REQUEST_TYPES = [
  { id: 'address', label: 'Address Change', sub: 'Update your registered address', icon: 'location' as const },
  { id: 'loan_query', label: 'Loan Related Query', sub: 'Request loan statement', icon: 'document' as const },
  { id: 'noc', label: 'NOC Request', sub: 'No Objection Certificate', icon: 'document' as const },
  { id: 'foreclosure', label: 'Foreclosure', sub: 'Close your loan early', icon: 'payment' as const },
  { id: 'payment_query', label: 'Payments Related Query', sub: 'Update phone or email', icon: 'phone' as const },
  { id: 'other', label: 'Other Request', sub: 'Custom support request', icon: 'request' as const },
];

export const SelectRequestTypeScreen = ({ navigation, route }: any) => {
  const { loanId, loanType, loanNumber } = route.params || {};
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    if (selected === 'other') {
      navigation.navigate('OtherRequest', { loanId, loanType, requestType: selected });
    } else {
      // For non-other types, go to OtherRequest with pre-filled category
      navigation.navigate('OtherRequest', { loanId, loanType, requestType: selected, prefilledCategory: REQUEST_TYPES.find(r => r.id === selected)?.label });
    }
  };

  const loanLabel = loanType ? loanType.charAt(0).toUpperCase() + loanType.slice(1).replace('_', ' ') + ' Loan' : 'Loan';

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
        <Text variant="labelLg" style={s.headerTitle}>{loanLabel}</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp.lg }}>
        <Text variant="h3">Select Request Type</Text>
        <Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 4, marginBottom: 20 }}>Choose the type of assistance you need</Text>
        {REQUEST_TYPES.map(rt => (
          <TouchableOpacity
            key={rt.id}
            style={s.radioRow}
            activeOpacity={0.6}
            onPress={() => setSelected(rt.id)}
          >
            <View style={s.radioIconWrap}>
              <Icon name={rt.icon} size={20} color={colors.text.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="labelMd">{rt.label}</Text>
              <Text variant="caption" color={colors.text.secondary} style={{ marginTop: 2 }}>{rt.sub}</Text>
            </View>
            <View style={[s.radioOuter, selected === rt.id && s.radioOuterActive]}>
              {selected === rt.id && <View style={s.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={s.bottomBar}>
        <Button title="Continue" onPress={handleContinue} disabled={!selected} />
      </View>
    </SafeAreaView>
  );
};

export const OtherRequestScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const prefilled = route.params?.prefilledCategory || '';
  const requestType = route.params?.requestType || 'other';
  const [f, setF] = useState({ cat: prefilled, sub: '', desc: '' });

  const screenTitle = prefilled || 'Other Request';

  return (
    <FormTemplate title={screenTitle} subtitle="Select a category and describe your issue" headerTitle="Back" onBack={() => navigation.goBack()}
      btnTitle="Submit Request" onSubmit={() => {
        const t = {
          id: Date.now().toString(), refId: generateTicketId(), title: f.cat || screenTitle,
          desc: f.desc, category: f.cat, status: 'pending',
          created: new Date().toISOString().split('T')[0],
          updated: new Date().toISOString().split('T')[0],
          expected: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
          loanId: route.params?.loanId || '1',
        };
        dispatch(addTicket(t as any));
        navigation.navigate('SuccessScreen', {
          title: 'Request Submitted Successfully',
          subtitle: 'Your address will be updated within\n24 hours.',
          details: [
            { label: 'Reference ID', value: t.refId },
            { label: 'Status', value: 'Pending Verification' },
            { label: 'Submitted On', value: formatDate(t.created) },
            { label: 'Expected Response', value: formatDate(t.expected) },
          ],
          primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' },
          secondaryBtn: { title: 'Back to Home', route: 'MainTabs' },
        });
      }} btnDisabled={!f.cat || !f.desc}>
      <DropdownSelect label="Select Category" required value={f.cat} options={[...SERVICE_CATEGORIES]} onSelect={o => setF(p => ({ ...p, cat: o.label }))} placeholder="e.g., Payments, Documents" />
      <DropdownSelect label="Select Sub-Category" value={f.sub} options={[{ id: 'general', label: 'General' }, { id: 'urgent', label: 'Urgent' }]} onSelect={o => setF(p => ({ ...p, sub: o.label }))} placeholder="Select Sub-Category" />
      <Input label="Description" required placeholder="Describe your issue clearly" value={f.desc} onChangeText={t => setF(p => ({ ...p, desc: t }))} multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top' }} />
      <View style={{ marginTop: sp.base }}>
        <Text variant="bodySm" color={colors.text.secondary}>Attachments (Optional)</Text>
        <TouchableOpacity style={s.uploadArea} onPress={() => Alert.alert('Upload', 'Choose source', [{ text: 'Camera' }, { text: 'Gallery' }, { text: 'Cancel', style: 'cancel' }])}>
          <Icon name="upload" size={28} color={colors.text.secondary} />
          <Text variant="labelMd" style={{ marginTop: 8 }}>Upload Documents</Text>
          <Text variant="caption" color={colors.text.secondary}>Formats: jpg, png, pdf, etc. Max Size: 10MB</Text>
        </TouchableOpacity>
      </View>
    </FormTemplate>
  );
};

export const TrackRequestsScreen = ({ navigation }: any) => {
  const tickets = useAppSelector(st => st.service.tickets);
  const [filter, setFilter] = useState('all');
  const filtered = tickets.filter(t => { if (filter === 'all') return true; if (filter === 'pending') return t.status === 'pending'; if (filter === 'active') return t.status === 'in_progress'; if (filter === 'done') return t.status === 'resolved'; return true; });
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={s.header}><TouchableOpacity onPress={() => navigation.goBack()}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity><Text variant="labelLg" style={s.headerTitle}>Track Service Requests</Text></View>
      <View style={s.filterRow}>
        {['All', 'Pending', 'Active', 'Done'].map(f => { const k = f.toLowerCase(); const a = filter === k;
          return <TouchableOpacity key={f} style={[s.filterTab, a && s.filterActive]} onPress={() => setFilter(k)}><Text variant="labelMd" color={a ? C.white : colors.text.secondary}>{f}</Text></TouchableOpacity>; })}
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: sp.base }}>
        {filtered.map(t => <ServiceTicketCard key={t.id} title={t.title} refId={t.refId} desc={t.desc} status={t.status} created={t.created} updated={t.updated} />)}
        {filtered.length === 0 && <View style={s.emptyState}><Text variant="bodyMd" color={colors.text.secondary}>No requests found</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
};
