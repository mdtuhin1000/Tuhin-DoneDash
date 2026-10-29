// Stats tab: completion rate, two stat tiles and the next todo to do.

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCSSVariable, withUniwind } from 'uniwind';
import { useDashTodos } from '../../context/DashTodoContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

// 10 thin bars used to draw the progress line
const barSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function StatsScreen() {
  const { todos, allCount, pendingCount, doneCount, donePercent } = useDashTodos();

  // Icon colors come from global.css
  const greenColor = (useCSSVariable('--color-dash-green') as string) ?? '#10b981';
  const mutedColor = (useCSSVariable('--color-dash-muted') as string) ?? '#7c8aa5';

  const filledBars = Math.round(donePercent / 10);

  // The first todo that is still not done
  const nextTodo = todos.find((todo) => !todo.completed);

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-dash-bg">
      <View className="w-full max-w-xl flex-1 self-center px-5 pt-6">
        <Text className="text-xs font-bold uppercase tracking-widest text-dash-green">
          Overview
        </Text>
        <Text className="mt-1 text-4xl font-black text-white">Stats</Text>

        {/* Completion card */}
        <View className="mt-6 rounded-2xl border border-dash-border bg-dash-card p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-dash-muted">Completion rate</Text>
              <Text className="mt-1 text-5xl font-black text-white">{donePercent}%</Text>
            </View>
            <View className="rounded-full bg-dash-bg px-4 py-2">
              <Text className="font-bold text-dash-green">
                {doneCount} / {allCount} done
              </Text>
            </View>
          </View>

          <View className="mt-5 flex-row gap-1">
            {barSteps.map((step) => (
              <View
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step < filledBars ? 'bg-dash-green' : 'bg-dash-border'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Two tiles */}
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-dash-border bg-dash-card p-4">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-dash-bg">
              <Ionicons name="checkmark-done" size={22} color={greenColor} />
            </View>
            <Text className="mt-3 text-3xl font-black text-white">{doneCount}</Text>
            <Text className="text-sm text-dash-muted">Completed</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-dash-border bg-dash-card p-4">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-dash-bg">
              <Ionicons name="time-outline" size={22} color={mutedColor} />
            </View>
            <Text className="mt-3 text-3xl font-black text-white">{pendingCount}</Text>
            <Text className="text-sm text-dash-muted">Remaining</Text>
          </View>
        </View>

        {/* Up next */}
        <View className="mt-4 flex-row items-center rounded-2xl bg-dash-green p-4">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-dash-bg">
            <Ionicons name="flash" size={20} color={greenColor} />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold uppercase tracking-wider text-dash-bg">Up next</Text>
            <Text className="text-base font-bold text-dash-bg">
              {nextTodo ? nextTodo.label : 'Nothing pending. You are all caught up!'}
            </Text>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
