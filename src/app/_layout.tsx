import { Stack } from "expo-router";
import { ProgressProvider } from "../context/ProgressContext";

export default function RootLayout() {
  return (
    <ProgressProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="hiragana" />
        <Stack.Screen name="hiragana-lesson/[day]" />
        <Stack.Screen name="hiragana-quiz/[day]" />
        <Stack.Screen name="learn" />
        <Stack.Screen name="learn-day2" />
        <Stack.Screen name="quiz-day1" />
        <Stack.Screen name="quiz-day2" />
      </Stack>
    </ProgressProvider>
  );
}
