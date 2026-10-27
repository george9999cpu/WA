import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { useApp } from "@/state/app-context";
import { requestTypeLabel } from "./request-card";

export default function RequestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, acceptRequest, rejectRequest } = useApp();

  const request = state.requests.find((item) => item.id === id);
  const listing = state.listings.find((item) => item.id === request?.listingId);

  const isRequester = request?.requesterId === state.currentUserId;
  const isOwner = listing?.ownerId === state.currentUserId;

  if (!request || !listing || (!isRequester && !isOwner)) {
    return (
      <ScrollView
        className="flex-1 bg-green-50"
        contentContainerStyle={{ padding: 20, gap: 16 }}
      >
        <DemoUserSwitcher />
        <Text>
          Request not found, or it belongs to other users. Switch to the right
          demo user to view it.
        </Text>
      </ScrollView>
    );
  }

  const owner = state.users.find((user) => user.id === listing.ownerId);
  const requester = state.users.find((user) => user.id === request.requesterId);

  const canDecide = isOwner && request.status === "pending";
  const canAccept = canDecide && listing.status === "available";

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      contentContainerStyle={{ padding: 20, gap: 16 }}
    >
      <DemoUserSwitcher />

      <Image
        source={listing.photo}
        accessibilityLabel={listing.title}
        resizeMode="cover"
        style={{ width: "100%", height: 200 }}
        className="rounded-2xl"
      />

      <Text className="text-3xl font-bold text-green-900">{listing.title}</Text>

      <View className="gap-1 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-green-900">
          {requestTypeLabel(request.type)}
        </Text>
        <Text className="font-semibold capitalize">
          Status: {request.status}
        </Text>
        <Text>
          Listing: {listing.type} · <Text className="capitalize">{listing.status}</Text>
        </Text>
        {listing.type === "Sale" ? <Text>Price: EGP {listing.price}</Text> : null}
        {request.type === "Exchange" ? (
          <Text>Offered in exchange: {request.offerDescription}</Text>
        ) : null}
      </View>

      <View className="gap-1 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-green-900">
          Requester: {requester?.name}
        </Text>
        <Text>{requester?.location}</Text>
      </View>

      <View className="gap-1 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-green-900">
          Owner: {owner?.name}
        </Text>
        <Text>{owner?.location}</Text>
      </View>

      {canDecide ? (
        <View className="gap-3">
          {!canAccept ? (
            <Text accessibilityRole="alert" className="text-red-700">
              This listing is {listing.status}, so this request cannot be
              accepted. You can still reject it.
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canAccept }}
            disabled={!canAccept}
            onPress={() => acceptRequest(request.id)}
            className={`items-center rounded-xl bg-green-900 p-4 ${
              canAccept ? "active:opacity-70" : "opacity-40"
            }`}
          >
            <Text className="font-semibold text-white">Accept request</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => rejectRequest(request.id)}
            className="items-center rounded-xl border border-green-900 bg-white p-4 active:opacity-70"
          >
            <Text className="font-semibold text-green-900">Reject request</Text>
          </Pressable>
        </View>
      ) : null}

      {isOwner && !canDecide ? (
        <Text>This request has already been {request.status}.</Text>
      ) : null}

      {isRequester && request.status === "pending" ? (
        <Text>Waiting for the owner to respond.</Text>
      ) : null}

      <Text>
        No payment, delivery or chat is arranged through this prototype.
      </Text>
    </ScrollView>
  );
}
