import { Text, View } from "react-native";

import type { Listing } from "../../data/listings";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <View className="mb-4 gap-2 rounded-2xl bg-white p-4">
      <Text className="text-xl font-semibold text-green-900">
        {listing.title}
      </Text>

      <Text>Size: {listing.size}</Text>
      <Text>{listing.type}</Text>

      {listing.type === "Sale" ? (
        <Text className="font-semibold text-green-900">
          EGP {listing.price}
        </Text>
      ) : (
        <Text>
          {listing.type === "Donation"
            ? "Free to a new home"
            : "Open to an exchange"}
        </Text>
      )}
    </View>
  );
}
