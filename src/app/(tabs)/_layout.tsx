import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/icons';
import { Logo } from '@/components/Logo';

const DESKTOP_MIN_WIDTH = 768;
const GREEN_DARK = '#157A42';
const MUTED = '#4A554F';
const LINE = '#E5E5E5';

const TABS: { name: string; href: '/' | '/me'; icon: IconName; label: string }[] = [
  { name: 'index', href: '/', icon: 'home', label: 'nav.today' },
  { name: 'me', href: '/me', icon: 'person', label: 'nav.me' },
];

type NavItemProps = TabTriggerSlotProps & { icon: IconName; label: string; wide: boolean };

function NavItem({ icon, label, wide, isFocused, ...props }: NavItemProps) {
  const color = isFocused ? GREEN_DARK : MUTED;
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      className={[
        'min-h-12 items-center rounded-2xl border-2',
        wide ? 'flex-row justify-start gap-3 px-3.5 py-2.5' : 'flex-1 justify-center gap-0.5 py-1.5',
        isFocused ? 'border-green-line bg-green-tint' : 'border-transparent',
      ].join(' ')}
    >
      <Icon name={icon} color={color} />
      <Text className={`${wide ? 'text-lg' : 'text-sm'} ${isFocused ? 'font-extrabold text-green-dark' : 'font-bold'}`} style={isFocused ? undefined : { color }}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Phone: bottom tab bar. Desktop: nav on the start side (right in Arabic, left in English). */
export default function TabsLayout() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const wide = width >= DESKTOP_MIN_WIDTH;

  const list = (
    <TabList style={wide ? styles.sideNav : [styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {wide && (
        <View className="items-start px-3 pb-4">
          <Logo height={34} />
        </View>
      )}
      {TABS.map((tab) => (
        <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
          <NavItem icon={tab.icon} label={t(tab.label)} wide={wide} />
        </TabTrigger>
      ))}
    </TabList>
  );

  return (
    <Tabs style={[styles.root, { flexDirection: wide ? 'row' : 'column' }]}>
      {wide && list}
      <TabSlot style={styles.slot} />
      {!wide && list}
    </Tabs>
  );
}

// expo-router/ui components take `style`, not NativeWind classNames.
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  slot: { flex: 1 },
  sideNav: {
    width: 240,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderEndWidth: 2,
    borderColor: LINE,
  },
  bottomNav: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderColor: LINE,
  },
});
