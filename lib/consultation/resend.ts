import { Resend } from "resend";
import { escapeHtml } from "./validation";
import type { ConsultationPayload } from "./types";

export async function sendConsultationEmail({ payload, recipient, subjectPrefix, createdAt, sheetStatus }: {
  payload: ConsultationPayload;
  recipient: string;
  subjectPrefix?: string;
  createdAt: string;
  sheetStatus: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Thiếu cấu hình Resend.");

  const safe = {
    name: escapeHtml(payload.name), phone: escapeHtml(payload.phone), requirement: escapeHtml(payload.requirement).replace(/\n/g, "<br />"),
    sourceUrl: escapeHtml(payload.sourceUrl || "Không xác định"), requestId: escapeHtml(payload.requestId), createdAt: escapeHtml(createdAt), sheetStatus: escapeHtml(sheetStatus)
  };
  const subject = `${subjectPrefix || "Yêu cầu tư vấn mới"}: ${payload.name.replace(/[\r\n]/g, " ").slice(0, 80)}`;
  const result = await new Resend(apiKey).emails.send({
    from,
    to: [recipient],
    subject,
    text: `YÊU CẦU TƯ VẤN MỚI\n\nHọ tên: ${payload.name}\nSố điện thoại: ${payload.phone}\nNhu cầu: ${payload.requirement}\nNguồn: ${payload.sourceUrl || "Không xác định"}\nThời gian: ${createdAt}\nMã yêu cầu: ${payload.requestId}\nTrạng thái Google Sheets: ${sheetStatus}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#151915"><h1 style="font-size:20px">Yêu cầu tư vấn mới</h1><p><strong>Họ tên:</strong> ${safe.name}</p><p><strong>Số điện thoại:</strong> <a href="tel:${safe.phone}">${safe.phone}</a></p><p><strong>Nhu cầu:</strong><br />${safe.requirement}</p><p><strong>Nguồn:</strong> ${safe.sourceUrl}</p><p><strong>Thời gian:</strong> ${safe.createdAt}</p><p><strong>Mã yêu cầu:</strong> ${safe.requestId}</p><p><strong>Google Sheets:</strong> ${safe.sheetStatus}</p></div>`
  });
  if (result.error || !result.data?.id) throw new Error(result.error?.message || "Resend không trả về mã email.");
  return result.data.id;
}
