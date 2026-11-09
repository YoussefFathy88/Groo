import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import type { Language } from '@/i18n/language';
import { formatNumber } from '@/i18n/language';
import type { Habit } from '@/lib/habits';

import { IconBox } from './IconBox';

/** Today grid card. Display only in step 3; tapping to log comes in step 4. */
export function HabitCard({ habit }: { habit: Habit }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  return (
    <View
      accessible
      accessibilityLabel={`${habit.name}, ${t('addHabit.times', { count: habit.daily_target, n: formatNumber(habit.daily_target, lang) })}`}
      className="min-h-[124px] min-w-0 flex-1 basis-0 justify-between gap-3 rounded-3xl border-2 border-b-[6px] border-line bg-white p-4"
    >
      <IconBox icon={habit.icon} size={48} />
      <View className="gap-0.5">
        <Text numberOfLines={2} className="text-start font-extrabold text-lg text-ink">
          {habit.name}
        </Text>
        <Text className="text-start font-bold text-sm text-muted">
          {t('addHabit.times', { count: habit.daily_target, n: formatNumber(habit.daily_target, lang) })}
        </Text>
      </View>
    </View>
  );
}
