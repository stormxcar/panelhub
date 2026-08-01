import type { ConsultationPayload } from "./types";

const vietnamesePhone = /^(?:0|84)\d{9}$/;

export function normalizeVietnamesePhone(value: string) {
  const compact = value.trim().replace(/[.\s-]/g, "");
  if (compact.startsWith("+84")) return `0${compact.slice(3)}`;
  if (compact.startsWith("84")) return `0${compact.slice(2)}`;
  return compact;
}

export function validateConsultationPayload(payload: ConsultationPayload) {
  const name = typeof payload.name === "string" ? payload.name.trim().replace(/\s+/g, " ") : "";
  const phone = typeof payload.phone === "string" ? normalizeVietnamesePhone(payload.phone) : "";
  const requirement = typeof payload.requirement === "string" ? payload.requirement.trim() : "";
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2 || name.length > 100) fieldErrors.name = "Họ tên cần từ 2 đến 100 ký tự.";
  if (!vietnamesePhone.test(phone)) fieldErrors.phone = "Vui lòng nhập số điện thoại Việt Nam hợp lệ.";
  if (requirement.length < 10 || requirement.length > 3000) fieldErrors.requirement = "Nhu cầu cần từ 10 đến 3.000 ký tự.";

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    value: { ...payload, name, phone, requirement, sourceUrl: payload.sourceUrl?.slice(0, 2048) || "" }
  };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export function maskPhone(phone: string) {
  return phone.length >= 7 ? `${phone.slice(0, 4)}***${phone.slice(-3)}` : "***";
}
