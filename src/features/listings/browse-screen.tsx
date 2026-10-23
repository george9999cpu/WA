import { FlatList, Text, View } from "react-native";

const listings = [
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
];

export default function BrowseScreen() {
  return (
    <View className="flex-1 bg-green-50 p-5">
      <Text className="mb-2 text-3xl font-bold text-green-900">Wear Again</Text>

      <Text className="mb-5 text-base text-green-800">
        Give clothes a second life.
      </Text>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 gap-2 rounded-2xl bg-white p-4">
            <Text className="text-xl font-semibold text-green-900">
              {item.title}
            </Text>

            <Text>Size: {item.size}</Text>
            <Text>{item.type}</Text>

            {item.type === "Sale" ? (
              <Text className="font-semibold text-green-900">
                EGP {item.price}
              </Text>
            ) : (
              <Text>Open to an exchange</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
