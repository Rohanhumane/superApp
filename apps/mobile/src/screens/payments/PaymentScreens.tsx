import React, { useState } from 'react';
import { paymentStyles as ps } from "./payment.styles";
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Alert, Linking } from 'react-native';
import { Text, Button, Input, Badge, FormTemplate, SuccessTemplate, DropdownSelect, SectionHeader, TransactionRow, DocumentRow, ProgressBar, MenuItem, colors, sp, shadow, br, Icon } from '@nbfc/ui';
import { useAppSelector, useAppDispatch, addTransaction, updateMandate } from '@nbfc/core';
import { PAYMENT_TYPES, ACCOUNT_TYPES, DOCUMENT_TYPES } from '@nbfc/config';
import { formatCurrency, formatDate, generateRefId, validators } from '@nbfc/utils';
import { MockApi } from '@nbfc/network';

export const PayEMIScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const loans = useAppSelector(s => s.loan.loans); const p = useAppSelector(s => s.user.profile);
  const [selLoan, setSelLoan] = useState(route.params?.loanId || loans[0]?.id || '');
  const [payType, setPayType] = useState('advance_emi');
  const [loading, setLoading] = useState(false);
  const loan = loans.find(l => l.id === selLoan);
  const isEditable = payType === 'part_payment' || payType === 'foreclosure';
  const [customAmount, setCustomAmount] = useState('');
  const displayAmount = isEditable ? customAmount : (loan ? formatCurrency(loan.emi) : '');
  return (<FormTemplate title="Pay EMI" subtitle="Select a Loan Account and Payment Type to make a payment" headerTitle="Back" onBack={() => navigation.goBack()}
    btnTitle={loading ? "Processing..." : "Make Payment"} btnDisabled={loading} onSubmit={async () => {
      setLoading(true);
      try {
        const amount = isEditable ? parseFloat(customAmount.replace(/[^0-9.]/g, '')) || 0 : (loan?.emi || 0);
        const refId = generateRefId();
        await MockApi.payments.payEMI({ loanId: selLoan, amount, payType });
        dispatch(addTransaction({ id: refId, date: new Date().toISOString().split('T')[0], desc: `EMI Payment - ${loan?.number || ''}`, amount, status: 'received', installment: (loan?.emiPaid || 0) + 1 }));
        navigation.navigate('SuccessScreen', { title: 'Payment Successful!', subtitle: 'Your payment has been completed successfully.', showDownload: true, details: [{ label: 'Total Amount (₹)', value: formatCurrency(amount) }, { label: 'Payment Time', value: formatDate(new Date(), 'full') }, { label: 'Reference No', value: refId }, { label: 'Loan Account No.', value: loan?.number || '' }], primaryBtn: { title: 'Done', route: 'MainTabs' } });
      } catch (e: any) {
        Alert.alert('Payment Failed', e?.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }}>
    <DropdownSelect label="Loan Account" required value={selLoan} options={loans.map(l => ({ id: l.id, label: `${l.type} - ${l.number}` }))} onSelect={o => setSelLoan(o.id)} />
    <DropdownSelect label="Payment Type" required value={payType} options={[...PAYMENT_TYPES]} onSelect={o => setPayType(o.id)} />
    <Input label="Customer Name" value={p.fullName} disabled onChangeText={() => {}} />
    <Input label="Mobile Number" value={p.maskedMobile} disabled onChangeText={() => {}} />
    <Input label="Amount" required value={displayAmount} disabled={!isEditable} onChangeText={t => setCustomAmount(t)} keyboardType="number-pad" />
  </FormTemplate>);
};

export const LoanDetailsScreen = ({ navigation, route }: any) => {
  const loans = useAppSelector(s => s.loan.loans); const txns = useAppSelector(s => s.loan.transactions); const mandates = useAppSelector(s => s.loan.mandates); const assoc = useAppSelector(s => s.loan.associates); const insurances = useAppSelector(s => s.loan.insurances);
  const loan = loans.find(l => l.id === route.params?.loanId) || loans[0]; const [tab, setTab] = useState('overview');
  if (!loan) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}><TouchableOpacity onPress={() => navigation.goBack()}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity><Text variant="labelLg" style={{ marginLeft: sp.base }}>Loan Details</Text></View>
      <View style={{ flexDirection: 'row', paddingHorizontal: sp.base, paddingTop: sp.base }}>
        {['overview', 'documents', 'transactions'].map(t => <TouchableOpacity key={t} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: tab === t ? colors.secondary.base : 'transparent', marginRight: 8 }} onPress={() => setTab(t)}>
          <Text variant="labelSm" color={tab === t ? colors.white : colors.text.secondary}>{t === 'overview' ? 'Overview' : t === 'documents' ? 'Documents & Statement' : 'Recent Tra...'}</Text></TouchableOpacity>)}
      </View>
      <ScrollView contentContainerStyle={{ padding: sp.base, paddingBottom: 40 }}>
        {tab === 'overview' && <>
          <View style={{ backgroundColor: colors.white, borderRadius: br.md, padding: sp.base, ...shadow.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View><Text variant="labelSm" color={colors.text.secondary}>{loan.type.toUpperCase()}</Text><Text variant="labelLg">{loan.number}</Text></View><Badge label="Active" variant="active" /></View>
            <ProgressBar current={loan.emiPaid} total={loan.totalEMI} label="Repayment Progress" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}><Text variant="caption" color={colors.text.secondary}>{formatCurrency(loan.amountPaid)} Paid</Text><Text variant="caption" color={colors.text.secondary}>{loan.emiPaid}/{loan.totalEMI} EMI Paid</Text></View>
            {[[['Next Installment', formatDate(loan.nextDate)], ['EMI Amount', formatCurrency(loan.emi)]], [['Tenure', `${loan.tenure} Months`], ['Closure Date', formatDate(loan.closeDate)]]].map((row, i) =>
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp.base }}>{row.map(([l, v], j) => <View key={j} style={j === 1 ? { alignItems: 'flex-end' } : {}}><Text variant="caption" color={colors.text.secondary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}</View>)}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: sp.lg }}>
              <TouchableOpacity onPress={() => navigation.navigate('LoanCard', { loanId: loan.id })}><Text variant="labelMd" color={colors.text.secondary}>View More</Text></TouchableOpacity>
              <Button title="Pay EMI" onPress={() => navigation.navigate('PayEMI', { loanId: loan.id })} fullWidth={false} style={{ paddingVertical: 10, paddingHorizontal: 28, borderRadius: 20 }} />
            </View>
          </View>
          <SectionHeader title="Documents & Statement" action="View All" onAction={() => setTab('documents')} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>{['Loan\nagreement', 'Repayment\nSchedule', 'Key Fact\nStatement'].map((d, i) => <TouchableOpacity key={i} onPress={() => Alert.alert('Download', 'Document will be sent to your registered email')} style={{ alignItems: 'center' }}><View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center' }}><Text>{['💰', '📅', '📋'][i]}</Text></View><Text variant="caption" align="center" style={{ marginTop: 4 }}>{d}</Text></TouchableOpacity>)}</View>
          <SectionHeader title="Recent Transactions" action="View All" onAction={() => setTab('transactions')} />
          {txns.slice(0, 3).map(t => <TransactionRow key={t.id} date={t.date} desc={t.desc} amount={t.amount} status={t.status} />)}
          <SectionHeader title="Auto-Debit Account (NACH)" />
          {mandates.map(m => <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: br.md, padding: sp.base, ...shadow.sm }}><Text style={{ fontSize: 24, marginRight: sp.base }}>🏦</Text><View style={{ flex: 1 }}><Text variant="labelMd">{m.bank}</Text><Text variant="caption" color={colors.text.secondary}>Account No. {m.masked}</Text><Text variant="caption" color={colors.text.secondary}>IFSC: {m.ifsc}</Text></View><Badge label="Active" variant="active" /></View>)}
          <SectionHeader title="Linked Insurance" />
          {insurances.map(ins => <View key={ins.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: br.md, padding: sp.base, ...shadow.sm, marginHorizontal: sp.base }}>
            <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#FFF0F0', alignItems: 'center', justifyContent: 'center', marginRight: sp.base }}><Text style={{ fontSize: 14, fontWeight: '700', color: '#C62828' }}>A</Text></View>
            <View style={{ flex: 1 }}><Text variant="labelMd">{ins.provider}</Text><Text variant="caption" color={colors.text.secondary}>Policy No: {ins.policyNo}</Text><Text variant="caption" color={colors.text.secondary}>Valid till: {formatDate(ins.validTill)}</Text></View>
            <Badge label={ins.status === 'active' ? 'Active' : 'Expired'} variant={ins.status === 'active' ? 'active' : 'failed'} />
          </View>)}
          <SectionHeader title="Associated People" />
          {assoc.map(a => <MenuItem key={a.id} icon="👤" label={`${a.role}\n${a.name}`} onPress={() => {}} />)}
          <View style={{ alignItems: 'center', paddingVertical: sp.lg }}><Text style={{ fontSize: 48 }}>🎧</Text><Text variant="labelMd">Need Assistance?</Text><Text variant="caption" color={colors.text.secondary}>Available Mon-Fri.</Text>
            <View style={{ flexDirection: 'row', gap: sp.base, marginTop: sp.base, alignItems: 'center' }}><Button title="Call Now" onPress={() => Linking.openURL('tel:18001234567')} fullWidth={false} style={{ paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }} /><TouchableOpacity><Text variant="labelMd" color={colors.text.secondary}>FAQs</Text></TouchableOpacity></View></View>
        </>}
        {tab === 'documents' && DOCUMENT_TYPES.map(d => <DocumentRow key={d.id} title={d.label} onDownload={() => Alert.alert('Download', 'Document will be sent to your registered email')} />)}
        {tab === 'transactions' && txns.map(t => <TransactionRow key={t.id} date={t.date} desc={t.desc} amount={t.amount} status={t.status} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export const LoanCardScreen = ({ navigation, route }: any) => {
  const loans = useAppSelector(s => s.loan.loans); const loan = loans.find(l => l.id === route.params?.loanId) || loans[0];
  if (!loan) return null;
  return (<FormTemplate title="" headerTitle={loan.type} onBack={() => navigation.goBack()} subtitle="">
    <View style={{ backgroundColor: colors.white, borderRadius: br.md, padding: sp.base, ...shadow.sm }}>
      <Text variant="h4" style={{ marginBottom: sp.base }}>Loan Details</Text>
      {[['Loan Account No.', loan.accountNo], ['Loan Type', loan.type], ['Sanctioned Amount', formatCurrency(loan.amount)], ['Closure Date', formatDate(loan.closeDate)], ['Disbursal Date', formatDate(loan.disbursalDate)], ['First EMI Date', formatDate(loan.firstEMIDate)], ['Tenure', `${loan.tenure} Months`], ['Remaining Tenure', `${loan.remainingTenure} Months`], ['Current EMI', formatCurrency(loan.emi)], ['Next Due', formatDate(loan.nextDate)], ['Repayment Bank', loan.bank]].map(([l, v], i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.base }}><Text variant="caption" color={colors.text.secondary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: sp.base }} onPress={() => Alert.alert('Download', 'Document will be sent to your registered email')}><Text variant="labelMd" color={colors.primary.dark}>Download ⬇</Text></TouchableOpacity>
    </View>
  </FormTemplate>);
};

export const ViewMandateScreen = ({ navigation }: any) => {
  const m = useAppSelector(s => s.loan.mandates)[0]; if (!m) return null;
  return (<FormTemplate title="Auto-Debit Mandate" headerTitle="Auto-Debit & Payments" onBack={() => navigation.goBack()} subtitle="">
    <DropdownSelect label="Select Loan" value={m.loanId} options={[{ id: m.loanId, label: `Car Loan - xxx${m.accountNo.slice(-4)}` }]} onSelect={() => {}} />
    <View style={{ backgroundColor: colors.white, borderRadius: 12, padding: sp.base, borderWidth: 1, borderColor: colors.border.light }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.base }}><Text variant="labelMd">Mandate Details</Text><Badge label="Active" variant="active" /></View>
      {[['Bank Name', m.bank, 'Account Number', m.masked], ['IFSC Code', m.ifsc, 'Account Holder', m.holder], ['EMI Amount', formatCurrency(m.emi), 'End Date', formatDate(m.endDate)]].map((r, i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><View><Text variant="caption" color={colors.text.secondary}>{r[0]}</Text><Text variant="labelMd">{r[1]}</Text></View><View style={{ alignItems: 'flex-end' }}><Text variant="caption" color={colors.text.secondary}>{r[2]}</Text><Text variant="labelMd">{r[3]}</Text></View></View>)}
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: sp.base }} onPress={() => navigation.navigate('SetUpAutoDebit')}><Text variant="labelMd" color={colors.primary.dark}>✏️ Change Bank Account</Text></TouchableOpacity>
    </View>
    <View style={{ backgroundColor: '#FFF8E1', borderRadius: 8, padding: sp.base, marginTop: sp.base, borderWidth: 1, borderColor: '#FFE082' }}><Text variant="labelSm" color={colors.text.warning}>⚠️ Important Information</Text><Text variant="caption" color={colors.text.secondary} style={{ marginTop: 4 }}>Changing your auto-debit account will replace the existing mandate.</Text></View>
  </FormTemplate>);
};

export const SetUpAutoDebitScreen = ({ navigation }: any) => {
  const [f, setF] = useState({ name: 'Rahul Kumar', bank: '', acc: '', ifsc: '', type: 'savings' });
  const [errors, setErrors] = useState<{ acc?: string; ifsc?: string }>({});
  const validate = () => {
    const e: { acc?: string; ifsc?: string } = {};
    if (!validators.isValidAccountNumber(f.acc)) e.acc = 'Enter a valid account number (9-18 digits)';
    if (!validators.isValidIFSC(f.ifsc)) e.ifsc = 'Enter a valid IFSC code';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (<FormTemplate title="Mandate Details" subtitle="Your EMI will be automatically debited from this bank account every month." headerTitle="Set Up Auto-Debit" onBack={() => navigation.goBack()}
    btnTitle="Continue" onSubmit={() => { if (validate()) navigation.navigate('AuthorizeMandate', f); }} btnDisabled={!f.bank || !f.acc || !f.ifsc}>
    <Input label="Account Holder Name" value={f.name} onChangeText={t => setF(p => ({ ...p, name: t }))} />
    <DropdownSelect label="Bank Name" value={f.bank} options={[{ id: 'hdfc', label: 'HDFC Bank' }, { id: 'sbi', label: 'SBI' }, { id: 'axis', label: 'Axis Bank' }, { id: 'icici', label: 'ICICI Bank' }]} onSelect={o => setF(p => ({ ...p, bank: o.label }))} />
    <Input label="Account Number" placeholder="Enter account number" value={f.acc} onChangeText={t => { setF(p => ({ ...p, acc: t })); if (errors.acc) setErrors(p => ({ ...p, acc: undefined })); }} keyboardType="number-pad" error={errors.acc} />
    <Input label="IFSC Code" placeholder="Enter IFSC code" value={f.ifsc} onChangeText={t => { setF(p => ({ ...p, ifsc: t.toUpperCase() })); if (errors.ifsc) setErrors(p => ({ ...p, ifsc: undefined })); }} autoCapitalize="characters" error={errors.ifsc} />
    <Text variant="bodySm" color={colors.text.secondary} style={{ marginBottom: sp.sm }}>Account Type</Text>
    <View style={{ flexDirection: 'row', gap: sp.base }}>{ACCOUNT_TYPES.map(a => <TouchableOpacity key={a.id} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: sp.base, borderRadius: 8, borderWidth: 1, borderColor: f.type === a.id ? colors.primary.dark : colors.border.light }} onPress={() => setF(p => ({ ...p, type: a.id }))}>
      <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: f.type === a.id ? colors.primary.dark : colors.border.light, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>{f.type === a.id && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.dark }} />}</View>
      <Text variant="bodyMd">{a.label}</Text></TouchableOpacity>)}</View>
  </FormTemplate>);
};

export const AuthorizeMandateScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const loan = useAppSelector(s => s.loan.loans)[0]; const f = route.params || {};
  return (<FormTemplate title="Mandate Details" subtitle="To activate auto-debit, please complete the bank process." headerTitle="Authorize Auto-Debit" onBack={() => navigation.goBack()}
    btnTitle="Authorize Mandate" onSubmit={() => {
      dispatch(updateMandate({
        id: `mandate_${Date.now()}`,
        loanId: loan?.id || '',
        bank: f.bank || 'HDFC Bank',
        accountNo: f.acc || '',
        masked: f.acc ? `XXXX XXXX ${f.acc.slice(-4)}` : '',
        ifsc: f.ifsc || '',
        holder: f.name || '',
        emi: loan?.emi || 0,
        endDate: loan?.closeDate || new Date().toISOString(),
        startDate: new Date().toISOString().split('T')[0],
        status: 'active',
        accType: f.type === 'savings' ? 'savings' : 'current',
      }));
      navigation.navigate('SuccessScreen', { title: 'Request Submitted Successfully', subtitle: 'Your Mandate Details will be updated within 24 hours.', primaryBtn: { title: 'View Service Ticket', route: 'TrackRequests' }, secondaryBtn: { title: 'Back to Home', route: 'MainTabs' } });
    }}>
    <View style={{ backgroundColor: colors.white, borderRadius: 12, padding: sp.base, borderWidth: 1, borderColor: colors.border.light }}>
      <Text variant="labelMd" style={{ marginBottom: sp.base }}>Mandate Details</Text>
      {[['Loan', `${loan?.type || 'Car Loan'} – ${loan?.number || 'SK101010'}`], ['Bank Name', f.bank || 'HDFC Bank'], ['Account Number', f.acc || '5010067541234'], ['IFSC Code', f.ifsc || 'HDFC0003860'], ['Account Type', f.type === 'savings' ? 'Savings' : 'Current'], ['EMI Amount', formatCurrency(loan?.emi || 11634)], ['Start Date', formatDate(new Date())]].map(([l, v], i) =>
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.sm }}><Text variant="caption" color={colors.text.secondary}>{l}</Text><Text variant="labelMd">{v}</Text></View>)}
    </View>
  </FormTemplate>);
};

export const DocumentsStatementScreen = ({ navigation }: any) => (
  <FormTemplate title="" headerTitle="Documents & Statement" onBack={() => navigation.goBack()} subtitle="">
    {DOCUMENT_TYPES.map(d => <DocumentRow key={d.id} title={d.label} onDownload={() => Alert.alert('Download', 'Document will be sent to your registered email')} />)}
  </FormTemplate>
);
