import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import type { NewListing } from "@/data/listings";
import { useApp } from "@/state/app-context";
import { ListingForm } from "./listing-form";

export default function EditListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, updateListing } = useApp();
  const listing = state.listings.find((item) => item.id === id);

  if (!listing) {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>Listing not found. It may have been deleted.</Text>
      </View>
    );
  }

  if (listing.ownerId !== state.currentUserId) {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>You can only edit your own listings.</Text>
      </View>
    );
  }

  if (listing.status === "completed") {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>Completed listings can no longer be edited.</Text>
      </View>
    );
  }

  const hasRequests = state.requests.some(
    (request) => request.listingId === listing.id,
  );

  function handleSave(input: NewListing) {
    const saved = updateListing(id, input);

    if (saved) {
      router.back();
    }

    return saved;
  }

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      contentContainerStyle={{ padding: 20, gap: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold text-green-900">
        Edit {listing.title}
      </Text>
      <Text className="capitalize">Status: {listing.status}</Text>

      <ListingForm
        initialListing={listing}
        submitLabel="Save changes"
        typeLocked={hasRequests}
        onSubmit={handleSave}
      />
    </ScrollView>
  );
}
