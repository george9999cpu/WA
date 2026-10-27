import { useRef, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { ChoiceGroup } from "@/components/ui/choice-group";
import {
  categoryOptions,
  conditionOptions,
  samplePhotos,
  sizeOptions,
  typeOptions,
  type Listing,
  type ListingType,
  type NewListing,
} from "@/data/listings";

type ListingFormProps = {
  initialListing?: Listing;
  submitLabel: string;
  typeLocked?: boolean;
  onSubmit: (input: NewListing) => boolean;
};

function findPhotoIndex(listing?: Listing) {
  if (!listing) return 0;

  const index = samplePhotos.findIndex(
    (photo) => photo.source === listing.photo,
  );

  return index === -1 ? 0 : index;
}

export function ListingForm({
  initialListing,
  submitLabel,
  typeLocked = false,
  onSubmit,
}: ListingFormProps) {
  const [title, setTitle] = useState(initialListing?.title ?? "");
  const [description, setDescription] = useState(
    initialListing?.description ?? "",
  );
  const [size, setSize] = useState(initialListing?.size ?? "");
  const [category, setCategory] = useState(initialListing?.category ?? "");
  const [condition, setCondition] = useState(initialListing?.condition ?? "");
  const [type, setType] = useState<ListingType>(
    initialListing?.type ?? "Sale",
  );
  const [price, setPrice] = useState(
    initialListing?.price !== undefined ? String(initialListing.price) : "",
  );
  const [photoIndex, setPhotoIndex] = useState(findPhotoIndex(initialListing));
  const [error, setError] = useState("");

  const titleRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  function changeType(value: string) {
    if (typeLocked) return;
    setType(value as ListingType);
  }

  function submit() {
    if (!title.trim()) {
      setError("Enter a title.");
      titleRef.current?.focus();
      return;
    }

    if (!description.trim()) {
      setError("Enter a description.");
      descriptionRef.current?.focus();
      return;
    }

    if (!size || !category || !condition) {
      setError("Choose a size, category and condition.");
      return;
    }

    const priceNumber = Number(price.trim());

    if (
      type === "Sale" &&
      (!price.trim() || !Number.isFinite(priceNumber) || priceNumber <= 0)
    ) {
      setError("Sale listings need a price above 0 EGP.");
      priceRef.current?.focus();
      return;
    }

    const saved = onSubmit({
      title,
      description,
      size,
      category,
      condition,
      type,
      price: type === "Sale" ? priceNumber : undefined,
      photo: samplePhotos[photoIndex].source,
    });

    setError(saved ? "" : "This listing could not be saved.");
  }

  return (
    <View className="gap-4">
      <Image
        source={samplePhotos[photoIndex].source}
        accessibilityLabel={`Selected photo: ${samplePhotos[photoIndex].label}`}
        resizeMode="cover"
        style={{ width: "100%", height: 200 }}
        className="rounded-2xl"
      />

      <View className="gap-2">
        <Text className="font-semibold text-green-900">
          Sample photo (choose one)
        </Text>
        <Text>
          Photo upload is not part of this prototype. Pick the sample photo
          that best matches your item.
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {samplePhotos.map((photo, index) => (
            <Pressable
              key={photo.label}
              accessibilityRole="radio"
              accessibilityLabel={`Sample photo: ${photo.label}`}
              aria-checked={index === photoIndex}
              onPress={() => setPhotoIndex(index)}
              className={`items-center gap-1 rounded-xl border p-2 ${
                index === photoIndex
                  ? "border-green-900 bg-green-100"
                  : "border-green-200 bg-white"
              }`}
            >
              <Image
                source={photo.source}
                resizeMode="cover"
                style={{ width: 56, height: 56 }}
                className="rounded-lg"
              />
              <Text className="text-xs text-green-900">{photo.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text className="font-semibold text-green-900">Title</Text>
      <TextInput
        ref={titleRef}
        accessibilityLabel="Title"
        placeholder="For example: Linen shirt"
        value={title}
        onChangeText={setTitle}
        className="rounded-xl border border-green-200 bg-white p-3"
      />

      <Text className="font-semibold text-green-900">Description</Text>
      <TextInput
        ref={descriptionRef}
        accessibilityLabel="Description"
        placeholder="Describe the item, its fit and any wear"
        value={description}
        onChangeText={setDescription}
        multiline
        className="min-h-20 rounded-xl border border-green-200 bg-white p-3"
      />

      <ChoiceGroup
        label="Size"
        options={sizeOptions}
        value={size}
        onChange={setSize}
      />

      <ChoiceGroup
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={setCategory}
      />

      <ChoiceGroup
        label="Condition"
        options={conditionOptions}
        value={condition}
        onChange={setCondition}
      />

      <ChoiceGroup
        label="Listing type"
        options={typeLocked ? [type] : typeOptions}
        value={type}
        onChange={changeType}
      />

      {typeLocked ? (
        <Text>
          The listing type cannot change because this listing already has
          requests.
        </Text>
      ) : null}

      {type === "Sale" ? (
        <>
          <Text className="font-semibold text-green-900">Price (EGP)</Text>
          <TextInput
            ref={priceRef}
            accessibilityLabel="Price in EGP"
            placeholder="For example: 250"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
            className="rounded-xl border border-green-200 bg-white p-3"
          />
        </>
      ) : null}

      {error ? (
        <Text accessibilityRole="alert" className="text-red-700">
          {error}
        </Text>
      ) : null}

      <Button label={submitLabel} onPress={submit} />
    </View>
  );
}
