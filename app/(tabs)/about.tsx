// About tab: lab and student information.

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function AboutScreen() {
  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-dash-bg">
      <View className="w-full max-w-xl flex-1 self-center px-5 pt-6">
        <Text className="text-xs font-bold uppercase tracking-widest text-dash-green">
          Lab Task
        </Text>
        <Text className="mt-1 text-4xl font-black text-white">About</Text>
        <Text className="mt-1 text-dash-muted">Todo List App using React Native</Text>

        <View className="mt-6 flex-row items-center rounded-2xl border border-dash-border bg-dash-card p-5">
          <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-dash-green">
            <Text className="text-2xl font-black text-dash-bg">T</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-white">Md. Tuhinul Islam</Text>
            <Text className="text-dash-muted">Roll: 22 · DoneDash</Text>
          </View>
        </View>

        <View className="mt-4 rounded-2xl border border-dash-border bg-dash-card p-5">
          <Text className="mb-2 font-bold text-dash-green">Features</Text>
          <Text className="py-0.5 text-dash-muted">• Add new todos</Text>
          <Text className="py-0.5 text-dash-muted">• Tap a todo to complete it</Text>
          <Text className="py-0.5 text-dash-muted">• Delete todos or clear completed</Text>
          <Text className="py-0.5 text-dash-muted">• Filter: All / Pending / Completed</Text>
          <Text className="py-0.5 text-dash-muted">• Live remaining counter</Text>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
