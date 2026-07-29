import { Card, Stack, Text, TextInput } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";
import { useState } from "react";

export function CloudinaryVideoInput(props: StringInputProps) {
  const [status, setStatus] = useState("");
  const upload = async (file?: File) => {
    if (!file) return;
    setStatus("Đang tải video lên Cloudinary…");
    const signatureResponse = await fetch("https://www.panedninhthuan.online/api/cloudinary/sign", { method: "POST" });
    if (!signatureResponse.ok) { setStatus("Không thể lấy quyền upload."); return; }
    const { cloudName, apiKey, folder, timestamp, signature } = await signatureResponse.json();
    const form = new FormData(); form.append("file", file); form.append("api_key", apiKey); form.append("timestamp", String(timestamp)); form.append("signature", signature); form.append("folder", folder);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, { method: "POST", body: form });
    if (!response.ok) { setStatus("Upload video thất bại."); return; }
    const result = await response.json(); props.onChange(set(result.secure_url)); setStatus("Đã upload video thành công.");
  };
  return <Stack space={3}><TextInput value={(props.value as string) || ""} onChange={(event) => props.onChange(set(event.currentTarget.value))} placeholder="URL video Cloudinary" /><Card padding={3} border radius={2}><input type="file" accept="video/*" onChange={(event) => upload(event.target.files?.[0])} /><Text size={1}>{status || "Chọn video để upload lên Cloudinary, hoặc dán URL có sẵn."}</Text></Card>{props.value ? <video controls style={{ width: "100%" }} src={props.value as string} /> : null}</Stack>;
}
