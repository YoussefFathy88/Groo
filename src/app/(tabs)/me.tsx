import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { supabase } from '@/lib/supabase';
import { useSession } from '@/lib/useSession';

export default function Me() {
  const { t } = useTranslation();
  const session = useSession();
  const email = session.status === 'signedIn' ? session.session.user.email : undefined;

  return (
    <Screen>
      <Text accessibilityRole="header" className="font-extrabold text-3xl text-ink">
        {t('me.title')}
      </Text>
      <View className="flex-row items-center gap-4 rounded-3xl border-2 border-b-[6px] border-line bg-white p-5">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-green-tint">
          <Icon name="person" color="#157A42" />
        </View>
        <View className="flex-1 gap-1">
          {email && (
            <Text className="font-bold text-base text-ink">
              {t('me.signedInAs')} <Text style={{ writingDirection: 'ltr' }}>{email}</Text>
            </Text>
          )}
          <Text className="font-semibold text-base text-muted">{t('me.soonBody')}</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => void supabase.auth.signOut()}
        className="min-h-12 flex-row items-center justify-center gap-2 self-start rounded-2xl border-2 border-b-[5px] border-line bg-white px-4 active:translate-y-0.5"
      >
        <Icon name="logout" color="#4A554F" size={22} />
        <Text className="font-extrabold text-base text-[#4A554F]">{t('me.signOut')}</Text>
      </Pressable>
    </Screen>
  );
}
