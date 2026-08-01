"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { validateConsultationPayload } from "../lib/consultation/validation";
import type { ConsultationFormSettings, ConsultationResponse } from "../lib/consultation/types";

type Props = { settings: ConsultationFormSettings; phonePlaceholder: string };

export function ConsultationForm({ settings, phonePlaceholder }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const requestIdRef = useRef("");
  const statusRef = useRef<HTMLDivElement>(null);
  const payload = useMemo(() => ({ name, phone, requirement, website, requestId: requestIdRef.current || "" }), [name, phone, requirement, website]);
  const validation = validateConsultationPayload(payload);
  const canSubmit = settings.isEnabled !== false && validation.valid && !isSubmitting;

  function validateNow() {
    const result = validateConsultationPayload({ ...payload, requestId: requestIdRef.current || "preview" });
    setFieldErrors(result.fieldErrors);
    return result;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const result = validateNow();
    if (!result.valid || settings.isEnabled === false) return;
    if (!requestIdRef.current) requestIdRef.current = crypto.randomUUID();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...result.value, requestId: requestIdRef.current, website, sourceUrl: window.location.href }) });
      const data = await response.json().catch(() => null) as ConsultationResponse | null;
      if (!response.ok || !data?.success) {
        setFieldErrors(data?.fieldErrors || {});
        setStatus({ kind: "error", text: data?.message || settings.errorMessage || "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp." });
        return;
      }
      setName(""); setPhone(""); setRequirement(""); setWebsite(""); setFieldErrors({}); requestIdRef.current = "";
      setStatus({ kind: "success", text: data.message || settings.successMessage || "Đã gửi yêu cầu tư vấn thành công." });
    } catch {
      setStatus({ kind: "error", text: "Kết nối mạng bị gián đoạn. Vui lòng thử lại; thông tin bạn đã nhập vẫn được giữ nguyên." });
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => statusRef.current?.focus(), 0);
    }
  }

  if (settings.isEnabled === false) return <p className="contact-form-status is-disabled" role="status">Biểu mẫu đang tạm đóng. Vui lòng gọi hotline để được hỗ trợ.</p>;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="contact-honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label></div>
    <label htmlFor="consultation-name">{settings.nameLabel || "Họ tên"}<input id="consultation-name" name="name" value={name} onChange={(event) => setName(event.target.value)} onBlur={validateNow} placeholder={settings.namePlaceholder || "Nguyễn Văn A"} maxLength={100} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "consultation-name-error" : undefined} /></label>
    {fieldErrors.name ? <p className="contact-field-error" id="consultation-name-error">{fieldErrors.name}</p> : null}
    <label htmlFor="consultation-phone">{settings.phoneLabel || "Số điện thoại"}<input id="consultation-phone" name="phone" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} onBlur={validateNow} placeholder={settings.phonePlaceholder || phonePlaceholder} maxLength={30} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "consultation-phone-error" : undefined} /></label>
    {fieldErrors.phone ? <p className="contact-field-error" id="consultation-phone-error">{fieldErrors.phone}</p> : null}
    <label htmlFor="consultation-requirement">{settings.requirementLabel || "Nhu cầu"}<textarea id="consultation-requirement" name="requirement" value={requirement} onChange={(event) => setRequirement(event.target.value)} onBlur={validateNow} placeholder={settings.requirementPlaceholder || "Diện tích, địa điểm, loại công trình"} rows={4} maxLength={3000} aria-invalid={Boolean(fieldErrors.requirement)} aria-describedby={fieldErrors.requirement ? "consultation-requirement-error" : undefined} /></label>
    {fieldErrors.requirement ? <p className="contact-field-error" id="consultation-requirement-error">{fieldErrors.requirement}</p> : null}
    <button className="primary-btn tooltip-top" type="submit" disabled={!canSubmit} data-tooltip="Gửi thông tin để đội ngũ liên hệ lại">{isSubmitting ? "Đang gửi..." : settings.submitButtonText || "Nhận tư vấn"}</button>
    {status ? <div className={`contact-form-status is-${status.kind}`} ref={statusRef} tabIndex={-1} role={status.kind === "error" ? "alert" : "status"} aria-live="polite">{status.text}</div> : null}
  </form>;
}
