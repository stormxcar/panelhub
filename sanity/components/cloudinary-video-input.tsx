import { Card, Stack, Text, TextInput } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";
import { useState } from "react";

const maxVideoBytes = 50 * 1024 * 1024;
const allowedVideoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export function CloudinaryVideoInput(props: StringInputProps) {
  const [status, setStatus] = useState("");
  const upload = async (file?: File) => {
    if (!file) return;
    if (!allowedVideoTypes.has(file.type)) { setStatus("Chỉ nhận video MP4, WebM hoặc MOV."); return; }
    if (file.size > maxVideoBytes) { setStatus("Video phải nhỏ hơn hoặc bằng 50 MB."); return; }
    setStatus("Đang tải video lên Cloudinary…");
    const signatureResponse = await fetch("https://www.panedninhthuan.online/api/cloudinary/sign", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resourceType: "video" }) });
    if (!signatureResponse.ok) { setStatus("Không thể lấy quyền upload."); return; }
    const { cloudName, apiKey, folder, timestamp, signature, allowedFormats, maxFileBytes } = await signatureResponse.json();
    if (file.size > maxFileBytes) { setStatus("Video vượt quá giới hạn cho phép."); return; }
    const form = new FormData(); form.append("file", file); form.append("api_key", apiKey); form.append("timestamp", String(timestamp)); form.append("signature", signature); form.append("folder", folder); form.append("allowed_formats", allowedFormats); form.append("max_file_size", String(maxFileBytes));
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, { method: "POST", body: form });
    if (!response.ok) { setStatus("Upload video thất bại."); return; }
    const result = await response.json(); props.onChange(set(result.secure_url)); setStatus("Đã upload video thành công.");
  };
  return <Stack space={3}><TextInput value={(props.value as string) || ""} onChange={(event) => props.onChange(set(event.currentTarget.value))} placeholder="URL video Cloudinary" /><Card padding={3} border radius={2}><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(event) => upload(event.target.files?.[0])} /><Text size={1}>{status || "Chọn MP4, WebM hoặc MOV tối đa 50 MB để upload lên Cloudinary, hoặc dán URL có sẵn."}</Text></Card>{props.value ? <video controls style={{ width: "100%" }} src={props.value as string} /> : null}</Stack>;
}
