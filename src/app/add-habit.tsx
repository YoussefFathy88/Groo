import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import { IconBox } from '@/components/IconBox';
import { type HabitTemplate, TEMPLATES } from '@/data/templates';
import { formatNumber, isRTL, type Language } from '@/i18n/language';
import { showAddedToast } from '@/lib/addedToast';
import { HABIT_ICONS, type HabitIcon, habitColor, habitTint } from '@/lib/habitIcons';
import { clampTarget, cleanName, isTemplateAdded, NAME_MAX, TARGET_MAX, TARGET_MIN, templateToInsert } from '@/lib/habits';
import { saveErrorKey, type SaveErrorKey, useAddHabit, useHabits } from '@/lib/useHabits';

function close() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

function useLang(): Language {
  const { i18n } = useTranslation();
  return i18n.language as Language;
}

export default function AddHabit() {
  const { t } = useTranslation();
  const desktop = useWindowDimensions().width >= 768;
  const [view, setView] = useState<'pick' | 'custom'>('pick');

  if (desktop) {
    return (
      <View className="flex-1 items-center justify-center bg-black/40 p-6">
        <Pressable accessibilityElementsHidden importantForAccessibility="no" onPress={close} className="absolute inset-0" />
        <View className="max-h-full w-full max-w-[1040px] overflow-hidden rounded-[28px] border-2 border-b-8 border-line bg-white">
          <Header />
          <View className="flex-1 flex-row">
            <ScrollView className="flex-1" contentContainerClassName="gap-3 p-6">
              <PickHint />
              <TemplateGrid columns={3} />
            </ScrollView>
            <ScrollView className="w-[400px] grow-0 border-s-2 border-line bg-[#FAFBFA]" contentContainerClassName="gap-4 p-6">
              <CustomForm />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-white">
      {view === 'pick' ? (
        <>
          <Header />
          <ScrollView contentContainerClassName="gap-3 px-4 pb-6">
            <PickHint />
            <TemplateGrid columns={2} />
          </ScrollView>
          <View className="border-t-2 border-line px-4 py-3">
            <Pressable
              accessibilityRole="button"
              onPress={() => setView('custom')}
              className="min-h-14 flex-row items-center justify-center gap-2 rounded-2xl border-2 border-b-[6px] border-line bg-white active:translate-y-0.5"
            >
              <Icon name="plus" color="#157A42" size={22} strokeWidth={2.8} />
              <Text className="font-extrabold text-lg text-green-dark">{t('addHabit.custom')}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Header onBack={() => setView('pick')} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="gap-4 px-4 pb-6">
            <CustomForm />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

function Header({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  const rtl = isRTL(useLang());
  return (
    <View className="flex-row items-center gap-2 px-4 py-3">
      {onBack && (
        <Pressable accessibilityRole="button" accessibilityLabel={t('addHabit.back')} onPress={onBack} className="h-12 w-12 items-center justify-center rounded-full active:bg-line">
          <View style={rtl ? { transform: [{ scaleX: -1 }] } : undefined}>
            <Icon name="back" color="#1F2A24" size={26} strokeWidth={2.6} />
          </View>
        </Pressable>
      )}
      <Text accessibilityRole="header" className="flex-1 text-start font-extrabold text-2xl text-ink">
        {onBack ? t('addHabit.customTitle') : t('addHabit.title')}
      </Text>
      <Pressable accessibilityRole="button" accessibilityLabel={t('addHabit.close')} onPress={close} className="h-12 w-12 items-center justify-center rounded-full active:bg-line">
        <Icon name="close" color="#1F2A24" size={24} strokeWidth={2.6} />
      </Pressable>
    </View>
  );
}

function PickHint() {
  const { t } = useTranslation();
  return <Text className="text-start font-semibold text-base text-muted">{t('addHabit.pickHint')}</Text>;
}

function ErrorNote({ errorKey }: { errorKey: SaveErrorKey | null }) {
  const { t } = useTranslation();
  if (!errorKey) return null;
  return (
    <View accessibilityLiveRegion="polite" className="rounded-2xl border-2 border-banner-line bg-banner px-3.5 py-3">
      <Text className="text-start font-bold text-base text-[#7A5A12]">{t(errorKey)}</Text>
    </View>
  );
}

function TemplateGrid({ columns }: { columns: number }) {
  const lang = useLang();
  const habits = useHabits();
  const add = useAddHabit();
  const [errorKey, setErrorKey] = useState<SaveErrorKey | null>(null);
  const list = habits.data ?? [];

  const onAdd = (template: HabitTemplate) => {
    setErrorKey(null);
    add.mutate(templateToInsert(template, lang), { onError: (e) => setErrorKey(saveErrorKey(e)) });
  };

  const rows: (HabitTemplate | null)[][] = [];
  for (let i = 0; i < TEMPLATES.length; i += columns) {
    const row: (HabitTemplate | null)[] = TEMPLATES.slice(i, i + columns);
    while (row.length < columns) row.push(null);
    rows.push(row);
  }

  return (
    <View className="gap-3">
      <ErrorNote errorKey={errorKey} />
      {rows.map((row, r) => (
        <View key={r} className="flex-row gap-3">
          {row.map((tpl, c) =>
            tpl ? (
              <TemplateCard key={tpl.id} template={tpl} added={isTemplateAdded(tpl, list)} disabled={habits.isPending} onAdd={onAdd} />
            ) : (
              <View key={`s${c}`} className="min-w-0 flex-1 basis-0" />
            ),
          )}
        </View>
      ))}
    </View>
  );
}

function TemplateCard({ template, added, disabled, onAdd }: { template: HabitTemplate; added: boolean; disabled: boolean; onAdd: (t: HabitTemplate) => void }) {
  const { t } = useTranslation();
  const lang = useLang();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }, { rotate: `${rotate.get()}deg` }] }));
  const times = t('addHabit.times', { count: template.dailyTarget, n: formatNumber(template.dailyTarget, lang) });

  const press = () => {
    scale.set(withSequence(withTiming(1.08, { duration: 130 }), withSpring(1, { damping: 8 })));
    rotate.set(withSequence(withTiming(-1.5, { duration: 90 }), withTiming(1.5, { duration: 130 }), withTiming(0, { duration: 120 })));
    onAdd(template);
  };

  return (
    <Animated.View style={[{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${template.name[lang]}, ${times}`}
        accessibilityState={{ disabled: added || disabled, selected: added }}
        disabled={added || disabled}
        onPress={press}
        className={`min-h-[132px] flex-1 justify-between gap-2 rounded-[20px] border-2 border-b-[6px] border-line bg-white p-3.5 active:translate-y-0.5 ${added ? 'opacity-60' : ''}`}
      >
        <View className="flex-row items-start justify-between">
          <IconBox icon={template.icon} solid={added} />
          {added && (
            <View accessibilityLabel={t('addHabit.alreadyAdded')} className="h-7 w-7 items-center justify-center rounded-full border-2 border-green-dark bg-green">
              <Icon name="check" color="#FFFFFF" size={16} strokeWidth={3.2} />
            </View>
          )}
        </View>
        <Text numberOfLines={2} className="text-start font-extrabold text-base text-ink">
          {template.name[lang]}
        </Text>
        <View className="flex-row flex-wrap gap-1.5">
          <Text className="rounded-lg bg-[#F2F4F2] px-2 py-0.5 font-bold text-xs text-muted">{times}</Text>
          {template.categoryKey && <Text className="rounded-lg bg-banner px-2 py-0.5 font-bold text-xs text-[#8A5A00]">{t('addHabit.leaderboard')}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function CustomForm() {
  const { t } = useTranslation();
  const lang = useLang();
  const add = useAddHabit();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<HabitIcon>(HABIT_ICONS[0].icon);
  const [target, setTarget] = useState(1);
  const [errorKey, setErrorKey] = useState<SaveErrorKey | null>(null);
  const clean = cleanName(name);
  const times = t('addHabit.times', { count: target, n: formatNumber(target, lang) });

  const save = () => {
    if (!clean || add.isPending) return;
    setErrorKey(null);
    add.mutate(
      { name: clean, icon, daily_target: target, category_key: null },
      {
        onSuccess: () => {
          showAddedToast(clean);
          close();
        },
        onError: (e) => setErrorKey(saveErrorKey(e)),
      },
    );
  };

  return (
    <>
      {/* Live preview */}
      <View className="flex-row items-center gap-3 rounded-[20px] border-2 border-dashed border-line bg-white p-3.5">
        <IconBox icon={icon} size={48} />
        <View className="flex-1">
          <Text numberOfLines={1} className={`text-start font-extrabold text-lg ${clean ? 'text-ink' : 'text-muted'}`}>
            {clean ?? t('addHabit.previewName')}
          </Text>
          <Text className="text-start font-bold text-sm text-muted">{times}</Text>
        </View>
        <Text className="rounded-lg bg-[#F2F4F2] px-2 py-0.5 font-bold text-xs text-muted">{t('addHabit.preview')}</Text>
      </View>

      <View className="gap-2">
        <Text nativeID="habit-name-label" className="text-start font-extrabold text-[15px] text-ink">
          {t('addHabit.nameLabel')}
        </Text>
        <TextInput
          accessibilityLabelledBy="habit-name-label"
          aria-labelledby="habit-name-label"
          value={name}
          onChangeText={setName}
          maxLength={NAME_MAX}
          placeholder={t('addHabit.namePlaceholder')}
          placeholderTextColor="#9AA39E"
          returnKeyType="done"
          onSubmitEditing={save}
          className="min-h-[54px] rounded-2xl border-2 border-line bg-white px-3.5 text-start font-semibold text-[17px] text-ink focus:border-green"
        />
      </View>

      <View className="gap-2">
        <Text className="text-start font-extrabold text-[15px] text-ink">{t('addHabit.iconLabel')}</Text>
        <View className="flex-row flex-wrap gap-2">
          {HABIT_ICONS.map((h) => {
            const selected = h.icon === icon;
            return (
              <Pressable
                key={h.icon}
                accessibilityRole="radio"
                accessibilityLabel={t(`addHabit.icons.${h.icon}`)}
                accessibilityState={{ selected }}
                onPress={() => setIcon(h.icon)}
                className="h-12 w-12 items-center justify-center rounded-xl border-2"
                style={{ borderColor: selected ? habitColor(h.icon) : '#E5E5E5', backgroundColor: selected ? habitTint(h.icon) : '#FFFFFF' }}
              >
                <Icon name={h.icon} color={habitColor(h.icon)} size={26} />
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-start font-extrabold text-[15px] text-ink">{t('addHabit.timesLabel')}</Text>
        <View className="flex-row items-center gap-3">
          <StepButton icon="minus" label={t('addHabit.less')} disabled={target <= TARGET_MIN} onPress={() => setTarget((n) => clampTarget(n - 1))} />
          <Text accessibilityLiveRegion="polite" className="min-w-12 text-center font-extrabold text-3xl text-ink">
            {formatNumber(target, lang)}
          </Text>
          <StepButton icon="plus" label={t('addHabit.more')} disabled={target >= TARGET_MAX} onPress={() => setTarget((n) => clampTarget(n + 1))} />
        </View>
        <Text className="text-start font-semibold text-sm text-muted">{t('addHabit.timesHint')}</Text>
      </View>

      <ErrorNote errorKey={errorKey} />
      {!clean && <Text className="text-center font-bold text-sm text-muted">{t('addHabit.nameHint')}</Text>}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !clean || add.isPending, busy: add.isPending }}
        disabled={!clean || add.isPending}
        onPress={save}
        className={`min-h-14 items-center justify-center rounded-2xl border-2 border-b-[6px] px-4 active:translate-y-0.5 ${
          clean ? 'border-green-dark bg-green' : 'border-[#C9CFCB] bg-[#E3E7E4]'
        }`}
      >
        <Text className={`font-extrabold text-lg ${clean ? 'text-white' : 'text-muted'}`}>{add.isPending ? t('addHabit.adding') : t('addHabit.add')}</Text>
      </Pressable>
    </>
  );
}

function StepButton({ icon, label, disabled, onPress }: { icon: 'plus' | 'minus'; label: string; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`h-12 w-12 items-center justify-center rounded-2xl border-2 border-b-[5px] border-line bg-white active:translate-y-0.5 ${disabled ? 'opacity-40' : ''}`}
    >
      <Icon name={icon} color="#1F2A24" size={22} strokeWidth={2.8} />
    </Pressable>
  );
}
