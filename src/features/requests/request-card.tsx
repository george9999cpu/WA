import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { Listing } from "@/data/listings";
import type { ClothingRequest } from "@/data/requests";

type RequestCardProps = {
  request: ClothingRequest;
  listing: Listing | undefined;
  // The other person in the request: the owner or the requester.
  otherPersonLabel: string;
};

export function requestTypeLabel(type: ClothingRequest["type"]) {
  if (type === "Sale") return "Purchase request";
  if (type === "Donation") return "Donation request";
  return "Exchange request";
}

export function RequestCard({
  request,
  listing,
  otherPersonLabel,
}: RequestCardProps) {
  return (
    <Link
      href={{
        pathname: "/requests/[id]",
        params: { id: request.id },
      }}
      asChild
    >
      <Pressable
        accessibilityLabel={`View request for ${listing?.title ?? "removed listing"}`}
        className="mb-4 gap-1 rounded-2xl bg-white p-4 active:opacity-70"
      >
        <Text className="text-xl font-semibold text-green-900">
          {listing?.title ?? "Listing no longer available"}
        </Text>

        <Text>{requestTypeLabel(request.type)}</Text>
        <Text>{otherPersonLabel}</Text>

        <View className="flex-row">
          <Text className="font-semibold capitalize text-green-900">
            {request.status}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
