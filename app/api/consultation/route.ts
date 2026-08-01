import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { updateConsultationEmailStatus, saveConsultationToSheet } from "../../../lib/consultation/google-sheets";
import { sendConsultationEmail } from "../../../lib/consultation/resend";
import type { ConsultationPayload, ConsultationResponse } from "../../../lib/consultation/types";
import { maskPhone, validateConsultationPayload } from "../../../lib/consultation/validation";
import { getConsultationFormSettings } from "../../../lib/sanity";

const maxBodyBytes = 16_384;
const rateWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestTtlMs = 60 * 60 * 1000;
const duplicateTtlMs = 10 * 60 * 1000;
const requestIds = new Map<string, number>();
const contentHashes = new Map<string, number>();
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function response(body: ConsultationResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function withinRateLimit(request: NextRequest) {
  const now = Date.now();
  const ip = clientIp(request);
  const current = rateLimits.get(ip);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + rateWindowMs } : current;
  entry.count += 1;
  rateLimits.set(ip, entry);
  return entry.count <= maxRequestsPerWindow;
}

function cleanCaches() {
  const now = Date.now();
  for (const [key, expiresAt] of requestIds) if (expiresAt <= now) requestIds.delete(key);
  for (const [key, expiresAt] of contentHashes) if (expiresAt <= now) contentHashes.delete(key);
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return response({ success: false, code: "INVALID_JSON", message: "Định dạng dữ liệu không hợp lệ." }, 415);
  const rawBody = await request.text().catch(() => "");
  if (!rawBody || rawBody.length > maxBodyBytes) return response({ success: false, code: "INVALID_JSON", message: "Dữ liệu gửi lên không hợp lệ." }, 400);
  const payload = (() => { try { return JSON.parse(rawBody) as ConsultationPayload; } catch { return null; } })();
  if (!payload) return response({ success: false, code: "INVALID_JSON", message: "Dữ liệu gửi lên không hợp lệ." }, 400);
  if (payload.website?.trim()) return response({ success: false, code: "SPAM_DETECTED", message: "Không thể gửi yêu cầu này." }, 400);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.requestId || "")) return response({ success: false, code: "VALIDATION_ERROR", message: "Mã yêu cầu không hợp lệ." }, 400);
  if (!withinRateLimit(request)) return response({ success: false, code: "SPAM_DETECTED", message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." }, 429);

  const validation = validateConsultationPayload(payload);
  if (!validation.valid) return response({ success: false, code: "VALIDATION_ERROR", message: "Vui lòng kiểm tra lại thông tin đã nhập.", fieldErrors: validation.fieldErrors }, 400);

  cleanCaches();
  const normalized = validation.value;
  const duplicateHash = createHash("sha256").update(`${normalized.phone}|${normalized.requirement.toLowerCase()}`).digest("hex");
  if (requestIds.has(normalized.requestId) || contentHashes.has(duplicateHash)) return response({ success: false, code: "DUPLICATE_REQUEST", message: "Yêu cầu này đã được tiếp nhận. Vui lòng chờ đội ngũ liên hệ." }, 409);

  const settings = await getConsultationFormSettings();
  if (settings?.isEnabled === false) return response({ success: false, code: "FORM_DISABLED", message: "Biểu mẫu đang tạm đóng. Vui lòng gọi hotline để được hỗ trợ." }, 503);
  const sheetEnabled = settings?.enableGoogleSheets !== false;
  const emailEnabled = settings?.enableEmailNotification !== false;
  const recipient = settings?.notificationEmail || process.env.CONTACT_EMAIL;
  if (!sheetEnabled && !emailEnabled) return response({ success: false, code: "CONFIGURATION_ERROR", message: "Hệ thống nhận tư vấn đang tạm thời chưa sẵn sàng." }, 503);
  if (emailEnabled && !recipient) return response({ success: false, code: "CONFIGURATION_ERROR", message: "Hệ thống nhận tư vấn đang tạm thời chưa sẵn sàng." }, 503);

  const createdAt = new Date().toISOString();
  let sheetSaved = !sheetEnabled;
  let emailSent = !emailEnabled;
  let resendEmailId: string | undefined;
  let sheetError = "";
  let emailError = "";

  if (sheetEnabled) {
    const sheetResult = await saveConsultationToSheet({ ...normalized, createdAt, emailStatus: emailEnabled ? "pending" : "disabled" });
    sheetSaved = sheetResult.ok;
    sheetError = sheetResult.error || "";
    if (sheetResult.duplicate) {
      emailSent = !emailEnabled || sheetResult.emailStatus === "sent";
      requestIds.set(normalized.requestId, Date.now() + requestTtlMs);
      contentHashes.set(duplicateHash, Date.now() + duplicateTtlMs);
      return response({ success: true, partial: !emailSent, requestId: normalized.requestId, sheetSaved: true, emailSent, message: "Yêu cầu này đã được tiếp nhận trước đó. Đội ngũ sẽ liên hệ lại sớm nhất có thể." });
    }
  }

  if (emailEnabled && recipient) {
    try {
      resendEmailId = await sendConsultationEmail({ payload: normalized, recipient, subjectPrefix: settings?.emailSubjectPrefix, createdAt, sheetStatus: sheetSaved ? "pending" : "failed" });
      emailSent = true;
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Không thể gửi email.";
    }
  }

  if (sheetEnabled && sheetSaved && emailEnabled) await updateConsultationEmailStatus(normalized.requestId, emailSent ? "sent" : "failed", resendEmailId);
  const durationMs = Date.now() - startedAt;
  console.info(JSON.stringify({ event: "consultation_submission", requestId: normalized.requestId, phone: maskPhone(normalized.phone), sheetSaved, emailSent, resendEmailId, durationMs, errorCode: !sheetSaved ? "GOOGLE_SHEET_ERROR" : !emailSent ? "EMAIL_SEND_ERROR" : undefined }));

  if (!sheetSaved && !emailSent) return response({ success: false, code: sheetError ? "GOOGLE_SHEET_ERROR" : "EMAIL_SEND_ERROR", message: settings?.errorMessage || "Chưa thể ghi nhận yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp." }, 502);
  requestIds.set(normalized.requestId, Date.now() + requestTtlMs);
  contentHashes.set(duplicateHash, Date.now() + duplicateTtlMs);
  const partial = !sheetSaved || !emailSent;
  return response({ success: true, partial, requestId: normalized.requestId, sheetSaved, emailSent, message: partial ? "Yêu cầu đã được tiếp nhận. Đội ngũ sẽ liên hệ lại sớm nhất có thể." : settings?.successMessage || "Đã gửi yêu cầu tư vấn thành công." });
}
