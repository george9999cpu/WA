import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import type { Listing } from "@/data/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={{
        pathname: "/items/[id]",
        params: { id: listing.id },
      }}
      asChild
    >
      <Pressable
        accessibilityLabel={`View ${listing.title}`}
        className="mb-4 gap-2 rounded-2xl bg-white p-4 active:opacity-70"
      >
        <Image
          source={listing.photo}
          accessibilityLabel={listing.title}
          resizeMode="cover"
          style={{ width: "100%", height: 180 }}
          className="rounded-xl"
        />

        <Text className="text-xl font-semibold text-green-900">
          {listing.title}
        </Text>

        <Text>
          {listing.size} · {listing.category} · {listing.condition}
        </Text>

        <View className="flex-row flex-wrap gap-3">
          <Text className="font-semibold text-green-900">{listing.type}</Text>
          <Text className="capitalize">{listing.status}</Text>
        </View>

        <Text className="font-semibold text-green-900">
          {listing.type === "Sale"
            ? `EGP ${listing.price}`
            : listing.type === "Donation"
              ? "Free to a new home"
              : "Open to an exchange"}
        </Text>
      </Pressable>
    </Link>
  );
}
