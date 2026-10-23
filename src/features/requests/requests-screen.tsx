import { Text, View } from "react-native";

export default function RequestsScreen() {
  return (
    <View className="flex-1 gap-3 bg-green-50 p-5">
      <Text className="text-2xl font-bold text-green-900">My requests</Text>
      <Text>Placeholder: your submitted requests will appear here.</Text>
    </View>
  );
}
