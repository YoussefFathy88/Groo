import '../global.css';
import '../i18n';

import {
  BalooBhaijaan2_500Medium,
  BalooBhaijaan2_600SemiBold,
  BalooBhaijaan2_700Bold,
  BalooBhaijaan2_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/baloo-bhaijaan-2';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useSession } from '@/lib/useSession';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BalooBhaijaan2_500Medium,
    BalooBhaijaan2_600SemiBold,
    BalooBhaijaan2_700Bold,
    BalooBhaijaan2_800ExtraBold,
  });
  const session = useSession();
  const ready = (fontsLoaded || fontError !== null) && session.status !== 'loading';

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

  // Wait for the font (no fallback flash) and the saved session (no sign-in flash).
  if (!ready) return null;

  const signedIn = session.status === 'signedIn';
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={signedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
