export type ListingType = "Sale" | "Exchange" | "Donation";

export type NewListing = {
  title: string;
  size: string;
  type: ListingType;
  price: number;
};

export type Listing = {
  id: string;
  title: string;
  size: string;
  type: ListingType;
  price: number;
};

export const sampleListings: Listing[] = [
  {
    id: "1",
    title: "Linen shirt",
    size: "M",
    type: "Sale",
    price: 250,
  },
  {
    id: "2",
    title: "Denim jacket",
    size: "L",
    type: "Exchange",
    price: 0,
  },
  {
    id: "3",
    title: "Cotton top",
    size: "S",
    type: "Donation",
    price: 0,
  },
];
