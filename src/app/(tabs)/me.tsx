import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';

export default function Me() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Text accessibilityRole="header" className="font-extrabold text-3xl text-ink">
        {t('me.title')}
      </Text>
      <View className="flex-row items-center gap-4 rounded-3xl border-2 border-b-[6px] border-line bg-white p-5">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-green-tint">
          <Icon name="person" color="#157A42" />
        </View>
        <Text className="flex-1 font-semibold text-base text-muted">{t('me.soonBody')}</Text>
      </View>
    </Screen>
  );
}
