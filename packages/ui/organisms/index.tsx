import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/FormElements';
import { colors } from '../theme/colors';
import { sp, br, shadow } from '../theme/spacing';
import { formatCurrency, formatDate } from '@nbfc/utils';

const SW = Dimensions.get('window').width;

// ===== LOAN CARD =====
interface LoanCardProps { type: string; number: string; status: 'active' | 'closed'; amount: number; emi: number; onView: () => void; onPay: () => void; }
export const LoanCard: React.FC<LoanCardProps> = ({ type, number, status, amount, emi, onView, onPay }) => (
  <View style={[os.card, { marginHorizontal: sp.lg }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: sp.md }}>
      <View style={{ flex: 1 }}><Text variant="labelSm" color={colors.text.secondary}>{type.toUpperCase()}</Text><Text variant="labelLg">{number}</Text></View>
      <Badge label={status === 'active' ? 'Active' : 'Closed'} variant={status === 'active' ? 'active' : 'failed'} />
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: sp.lg, paddingVertical: sp.sm }}>
      <View style={{ alignItems: 'center' }}><Text variant="caption" color={colors.text.secondary}>Loan Amount</Text><Text variant="currencySm">{formatCurrency(amount)}</Text></View>
      <View style={{ alignItems: 'center' }}><Text variant="caption" color={colors.text.secondary}>EMI Amount</Text><Text variant="currencySm">{formatCurrency(emi)}</Text></View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <TouchableOpacity onPress={onView}><Text variant="labelMd" color={colors.text.secondary}>View More</Text></TouchableOpacity>
      <Button title="Pay EMI" onPress={onPay} fullWidth={false} style={{ paddingVertical: 10, paddingHorizontal: 28, borderRadius: 20 }} />
    </View>
  </View>
);

// ===== STATUS BANNER (Lead in progress) =====
export const StatusBanner: React.FC<{ msg: string; sub: string; onAction?: () => void; actionLabel?: string }> = ({ msg, sub, onAction, actionLabel }) => (
  <View style={[os.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: sp.lg, marginBottom: sp.lg }]}>
    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginRight: sp.md }}>
      <Text variant="h3">👤</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text variant="labelMd">{msg}</Text><Text variant="caption" color={colors.text.secondary}>{sub}</Text>
      {onAction && actionLabel && <TouchableOpacity onPress={onAction} style={{ marginTop: sp.sm, backgroundColor: colors.text.warning, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 14, alignSelf: 'flex-start' }}>
        <Text variant="labelSm" color={colors.white}>{actionLabel}</Text></TouchableOpacity>}
    </View>
  </View>
);

// ===== SECTION HEADER =====
export const SectionHeader: React.FC<{ title: string; action?: string; onAction?: () => void }> = ({ title, action, onAction }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: sp.lg, marginBottom: sp.md, marginTop: sp.xl }}>
    <Text variant="h4">{title}</Text>
    {action && onAction && <TouchableOpacity onPress={onAction}><Text variant="labelMd" color={colors.primary.navy}>{action}</Text></TouchableOpacity>}
  </View>
);

// ===== QUICK LINK CARD =====
const iconMap: Record<string, string> = { loan: '💰', document: '📄', mandate: '🏛️', insurance: '🛡️', payment: '💳', request: '📝', track: '📋' };
export const QuickLinkCard: React.FC<{ label: string; icon: string; onPress: () => void }> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={{ width: (SW - 80) / 4, alignItems: 'center', backgroundColor: colors.white, borderRadius: br.lg, paddingVertical: sp.md, ...shadow.sm }} onPress={onPress}>
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginBottom: sp.sm }}>
      <Text variant="h3">{iconMap[icon] || '📎'}</Text>
    </View>
    <Text variant="labelSm" align="center" numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);

// ===== PRODUCT TILE =====
const prodIcons: Record<string, string> = { car: '🚗', tractor: '🚜', truck: '🚛', equipment: '⚙️', business: '🏢', home: '🏠' };
export const ProductTile: React.FC<{ label: string; icon: string; onPress: () => void }> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={{ width: (SW - 80) / 4, alignItems: 'center', marginBottom: sp.lg }} onPress={onPress}>
    <View style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginBottom: sp.xs }}>
      <Text style={{ fontSize: 32 }}>{prodIcons[icon] || '📦'}</Text>
    </View>
    <Text variant="caption" align="center" numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);

// ===== RECOMMENDATION CARD =====
export const RecommendCard: React.FC<{ title: string; sub: string; onPress: () => void }> = ({ title, sub, onPress }) => (
  <View style={[os.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: sp.lg }]}>
    <View style={{ flex: 1 }}><Text variant="labelLg">{title}</Text><Text variant="bodySm" color={colors.text.secondary}>{sub}</Text>
      <TouchableOpacity onPress={onPress} style={{ marginTop: sp.sm }}><Text variant="labelMd" color={colors.primary.green}>View Offer →</Text></TouchableOpacity></View>
    <Text style={{ fontSize: 48 }}>🛵</Text>
  </View>
);

// ===== TRANSACTION ROW =====
export const TransactionRow: React.FC<{ date: string; desc: string; amount: number; status: 'received' | 'failed' | 'pending' }> = ({ date, desc, amount, status }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.md, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
    <View style={{ flex: 1 }}><Text variant="labelMd">{formatDate(date)}</Text><Text variant="caption" color={colors.text.secondary}>{desc}</Text></View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text variant="labelMd" color={status === 'failed' ? colors.text.error : colors.text.success}>+ {formatCurrency(amount)}</Text>
      <Text variant="caption" color={status === 'failed' ? colors.text.error : colors.text.success}>{status === 'received' ? 'Received' : status === 'failed' ? 'Failed' : 'Pending'}</Text>
    </View>
  </View>
);

// ===== DOCUMENT ROW =====
export const DocumentRow: React.FC<{ title: string; onDownload: () => void }> = ({ title, onDownload }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.lg, paddingHorizontal: sp.lg, backgroundColor: colors.bg.secondary, borderRadius: br.md, marginBottom: sp.sm }} onPress={onDownload}>
    <Text variant="bodyMd" style={{ flex: 1 }}>{title}</Text><Text variant="bodyLg" color={colors.text.secondary}>⬇</Text>
  </TouchableOpacity>
);

// ===== SERVICE TICKET CARD =====
export const ServiceTicketCard: React.FC<{ title: string; refId: string; desc: string; status: string; created: string; updated: string }> = ({ title, refId, desc, status, created, updated }) => {
  const sv = status === 'in_progress' ? 'inProgress' : status === 'pending' ? 'pending' : 'resolved';
  const sl = status === 'in_progress' ? 'In Progress' : status === 'pending' ? 'Pending' : 'Resolved';
  return <View style={[os.card, { marginBottom: sp.md }]}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}><Text variant="labelLg">{title}</Text><Text variant="caption" color={colors.text.tertiary}>{refId}</Text></View>
      <Badge label={sl} variant={sv as any} />
    </View>
    <Text variant="bodySm" color={colors.text.secondary} style={{ marginVertical: sp.sm }}>{desc}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp.sm, paddingTop: sp.sm, borderTopWidth: 1, borderTopColor: colors.border.light }}>
      <View><Text variant="caption" color={colors.text.tertiary}>Created</Text><Text variant="labelSm">{formatDate(created)}</Text></View>
      <View style={{ alignItems: 'flex-end' }}><Text variant="caption" color={colors.text.tertiary}>Last Update</Text><Text variant="labelSm">{formatDate(updated)}</Text></View>
    </View>
  </View>;
};

// ===== PROGRESS BAR =====
export const ProgressBar: React.FC<{ current: number; total: number; label?: string }> = ({ current, total, label }) => (
  <View style={{ marginVertical: sp.sm }}>
    {label && <Text variant="caption" color={colors.text.secondary} style={{ marginBottom: 4 }}>{label}</Text>}
    <View style={{ height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${Math.min(current / total, 1) * 100}%`, backgroundColor: colors.primary.navy, borderRadius: 3 }} />
    </View>
  </View>
);

// ===== SUPPORT BAR =====
export const SupportBar: React.FC<{ items: { id: string; label: string; icon: string }[]; onPress: (id: string) => void }> = ({ items, onPress }) => {
  const si: Record<string, string> = { support: '❓', phone: '📞', location: '📍', more: '•••', chat: '💬', email: '✉️' };
  return <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: sp.md, borderTopWidth: 1, borderTopColor: colors.border.light, backgroundColor: colors.white }}>
    {items.map(i => <TouchableOpacity key={i.id} style={{ alignItems: 'center', gap: 4 }} onPress={() => onPress(i.id)}>
      <Text style={{ fontSize: 20 }}>{si[i.icon] || '📎'}</Text><Text variant="caption" color={colors.text.secondary}>{i.label}</Text>
    </TouchableOpacity>)}
  </View>;
};

// ===== DONUT CHART (EMI breakdown) =====
export const DonutChart: React.FC<{ principal: number; interest: number }> = ({ principal, interest }) => (
  <View style={{ alignItems: 'center', marginVertical: sp.lg }}>
    <View style={{ width: 120, height: 120 }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 20, borderColor: colors.primary.navy, opacity: 0.3 }} />
      <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 20, borderColor: '#C0C0C0', opacity: 0.15 }} />
    </View>
    <View style={{ flexDirection: 'row', marginTop: sp.md, gap: sp.xl }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.green }} /><Text variant="caption" color={colors.text.secondary}>Total Interest</Text></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.navy }} /><Text variant="caption" color={colors.text.secondary}>Principal</Text></View>
    </View>
  </View>
);

const os = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: br.lg, padding: sp.lg, ...shadow.md },
});
