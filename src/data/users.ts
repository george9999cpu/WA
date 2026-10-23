export type User = {
  id: string;
  name: string;
  location: string;
  bio: string;
};

export const sampleUsers: User[] = [
  {
    id: "mariam",
    name: "Mariam",
    location: "Cairo",
    bio: "Giving clothes a second life.",
  },
  {
    id: "omar",
    name: "Omar",
    location: "Giza",
    bio: "Here to buy, swap and share clothes.",
  },
  {
    id: "nour",
    name: "Nour",
    location: "Alexandria",
    bio: "Making room in my wardrobe.",
  },
];
