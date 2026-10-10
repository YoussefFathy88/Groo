import { Text } from 'react-native';

/** "Groo" wordmark: always Latin and left-to-right, in brand colors. */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <Text accessibilityRole="header" style={{ fontSize: size, lineHeight: size * 1.3, writingDirection: 'ltr' }} className="font-extrabold">
      <Text className="text-green">G</Text>
      <Text className="text-amber">r</Text>
      <Text className="text-green">oo</Text>
    </Text>
  );
}
