import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-green-100 p-6">
      <Text className="text-3xl font-bold text-green-900">Wear Again</Text>

      <Text className="text-base text-green-800">
        Give clothes a second life.
      </Text>
    </View>
  );
}
