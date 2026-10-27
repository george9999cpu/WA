import { Text, View } from "react-native";

type AvatarProps = {
  name: string;
  size?: number;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export function Avatar({ name, size = 88 }: AvatarProps) {
  return (
    <View
      accessibilityLabel={`${name} profile picture`}
      className="items-center justify-center rounded-full border-4 border-green-200 bg-green-900"
      style={{ width: size, height: size }}
    >
      <Text
        className="font-bold text-white"
        style={{ fontSize: size * 0.38 }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}
