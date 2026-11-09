import '../global.css';
import '../i18n';

import {
  BalooBhaijaan2_500Medium,
  BalooBhaijaan2_600SemiBold,
  BalooBhaijaan2_700Bold,
  BalooBhaijaan2_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/baloo-bhaijaan-2';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { queryClient } from '@/lib/queryClient';
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

  // Never show one user's cached data to the next user on this device.
  useEffect(() => {
    if (session.status === 'signedOut') queryClient.clear();
  }, [session.status]);

  // Wait for the font (no fallback flash) and the saved session (no sign-in flash).
  if (!ready) return null;

  const signedIn = session.status === 'signedIn';
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={signedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="add-habit" options={{ presentation: 'transparentModal', animation: 'fade' }} />
        </Stack.Protected>
        <Stack.Protected guard={!signedIn}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
