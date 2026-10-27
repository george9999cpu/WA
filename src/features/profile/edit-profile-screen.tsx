import { router } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { useApp } from "@/state/app-context";
import { Avatar } from "./avatar";
import { OutlineButton } from "./outline-button";

const BIO_MAX_LENGTH = 120;

export default function EditProfileScreen() {
  const { state } = useApp();
  const user = state.users.find((item) => item.id === state.currentUserId);

  if (!user) {
    return (
      <View className="flex-1 bg-green-50 p-5">
        <Text>Profile not found.</Text>
      </View>
    );
  }

  return (
    <ProfileForm
      key={user.id}
      initialName={user.name}
      initialLocation={user.location}
      initialBio={user.bio}
    />
  );
}

type ProfileFormProps = {
  initialName: string;
  initialLocation: string;
  initialBio: string;
};

function ProfileForm({
  initialName,
  initialLocation,
  initialBio,
}: ProfileFormProps) {
  const { updateProfile } = useApp();
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [bio, setBio] = useState(initialBio);
  const [error, setError] = useState("");
  const nameRef = useRef<TextInput>(null);
  const locationRef = useRef<TextInput>(null);

  function save() {
    if (!name.trim()) {
      setError("Name is required.");
      nameRef.current?.focus();
      return;
    }

    if (!location.trim()) {
      setError("Location is required.");
      locationRef.current?.focus();
      return;
    }

    updateProfile({ name, location, bio });
    setError("");
    router.back();
  }

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      contentContainerStyle={{ padding: 20, gap: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center gap-2 rounded-2xl bg-white p-5">
        <Avatar name={name} size={96} />
        <Text className="text-sm">
          Your picture uses your initials. Photo upload is not available.
        </Text>
      </View>

      <View className="gap-2">
        <Text className="font-semibold text-green-900">Name</Text>
        <TextInput
          ref={nameRef}
          accessibilityLabel="Name"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          className="rounded-xl border border-green-200 bg-white p-3"
        />
      </View>

      <View className="gap-2">
        <Text className="font-semibold text-green-900">Location</Text>
        <TextInput
          ref={locationRef}
          accessibilityLabel="Location"
          placeholder="City"
          value={location}
          onChangeText={setLocation}
          className="rounded-xl border border-green-200 bg-white p-3"
        />
      </View>

      <View className="gap-2">
        <Text className="font-semibold text-green-900">Bio</Text>
        <TextInput
          accessibilityLabel="Bio"
          placeholder="Tell others a little about yourself"
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={BIO_MAX_LENGTH}
          className="rounded-xl border border-green-200 bg-white p-3"
        />
        <Text className="text-right text-sm">
          {bio.length}/{BIO_MAX_LENGTH}
        </Text>
      </View>

      {error ? (
        <Text accessibilityRole="alert" className="text-red-700">
          {error}
        </Text>
      ) : null}

      <Button label="Save profile" onPress={save} />
      <OutlineButton label="Cancel" onPress={() => router.back()} />
    </ScrollView>
  );
}
