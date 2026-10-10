import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Platform, Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/icons';
import { Logo } from '@/components/Logo';
import { formatNumber } from '@/i18n';
import { authErrorKey, isValidEmail } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const TILES: { icon: IconName; color: string; tilt: string }[] = [
  { icon: 'mosque', color: '#15A655', tilt: '-8deg' },
  { icon: 'book', color: '#1C8CC4', tilt: '0deg' },
  { icon: 'dumbbell', color: '#F08A00', tilt: '8deg' },
];

// Animated views take plain styles (NativeWind classNames don't reach them).
const MAIL_BADGE = {
  width: 104,
  height: 104,
  borderRadius: 32,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#EE9603',
  borderBottomWidth: 6,
  borderBottomColor: '#C97C00',
} as const;

function redirectUrl(): string {
  // Web: come back to this same site. Native: deep link into the app.
  return Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.origin : Linking.createURL('/');
}

function BobbingTiles() {
  const reduceMotion = useReducedMotion();
  const y = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    y.value = withRepeat(withSequence(withTiming(-6, { duration: 1200 }), withTiming(0, { duration: 1200 })), -1);
  }, [reduceMotion, y]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));

  return (
    <Animated.View style={[{ flexDirection: 'row', gap: 8, paddingBottom: 10 }, style]}>
      {TILES.map((tile) => (
        <View
          key={tile.icon}
          className="h-[52px] w-[52px] items-center justify-center rounded-2xl border-b-[5px] border-black/20"
          style={{ backgroundColor: tile.color, transform: [{ rotate: tile.tilt }] }}
        >
          <Icon name={tile.icon} color="#FFFFFF" />
        </View>
      ))}
    </Animated.View>
  );
}

function BigButton({ label, onPress, busy, variant = 'primary' }: { label: string; onPress: () => void; busy?: boolean; variant?: 'primary' | 'plain' }) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={busy}
      className={`min-h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border-2 border-b-[6px] px-4 active:translate-y-0.5 ${
        primary ? 'border-green-dark bg-green' : 'border-line bg-white'
      }`}
    >
      {busy && <ActivityIndicator color={primary ? '#FFFFFF' : '#157A42'} />}
      <Text className={`font-extrabold text-lg ${primary ? 'text-white' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}

const SAMPLE_HABITS: { icon: IconName; color: string; label: string; days: number }[] = [
  { icon: 'mosque', color: '#15A655', label: 'signIn.sample.prayer', days: 12 },
  { icon: 'book', color: '#1C8CC4', label: 'signIn.sample.quran', days: 9 },
  { icon: 'dumbbell', color: '#F08A00', label: 'signIn.sample.sport', days: 5 },
];

/** Desktop only: brand panel on the start side, like the approved design. */
function BrandPanel() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ar';
  return (
    <View className="flex-1 justify-center gap-5 border-e-2 border-banner-line bg-banner p-12">
      <View className="items-start">
        <Logo height={84} />
      </View>
      <Text className="font-extrabold text-4xl text-ink">{t('app.slogan')}</Text>
      <Text className="max-w-[460px] font-semibold text-lg text-[#7A5A12]">{t('signIn.panelBody')}</Text>
      <View className="max-w-[420px] gap-2.5">
        {SAMPLE_HABITS.map((h) => (
          <View key={h.icon} className="flex-row items-center gap-3 rounded-2xl border-2 border-b-[6px] border-line bg-white px-3.5 py-3">
            <View className="h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: h.color }}>
              <Icon name={h.icon} color="#FFFFFF" size={24} />
            </View>
            <Text className="flex-1 font-extrabold text-lg text-ink">{t(h.label)}</Text>
            <Text className="font-extrabold text-base text-[#C26F00]">{t('signIn.sample.days', { count: h.days, n: formatNumber(h.days, lang) })}</Text>
            <View className="h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-green-dark bg-green">
              <Icon name="check" color="#FFFFFF" size={14} strokeWidth={3.5} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function SignIn() {
  const { t } = useTranslation();
  const wide = useWindowDimensions().width >= 900;
  const [email, setEmail] = useState('');
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const showInvalid = tried && !isValidEmail(email);

  async function sendLink(address: string) {
    setBusy(true);
    setErrorKey(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: address,
      options: { emailRedirectTo: redirectUrl() },
    });
    setBusy(false);
    if (error) {
      setErrorKey(authErrorKey(error));
      return false;
    }
    return true;
  }

  async function onSend() {
    setTried(true);
    if (!isValidEmail(email)) return;
    const address = email.trim().toLowerCase();
    if (await sendLink(address)) {
      setSentTo(address);
      setResent(false);
    }
  }

  async function onResend() {
    if (sentTo && !resent && (await sendLink(sentTo))) setResent(true);
  }

  const errorBox = errorKey && (
    <View accessibilityLiveRegion="polite" className="rounded-2xl border-2 border-banner-line bg-banner px-3.5 py-3">
      <Text className="font-bold text-base text-[#7A5A12]">{t(errorKey)}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 flex-row bg-white">
      {wide && <BrandPanel />}
      <View className="w-full max-w-[440px] flex-1 self-center px-[22px] py-6">
        {sentTo ? (
          <View className="flex-1 items-center justify-center gap-3">
            <Animated.View entering={ZoomIn.springify()} style={MAIL_BADGE}>
              <Icon name="mail" color="#FFFFFF" size={56} />
            </Animated.View>
            <Text accessibilityRole="header" className="text-center font-extrabold text-3xl text-ink">
              {t('signIn.sentTitle')}
            </Text>
            <Text className="text-center font-semibold text-lg text-[#4A554F]">{t('signIn.sentBody')}</Text>
            <View className="rounded-xl bg-[#F2F4F2] px-3.5 py-1.5">
              <Text className="font-extrabold text-base text-ink" style={{ writingDirection: 'ltr' }}>
                {sentTo}
              </Text>
            </View>
            <View className="mt-2 w-full rounded-2xl border-2 border-banner-line bg-banner px-3.5 py-3">
              <Text className="font-bold text-base text-[#7A5A12]">{t('signIn.tip')}</Text>
            </View>
            {errorBox}
            <View className="mt-4 w-full flex-row gap-2.5">
              <BigButton label={t(resent ? 'signIn.resent' : 'signIn.resend')} onPress={onResend} busy={busy} variant="plain" />
              <BigButton
                label={t('signIn.change')}
                variant="plain"
                onPress={() => {
                  setSentTo(null);
                  setErrorKey(null);
                }}
              />
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center gap-3">
            <View className="items-center gap-1.5 pb-4">
              {!wide && <BobbingTiles />}
              {!wide && <Logo height={60} />}
              <Text accessibilityRole="header" className="text-center font-extrabold text-[26px] text-ink">
                {t('signIn.title')}
              </Text>
              <Text className="max-w-[300px] text-center font-semibold text-base text-[#4A554F]">{t('signIn.sub')}</Text>
            </View>
            <Text nativeID="email-label" className="font-extrabold text-[15px] text-ink">
              {t('signIn.emailLabel')}
            </Text>
            <TextInput
              accessibilityLabelledBy="email-label"
              aria-label={t('signIn.emailLabel')}
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={onSend}
              placeholder="name@email.com"
              placeholderTextColor="#8C948F"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              inputMode="email"
              returnKeyType="send"
              className={`min-h-[54px] rounded-2xl border-2 bg-white px-3.5 font-semibold text-[17px] text-ink ${showInvalid ? 'border-amber' : 'border-line'}`}
              style={{ textAlign: 'left', writingDirection: 'ltr' }}
            />
            {showInvalid && <Text className="font-bold text-sm text-[#8A5A00]">{t('signIn.invalid')}</Text>}
            {errorBox}
            <View className="flex-row">
              <BigButton label={t(busy ? 'signIn.sending' : 'signIn.send')} onPress={onSend} busy={busy} />
            </View>
            <Text className="text-center font-semibold text-sm text-muted">{t('signIn.noPassword')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
