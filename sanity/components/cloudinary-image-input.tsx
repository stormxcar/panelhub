/* eslint-disable @next/next/no-img-element */
import { Card, Stack, Text, TextInput } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";

export function CloudinaryImageInput(props: StringInputProps) {
  const value = (props.value as string) || "";
  return <Stack space={3}><TextInput value={value} onChange={(event) => props.onChange(set(event.currentTarget.value))} placeholder="https://res.cloudinary.com/..." />{value ? <Card border radius={2} overflow="hidden"><img src={value} alt="Ảnh Cloudinary hiện tại" style={{ display: "block", width: "100%", height: "auto" }} /></Card> : <Text size={1}>Dán URL ảnh Cloudinary để xem preview hiện tại.</Text>}</Stack>;
}
