// Root layout: runs first. It loads Tailwind (global.css),
// gives every screen the shared todo data, and shows the (tabs) group.

import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DashTodoProvider } from '../context/DashTodoContext';

export default function RootLayout() {
  return (
    <DashTodoProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </DashTodoProvider>
  );
}
