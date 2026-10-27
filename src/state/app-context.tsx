import { createContext, useContext, useState, type ReactNode } from "react";

import {
  sampleListings,
  type Listing,
  type NewListing,
} from "../data/listings";
import type { ClothingRequest } from "../data/requests";
import { sampleUsers, type User } from "../data/users";

type AppState = {
  users: User[];
  currentUserId: string;
  listings: Listing[];
  requests: ClothingRequest[];
};

type AppContextValue = {
  state: AppState;
  switchUser: (userId: string) => void;
  addListing: (input: NewListing) => void;
  sendRequest: (listingId: string, offerDescription: string) => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    users: sampleUsers,
    currentUserId: "omar",
    listings: sampleListings,
    requests: [],
  });

  function switchUser(userId: string) {
    setState((current) => {
      if (!current.users.some((user) => user.id === userId)) {
        return current;
      }

      return { ...current, currentUserId: userId };
    });
  }

  function addListing(input: NewListing) {
    if (
      !input.title.trim() ||
      !input.description.trim() ||
      !input.size.trim() ||
      !input.category.trim() ||
      !input.condition.trim() ||
      !input.photo
    ) {
      return;
    }

    if (
      input.type === "Sale" &&
      (!Number.isFinite(input.price) || (input.price ?? 0) <= 0)
    ) {
      return;
    }

    const id = String(Date.now());

    setState((current) => {
      const listing: Listing = {
        ...input,
        title: input.title.trim(),
        description: input.description.trim(),
        price: input.type === "Sale" ? input.price : undefined,
        id,
        ownerId: current.currentUserId,
        status: "available",
      };

      return {
        ...current,
        listings: [listing, ...current.listings],
      };
    });
  }

  function sendRequest(listingId: string, offerDescription: string) {
    const id = String(Date.now());

    setState((current) => {
      const listing = current.listings.find((item) => item.id === listingId);

      if (
        !listing ||
        listing.ownerId === current.currentUserId ||
        listing.status !== "available"
      ) {
        return current;
      }

      if (listing.type === "Exchange" && !offerDescription.trim()) {
        return current;
      }

      const existing = current.requests.some(
        (request) =>
          request.listingId === listingId &&
          request.requesterId === current.currentUserId &&
          request.status !== "rejected",
      );

      if (existing) return current;

      const request: ClothingRequest = {
        id,
        listingId,
        requesterId: current.currentUserId,
        type: listing.type,
        offerDescription:
          listing.type === "Exchange" ? offerDescription.trim() : undefined,
        status: "pending",
      };

      return {
        ...current,
        requests: [request, ...current.requests],
      };
    });
  }

  // Only the listing owner can accept, only while the request is pending and
  // the listing is still available. The request and the listing change in the
  // same state update. Competing requests are left untouched.
  function acceptRequest(requestId: string) {
    setState((current) => {
      const request = current.requests.find((item) => item.id === requestId);

      if (!request || request.status !== "pending") return current;

      const listing = current.listings.find(
        (item) => item.id === request.listingId,
      );

      if (
        !listing ||
        listing.ownerId !== current.currentUserId ||
        listing.status !== "available"
      ) {
        return current;
      }

      return {
        ...current,
        requests: current.requests.map((item) =>
          item.id === requestId ? { ...item, status: "accepted" } : item,
        ),
        listings: current.listings.map((item) =>
          item.id === listing.id ? { ...item, status: "reserved" } : item,
        ),
      };
    });
  }

  function rejectRequest(requestId: string) {
    setState((current) => {
      const request = current.requests.find((item) => item.id === requestId);

      if (!request || request.status !== "pending") return current;

      const listing = current.listings.find(
        (item) => item.id === request.listingId,
      );

      if (!listing || listing.ownerId !== current.currentUserId) {
        return current;
      }

      return {
        ...current,
        requests: current.requests.map((item) =>
          item.id === requestId ? { ...item, status: "rejected" } : item,
        ),
      };
    });
  }

  return (
    <AppContext.Provider
      value={{
        state,
        switchUser,
        addListing,
        sendRequest,
        acceptRequest,
        rejectRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return value;
}
