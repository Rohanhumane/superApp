import React, { useRef, useCallback } from 'react';
import { View, PanResponder, LayoutChangeEvent } from 'react-native';
import { Text } from '../../atoms/Text';
import { colors } from '../../theme/colors';
import { sp } from '../../theme/spacing';

export interface SliderWithValueProps { label: string; value: number; min: number; max: number; step?: number; formatValue: (v: number) => string; formatMin?: string; formatMax?: string; onValueChange: (v: number) => void; }

export const SliderWithValue: React.FC<SliderWithValueProps> = ({ label, value, min, max, step = 1, formatValue, formatMin, formatMax, onValueChange }) => {
  const progress = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const trackWidth = useRef(0);

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  }, []);

  const updateValue = useCallback((locationX: number) => {
    const w = trackWidth.current || 300;
    const ratio = Math.min(Math.max(locationX / w, 0), 1);
    let nv = min + ratio * (max - min);
    nv = Math.round(nv / step) * step;
    onValueChange(Math.min(Math.max(nv, min), max));
  }, [min, max, step, onValueChange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateValue(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateValue(e.nativeEvent.locationX),
    })
  ).current;

  return (
    <View style={{ marginBottom: sp.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text variant="bodyMd" color={colors.text.secondary}>{label}</Text>
        <View style={{ paddingHorizontal: 14, paddingVertical: 5, borderRadius: 16, borderWidth: 1, borderColor: colors.border.light, backgroundColor: '#FFFFFF' }}>
          <Text variant="labelMd">{formatValue(value)}</Text>
        </View>
      </View>
      {/* Slider track with drag support */}
      <View
        style={{ height: 40, justifyContent: 'center' }}
        onLayout={onTrackLayout}
        {...panResponder.panHandlers}
      >
        {/* Track background */}
        <View style={{ height: 5, backgroundColor: '#E0E0E0', borderRadius: 3 }}>
          {/* Filled track */}
          <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: colors.secondary.base, borderRadius: 3 }} />
        </View>
        {/* Thumb — white circle with grey border (matching Figma) */}
        <View style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          marginLeft: -10,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#BDBDBD',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 3,
        }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -2 }}>
        <Text variant="caption" color={colors.text.secondary}>{formatMin || formatValue(min)}</Text>
        <Text variant="caption" color={colors.text.secondary}>{formatMax || formatValue(max)}</Text>
      </View>
    </View>
  );
};
