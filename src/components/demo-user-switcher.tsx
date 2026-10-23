import { Pressable, Text, View } from "react-native";

import { useApp } from "@/state/app-context";

export function DemoUserSwitcher() {
  const { state, switchUser } = useApp();

  return (
    <View className="mb-5 gap-2 rounded-2xl bg-green-100 p-3">
      <Text className="font-bold text-green-900">Demo user switcher</Text>

      <Text>Sample accounts. Changes reset when the app reloads.</Text>

      <View className="flex-row flex-wrap gap-2">
        {state.users.map((user) => (
          <Pressable
            key={user.id}
            accessibilityRole="button"
            accessibilityState={{
              selected: user.id === state.currentUserId,
            }}
            onPress={() => switchUser(user.id)}
            className={`rounded-xl px-4 py-3 ${
              user.id === state.currentUserId ? "bg-green-900" : "bg-white"
            }`}
          >
            <Text
              className={
                user.id === state.currentUserId
                  ? "font-semibold text-white"
                  : "font-semibold text-green-900"
              }
            >
              {user.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
