import type { ListingType } from "./listings";

export type ClothingRequest = {
  id: string;
  listingId: string;
  requesterId: string;
  type: ListingType;
  offerDescription?: string;
  status: "pending" | "accepted" | "rejected";
};
