import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Icon, IconName } from '../atoms/Icon';
import { colors } from '../theme/colors';
import { sp, br, shadow } from '../theme/spacing';
import { formatCurrency, formatDate } from '@nbfc/utils';

const SW = Dimensions.get('window').width;

// ===== LOAN CARD =====
const loanTypeIcon: Record<string, IconName> = { car: 'car', 'Car Loan': 'car', tractor: 'tractor', truck: 'truck', equipment: 'equipment', 'Equipment Loan': 'equipment', business: 'business', 'Business Loan': 'business', home: 'home_loan' };
interface LoanCardProps { type: string; number: string; status: 'active' | 'closed'; amount: number; emi: number; onView: () => void; onPay?: () => void; }
export const LoanCard: React.FC<LoanCardProps> = ({ type, number, status, amount, emi, onView, onPay }) => (
  <View style={[os.card, { marginHorizontal: sp.base }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: sp.base }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: sp.sm }}>
        <Icon name={loanTypeIcon[type] || 'loan'} size={20} color="#3B5998" />
      </View>
      <View style={{ flex: 1 }}><Text variant="caption" color={colors.text.secondary}>{type.toUpperCase().replace(' LOAN', '')} LOAN</Text><Text variant="labelLg">{number}</Text></View>
      <Badge label={status === 'active' ? 'Active' : 'Closed'} variant={status === 'active' ? 'active' : 'failed'} />
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.base, paddingVertical: sp.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="info" size={16} color={colors.text.secondary} />
        <View style={{ marginLeft: sp.sm }}>
          <Text variant="caption" color={colors.text.secondary}>Loan Amount</Text>
          <Text variant="currencySm">{formatCurrency(amount)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="payment" size={16} color={colors.text.secondary} />
        <View style={{ marginLeft: sp.sm }}>
          <Text variant="caption" color={colors.text.secondary}>EMI Amount</Text>
          <Text variant="currencySm">{formatCurrency(emi)}</Text>
        </View>
      </View>
    </View>
    <TouchableOpacity onPress={onView} style={{ alignItems: 'center', paddingTop: sp.sm }}>
      <Text variant="labelMd" color={colors.text.secondary}>View More</Text>
    </TouchableOpacity>
  </View>
);

// ===== STATUS BANNER (Lead in progress) =====
export const StatusBanner: React.FC<{ msg: string; sub: string; onAction?: () => void; actionLabel?: string }> = ({ msg, sub, onAction, actionLabel }) => (
  <View style={[os.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: sp.base, marginBottom: sp.base }]}>
    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginRight: sp.base }}>
      <Icon name="user" size={24} color={colors.primary.dark} />
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
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: sp.base, marginBottom: sp.base, marginTop: sp.lg }}>
    <Text variant="h4">{title}</Text>
    {action && onAction && <TouchableOpacity onPress={onAction}><Text variant="labelMd" color={colors.primary.dark}>{action}</Text></TouchableOpacity>}
  </View>
);

// ===== QUICK LINK CARD =====
const qlIcons: Record<string, IconName> = { loan: 'loan', document: 'document', mandate: 'mandate', insurance: 'insurance', payment: 'payment', request: 'request', track: 'track' };
export const QuickLinkCard: React.FC<{ label: string; icon: string; onPress: () => void }> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={{ width: (SW - 80) / 4, alignItems: 'center', backgroundColor: colors.white, borderRadius: br.md, paddingVertical: sp.base, ...shadow.sm }} onPress={onPress}>
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginBottom: sp.sm }}>
      <Icon name={qlIcons[icon] || 'document'} size={22} color={colors.primary.dark} />
    </View>
    <Text variant="labelSm" align="center" numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);

// ===== PRODUCT TILE =====
const prodIcons: Record<string, string> = { car: '🚗', tractor: '🚜', truck: '🚛', equipment: '⚙️', business: '🏢', home: '🏠' };
export const ProductTile: React.FC<{ label: string; icon: string; onPress: () => void }> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={{ width: (SW - 80) / 4, alignItems: 'center', marginBottom: sp.base }} onPress={onPress}>
    <View style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bg.secondary, alignItems: 'center', justifyContent: 'center', marginBottom: sp.xs }}>
      <Text style={{ fontSize: 32 }}>{prodIcons[icon] || '📦'}</Text>
    </View>
    <Text variant="caption" align="center" numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);

// ===== RECOMMENDATION CARD =====
export const RecommendCard: React.FC<{ title: string; sub: string; onPress: () => void }> = ({ title, sub, onPress }) => (
  <View style={[os.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: sp.base }]}>
    <View style={{ flex: 1 }}><Text variant="labelLg">{title}</Text><Text variant="bodySm" color={colors.text.secondary}>{sub}</Text>
      <TouchableOpacity onPress={onPress} style={{ marginTop: sp.sm }}><Text variant="labelMd" color={colors.secondary.base}>View Offer →</Text></TouchableOpacity></View>
    <Text style={{ fontSize: 48 }}>🛵</Text>
  </View>
);

// ===== TRANSACTION ROW =====
export const TransactionRow: React.FC<{ date: string; desc: string; amount: number; status: 'received' | 'failed' | 'pending' }> = ({ date, desc, amount, status }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.base, borderBottomWidth: 1, borderBottomColor: colors.border.light }}>
    <View style={{ flex: 1 }}><Text variant="labelMd">{formatDate(date)}</Text><Text variant="caption" color={colors.text.secondary}>{desc}</Text></View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text variant="labelMd" color={status === 'failed' ? colors.text.error : colors.text.success}>+ {formatCurrency(amount)}</Text>
      <Text variant="caption" color={status === 'failed' ? colors.text.error : colors.text.success}>{status === 'received' ? 'Received' : status === 'failed' ? 'Failed' : 'Pending'}</Text>
    </View>
  </View>
);

// ===== DOCUMENT ROW =====
export const DocumentRow: React.FC<{ title: string; onDownload: () => void }> = ({ title, onDownload }) => (
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: sp.base, paddingHorizontal: sp.base, backgroundColor: colors.bg.secondary, borderRadius: br.sm, marginBottom: sp.sm }} onPress={onDownload}>
    <Text variant="bodyMd" style={{ flex: 1 }}>{title}</Text><Text variant="bodyLg" color={colors.text.secondary}>⬇</Text>
  </TouchableOpacity>
);

// ===== SERVICE TICKET CARD =====
export const ServiceTicketCard: React.FC<{ title: string; refId: string; desc: string; status: string; created: string; updated: string }> = ({ title, refId, desc, status, created, updated }) => {
  const sv = status === 'in_progress' ? 'inProgress' : status === 'pending' ? 'pending' : 'resolved';
  const sl = status === 'in_progress' ? 'In Progress' : status === 'pending' ? 'Pending' : 'Resolved';
  return <View style={[os.card, { marginBottom: sp.base }]}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}><Text variant="labelLg">{title}</Text><Text variant="caption" color={colors.text.secondary}>{refId}</Text></View>
      <Badge label={sl} variant={sv as any} />
    </View>
    <Text variant="bodySm" color={colors.text.secondary} style={{ marginVertical: sp.sm }}>{desc}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp.sm, paddingTop: sp.sm, borderTopWidth: 1, borderTopColor: colors.border.light }}>
      <View><Text variant="caption" color={colors.text.secondary}>Created</Text><Text variant="labelSm">{formatDate(created)}</Text></View>
      <View style={{ alignItems: 'flex-end' }}><Text variant="caption" color={colors.text.secondary}>Last Update</Text><Text variant="labelSm">{formatDate(updated)}</Text></View>
    </View>
  </View>;
};

// ===== PROGRESS BAR =====
export const ProgressBar: React.FC<{ current: number; total: number; label?: string }> = ({ current, total, label }) => (
  <View style={{ marginVertical: sp.sm }}>
    {label && <Text variant="caption" color={colors.text.secondary} style={{ marginBottom: 4 }}>{label}</Text>}
    <View style={{ height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${Math.min(current / total, 1) * 100}%`, backgroundColor: colors.primary.dark, borderRadius: 3 }} />
    </View>
  </View>
);

// ===== SUPPORT BAR =====
export const SupportBar: React.FC<{ items: { id: string; label: string; icon: string }[]; onPress: (id: string) => void }> = ({ items, onPress }) => {
  const si: Record<string, IconName> = { support: 'support', phone: 'phone', location: 'location', more: 'more_horiz', chat: 'chat', email: 'email' };
  return <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: sp.base, borderTopWidth: 1, borderTopColor: colors.border.light, backgroundColor: colors.white }}>
    {items.map(i => <TouchableOpacity key={i.id} style={{ alignItems: 'center', gap: 4 }} onPress={() => onPress(i.id)}>
      <Icon name={si[i.icon] || 'support'} size={20} color={colors.text.secondary} /><Text variant="caption" color={colors.text.secondary}>{i.label}</Text>
    </TouchableOpacity>)}
  </View>;
};

// ===== DONUT CHART (EMI breakdown — proportional ring using nested-clip rotation) =====
const DONUT_SIZE = 140;
const DONUT_HALF = DONUT_SIZE / 2;
const DONUT_RING = 22;
const INTEREST_CLR = '#1A1C4D';
const PRINCIPAL_CLR = '#A8B4E0';

export const DonutChart: React.FC<{ principal: number; interest: number }> = ({ principal, interest }) => {
  const total = principal + interest;
  if (total <= 0) return null;
  const interestPct = interest / total;
  const deg = interestPct * 360;

  return (
    <View style={{ alignItems: 'center', marginVertical: sp.base }}>
      <View style={{ width: DONUT_SIZE, height: DONUT_SIZE }}>
        {/* Base ring — Principal color */}
        <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, borderRadius: DONUT_HALF, borderWidth: DONUT_RING, borderColor: PRINCIPAL_CLR }} />

        {/* Interest arc: first 0–180° (right half clip) */}
        {deg > 0 && (
          <View style={{ position: 'absolute', top: 0, left: DONUT_HALF, width: DONUT_HALF, height: DONUT_SIZE, overflow: 'hidden' }}>
            <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, marginLeft: -DONUT_HALF, transform: [{ rotate: `${Math.min(deg, 180)}deg` }] }}>
              <View style={{ width: DONUT_HALF, height: DONUT_SIZE, overflow: 'hidden' }}>
                <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, borderRadius: DONUT_HALF, borderWidth: DONUT_RING, borderColor: INTEREST_CLR }} />
              </View>
            </View>
          </View>
        )}

        {/* Interest arc: 180–360° (left half clip) */}
        {deg > 180 && (
          <View style={{ position: 'absolute', top: 0, left: 0, width: DONUT_HALF, height: DONUT_SIZE, overflow: 'hidden' }}>
            <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, transform: [{ rotate: `${deg - 180}deg` }] }}>
              <View style={{ position: 'absolute', left: DONUT_HALF, width: DONUT_HALF, height: DONUT_SIZE, overflow: 'hidden' }}>
                <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, borderRadius: DONUT_HALF, borderWidth: DONUT_RING, borderColor: INTEREST_CLR, marginLeft: -DONUT_HALF }} />
              </View>
            </View>
          </View>
        )}

        {/* Center label — interest percentage */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="labelLg" color={colors.text.primary}>{Math.round(interestPct * 100)}%</Text>
          <Text variant="caption" color={colors.text.secondary}>Interest</Text>
        </View>
      </View>
      {/* Legend */}
      <View style={{ flexDirection: 'row', marginTop: sp.base, gap: sp.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: INTEREST_CLR }} />
          <Text variant="caption" color={colors.text.secondary}>Total Interest</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: PRINCIPAL_CLR }} />
          <Text variant="caption" color={colors.text.secondary}>Principal Loan Amount</Text>
        </View>
      </View>
    </View>
  );
};

const os = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: br.md, padding: sp.base, ...shadow.md },
});
