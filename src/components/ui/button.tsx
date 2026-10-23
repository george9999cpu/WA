import { Pressable, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export function Button({ label, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center rounded-xl bg-green-900 px-5 py-3 active:opacity-70"
    >
      <Text className="text-base font-semibold text-white">{label}</Text>
    </Pressable>
  );
}
