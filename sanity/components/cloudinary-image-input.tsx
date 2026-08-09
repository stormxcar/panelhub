/* eslint-disable @next/next/no-img-element */
import { Button, Card, Stack, Text, TextInput } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";
import { useState } from "react";

const maxImageBytes = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

async function errorDetail(response: Response) {
  const raw = await response.text().catch(() => "");
  const payload = (() => { try { return JSON.parse(raw) as { error?: { message?: string }; message?: string }; } catch { return null; } })();
  return payload?.error?.message || payload?.message || raw || "Không có chi tiết lỗi.";
}

export function CloudinaryImageInput(props: StringInputProps) {
  const [status, setStatus] = useState("");
  const value = (props.value as string) || "";
  const getUploadSignature = async () => {
    const signatureResponse = await fetch("https://www.panedninhthuan.online/api/cloudinary/sign", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resourceType: "image" }) });
    if (!signatureResponse.ok) throw new Error(`Không thể lấy quyền upload ảnh (${signatureResponse.status}): ${await errorDetail(signatureResponse)}`);
    return signatureResponse.json() as Promise<{ cloudName: string; apiKey: string; folder: string; timestamp: number; signature: string; allowedFormats: string; maxFileBytes: number }>;
  };
  const upload = async (file?: File) => {
    if (!file) return;
    if (!allowedImageTypes.has(file.type)) { setStatus("Chỉ nhận ảnh JPG, PNG, WebP hoặc AVIF."); return; }
    if (file.size > maxImageBytes) { setStatus("Ảnh phải nhỏ hơn hoặc bằng 10 MB."); return; }
    setStatus("Đang tải ảnh lên Cloudinary…");
    let signatureData;
    try { signatureData = await getUploadSignature(); } catch (error) { setStatus(error instanceof Error ? error.message : "Không thể lấy quyền upload ảnh."); return; }
    const { cloudName, apiKey, folder, timestamp, signature, allowedFormats, maxFileBytes } = signatureData;
    if (file.size > maxFileBytes) { setStatus("Ảnh vượt quá giới hạn cho phép."); return; }
    const form = new FormData(); form.append("file", file); form.append("api_key", apiKey); form.append("timestamp", String(timestamp)); form.append("signature", signature); form.append("folder", folder); form.append("allowed_formats", allowedFormats);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
    if (!response.ok) { setStatus(`Upload ảnh thất bại (${response.status}): ${await errorDetail(response)}`); return; }
    const result = await response.json(); props.onChange(set(result.secure_url)); setStatus("Đã upload ảnh thành công lên Cloudinary.");
  };
  const importRemoteUrl = async () => {
    if (!/^https:\/\//i.test(value)) { setStatus("Hãy dán URL ảnh HTTPS hợp lệ trước khi lưu vào Cloudinary."); return; }
    setStatus("Đang lưu URL ảnh vào Cloudinary…");
    let signatureData;
    try { signatureData = await getUploadSignature(); } catch (error) { setStatus(error instanceof Error ? error.message : "Không thể lấy quyền upload ảnh."); return; }
    const { cloudName, apiKey, folder, timestamp, signature, allowedFormats } = signatureData;
    const form = new FormData(); form.append("file", value); form.append("api_key", apiKey); form.append("timestamp", String(timestamp)); form.append("signature", signature); form.append("folder", folder); form.append("allowed_formats", allowedFormats);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
    if (!response.ok) { setStatus(`Không thể lưu URL ảnh (${response.status}): ${await errorDetail(response)}`); return; }
    const result = await response.json(); props.onChange(set(result.secure_url)); setStatus("Đã lưu ảnh về Cloudinary thành công.");
  };
  return <Stack space={3}><TextInput value={value} onChange={(event) => props.onChange(set(event.currentTarget.value))} placeholder="https://unsplash.com/... hoặc URL ảnh trực tiếp" /><Card padding={3} border radius={2}><Stack space={3}><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => upload(event.target.files?.[0])} /><Button text="Lưu URL hiện tại vào Cloudinary" mode="ghost" onClick={importRemoteUrl} disabled={!value} /><Text size={1}>{status || "Dán URL ảnh trực tiếp từ nguồn bất kỳ, hoặc chọn JPG, PNG, WebP, AVIF tối đa 10 MB để upload Cloudinary."}</Text></Stack></Card>{value ? <Card border radius={2} overflow="hidden"><img src={value} alt="Ảnh đang chọn" style={{ display: "block", width: "100%", height: "auto" }} /></Card> : null}</Stack>;
}
