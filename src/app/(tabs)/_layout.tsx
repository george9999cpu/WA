import { Tabs } from "expo-router";
import { Text } from "react-native";

import { colors } from "@/theme/tokens";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { backgroundColor: colors.surface },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => <Text style={{ color }}>⌂</Text>,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create listing",
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => <Text style={{ color }}>＋</Text>,
        }}
      />

      <Tabs.Screen
        name="my-listings"
        options={{
          title: "My listings",
          tabBarIcon: ({ color }) => <Text style={{ color }}>≡</Text>,
        }}
      />

      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: ({ color }) => <Text style={{ color }}>⇄</Text>,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Text style={{ color }}>○</Text>,
        }}
      />
    </Tabs>
  );
}
