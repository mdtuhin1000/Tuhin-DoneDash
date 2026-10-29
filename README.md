# DoneDash - Todo List App (React Native + Expo)

Lab task: **Developing a Todo List Application Using React Native**

| | |
|---|---|
| **Student** | Md. Tuhinul Islam |
| **Roll** | 22 |
| **Theme** | Dark Slate + Emerald (dark) |
| **Styling** | Tailwind CSS classes with [Uniwind](https://docs.uniwind.dev) (no StyleSheet, no extra CSS) |

## Features

- Add new tasks
- Show tasks with `FlatList`
- Mark a task as completed / not completed
- Delete a task
- Show how many tasks are remaining
- State is managed with the `useState` hook
- Responsive layout (phones and tablets)

## How to run

```bash
npm install
npx expo start
```

Then in the terminal press:

- `i` to open the **iOS Simulator**
- `a` to open the **Android Emulator**

Or scan the QR code with the Expo Go app on a real phone.

## Project files (Expo Router)

| File | What it does |
|---|---|
| `app/_layout.tsx` | Root layout: loads Tailwind and shares the task data with every screen |
| `app/(tabs)/_layout.tsx` | The **bottom tabs** (icons, colors, titles) |
| `app/(tabs)/index.tsx` | Tab 1: the Todo list screen |
| `app/(tabs)/stats.tsx` | Tab 2: Stats numbers |
| `app/(tabs)/about.tsx` | Tab 3: About the lab and student |
| `context/DashTodoContext.tsx` | The shared `useState` list and the add / toggle / delete functions |
| `global.css` | Tailwind + Uniwind import and the theme colors |
| `metro.config.js` | Connects Uniwind to Expo |
| `app.json` | App name and settings |
# Tuhin-DoneDash
