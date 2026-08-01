/*
 * Paste this entire file into script.google.com, then bind the project to the
 * Google Sheet that receives leads. Set SHEET_NAME and SECRET in Script
 * Properties, never in this source file. Deploy as a Web App: execute as you,
 * access: Anyone. The Next.js server is the only caller and sends the secret.
 */
const SHEET_NAME = "Yeu cau tu van";
const HEADERS = ["Mã yêu cầu", "Thời gian", "Họ tên", "Số điện thoại", "Nhu cầu", "Nguồn", "Trạng thái khách hàng", "Trạng thái email", "Resend Email ID", "Ghi chú"];

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10_000);
  try {
    const data = JSON.parse(event.postData && event.postData.contents || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("GOOGLE_SHEET_SECRET_KEY");
    if (!secret || data.secret !== secret) return json({ success: false, message: "Unauthorized" });
    if (!data.requestId || !/^[0-9a-f-]{36}$/i.test(data.requestId)) return json({ success: false, message: "Invalid request id" });
    const sheet = getSheet();
    const row = findRequestRow(sheet, data.requestId);

    if (data.action === "updateEmailStatus") {
      if (!row) return json({ success: false, message: "Request not found" });
      sheet.getRange(row, 8).setValue(safeCell(data.emailStatus));
      sheet.getRange(row, 9).setValue(safeCell(data.resendEmailId));
      return json({ success: true });
    }

    if (data.action !== "create") return json({ success: false, message: "Unsupported action" });
    if (!data.name || !data.phone || !data.requirement || !data.createdAt) return json({ success: false, message: "Missing required fields" });
    if (row) return json({ success: true, duplicate: true, emailStatus: String(sheet.getRange(row, 8).getValue() || ""), resendEmailId: String(sheet.getRange(row, 9).getValue() || "") });
    sheet.appendRow([safeCell(data.requestId), safeCell(data.createdAt), safeCell(data.name), safeCell(data.phone), safeCell(data.requirement), safeCell(data.sourceUrl), "Mới", safeCell(data.emailStatus), "", ""]);
    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: "Server error" });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function findRequestRow(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const index = values.findIndex((row) => row[0] === requestId);
  return index === -1 ? 0 : index + 2;
}

function safeCell(value) {
  const text = String(value || "").trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
