import { createContext, useContext, useState, type ReactNode } from "react";

import {
  sampleListings,
  type Listing,
  type ListingStatus,
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
  addListing: (input: NewListing) => boolean;
  updateListing: (listingId: string, input: NewListing) => boolean;
  deleteListing: (listingId: string) => boolean;
  updateListingStatus: (listingId: string, status: ListingStatus) => boolean;
  sendRequest: (listingId: string, offerDescription: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function isValidListing(input: NewListing) {
  if (
    !input.title.trim() ||
    !input.description.trim() ||
    !input.size.trim() ||
    !input.category.trim() ||
    !input.condition.trim() ||
    !input.photo
  ) {
    return false;
  }

  if (
    input.type === "Sale" &&
    (!Number.isFinite(input.price) || (input.price ?? 0) <= 0)
  ) {
    return false;
  }

  return true;
}

// Owners may reserve an available listing, release a reserved one, or
// complete a reserved one. Completed listings stay completed.
function canChangeStatus(from: ListingStatus, to: ListingStatus) {
  if (from === "available") return to === "reserved";
  if (from === "reserved") return to === "available" || to === "completed";
  return false;
}

function canEditListing(state: AppState, listingId: string, input: NewListing) {
  const listing = state.listings.find((item) => item.id === listingId);

  if (
    !listing ||
    listing.ownerId !== state.currentUserId ||
    listing.status === "completed"
  ) {
    return false;
  }

  const hasRequests = state.requests.some(
    (request) => request.listingId === listingId,
  );

  // Requests copy the listing type, so it is locked once requests exist.
  return !(hasRequests && input.type !== listing.type);
}

function canDeleteListing(state: AppState, listingId: string) {
  return state.listings.some(
    (item) => item.id === listingId && item.ownerId === state.currentUserId,
  );
}

function canUpdateStatus(
  state: AppState,
  listingId: string,
  status: ListingStatus,
) {
  const listing = state.listings.find((item) => item.id === listingId);

  return (
    !!listing &&
    listing.ownerId === state.currentUserId &&
    canChangeStatus(listing.status, status)
  );
}

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
    if (!isValidListing(input)) {
      return false;
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

    return true;
  }

  function updateListing(listingId: string, input: NewListing) {
    if (!isValidListing(input) || !canEditListing(state, listingId, input)) {
      return false;
    }

    setState((current) => {
      if (!canEditListing(current, listingId, input)) {
        return current;
      }

      return {
        ...current,
        listings: current.listings.map((listing) =>
          listing.id === listingId
            ? {
                ...listing,
                ...input,
                title: input.title.trim(),
                description: input.description.trim(),
                price: input.type === "Sale" ? input.price : undefined,
              }
            : listing,
        ),
      };
    });

    return true;
  }

  function deleteListing(listingId: string) {
    if (!canDeleteListing(state, listingId)) {
      return false;
    }

    setState((current) => {
      if (!canDeleteListing(current, listingId)) {
        return current;
      }

      // Requests for a deleted listing are removed with it.
      return {
        ...current,
        listings: current.listings.filter(
          (listing) => listing.id !== listingId,
        ),
        requests: current.requests.filter(
          (request) => request.listingId !== listingId,
        ),
      };
    });

    return true;
  }

  function updateListingStatus(listingId: string, status: ListingStatus) {
    if (!canUpdateStatus(state, listingId, status)) {
      return false;
    }

    setState((current) => {
      if (!canUpdateStatus(current, listingId, status)) {
        return current;
      }

      return {
        ...current,
        listings: current.listings.map((listing) =>
          listing.id === listingId ? { ...listing, status } : listing,
        ),
      };
    });

    return true;
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

  return (
    <AppContext.Provider
      value={{
        state,
        switchUser,
        addListing,
        updateListing,
        deleteListing,
        updateListingStatus,
        sendRequest,
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
