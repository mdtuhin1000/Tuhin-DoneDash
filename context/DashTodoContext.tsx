// Shared todo data for all tabs (Todos, Stats, About).
// Every screen can read the same list by calling useDashTodos().

import { createContext, ReactNode, useContext, useState } from 'react';
import { LayoutAnimation } from 'react-native';

// ---------- Types ----------
export type DashTodo = {
  key: string;
  label: string;
  completed: boolean;
};

type DashTodoContextValue = {
  todos: DashTodo[];
  allCount: number;
  pendingCount: number;
  doneCount: number;
  donePercent: number;
  addTodo: (label: string) => void;
  toggleTodo: (key: string) => void;
  removeTodo: (key: string) => void;
  clearCompleted: () => void;
};

const DashTodoContext = createContext<DashTodoContextValue | null>(null);

// Makes list changes smooth
const smooth = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

// ---------- Provider ----------
export function DashTodoProvider({ children }: { children: ReactNode }) {
  // The ONE list of todos used by the whole app
  const [todos, setTodos] = useState<DashTodo[]>([
    { key: 'a1', label: 'Push project to GitHub', completed: false },
    { key: 'a2', label: 'Take app screenshot', completed: false },
    { key: 'a3', label: 'Take terminal screenshot', completed: true },
    { key: 'a4', label: 'Submit link on Google Classroom', completed: false },
  ]);

  const addTodo = (label: string) => {
    const cleanLabel = label.trim();
    if (cleanLabel.length === 0) return;

    const freshTodo: DashTodo = {
      key: Date.now().toString(),
      label: cleanLabel,
      completed: false,
    };

    smooth();
    setTodos([freshTodo, ...todos]);
  };

  const toggleTodo = (key: string) => {
    smooth();
    setTodos(
      todos.map((todo) => (todo.key === key ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTodo = (key: string) => {
    smooth();
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  const clearCompleted = () => {
    smooth();
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Numbers used on the screens
  const allCount = todos.length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const doneCount = allCount - pendingCount;
  const donePercent = allCount === 0 ? 0 : Math.round((doneCount / allCount) * 100);

  return (
    <DashTodoContext.Provider
      value={{
        todos,
        allCount,
        pendingCount,
        doneCount,
        donePercent,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
      }}
    >
      {children}
    </DashTodoContext.Provider>
  );
}

// ---------- Hook used by the screens ----------
export function useDashTodos() {
  const value = useContext(DashTodoContext);
  if (value === null) {
    throw new Error('useDashTodos must be used inside DashTodoProvider');
  }
  return value;
}
