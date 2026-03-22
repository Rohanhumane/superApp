import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Button, Input, DashboardTemplate, FormTemplate, LoanCard, SectionHeader, QuickLinkCard, RecommendCard, MenuItem, ServiceTicketCard, DropdownSelect, colors, sp } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, addTicket } from '@nbfc/core';
import { SERVICE_CATEGORIES } from '@nbfc/config';
import { generateTicketId, formatDate } from '@nbfc/utils';
import { serviceStyles as s } from './service.styles';
import { C } from '../../styles/shared';

export const ServicesHomeScreen = ({ navigation }: any) => {
  const loans = useAppSelector(st => st.loan.loans);
  return (
    <DashboardTemplate headerTitle="Services" onSearch={() => {}} onNotify={() => {}}>
      {loans.length > 0 && <View style={{ marginTop: sp.lg }}><Text variant="labelMd" color={colors.text.secondary} style={{ paddingHorizontal: sp.lg, marginBottom: sp.sm }}>Your Relationships</Text>
        <LoanCard type={loans[0].type} number={loans[0].number} status={loans[0].status} amount={loans[0].amount} emi={loans[0].emi} onView={() => navigation.navigate('LoanDetails', { loanId: loans[0].id })} onPay={() => navigation.navigate('PayEMI')} /></View>}
      <SectionHeader title="Quick Links" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: sp.lg }}>
        {[{ l: 'Pay Loan\nEMI', i: 'payment', r: 'PayEMI' }, { l: 'Raise\nRequest', i: 'request', r: 'ServiceRequests' }, { l: 'Track\nApplication', i: 'track', r: 'TrackRequests' }].map(q =>
          <QuickLinkCard key={q.l} label={q.l} icon={q.i} onPress={() => navigation.navigate(q.r)} />)}
      </View>
      <SectionHeader title="Documents" />
      <MenuItem icon="📄" label="Get Documents & Statement" onPress={() => navigation.navigate('DocumentsStatement')} />
      <SectionHeader title="Recommended for You" />
      <RecommendCard title="Pre-Approved Two-Wheeler Loan" sub="Get up to ₹1,50,000 instantly" onPress={() => {}} />
      <SectionHeader title="Knowledge Center" />
      <View style={{ flexDirection: 'row', paddingHorizontal: sp.lg, gap: sp.md }}>
        {['How to pay EMI', 'How to update mandate'].map((t, i) => <TouchableOpacity key={i} style={s.knowledgeCard}><Text style={{ fontSize: 24 }}>▶️</Text><Text variant="caption" align="center" style={{ marginTop: 4 }}>{t}</Text></TouchableOpacity>)}
      </View>
      <SectionHeader title="Account Management" />
      <MenuItem icon="👤" label="Profile Details" onPress={() => navigation.navigate('MyProfile')} />
      <MenuItem icon="💳" label="Manage Autopay" onPress={() => navigation.navigate('ViewMandate')} />
      <MenuItem icon="📥" label="Download Statement" onPress={() => navigation.navigate('DocumentsStatement')} />
      <View style={s.supportSection}><Text style={s.supportIcon}>🎧</Text><Text variant="labelMd">Need Assistance?</Text><Text variant="caption" color={colors.text.secondary}>Available Mon-Fri.</Text>
        <View style={s.supportBtnRow}><Button title="Call Now" onPress={() => {}} fullWidth={false} style={{ paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }} /><TouchableOpacity><Text variant="labelMd" color={colors.text.secondary}>FAQs</Text></TouchableOpacity></View></View>
    </DashboardTemplate>
  );
};

export const ServiceRequestsScreen = ({ navigation }: any) => (
  <SafeAreaView style={s.screen}>
    <StatusBar barStyle="dark-content" />
    <View style={s.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text variant="h3">←</Text></TouchableOpacity><Text variant="labelLg" style={s.headerTitle}>Service Requests</Text></View>
    <View style={{ padding: sp.xl }}><Text variant="h3">Service Requests</Text><Text variant="bodyMd" color={colors.text.secondary} style={{ marginTop: 4 }}>How can we help you today?</Text>
      {[{ t: 'Create Service Request', sub: 'Submit a new request', bg: '#E8F5E9', i: '+', ic: C.green, r: 'SelectLoan' },
        { t: 'Track Service Requests', sub: 'View status of existing requests', bg: '#FFF3E0', i: '📋', ic: C.orange, r: 'TrackRequests' }].map(x =>
        <TouchableOpacity key={x.t} style={s.requestCard} onPress={() => navigation.navigate(x.r)}>
          <View style={s.requestCardRow}><View style={[s.requestIcon, { backgroundColor: x.bg }]}><Text variant="bodyLg" color={x.ic}>{x.i}</Text></View>
          <View><Text variant="labelLg">{x.t}</Text><Text variant="caption" color={colors.text.secondary}>{x.sub}</Text></View></View>
        </TouchableOpacity>)}
    </View>
  </SafeAreaView>
);

export const SelectLoanScreen = ({ navigation }: any) => {
  const loans = useAppSelector(st => st.loan.loans);
  const [tab, setTab] = useState<'active' | 'inactive'>('active');
  return (
    <SafeAreaView style={s.screen}>
      <View style={s.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text variant="h3">←</Text></TouchableOpacity><Text variant="labelLg" style={s.headerTitle}>Create Service Request</Text></View>
      <View style={{ padding: sp.xl }}><Text variant="h3">Select Loan Account</Text><Text variant="bodyMd" color={colors.text.secondary}>Choose the loan for this service request</Text>
        <View style={s.tabRow}>
          {(['active', 'inactive'] as const).map(t => <TouchableOpacity key={t} style={[s.tab, tab === t ? s.tabActive : {}]} onPress={() => setTab(t)}><Text variant="labelMd" color={tab === t ? C.white : colors.text.secondary}>{t === 'active' ? 'Active Loans' : 'Inactive Loans'}</Text></TouchableOpacity>)}
        </View>
        {loans.filter(l => tab === 'active' ? l.status === 'active' : l.status !== 'active').map(l =>
          <TouchableOpacity key={l.id} style={s.loanSelectCard} onPress={() => navigation.navigate('OtherRequest', { loanId: l.id })}>
            <Text variant="labelSm" color={colors.text.secondary}>{l.type.toUpperCase()}</Text><Text variant="labelLg">{l.number}</Text>
            <View style={s.loanSelectAmounts}><View><Text variant="caption" color={colors.text.tertiary}>LOAN AMOUNT</Text><Text variant="labelMd">₹{l.amount.toLocaleString('en-IN')}</Text></View><View style={{ alignItems: 'flex-end' }}><Text variant="caption" color={colors.text.tertiary}>EMI AMOUNT</Text><Text variant="labelMd">₹{l.emi.toLocaleString('en-IN')}</Text></View></View>
          </TouchableOpacity>)}
      </View>
    </SafeAreaView>
  );
};

export const OtherRequestScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const [f, setF] = useState({ cat: '', sub: '', desc: '' });
  return (<FormTemplate title="Other Request" subtitle="Select a category and describe your issue" headerTitle="Back" onBack={() => navigation.goBack()}
    btnTitle="Submit Request" onSubmit={() => {
      const t = { id: Date.now().toString(), refId: generateTicketId(), title: f.cat || 'Other Request', desc: f.desc, category: f.cat, status: 'pending', created: new Date().toISOString().split('T')[0], updated: new Date().toISOString().split('T')[0], expected: new Date(Date.now() + 86400000).toISOString().split('T')[0], loanId: route.params?.loanId || '1' };
      dispatch(addTicket(t as any));
      navigation.navigate('SuccessScreen', { title: 'Request Submitted Successfully', subtitle: 'Your request will be processed within 24 hours.', details: [{ label: 'Reference ID', value: t.refId }, { label: 'Status', value: 'Pending Verification' }, { label: 'Submitted On', value: formatDate(t.created) }, { label: 'Expected Response', value: formatDate(t.expected) }], primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' }, secondaryBtn: { title: 'Back to Home', route: 'MainTabs' } });
    }} btnDisabled={!f.desc}>
    <DropdownSelect label="Select Category" value={f.cat} options={[...SERVICE_CATEGORIES]} onSelect={o => setF(p => ({ ...p, cat: o.label }))} placeholder="e.g., Payments, Documents" />
    <DropdownSelect label="Select Sub-Category" value={f.sub} options={[{ id: 'general', label: 'General' }, { id: 'urgent', label: 'Urgent' }]} onSelect={o => setF(p => ({ ...p, sub: o.label }))} placeholder="Select Sub-Category" />
    <Input label="Description" required placeholder="Describe your issue clearly" value={f.desc} onChangeText={t => setF(p => ({ ...p, desc: t }))} multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top' }} />
    <View style={{ marginTop: sp.md }}><Text variant="bodySm" color={colors.text.secondary}>Attachments (Optional)</Text>
      <TouchableOpacity style={s.uploadArea}><Text style={{ fontSize: 24 }}>📤</Text><Text variant="labelMd">Upload Documents</Text><Text variant="caption" color={colors.text.tertiary}>Formats: jpg, png, pdf, etc. Max Size: 10MB</Text></TouchableOpacity></View>
  </FormTemplate>);
};

export const TrackRequestsScreen = ({ navigation }: any) => {
  const tickets = useAppSelector(st => st.service.tickets);
  const [filter, setFilter] = useState('all');
  const filtered = tickets.filter(t => { if (filter === 'all') return true; if (filter === 'pending') return t.status === 'pending'; if (filter === 'active') return t.status === 'in_progress'; if (filter === 'done') return t.status === 'resolved'; return true; });
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={s.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text variant="h3">←</Text></TouchableOpacity><Text variant="labelLg" style={s.headerTitle}>Track Service Requests</Text></View>
      <View style={s.filterRow}>
        {['All', 'Pending', 'Active', 'Done'].map(f => { const k = f.toLowerCase(); const a = filter === k;
          return <TouchableOpacity key={f} style={[s.filterTab, a && s.filterActive]} onPress={() => setFilter(k)}><Text variant="labelMd" color={a ? C.white : colors.text.secondary}>{f}</Text></TouchableOpacity>; })}
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: sp.lg }}>
        {filtered.map(t => <ServiceTicketCard key={t.id} title={t.title} refId={t.refId} desc={t.desc} status={t.status} created={t.created} updated={t.updated} />)}
        {filtered.length === 0 && <View style={s.emptyState}><Text variant="bodyMd" color={colors.text.tertiary}>No requests found</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
};
