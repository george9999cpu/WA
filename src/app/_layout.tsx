import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProvider } from "@/state/app-context";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
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
        <Stack.Screen
          name="incoming-requests"
          options={{ title: "Incoming requests" }}
        />
        <Stack.Screen name="edit-profile" options={{ title: "Edit profile" }} />
        <Stack.Screen
          name="completed-listings"
          options={{ title: "My completed listings" }}
        />
        <Stack.Screen
          name="listings/[id]/edit"
          options={{ title: "Edit listing" }}
        />
      </Stack>
    </AppProvider>
  );
}
