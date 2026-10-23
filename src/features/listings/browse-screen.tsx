import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { Button } from "@/components/ui/button";
import { useApp } from "@/state/app-context";
import { ListingCard } from "./listings-card";

export default function BrowseScreen() {
  const { state } = useApp();

  return (
    <View className="flex-1 bg-green-50 p-5">
      <FlatList
        data={state.listings}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-5 gap-3">
            <DemoUserSwitcher />

            <Text className="text-3xl font-bold text-green-900">
              Wear Again
            </Text>

            <Text>Find clothes to buy, exchange or receive as a donation.</Text>

            <Button
              label="Search & filters"
              onPress={() => router.push("/search")}
            />
          </View>
        }
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListEmptyComponent={<Text>No clothing listings yet.</Text>}
      />
    </View>
  );
}
