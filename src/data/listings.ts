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

export const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
export const categoryOptions = [
  "Tops",
  "Bottoms",
  "Outerwear",
  "Dresses",
  "Other",
];
export const conditionOptions = ["New", "Like new", "Good", "Fair"];
export const typeOptions: ListingType[] = ["Sale", "Exchange", "Donation"];

export type SamplePhoto = {
  label: string;
  source: ImageSourcePropType;
};

export const samplePhotos: SamplePhoto[] = [
  {
    label: "Linen shirt",
    source: require("../../assets/images/listings/linen-shirt.jpg"),
  },
  {
    label: "Denim jacket",
    source: require("../../assets/images/listings/denim-jacket.jpg"),
  },
  {
    label: "Cotton top",
    source: require("../../assets/images/listings/cotton-top.jpg"),
  },
  {
    label: "Summer dress",
    source: require("../../assets/images/listings/summer-dress.jpg"),
  },
  {
    label: "Winter coat",
    source: require("../../assets/images/listings/winter-coat.jpg"),
  },
];

export function getCompletionLabel(type: ListingType) {
  if (type === "Sale") return "sold";
  if (type === "Exchange") return "exchanged";
  return "donated";
}

export function getStatusLabel(listing: Listing) {
  return listing.status === "completed"
    ? getCompletionLabel(listing.type)
    : listing.status;
}

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
    photo: samplePhotos[0].source,
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
    photo: samplePhotos[1].source,
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
    photo: samplePhotos[2].source,
    status: "available",
  },
];
