import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { getCompletionLabel, getStatusLabel, type Listing } from "@/data/listings";
import { useApp } from "@/state/app-context";

export function MyListingRow({ listing }: { listing: Listing }) {
  const { state, deleteListing, updateListingStatus } = useApp();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const pendingCount = state.requests.filter(
    (request) =>
      request.listingId === listing.id && request.status === "pending",
  ).length;

  function openDetails() {
    router.push({ pathname: "/items/[id]", params: { id: listing.id } });
  }

  function openEdit() {
    router.push({
      pathname: "/listings/[id]/edit",
      params: { id: listing.id },
    });
  }

  function confirmDelete() {
    deleteListing(listing.id);
    setConfirmingDelete(false);
  }

  return (
    <View className="mb-4 gap-3 rounded-2xl bg-white p-4">
      <View className="flex-row gap-3">
        <Image
          source={listing.photo}
          accessibilityLabel={listing.title}
          resizeMode="cover"
          style={{ width: 88, height: 88 }}
          className="rounded-xl"
        />

        <View className="flex-1 gap-1">
          <Text className="text-lg font-semibold text-green-900">
            {listing.title}
          </Text>
          <Text>
            {listing.type}
            {listing.type === "Sale" ? ` · EGP ${listing.price}` : ""}
          </Text>
          <Text className="font-semibold capitalize">
            Status: {getStatusLabel(listing)}
          </Text>
          <Text>
            {pendingCount} pending{" "}
            {pendingCount === 1 ? "request" : "requests"}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Button label="View" variant="secondary" onPress={openDetails} />
        <Button
          label="Edit"
          variant="secondary"
          disabled={listing.status === "completed"}
          onPress={openEdit}
        />
        <Button
          label="Delete"
          variant="danger"
          onPress={() => setConfirmingDelete(true)}
        />
      </View>

      {listing.status === "available" ? (
        <Button
          label="Mark as reserved"
          variant="secondary"
          onPress={() => updateListingStatus(listing.id, "reserved")}
        />
      ) : null}

      {listing.status === "reserved" ? (
        <View className="gap-2">
          <Button
            label={`Mark as ${getCompletionLabel(listing.type)}`}
            onPress={() => updateListingStatus(listing.id, "completed")}
          />
          <Button
            label="Make available again"
            variant="secondary"
            onPress={() => updateListingStatus(listing.id, "available")}
          />
        </View>
      ) : null}

      {confirmingDelete ? (
        <View
          accessibilityRole="alert"
          className="gap-3 rounded-xl border border-red-200 bg-red-50 p-3"
        >
          <Text className="font-semibold text-red-700">
            Delete “{listing.title}”?
          </Text>
          <Text>
            This permanently removes the listing and any requests made for it.
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Button label="Yes, delete" variant="danger" onPress={confirmDelete} />
            <Button
              label="Cancel"
              variant="secondary"
              onPress={() => setConfirmingDelete(false)}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
