import type { ConsultationPayload } from "./types";

type GoogleSheetInput = Pick<ConsultationPayload, "requestId" | "name" | "phone" | "requirement" | "sourceUrl"> & {
  createdAt: string;
  emailStatus: "pending" | "sent" | "failed" | "disabled";
  resendEmailId?: string;
};

type GoogleSheetResult = { ok: boolean; duplicate?: boolean; emailStatus?: string; resendEmailId?: string; error?: string };

async function callSheet(payload: Record<string, unknown>): Promise<GoogleSheetResult> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_SECRET_KEY;
  if (!url || !secret) return { ok: false, error: "Thiếu cấu hình Google Sheets." };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000)
    });
    const result = await response.json().catch(() => null) as { success?: boolean; duplicate?: boolean; emailStatus?: string; resendEmailId?: string; message?: string } | null;
    return { ok: response.ok && Boolean(result?.success || result?.duplicate), duplicate: result?.duplicate, emailStatus: result?.emailStatus, resendEmailId: result?.resendEmailId, error: result?.message || `Google Sheets trả về HTTP ${response.status}.` };
  } catch {
    return { ok: false, error: "Không thể kết nối Google Sheets." };
  }
}

export function saveConsultationToSheet(input: GoogleSheetInput) {
  return callSheet({ action: "create", ...input, status: "Mới" });
}

export function updateConsultationEmailStatus(requestId: string, emailStatus: "sent" | "failed" | "disabled", resendEmailId?: string) {
  return callSheet({ action: "updateEmailStatus", requestId, emailStatus, resendEmailId: resendEmailId || "" });
}
