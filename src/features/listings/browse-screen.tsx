import { FlatList, Text, View } from "react-native";

import { useApp } from "../../state/app-context";
import { ListingCard } from "./listings-card";

export default function BrowseScreen() {
  const { listings } = useApp();

  return (
    <View className="flex-1 bg-green-50 p-5">
      <Text className="mb-2 text-3xl font-bold text-green-900">Wear Again</Text>

      <Text className="mb-5 text-base text-green-800">
        Give clothes a second life.
      </Text>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListEmptyComponent={<Text>No clothing listings yet.</Text>}
      />
    </View>
  );
}
