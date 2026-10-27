import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text } from "react-native";

import type { NewListing } from "@/data/listings";
import { useApp } from "@/state/app-context";
import { ListingForm } from "./listing-form";

export default function CreateListingScreen() {
  const { state, addListing } = useApp();
  const [formKey, setFormKey] = useState(0);
  const currentUser = state.users.find(
    (user) => user.id === state.currentUserId,
  );

  function handleCreate(input: NewListing) {
    const created = addListing(input);

    if (created) {
      setFormKey((key) => key + 1);
      router.push("/my-listings");
    }

    return created;
  }

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      contentContainerStyle={{ padding: 20, gap: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold text-green-900">Create listing</Text>
      <Text>
        Listing as {currentUser?.name}. New listings start as available.
      </Text>

      <ListingForm
        key={`${state.currentUserId}-${formKey}`}
        submitLabel="Publish listing"
        onSubmit={handleCreate}
      />
    </ScrollView>
  );
}
