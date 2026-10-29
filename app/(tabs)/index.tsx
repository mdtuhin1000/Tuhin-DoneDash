// Todos tab: add, show, complete and delete todos.

import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { DashTodo, useDashTodos } from '../../context/DashTodoContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

type DashFilterName = 'all' | 'pending' | 'completed';

const dashFilters: { name: DashFilterName; label: string }[] = [
  { name: 'all', label: 'All' },
  { name: 'pending', label: 'Pending' },
  { name: 'completed', label: 'Completed' },
];

// Today's date like "Thu, Oct 29"
const getToday = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

export default function TodosScreen() {
  const {
    todos,
    allCount,
    pendingCount,
    doneCount,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  } = useDashTodos();

  // Local state: only this screen needs these two
  const [inputValue, setInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<DashFilterName>('all');

  const filterCounts = { all: allCount, pending: pendingCount, completed: doneCount };

  const shownTodos = todos.filter((todo) => {
    if (statusFilter === 'pending') return !todo.completed;
    if (statusFilter === 'completed') return todo.completed;
    return true;
  });

  const onPressAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  // One row of the list
  const renderTodo = ({ item }: { item: DashTodo }) => (
    <View className="mb-3 flex-row items-center overflow-hidden rounded-2xl border border-dash-border bg-dash-card">
      {/* Colored strip on the left */}
      <View
        className={`w-1.5 self-stretch ${item.completed ? 'bg-dash-green' : 'bg-dash-border'}`}
      />

      <Pressable
        onPress={() => toggleTodo(item.key)}
        className="flex-1 flex-row items-center px-4 py-4 active:opacity-70"
      >
        <View
          className={`mr-4 h-6 w-6 items-center justify-center rounded-md border-2 ${
            item.completed ? 'border-dash-green bg-dash-green' : 'border-dash-muted'
          }`}
        >
          {item.completed && <Text className="text-xs font-bold text-dash-bg">✓</Text>}
        </View>

        <Text
          className={`flex-1 text-base md:text-lg ${
            item.completed ? 'text-dash-muted line-through' : 'font-medium text-white'
          }`}
        >
          {item.label}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => removeTodo(item.key)}
        hitSlop={8}
        className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-dash-border active:opacity-60"
      >
        <Text className="text-lg font-bold text-dash-red">×</Text>
      </Pressable>
    </View>
  );

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-dash-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="w-full max-w-xl flex-1 self-center">
          {/* Title row */}
          <View className="flex-row items-end justify-between px-5 pt-5">
            <View>
              <Text className="text-xs font-bold uppercase tracking-widest text-dash-green">
                {getToday()}
              </Text>
              <Text className="mt-1 text-4xl font-black text-white md:text-5xl">DoneDash</Text>
            </View>
            <View className="rounded-full bg-dash-card px-4 py-2">
              <Text className="font-bold text-dash-green">{pendingCount} left</Text>
            </View>
          </View>

          {/* Segmented filter */}
          <View className="mx-5 mb-4 mt-5 flex-row rounded-xl bg-dash-card p-1">
            {dashFilters.map((filter) => {
              const isOn = statusFilter === filter.name;
              return (
                <Pressable
                  key={filter.name}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setStatusFilter(filter.name);
                  }}
                  className={`flex-1 items-center rounded-lg py-2 ${
                    isOn ? 'bg-dash-green' : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${isOn ? 'text-dash-bg' : 'text-dash-muted'}`}
                  >
                    {filter.label} ({filterCounts[filter.name]})
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* The list */}
          <FlatList
            data={shownTodos}
            keyExtractor={(item) => item.key}
            renderItem={renderTodo}
            className="flex-1"
            contentContainerClassName="px-5 pb-4"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onScrollBeginDrag={Keyboard.dismiss}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="mt-12 items-center">
                <Text className="text-5xl">{statusFilter === 'completed' ? '⏳' : '🚀'}</Text>
                <Text className="mt-3 text-lg font-bold text-white">
                  {statusFilter === 'completed' ? 'Nothing completed yet' : 'All clear!'}
                </Text>
                <Text className="mt-1 text-dash-muted">
                  {statusFilter === 'completed'
                    ? 'Tap a todo to complete it.'
                    : 'Type below to add your next todo.'}
                </Text>
              </View>
            }
            ListFooterComponent={
              doneCount > 0 ? (
                <Pressable
                  onPress={clearCompleted}
                  className="mt-1 items-center rounded-xl border border-dash-border py-3 active:bg-dash-card"
                >
                  <Text className="font-semibold text-dash-red">Clear {doneCount} completed</Text>
                </Pressable>
              ) : undefined
            }
          />

          {/* Input bar */}
          <View className="border-t border-dash-border bg-dash-bg px-5 py-3">
            <View className="flex-row items-center">
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={onPressAdd}
                placeholder="Add a new todo..."
                placeholderTextColorClassName="accent-dash-muted"
                returnKeyType="done"
                className="mr-3 h-12 flex-1 rounded-xl border border-dash-border bg-dash-card px-4 py-0 text-[16px] text-white"
              />
              <Pressable
                onPress={onPressAdd}
                className="h-12 w-12 items-center justify-center rounded-xl bg-dash-green active:bg-dash-green-dark"
              >
                <Text className="text-2xl font-bold text-dash-bg">+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
