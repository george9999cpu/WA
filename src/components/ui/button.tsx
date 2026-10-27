import { Pressable, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

const containerStyles = {
  primary: "bg-green-900",
  secondary: "border border-green-900 bg-white",
  danger: "bg-red-700",
};

const labelStyles = {
  primary: "text-white",
  secondary: "text-green-900",
  danger: "text-white",
};

export function Button({
  label,
  onPress,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`items-center rounded-xl px-5 py-3 ${containerStyles[variant]} ${
        disabled ? "opacity-40" : "active:opacity-70"
      }`}
    >
      <Text className={`text-base font-semibold ${labelStyles[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}
