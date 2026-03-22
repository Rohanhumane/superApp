import React, { useState } from 'react';
import { paymentStyles as ps } from "./payment.styles";
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Button, Input, Badge, FormTemplate, SuccessTemplate, DropdownSelect, SectionHeader, TransactionRow, DocumentRow, ProgressBar, MenuItem, colors, sp, shadow, br } from '@nbfc/ui';
import { useAppSelector } from '@nbfc/core';
import { PAYMENT_TYPES, ACCOUNT_TYPES, DOCUMENT_TYPES } from '@nbfc/config';
import { formatCurrency, formatDate } from '@nbfc/utils';

export const PayEMIScreen = ({ navigation, route }: any) => {
  const loans = useAppSelector(s => s.loan.loans); const p = useAppSelector(s => s.user.profile);
  const [selLoan, setSelLoan] = useState(route.params?.loanId || loans[0]?.id || '');
  const [payType, setPayType] = useState('advance_emi');
  const loan = loans.find(l => l.id === selLoan);
  return (<FormTemplate title="Pay EMI" subtitle="Select a Loan Account and Payment Type to make a payment" headerTitle="Back" onBack={() => navigation.goBack()}
    btnTitle="Make Payment" onSubmit={() => navigation.navigate('SuccessScreen', { title: 'Payment Successful!', subtitle: 'Your payment has been completed successfully.', showDownload: true, details: [{ label: 'Total Amount (₹)', value: formatCurrency(loan?.emi || 0) }, { label: 'Payment Time', value: formatDate(new Date(), 'full') }, { label: 'Reference No', value: '234567890' }, { label: 'Loan Account No.', value: loan?.number || '' }], primaryBtn: { title: 'Done', route: 'MainTabs' } })}>
    <DropdownSelect label="Loan Account" required value={selLoan} options={loans.map(l => ({ id: l.id, label: `${l.type} - ${l.number}` }))} onSelect={o => setSelLoan(o.id)} />
    <DropdownSelect label="Payment Type" required value={payType} options={[...PAYMENT_TYPES]} onSelect={o => setPayType(o.id)} />
    <Input label="Customer Name" value={p.fullName} disabled onChangeText={() => {}} />
    <Input label="Mobile Number" value={p.maskedMobile} disabled onChangeText={() => {}} />
    <Input label="Amount" required value={loan ? formatCurrency(loan.emi) : ''} disabled onChangeText={() => {}} />
  </FormTemplate>);
};

export const LoanDetailsScreen = ({ navigation, route }: any) => {
  const loans = useAppSelector(s => s.loan.loans); const txns = useAppSelector(s => s.loan.transactions); const mandates = useAppSelector(s => s.loan.mandates); const assoc = useAppSelector(s => s.loan.associates);
  const loan = loans.find(l => l.id === route.params?.loanId) || loans[0]; const [tab, setTab] = useState('overview');
  if (!loan) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.lg, borderBottomWidth: 1, borderBottomColor: colors.border.light }}><TouchableOpacity onPress={() => navigation.goBack()}><Text variant="h3">←</Text></TouchableOpacity><Text variant="labelLg" style={{ marginLeft: sp.md }}>Loan Details</Text></View>
      <View style={{ flexDirection: 'row', paddingHorizontal: sp.lg, paddingTop: sp.md }}>
        {['overview', 'documents', 'transactions'].map(t => <TouchableOpacity key={t} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: tab === t ? colors.primary.green : 'transparent', marginRight: 8 }} onPress={() => setTab(t)}>
          <Text variant="labelSm" color={tab === t ? colors.white : colors.text.secondary}>{t === 'overview' ? 'Overview' : t === 'documents' ? 'Documents & Statement' : 'Recent Tra...'}</Text></TouchableOpacity>)}
      </View>
      <ScrollView contentContainerStyle={{ padding: sp.lg, paddingBottom: 40 }}>
        {tab === 'overview' && <>
          <View style={{ backgroundColor: colors.white, borderRadius: br.lg, padding: sp.lg, ...shadow.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View><Text variant="labelSm" color={colors.text.secondary}>{loan.type.toUpperCase()}</Text><Text variant="labelLg">{loan.number}</Text></View><Badge label="Active" variant="active" /></View>
            <ProgressBar current={loan.emiPaid} total={loan.totalEMI} label="Repayment Progress" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}><Text variant="caption" color={colors.text.secondary}>{formatCurrency(loan.amountPaid)} Paid</Text><Text variant="caption" color={colors.text.secondary}>{loan.emiPaid}/{loan.totalEMI} EMI Paid</Text></View>
            {[[['Next Installment', formatDate(loan.nextDate)], ['EMI Amount', formatCurrency(loan.emi)]], [['Tenure', `${loan.tenure} Months`], ['Closure Date', formatDate(loan.closeDate)]]].map((row, i) =>
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp.lg }}>{row.map(([l, v], j) => <View key={j} style={j === 1 ? { alignItems: 'flex-end' } : {}}><Text variant="caption" color={colors.text.tertiary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}</View>)}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: sp.xl }}>
              <TouchableOpacity onPress={() => navigation.navigate('LoanCard', { loanId: loan.id })}><Text variant="labelMd" color={colors.text.secondary}>View More</Text></TouchableOpacity>
              <Button title="Pay EMI" onPress={() => navigation.navigate('PayEMI', { loanId: loan.id })} fullWidth={false} style={{ paddingVertical: 10, paddingHorizontal: 28, borderRadius: 20 }} />
            </View>
          </View>
          <SectionHeader title="Documents & Statement" action="View All" onAction={() => setTab('documents')} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>{['Loan\nagreement', 'Repayment\nSchedule', 'Key Fact\nStatement'].map((d, i) => <TouchableOpacity key={i} style={{ alignItems: 'center' }}><View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center' }}><Text>{['💰', '📅', '📋'][i]}</Text></View><Text variant="caption" align="center" style={{ marginTop: 4 }}>{d}</Text></TouchableOpacity>)}</View>
          <SectionHeader title="Recent Transactions" action="View All" onAction={() => setTab('transactions')} />
          {txns.slice(0, 3).map(t => <TransactionRow key={t.id} date={t.date} desc={t.desc} amount={t.amount} status={t.status} />)}
          <SectionHeader title="Auto-Debit Account (NACH)" />
          {mandates.map(m => <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: br.lg, padding: sp.lg, ...shadow.sm }}><Text style={{ fontSize: 24, marginRight: sp.md }}>🏦</Text><View style={{ flex: 1 }}><Text variant="labelMd">{m.bank}</Text><Text variant="caption" color={colors.text.tertiary}>Account No. {m.masked}</Text><Text variant="caption" color={colors.text.tertiary}>IFSC: {m.ifsc}</Text></View><Badge label="Active" variant="active" /></View>)}
          <SectionHeader title="Associated People" />
          {assoc.map(a => <MenuItem key={a.id} icon="👤" label={`${a.role}\n${a.name}`} onPress={() => {}} />)}
          <View style={{ alignItems: 'center', paddingVertical: sp.xxl }}><Text style={{ fontSize: 48 }}>🎧</Text><Text variant="labelMd">Need Assistance?</Text><Text variant="caption" color={colors.text.secondary}>Available Mon-Fri.</Text>
            <View style={{ flexDirection: 'row', gap: sp.lg, marginTop: sp.md, alignItems: 'center' }}><Button title="Call Now" onPress={() => {}} fullWidth={false} style={{ paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }} /><TouchableOpacity><Text variant="labelMd" color={colors.text.secondary}>FAQs</Text></TouchableOpacity></View></View>
        </>}
        {tab === 'documents' && DOCUMENT_TYPES.map(d => <DocumentRow key={d.id} title={d.label} onDownload={() => {}} />)}
        {tab === 'transactions' && txns.map(t => <TransactionRow key={t.id} date={t.date} desc={t.desc} amount={t.amount} status={t.status} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export const LoanCardScreen = ({ navigation, route }: any) => {
  const loans = useAppSelector(s => s.loan.loans); const loan = loans.find(l => l.id === route.params?.loanId) || loans[0];
  if (!loan) return null;
  return (<FormTemplate title="" headerTitle={loan.type} onBack={() => navigation.goBack()} subtitle="">
    <View style={{ backgroundColor: colors.white, borderRadius: br.lg, padding: sp.lg, ...shadow.sm }}>
      <Text variant="h4" style={{ marginBottom: sp.lg }}>Loan Details</Text>
      {[['Loan Account No.', loan.accountNo], ['Loan Type', loan.type], ['Sanctioned Amount', formatCurrency(loan.amount)], ['Closure Date', formatDate(loan.closeDate)], ['Disbursal Date', formatDate(loan.disbursalDate)], ['First EMI Date', formatDate(loan.firstEMIDate)], ['Tenure', `${loan.tenure} Months`], ['Remaining Tenure', `${loan.remainingTenure} Months`], ['Current EMI', formatCurrency(loan.emi)], ['Next Due', formatDate(loan.nextDate)], ['Repayment Bank', loan.bank]].map(([l, v], i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.md }}><Text variant="caption" color={colors.text.tertiary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: sp.md }}><Text variant="labelMd" color={colors.primary.navy}>Download ⬇</Text></TouchableOpacity>
    </View>
  </FormTemplate>);
};

export const ViewMandateScreen = ({ navigation }: any) => {
  const m = useAppSelector(s => s.loan.mandates)[0]; if (!m) return null;
  return (<FormTemplate title="Auto-Debit Mandate" headerTitle="Auto-Debit & Payments" onBack={() => navigation.goBack()} subtitle="">
    <DropdownSelect label="Select Loan" value={m.loanId} options={[{ id: m.loanId, label: `Car Loan - xxx${m.accountNo.slice(-4)}` }]} onSelect={() => {}} />
    <View style={{ backgroundColor: colors.white, borderRadius: 12, padding: sp.lg, borderWidth: 1, borderColor: colors.border.light }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.md }}><Text variant="labelMd">Mandate Details</Text><Badge label="Active" variant="active" /></View>
      {[['Bank Name', m.bank, 'Account Number', m.masked], ['IFSC Code', m.ifsc, 'Account Holder', m.holder], ['EMI Amount', formatCurrency(m.emi), 'End Date', formatDate(m.endDate)]].map((r, i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><View><Text variant="caption" color={colors.text.tertiary}>{r[0]}</Text><Text variant="labelMd">{r[1]}</Text></View><View style={{ alignItems: 'flex-end' }}><Text variant="caption" color={colors.text.tertiary}>{r[2]}</Text><Text variant="labelMd">{r[3]}</Text></View></View>)}
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: sp.md }} onPress={() => navigation.navigate('SetUpAutoDebit')}><Text variant="labelMd" color={colors.primary.navy}>✏️ Change Bank Account</Text></TouchableOpacity>
    </View>
    <View style={{ backgroundColor: '#FFF8E1', borderRadius: 8, padding: sp.md, marginTop: sp.lg, borderWidth: 1, borderColor: '#FFE082' }}><Text variant="labelSm" color={colors.text.warning}>⚠️ Important Information</Text><Text variant="caption" color={colors.text.secondary} style={{ marginTop: 4 }}>Changing your auto-debit account will replace the existing mandate.</Text></View>
  </FormTemplate>);
};

export const SetUpAutoDebitScreen = ({ navigation }: any) => {
  const [f, setF] = useState({ name: 'Rahul Kumar', bank: '', acc: '', ifsc: '', type: 'savings' });
  return (<FormTemplate title="Mandate Details" subtitle="Your EMI will be automatically debited from this bank account every month." headerTitle="Set Up Auto-Debit" onBack={() => navigation.goBack()}
    btnTitle="Continue" onSubmit={() => navigation.navigate('AuthorizeMandate', f)} btnDisabled={!f.bank || !f.acc || !f.ifsc}>
    <Input label="Account Holder Name" value={f.name} onChangeText={t => setF(p => ({ ...p, name: t }))} />
    <DropdownSelect label="Bank Name" value={f.bank} options={[{ id: 'hdfc', label: 'HDFC Bank' }, { id: 'sbi', label: 'SBI' }, { id: 'axis', label: 'Axis Bank' }, { id: 'icici', label: 'ICICI Bank' }]} onSelect={o => setF(p => ({ ...p, bank: o.label }))} />
    <Input label="Account Number" placeholder="Enter account number" value={f.acc} onChangeText={t => setF(p => ({ ...p, acc: t }))} keyboardType="number-pad" />
    <Input label="IFSC Code" placeholder="Enter IFSC code" value={f.ifsc} onChangeText={t => setF(p => ({ ...p, ifsc: t.toUpperCase() }))} autoCapitalize="characters" />
    <Text variant="bodySm" color={colors.text.secondary} style={{ marginBottom: sp.sm }}>Account Type</Text>
    <View style={{ flexDirection: 'row', gap: sp.md }}>{ACCOUNT_TYPES.map(a => <TouchableOpacity key={a.id} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: sp.md, borderRadius: 8, borderWidth: 1, borderColor: f.type === a.id ? colors.primary.navy : colors.border.light }} onPress={() => setF(p => ({ ...p, type: a.id }))}>
      <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: f.type === a.id ? colors.primary.navy : colors.border.medium, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>{f.type === a.id && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.navy }} />}</View>
      <Text variant="bodyMd">{a.label}</Text></TouchableOpacity>)}</View>
  </FormTemplate>);
};

export const AuthorizeMandateScreen = ({ navigation, route }: any) => {
  const loan = useAppSelector(s => s.loan.loans)[0]; const f = route.params || {};
  return (<FormTemplate title="Mandate Details" subtitle="To activate auto-debit, please complete the bank process." headerTitle="Authorize Auto-Debit" onBack={() => navigation.goBack()}
    btnTitle="Authorize Mandate" onSubmit={() => navigation.navigate('SuccessScreen', { title: 'Request Submitted Successfully', subtitle: 'Your Mandate Details will be updated within 24 hours.', primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' }, secondaryBtn: { title: 'Back to Home', route: 'MainTabs' } })}>
    <View style={{ backgroundColor: colors.white, borderRadius: 12, padding: sp.lg, borderWidth: 1, borderColor: colors.border.light }}>
      <Text variant="labelMd" style={{ marginBottom: sp.md }}>Mandate Details</Text>
      {[['Loan', `${loan?.type || 'Car Loan'} – ${loan?.number || 'SK101010'}`], ['Bank Name', f.bank || 'HDFC Bank'], ['Account Number', f.acc || '5010067541234'], ['IFSC Code', f.ifsc || 'HDFC0003860'], ['Account Type', f.type === 'savings' ? 'Savings' : 'Current'], ['EMI Amount', formatCurrency(loan?.emi || 11634)], ['Start Date', formatDate(new Date())]].map(([l, v], i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><Text variant="caption" color={colors.text.tertiary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}
    </View>
  </FormTemplate>);
};

export const DocumentsStatementScreen = ({ navigation }: any) => (
  <FormTemplate title="" headerTitle="Documents & Statement" onBack={() => navigation.goBack()} subtitle="">
    {DOCUMENT_TYPES.map(d => <DocumentRow key={d.id} title={d.label} onDownload={() => {}} />)}
  </FormTemplate>
);
