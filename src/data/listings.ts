import type { ImageSourcePropType } from "react-native";

export type ListingType = "Sale" | "Exchange" | "Donation";
export type ListingStatus = "available" | "reserved" | "completed";

export type NewListing = {
  title: string;
  description: string;
  size: string;
  category: string;
  condition: string;
  type: ListingType;
  price?: number;
  photo: ImageSourcePropType;
};

export type Listing = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  size: string;
  category: string;
  condition: string;
  type: ListingType;
  price?: number;
  photo: ImageSourcePropType;
  status: ListingStatus;
};

export const sampleListings: Listing[] = [
  {
    id: "1",
    ownerId: "mariam",
    title: "Linen shirt",
    description: "A comfortable shirt, lightly worn and freshly washed.",
    size: "M",
    category: "Tops",
    condition: "Good",
    type: "Sale",
    price: 250,
    photo: require("../../assets/images/listings/linen-shirt.jpg"),
    status: "available",
  },
  {
    id: "2",
    ownerId: "omar",
    title: "Denim jacket",
    description:
      "A classic denim jacket. Looking to exchange for an overshirt.",
    size: "L",
    category: "Outerwear",
    condition: "Good",
    type: "Exchange",
    photo: require("../../assets/images/listings/denim-jacket.jpg"),
    status: "available",
  },
  {
    id: "3",
    ownerId: "mariam",
    title: "Cotton top",
    description: "A soft cotton top, ready for a new home.",
    size: "S",
    category: "Tops",
    condition: "Like new",
    type: "Donation",
    photo: require("../../assets/images/listings/cotton-top.jpg"),
    status: "available",
  },
];
