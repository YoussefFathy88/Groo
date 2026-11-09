import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';

import { HabitCard } from '@/components/HabitCard';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Screen } from '@/components/Screen';
import { clearAddedToast, useAddedToast } from '@/lib/addedToast';
import type { Habit } from '@/lib/habits';
import { useHabits } from '@/lib/useHabits';

const openAddHabit = () => router.push('/add-habit');

export default function Today() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  // On desktop the logo already sits in the side nav.
  const showLogo = width < 768;
  const columns = width >= 1024 ? 3 : 2;
  const habits = useHabits();

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <Text accessibilityRole="header" className="font-extrabold text-3xl text-ink">
          {t('today.title')}
        </Text>
        {showLogo && <Logo height={26} />}
      </View>
      <AddedToast />
      {habits.isPending ? (
        <ActivityIndicator color="#15A655" className="py-10" />
      ) : habits.isError ? (
        <View accessibilityLiveRegion="polite" className="items-center gap-3 rounded-3xl border-2 border-banner-line bg-banner px-5 py-6">
          <Text className="text-center font-bold text-base text-[#7A5A12]">{t('today.loadError')}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void habits.refetch()}
            className="min-h-12 justify-center rounded-2xl border-2 border-b-[5px] border-line bg-white px-5 active:translate-y-0.5"
          >
            <Text className="font-extrabold text-base text-ink">{t('today.retry')}</Text>
          </Pressable>
        </View>
      ) : habits.data.length === 0 ? (
        <EmptyToday />
      ) : (
        <HabitGrid habits={habits.data} columns={columns} />
      )}
    </Screen>
  );
}

function EmptyToday() {
  const { t } = useTranslation();
  return (
    <View className="items-center gap-2 rounded-3xl border-2 border-b-[6px] border-banner-line bg-banner px-5 py-8">
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-green">
        <Icon name="sprout" color="#FFFFFF" size={36} />
      </View>
      <Text className="text-center font-extrabold text-2xl text-ink">{t('today.emptyTitle')}</Text>
      <Text className="max-w-md text-center font-semibold text-base text-muted">{t('today.emptyBody')}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={openAddHabit}
        className="mt-3 min-h-14 flex-row items-center justify-center gap-2 rounded-2xl border-2 border-b-[6px] border-green-dark bg-green px-6 active:translate-y-0.5"
      >
        <Icon name="plus" color="#FFFFFF" size={22} strokeWidth={2.8} />
        <Text className="font-extrabold text-lg text-white">{t('today.addFirst')}</Text>
      </Pressable>
    </View>
  );
}

type Cell = { kind: 'habit'; habit: Habit } | { kind: 'add' } | { kind: 'spacer' };

function HabitGrid({ habits, columns }: { habits: Habit[]; columns: number }) {
  const cells: Cell[] = [...habits.map((habit) => ({ kind: 'habit' as const, habit })), { kind: 'add' }];
  while (cells.length % columns !== 0) cells.push({ kind: 'spacer' });
  const rows: Cell[][] = [];
  for (let i = 0; i < cells.length; i += columns) rows.push(cells.slice(i, i + columns));

  return (
    <View className="gap-3">
      {rows.map((row, r) => (
        <View key={r} className="flex-row gap-3">
          {row.map((cell, c) =>
            cell.kind === 'habit' ? (
              <HabitCard key={cell.habit.id} habit={cell.habit} />
            ) : cell.kind === 'add' ? (
              <AddTile key="add" />
            ) : (
              // Same padding + border as a card so every column gets the same width.
              <View key={`s${c}`} className="min-w-0 flex-1 basis-0 border-2 border-transparent p-4" />
            ),
          )}
        </View>
      ))}
    </View>
  );
}

function AddTile() {
  const { t } = useTranslation();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('today.addTile')}
      onPress={openAddHabit}
      className="min-h-[124px] min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-3xl border-2 border-dashed border-green-line bg-green-tint p-4 active:translate-y-0.5"
    >
      <View className="h-12 w-12 items-center justify-center rounded-full bg-green">
        <Icon name="plus" color="#FFFFFF" size={26} strokeWidth={2.8} />
      </View>
      <Text className="font-extrabold text-base text-green-dark">{t('today.addTile')}</Text>
    </Pressable>
  );
}

function AddedToast() {
  const { t } = useTranslation();
  const name = useAddedToast();
  useEffect(() => {
    if (!name) return;
    const id = setTimeout(clearAddedToast, 3500);
    return () => clearTimeout(id);
  }, [name]);
  if (!name) return null;
  return (
    <Animated.View entering={FadeInUp.springify()} exiting={FadeOut} accessibilityLiveRegion="polite">
      <View className="flex-row items-center gap-3 rounded-2xl border-2 border-b-[5px] border-green-line bg-green-tint px-4 py-3">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-green">
          <Icon name="check" color="#FFFFFF" size={18} strokeWidth={3} />
        </View>
        <Text className="flex-1 text-start font-extrabold text-base text-green-dark">{t('today.added', { name })}</Text>
      </View>
    </Animated.View>
  );
}
