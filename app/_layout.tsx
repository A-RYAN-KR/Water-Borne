import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </I18nextProvider>
    </>
  );
}
