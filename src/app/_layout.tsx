import { Stack } from "expo-router";
import { ProgressProvider } from "../context/ProgressContext";

export default function RootLayout() {
  return (
    <ProgressProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="hiragana" />
        <Stack.Screen name="learn" />
        <Stack.Screen name="quiz-day1" />
      </Stack>
    </ProgressProvider>
  );
}