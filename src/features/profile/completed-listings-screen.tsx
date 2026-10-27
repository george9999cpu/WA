import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import {
  completionLabel,
  type ListingType,
} from "@/data/listings";
import { useApp } from "@/state/app-context";
import { CompletedListingCard } from "./completed-listing-card";

type Filter = "All" | ListingType;

const filters: Filter[] = ["All", "Sale", "Exchange", "Donation"];

function filterLabel(filter: Filter): string {
  return filter === "All" ? "All" : completionLabel(filter);
}

function SummaryBox({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center rounded-xl bg-green-50 p-3">
      <Text className="text-xl font-bold text-green-900">{value}</Text>
      <Text className="text-sm">{label}</Text>
    </View>
  );
}

export default function CompletedListingsScreen() {
  const { state } = useApp();
  const [filter, setFilter] = useState<Filter>("All");

  const completedListings = state.listings.filter(
    (listing) =>
      listing.ownerId === state.currentUserId &&
      listing.status === "completed",
  );

  const visibleListings = completedListings.filter(
    (listing) => filter === "All" || listing.type === filter,
  );

  const soldListings = completedListings.filter(
    (listing) => listing.type === "Sale",
  );
  const exchangedCount = completedListings.filter(
    (listing) => listing.type === "Exchange",
  ).length;
  const donatedCount = completedListings.filter(
    (listing) => listing.type === "Donation",
  ).length;
  const totalEarned = soldListings.reduce(
    (sum, listing) => sum + (listing.price ?? 0),
    0,
  );

  return (
    <View className="flex-1 bg-green-50">
      <FlatList
        data={visibleListings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <View className="mb-3 gap-4">
            <View className="gap-3 rounded-2xl bg-white p-4">
              <Text className="text-xl font-bold text-green-900">
                {completedListings.length} completed{" "}
                {completedListings.length === 1 ? "listing" : "listings"}
              </Text>

              <View className="flex-row gap-3">
                <SummaryBox label="Sold" value={soldListings.length} />
                <SummaryBox label="Exchanged" value={exchangedCount} />
                <SummaryBox label="Donated" value={donatedCount} />
              </View>

              {soldListings.length > 0 ? (
                <Text className="font-semibold text-green-900">
                  Total from sales: EGP {totalEarned}
                </Text>
              ) : null}
            </View>

            <View className="flex-row flex-wrap gap-2">
              {filters.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item === filter }}
                  onPress={() => setFilter(item)}
                  className={`rounded-xl px-4 py-2 ${
                    item === filter ? "bg-green-900" : "bg-white"
                  }`}
                >
                  <Text
                    className={
                      item === filter
                        ? "font-semibold text-white"
                        : "font-semibold text-green-900"
                    }
                  >
                    {filterLabel(item)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => <CompletedListingCard listing={item} />}
        ListEmptyComponent={
          <View className="items-center gap-1 rounded-2xl bg-white p-5">
            <Text className="font-semibold text-green-900">
              {completedListings.length === 0
                ? "Nothing completed yet"
                : `No ${filterLabel(filter).toLowerCase()} listings`}
            </Text>
            <Text className="text-center">
              {completedListings.length === 0
                ? "Listings you mark as completed will appear here as sold, exchanged or donated."
                : "Try a different filter to see your other completed listings."}
            </Text>
          </View>
        }
      />
    </View>
  );
}
