import "../global.css";

import { Stack } from "expo-router";

import { AppProvider } from "@/state/app-context";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: "Search & filters" }} />
        <Stack.Screen name="items/[id]" options={{ title: "Item details" }} />
        <Stack.Screen name="requests/[id]" options={{ title: "Request details" }} />
      </Stack>
    </AppProvider>
  );
}
