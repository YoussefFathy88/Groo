import Svg, { Path } from 'react-native-svg';

import { ICONS, type IconName } from './icons';

type Props = { name: IconName; size?: number; color: string; strokeWidth?: number };

export function Icon({ name, size = 26, color, strokeWidth = 2.2 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Path d={ICONS[name]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
