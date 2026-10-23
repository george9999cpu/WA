import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { ChoiceGroup } from "@/components/ui/choice-group";
import { useApp } from "@/state/app-context";
import { ListingCard } from "./listings-card";

export default function SearchScreen() {
  const { state } = useApp();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState("All");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const hasPriceRange = minPrice.trim() !== "" || maxPrice.trim() !== "";
  const min = minPrice.trim() ? Number(minPrice) : 0;
  const max = maxPrice.trim() ? Number(maxPrice) : Infinity;

  const invalidRange =
    !Number.isFinite(min) ||
    min < 0 ||
    (maxPrice.trim() !== "" && !Number.isFinite(max)) ||
    max < 0 ||
    min > max;

  const results = useMemo(
    () =>
      state.listings.filter((listing) => {
        const matchesKeyword = `${listing.title} ${listing.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

        return (
          matchesKeyword &&
          (size === "All" || listing.size === size) &&
          (category === "All" || listing.category === category) &&
          (type === "All" || listing.type === type) &&
          !invalidRange &&
          (!hasPriceRange ||
            (listing.type === "Sale" &&
              (listing.price ?? 0) >= min &&
              (listing.price ?? 0) <= max))
        );
      }),
    [
      state.listings,
      query,
      size,
      category,
      type,
      invalidRange,
      hasPriceRange,
      min,
      max,
    ],
  );

  function clearFilters() {
    setQuery("");
    setSize("All");
    setCategory("All");
    setType("All");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <View className="flex-1 bg-green-50 p-5">
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View className="mb-5 gap-4">
            <Text className="text-2xl font-bold text-green-900">
              Search & filters
            </Text>

            <TextInput
              accessibilityLabel="Search clothes"
              placeholder="Search clothes"
              value={query}
              onChangeText={setQuery}
              className="rounded-xl border border-green-200 bg-white p-3"
            />

            <ChoiceGroup
              label="Size"
              options={["All", "XS", "S", "M", "L", "XL", "XXL"]}
              value={size}
              onChange={setSize}
            />

            <ChoiceGroup
              label="Category"
              options={[
                "All",
                "Tops",
                "Bottoms",
                "Outerwear",
                "Dresses",
                "Other",
              ]}
              value={category}
              onChange={setCategory}
            />

            <ChoiceGroup
              label="Listing type"
              options={["All", "Sale", "Exchange", "Donation"]}
              value={type}
              onChange={setType}
            />

            <Text>
              Entering a price range shows sale listings only. Prices are in
              EGP.
            </Text>

            <TextInput
              accessibilityLabel="Minimum price"
              placeholder="Minimum price"
              keyboardType="decimal-pad"
              value={minPrice}
              onChangeText={setMinPrice}
              className="rounded-xl border border-green-200 bg-white p-3"
            />

            <TextInput
              accessibilityLabel="Maximum price"
              placeholder="Maximum price"
              keyboardType="decimal-pad"
              value={maxPrice}
              onChangeText={setMaxPrice}
              className="rounded-xl border border-green-200 bg-white p-3"
            />

            {invalidRange ? (
              <Text accessibilityRole="alert" className="text-red-700">
                Enter a valid range with the minimum no higher than the maximum.
              </Text>
            ) : null}

            <Button label="Clear filters" onPress={clearFilters} />

            <Text className="font-semibold">
              {results.length} matching listings
            </Text>
          </View>
        }
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListEmptyComponent={
          <Text>No matches. Try another search or clear the filters.</Text>
        }
      />
    </View>
  );
}
