import { Pressable, Text, View } from "react-native";

type ChoiceGroupProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: ChoiceGroupProps) {
  return (
    <View className="gap-2">
      <Text className="font-semibold text-green-900">{label}</Text>

      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityLabel={`${label}: ${option}`}
            aria-checked={value === option}
            onPress={() => onChange(option)}
            className={`rounded-xl border px-4 py-3 ${
              value === option
                ? "border-green-900 bg-green-900"
                : "border-green-200 bg-white"
            }`}
          >
            <Text
              className={value === option ? "text-white" : "text-green-900"}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
