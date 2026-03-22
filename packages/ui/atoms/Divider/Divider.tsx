import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';
export interface DividerProps { gap?: number; }
export const Divider: React.FC<DividerProps> = ({ gap = 16 }) => <View style={{ height: 1, backgroundColor: colors.border.light, marginVertical: gap }} />;
