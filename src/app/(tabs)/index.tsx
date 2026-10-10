import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Screen } from '@/components/Screen';

export default function Today() {
  const { t } = useTranslation();
  // On desktop the logo already sits in the side nav.
  const showLogo = useWindowDimensions().width < 768;
  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <Text accessibilityRole="header" className="font-extrabold text-3xl text-ink">
          {t('today.title')}
        </Text>
        {showLogo && <Logo size={26} />}
      </View>
      <View className="items-center gap-2 rounded-3xl border-2 border-b-[6px] border-banner-line bg-banner px-5 py-8">
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-green">
          <Icon name="sprout" color="#FFFFFF" size={36} />
        </View>
        <Text className="text-center font-extrabold text-2xl text-ink">{t('today.emptyTitle')}</Text>
        <Text className="max-w-md text-center font-semibold text-base text-muted">{t('today.emptyBody')}</Text>
      </View>
    </Screen>
  );
}
