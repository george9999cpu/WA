import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { useApp } from "@/state/app-context";
import { Avatar } from "./avatar";
import { CompletedListingCard } from "./completed-listing-card";
import { OutlineButton } from "./outline-button";

const PREVIEW_COUNT = 2;

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center rounded-2xl bg-white p-3">
      <Text className="text-2xl font-bold text-green-900">{value}</Text>
      <Text className="text-sm">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { state } = useApp();
  const user = state.users.find((item) => item.id === state.currentUserId);

  const myListings = state.listings.filter(
    (listing) => listing.ownerId === state.currentUserId,
  );
  const availableListings = myListings.filter(
    (listing) => listing.status === "available",
  );
  const completedListings = myListings.filter(
    (listing) => listing.status === "completed",
  );
  const recentCompleted = completedListings.slice(0, PREVIEW_COUNT);

  if (!user) {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>Profile not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-green-50">
      <FlatList
        data={recentCompleted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <View className="mb-3 gap-4">
            <DemoUserSwitcher />

            <View className="items-center gap-2 rounded-2xl bg-white p-5">
              <Avatar name={user.name} />
              <Text className="text-2xl font-bold text-green-900">
                {user.name}
              </Text>
              <Text className="font-semibold">📍 {user.location}</Text>
              <Text className="text-center">
                {user.bio || "No bio yet."}
              </Text>
            </View>

            <View className="flex-row gap-3">
              <StatBox label="Listings" value={myListings.length} />
              <StatBox label="Available" value={availableListings.length} />
              <StatBox label="Completed" value={completedListings.length} />
            </View>

            <OutlineButton
              label="Edit profile"
              onPress={() => router.push("/edit-profile")}
            />

            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-xl font-semibold text-green-900">
                Completed listings
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View all completed listings"
                onPress={() => router.push("/completed-listings")}
                className="rounded-xl bg-green-900 px-4 py-2 active:opacity-70"
              >
                <Text className="font-semibold text-white">
                  View all ({completedListings.length})
                </Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => <CompletedListingCard listing={item} />}
        ListEmptyComponent={
          <View className="items-center gap-1 rounded-2xl bg-white p-5">
            <Text className="font-semibold text-green-900">
              Nothing completed yet
            </Text>
            <Text className="text-center">
              Listings you mark as completed will appear here as sold,
              exchanged or donated.
            </Text>
          </View>
        }
      />
    </View>
  );
}
