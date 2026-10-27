import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { DemoUserSwitcher } from "@/components/demo-user-switcher";
import { ChoiceGroup } from "@/components/ui/choice-group";
import { useApp } from "@/state/app-context";
import { RequestCard } from "./request-card";

const MY_REQUESTS = "My requests";
const INCOMING_REQUESTS = "Incoming requests";

export default function RequestsScreen() {
  const { state } = useApp();
  const [view, setView] = useState(MY_REQUESTS);

  const myRequests = state.requests.filter(
    (request) => request.requesterId === state.currentUserId,
  );

  // Incoming requests are the requests for listings owned by the current user.
  const incomingRequests = state.requests.filter((request) => {
    const listing = state.listings.find((item) => item.id === request.listingId);
    return listing?.ownerId === state.currentUserId;
  });

  const showingMine = view === MY_REQUESTS;
  const data = showingMine ? myRequests : incomingRequests;

  function nameOf(userId: string | undefined) {
    return state.users.find((user) => user.id === userId)?.name ?? "Unknown";
  }

  return (
    <View className="flex-1 bg-green-50 p-5">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-5 gap-3">
            <DemoUserSwitcher />

            <ChoiceGroup
              label="Requests"
              options={[MY_REQUESTS, INCOMING_REQUESTS]}
              value={view}
              onChange={setView}
            />
          </View>
        }
        renderItem={({ item }) => {
          const listing = state.listings.find(
            (entry) => entry.id === item.listingId,
          );

          return (
            <RequestCard
              request={item}
              listing={listing}
              otherPersonLabel={
                showingMine
                  ? `Owner: ${nameOf(listing?.ownerId)}`
                  : `Requested by: ${nameOf(item.requesterId)}`
              }
            />
          );
        }}
        ListEmptyComponent={
          <Text>
            {showingMine
              ? "You have not sent any requests yet. Browse listings to send one."
              : "No one has sent a request for your listings yet."}
          </Text>
        }
      />
    </View>
  );
}
