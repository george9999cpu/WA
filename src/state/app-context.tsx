import { createContext, useContext, useState, type ReactNode } from "react";

import {
  sampleListings,
  type Listing,
  type NewListing,
} from "../data/listings";

type AppContextValue = {
  listings: Listing[];
  addListing: (input: NewListing) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(sampleListings);

  function addListing(input: NewListing) {
    const listing: Listing = {
      ...input,
      id: String(Date.now()),
    };

    setListings((current) => [listing, ...current]);
  }

  return (
    <AppContext.Provider value={{ listings, addListing }}>
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
