import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { completionLabel, type Listing } from "@/data/listings";

export function CompletedListingCard({ listing }: { listing: Listing }) {
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
        className="mb-4 flex-row gap-3 rounded-2xl bg-white p-3 active:opacity-70"
      >
        <Image
          source={listing.photo}
          accessibilityLabel={listing.title}
          resizeMode="cover"
          style={{ width: 88, height: 88 }}
          className="rounded-xl"
        />

        <View className="flex-1 gap-1">
          <View className="flex-row items-start justify-between gap-2">
            <Text className="flex-1 text-lg font-semibold text-green-900">
              {listing.title}
            </Text>

            <View className="rounded-full bg-green-100 px-3 py-1">
              <Text className="text-sm font-semibold text-green-900">
                {completionLabel(listing.type)}
              </Text>
            </View>
          </View>

          <Text>
            {listing.size} · {listing.category} · {listing.condition}
          </Text>

          <Text className="font-semibold text-green-900">
            {listing.type === "Sale" ? `EGP ${listing.price}` : listing.type}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
