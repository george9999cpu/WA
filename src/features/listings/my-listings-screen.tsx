import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { Button } from "@/components/ui/button";
import { useApp } from "@/state/app-context";
import { MyListingRow } from "./my-listing-row";

export default function MyListingsScreen() {
  const { state } = useApp();
  const myListings = state.listings.filter(
    (listing) => listing.ownerId === state.currentUserId,
  );

  return (
    <View className="flex-1 bg-green-50 p-5">
      <FlatList
        data={myListings}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-5 gap-3">
            <DemoUserSwitcher />

            <Text className="text-2xl font-bold text-green-900">
              My listings
            </Text>

            <Text>
              Edit, delete or update the status of the clothes you listed.
            </Text>

            <Button
              label="Create a listing"
              onPress={() => router.push("/create")}
            />
          </View>
        }
        renderItem={({ item }) => <MyListingRow listing={item} />}
        ListEmptyComponent={
          <Text>You have not listed any clothes yet.</Text>
        }
      />
    </View>
  );
}
