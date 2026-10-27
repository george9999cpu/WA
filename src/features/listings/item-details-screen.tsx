import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/data/listings";
import { useApp } from "@/state/app-context";

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useApp();
  const listing = state.listings.find((item) => item.id === id);

  if (!listing) {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>Item not found. It may have been removed.</Text>
      </View>
    );
  }

  const owner = state.users.find((user) => user.id === listing.ownerId);
  const ownListing = listing.ownerId === state.currentUserId;

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      contentContainerStyle={{ padding: 20, gap: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <DemoUserSwitcher />

      <Image
        source={listing.photo}
        accessibilityLabel={listing.title}
        resizeMode="cover"
        style={{ width: "100%", height: 220 }}
        className="rounded-2xl"
      />

      <Text className="text-3xl font-bold text-green-900">{listing.title}</Text>

      <Text className="font-semibold">
        {listing.type} · {listing.status}
      </Text>

      <Text>{listing.description}</Text>
      <Text>Size: {listing.size}</Text>
      <Text>Category: {listing.category}</Text>
      <Text>Condition: {listing.condition}</Text>

      <Text className="text-xl font-semibold text-green-900">
        {listing.type === "Sale"
          ? `EGP ${listing.price}`
          : listing.type === "Donation"
            ? "Free to a new home"
            : "Open to an exchange"}
      </Text>

      <View className="gap-2 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-green-900">
          Owner: {owner?.name}
        </Text>
        <Text>{owner?.location}</Text>
        <Text>{owner?.bio}</Text>
      </View>

      {ownListing ? (
        <View className="gap-3">
          <Text>This is your listing.</Text>
          {listing.status !== "completed" ? (
            <Button
              label="Edit listing"
              onPress={() =>
                router.push({
                  pathname: "/listings/[id]/edit",
                  params: { id: listing.id },
                })
              }
            />
          ) : null}
        </View>
      ) : (
        <RequestForm
          key={`${state.currentUserId}-${listing.id}`}
          listing={listing}
        />
      )}
    </ScrollView>
  );
}

function RequestForm({ listing }: { listing: Listing }) {
  const { state, sendRequest } = useApp();
  const [offer, setOffer] = useState("");
  const [error, setError] = useState("");
  const offerRef = useRef<TextInput>(null);

  const existing = state.requests.find(
    (request) =>
      request.listingId === listing.id &&
      request.requesterId === state.currentUserId &&
      request.status !== "rejected",
  );

  const disabled = listing.status !== "available" || Boolean(existing);

  function submit() {
    if (disabled) return;

    if (listing.type === "Exchange" && !offer.trim()) {
      setError("Describe the clothes you are offering.");
      offerRef.current?.focus();
      return;
    }

    sendRequest(listing.id, offer);
    setOffer("");
    setError("");
  }

  return (
    <View className="gap-3">
      {listing.type === "Exchange" ? (
        <>
          <Text className="font-semibold">Clothes offered in exchange</Text>
          <TextInput
            ref={offerRef}
            accessibilityLabel="Clothes offered in exchange"
            placeholder="Describe your clothes, size and condition"
            value={offer}
            onChangeText={setOffer}
            multiline
            className="rounded-xl border border-green-200 bg-white p-3"
          />
        </>
      ) : null}

      {error ? (
        <Text accessibilityRole="alert" className="text-red-700">
          {error}
        </Text>
      ) : null}

      {listing.status !== "available" ? (
        <Text>This listing is currently {listing.status}.</Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={submit}
        className={`items-center rounded-xl bg-green-900 p-4 ${
          disabled ? "opacity-40" : "active:opacity-70"
        }`}
      >
        <Text className="font-semibold text-white">
          {existing
            ? `Request ${existing.status}`
            : `Send ${
                listing.type === "Sale"
                  ? "purchase"
                  : listing.type.toLowerCase()
              } request`}
        </Text>
      </Pressable>

      <Text>
        No payment, delivery or chat is arranged through this prototype.
      </Text>
    </View>
  );
}
