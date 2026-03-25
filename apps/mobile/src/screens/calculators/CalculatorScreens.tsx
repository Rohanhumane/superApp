import React, { useState, useMemo } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Button, DropdownSelect, SliderWithValue, DonutChart, colors, sp, Icon } from '@nbfc/ui';
import { useAppSelector } from '@nbfc/core';
import { LOAN_TYPES, INCOME_SOURCES, EMI_LIMITS, ELIGIBILITY_LIMITS } from '@nbfc/config';
import { calculateEMI, calculateEligibility, formatCurrency, formatCurrencyCompact } from '@nbfc/utils';
import { calcStyles as s } from './calculator.styles';

export const EMICalculatorScreen = ({ navigation }: any) => {
  const isAuthenticated = useAppSelector(st => st.auth.status === 'authenticated');
  const [lt, setLt] = useState('car_loan');
  const [amt, setAmt] = useState(500000);
  const [rate, setRate] = useState(9.9);
  const [ten, setTen] = useState(12);
  const emi = useMemo(() => calculateEMI(amt, rate, ten), [amt, rate, ten]);
  const interest = emi * ten - amt;
  const total = emi * ten;
  const sel = LOAN_TYPES.find(l => l.id === lt);

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={s.header}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
      <ScrollView contentContainerStyle={s.content}>
        <Text variant="h2">EMI Calculator</Text>
        <DropdownSelect label="Loan Type" required value={lt} options={LOAN_TYPES.map(l => ({ id: l.id, label: l.label }))} onSelect={o => setLt(o.id)} />
        <View style={s.sliderArea}>
          <SliderWithValue label="Loan Amount" value={amt} min={EMI_LIMITS.AMOUNT_MIN} max={EMI_LIMITS.AMOUNT_MAX} step={10000} formatValue={formatCurrency} formatMin={formatCurrencyCompact(EMI_LIMITS.AMOUNT_MIN)} formatMax={formatCurrencyCompact(EMI_LIMITS.AMOUNT_MAX)} onValueChange={setAmt} />
          <SliderWithValue label="Interest Rate (p.a)" value={rate} min={EMI_LIMITS.RATE_MIN} max={EMI_LIMITS.RATE_MAX} step={0.1} formatValue={v => `${v.toFixed(1)}%`} formatMin={`${EMI_LIMITS.RATE_MIN}%`} formatMax={`${EMI_LIMITS.RATE_MAX}%`} onValueChange={setRate} />
          <SliderWithValue label="Tenure (Months)" value={ten} min={EMI_LIMITS.TENURE_MIN} max={EMI_LIMITS.TENURE_MAX} step={1} formatValue={v => `${v}M`} formatMin={`${EMI_LIMITS.TENURE_MIN}M`} formatMax={`${EMI_LIMITS.TENURE_MAX}M`} onValueChange={setTen} />
        </View>
        <View style={s.resultRow}>
          <Text variant="bodyMd" style={s.resultLabel}>{sel?.label} EMI</Text>
          <Text variant="currency" style={s.resultValue}>{formatCurrency(emi)}</Text>
        </View>
        <View style={s.breakdownRow}>
          <View style={s.breakdownItem}><Text variant="caption" style={s.breakdownLabel}>Total Interest{'\n'}Payable</Text><Text variant="currencySm" style={s.breakdownValue}>{formatCurrency(interest)}</Text></View>
          <View style={{ width: 1, backgroundColor: colors.border.light }} />
          <View style={s.breakdownItem}><Text variant="caption" style={s.breakdownLabel}>Total Amount{'\n'}Payable</Text><Text variant="currencySm" style={s.breakdownValue}>{formatCurrency(total)}</Text></View>
        </View>
        <View style={s.donutArea}><DonutChart principal={amt} interest={interest} /></View>
      </ScrollView>
      <View style={{ padding: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title="Apply Now" onPress={() => {
          if (isAuthenticated) {
            navigation.navigate('KYCForm', { flow: 'lead', productId: lt });
          } else {
            navigation.navigate('LoginMobile', { flow: 'lead' });
          }
        }} style={s.applyBtn} />
      </View>
    </SafeAreaView>
  );
};

export const EligibilityCalculatorScreen = ({ navigation }: any) => {
  const isAuthenticated = useAppSelector(st => st.auth.status === 'authenticated');
  const [lt, setLt] = useState('car_loan');
  const [is2, setIs] = useState('salaried');
  const [inc, setInc] = useState(100000);
  const [oe, setOe] = useState(0);
  const [rate, setRate] = useState(9.9);
  const [ten, setTen] = useState(12);
  const elig = useMemo(() => calculateEligibility(inc, oe, rate, ten), [inc, oe, rate, ten]);

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={s.header}><Icon name="back" size={24} color={colors.text.primary} /></TouchableOpacity>
      <ScrollView contentContainerStyle={s.content}>
        <Text variant="h2">Eligibility Calculator</Text>
        <DropdownSelect label="Loan Type" required value={lt} options={LOAN_TYPES.map(l => ({ id: l.id, label: l.label }))} onSelect={o => setLt(o.id)} />
        <DropdownSelect label="Income Source" required value={is2} options={[...INCOME_SOURCES]} onSelect={o => setIs(o.id)} />
        <View style={s.sliderArea}>
          <SliderWithValue label="Gross Monthly Income" value={inc} min={ELIGIBILITY_LIMITS.INCOME_MIN} max={ELIGIBILITY_LIMITS.INCOME_MAX} step={5000} formatValue={formatCurrency} formatMin={formatCurrencyCompact(ELIGIBILITY_LIMITS.INCOME_MIN)} formatMax={formatCurrencyCompact(ELIGIBILITY_LIMITS.INCOME_MAX)} onValueChange={setInc} />
          <SliderWithValue label="Other Loan EMI's" value={oe} min={0} max={ELIGIBILITY_LIMITS.OTHER_EMI_MAX} step={1000} formatValue={formatCurrency} formatMin="₹0" formatMax={formatCurrencyCompact(ELIGIBILITY_LIMITS.OTHER_EMI_MAX)} onValueChange={setOe} />
          <SliderWithValue label="Interest Rate (p.a)" value={rate} min={ELIGIBILITY_LIMITS.RATE_MIN} max={ELIGIBILITY_LIMITS.RATE_MAX} step={0.1} formatValue={v => `${v.toFixed(1)}%`} formatMin={`${ELIGIBILITY_LIMITS.RATE_MIN}%`} formatMax={`${ELIGIBILITY_LIMITS.RATE_MAX}%`} onValueChange={setRate} />
          <SliderWithValue label="Tenure (Months)" value={ten} min={ELIGIBILITY_LIMITS.TENURE_MIN} max={ELIGIBILITY_LIMITS.TENURE_MAX} step={1} formatValue={v => `${v}M`} formatMin={`${ELIGIBILITY_LIMITS.TENURE_MIN}M`} formatMax={`${ELIGIBILITY_LIMITS.TENURE_MAX}M`} onValueChange={setTen} />
        </View>
        <View style={s.eligibilityCard}>
          <Icon name="success" size={32} color={colors.secondary.base} />
          <Text variant="bodyMd" style={s.eligibilityLabel}>{LOAN_TYPES.find(l => l.id === lt)?.label} Eligibility is</Text>
          <Text variant="h2" style={s.eligibilityAmount}>{formatCurrency(elig)}</Text>
        </View>
      </ScrollView>
      <View style={{ padding: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light }}>
        <Button title="Apply Now" onPress={() => {
          if (isAuthenticated) {
            navigation.navigate('KYCForm', { flow: 'lead', productId: lt });
          } else {
            navigation.navigate('LoginMobile', { flow: 'lead' });
          }
        }} />
      </View>
    </SafeAreaView>
  );
};
