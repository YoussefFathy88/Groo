import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Page wrapper: white background, safe areas, centered content up to desktop width. */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <ScrollView contentContainerClassName="grow items-center px-4 py-5">
        <View className="w-full max-w-[960px] gap-5">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
