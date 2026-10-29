// Bottom tabs layout. Each file inside app/(tabs) becomes one tab:
//   index.tsx -> Todos
//   stats.tsx -> Stats
//   about.tsx -> About

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useCSSVariable, useResolveClassNames } from 'uniwind';

export default function TabsLayout() {
  // Colors come from global.css, so the theme stays in one place
  const activeColor = (useCSSVariable('--color-dash-green') as string) ?? '#10b981';
  const inactiveColor = (useCSSVariable('--color-dash-muted') as string) ?? '#7c8aa5';

  // Tailwind classes turned into style objects for the tab bar
  const tabBarStyle = useResolveClassNames('bg-dash-card border-t border-dash-border');
  const tabBarLabelStyle = useResolveClassNames('text-xs font-bold');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle,
        tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'pie-chart' : 'pie-chart-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'information-circle' : 'information-circle-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
