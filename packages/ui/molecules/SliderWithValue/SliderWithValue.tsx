import React from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { sp } from '../../theme/spacing';

export interface SliderWithValueProps { label: string; value: number; min: number; max: number; step?: number; formatValue: (v: number) => string; formatMin?: string; formatMax?: string; onValueChange: (v: number) => void; }

export const SliderWithValue: React.FC<SliderWithValueProps> = ({ label, value, min, max, step = 1, formatValue, formatMin, formatMax, onValueChange }) => {
  const progress = Math.min(Math.max((value - min) / (max - min), 0), 1);
  return (
    <View style={{ marginBottom: sp.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sp.base }}>
        <Text variant="bodyMd" color={colors.text.secondary}>{label}</Text>
        <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 14, borderWidth: 1, borderColor: colors.border.light }}>
          <Text variant="labelMd">{formatValue(value)}</Text>
        </View>
      </View>
      <View style={{ height: 40, justifyContent: 'center' }} onTouchEnd={(e) => {
        const ratio = Math.min(Math.max(e.nativeEvent.locationX / 280, 0), 1);
        let nv = min + ratio * (max - min);
        nv = Math.round(nv / step) * step;
        onValueChange(Math.min(Math.max(nv, min), max));
      }}>
        <View style={{ height: 4, backgroundColor: colors.border.light, borderRadius: 2 }}>
          <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: colors.secondary.base, borderRadius: 2 }} />
        </View>
        <View style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          marginLeft: -8,
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: colors.secondary.base,
          borderWidth: 2,
          borderColor: colors.secondary.base,
        }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text variant="caption" color={colors.text.secondary}>{formatMin || formatValue(min)}</Text>
        <Text variant="caption" color={colors.text.secondary}>{formatMax || formatValue(max)}</Text>
      </View>
    </View>
  );
};
