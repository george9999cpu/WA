import { Pressable, Text } from "react-native";

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
};

export function OutlineButton({ label, onPress }: OutlineButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="items-center rounded-xl border border-green-900 bg-white px-5 py-3 active:opacity-70"
    >
      <Text className="text-base font-semibold text-green-900">{label}</Text>
    </Pressable>
  );
}
