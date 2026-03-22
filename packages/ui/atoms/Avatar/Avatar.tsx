import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '../Text';
import { colors } from '../../theme/colors';

export interface AvatarProps { uri?: string | null; name?: string; size?: number; onEdit?: () => void; }

export const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 80, onEdit }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';
  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      {uri ? <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} /> :
        <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.bg.secondary, borderWidth: 1, borderColor: colors.border.light, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="h3" color={colors.text.secondary}>{initials}</Text>
        </View>}
      {onEdit && <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: -4, backgroundColor: colors.white, borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.light }} onPress={onEdit}>
        <Text variant="caption" color={colors.text.secondary}>✎</Text>
      </TouchableOpacity>}
    </View>
  );
};
