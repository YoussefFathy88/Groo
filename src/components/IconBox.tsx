import { View } from 'react-native';

import { habitColor, habitTint } from '@/lib/habitIcons';

import { Icon } from './Icon';
import type { IconName } from './icons';

/** A habit's icon in a soft box of its own color. `solid` = full color box, white icon. */
export function IconBox({ icon, size = 44, solid = false }: { icon: string; size?: number; solid?: boolean }) {
  const color = habitColor(icon);
  return (
    <View
      className="items-center justify-center rounded-xl"
      style={{ width: size, height: size, backgroundColor: solid ? color : habitTint(icon) }}
    >
      <Icon name={icon as IconName} size={Math.round(size * 0.58)} color={solid ? '#FFFFFF' : color} />
    </View>
  );
}
