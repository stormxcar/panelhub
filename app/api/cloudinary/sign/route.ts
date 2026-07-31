import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const studioOrigin = "https://panedninhthuan.sanity.studio";
const rateWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const maxVideoBytes = 50 * 1024 * 1024;
const allowedVideoFormats = ["mp4", "webm", "mov"];
const maxImageBytes = 10 * 1024 * 1024;
const allowedImageFormats = ["jpg", "jpeg", "png", "webp", "avif"];
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function corsHeaders(origin: string | null): Record<string, string> {
  return origin === studioOrigin ? { "Access-Control-Allow-Origin": studioOrigin, Vary: "Origin" } : {};
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: { ...corsHeaders(request.headers.get("origin")), "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function enforceRateLimit(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);
  const current = rateLimits.get(ip);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + rateWindowMs } : current;
  entry.count += 1;
  rateLimits.set(ip, entry);

  if (rateLimits.size > 1_000) {
    for (const [key, value] of rateLimits) if (value.resetAt <= now) rateLimits.delete(key);
  }

  return {
    allowed: entry.count <= maxRequestsPerWindow,
    headers: {
      "X-RateLimit-Limit": String(maxRequestsPerWindow),
      "X-RateLimit-Remaining": String(Math.max(0, maxRequestsPerWindow - entry.count)),
      "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000))
    }
  };
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin !== studioOrigin) return new NextResponse("Forbidden", { status: 403 });

  const limit = enforceRateLimit(request);
  if (!limit.allowed) {
    return new NextResponse("Too many upload signature requests", { status: 429, headers: { ...corsHeaders(origin), ...limit.headers, "Retry-After": String(Math.ceil(rateWindowMs / 1000)) } });
  }

  if (request.headers.get("content-type") !== "application/json") {
    return new NextResponse("Expected application/json", { status: 415, headers: { ...corsHeaders(origin), ...limit.headers } });
  }
  const body = await request.json().catch(() => null) as { resourceType?: string } | null;
  if (body?.resourceType !== "video" && body?.resourceType !== "image") return new NextResponse("Unsupported upload type", { status: 400, headers: { ...corsHeaders(origin), ...limit.headers } });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const rootFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || "panelhub";
  if (!cloudName || !apiKey || !apiSecret) return new NextResponse("Cloudinary is not configured", { status: 500 });
  if (!/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(rootFolder)) return new NextResponse("Invalid Cloudinary folder configuration", { status: 500 });

  const isVideo = body.resourceType === "video";
  const folder = `${rootFolder}/${isVideo ? "studio-videos" : "studio-images"}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const allowedFormats = (isVideo ? allowedVideoFormats : allowedImageFormats).join(",");
  const maxFileBytes = isVideo ? maxVideoBytes : maxImageBytes;
  const signature = createHash("sha1").update(`allowed_formats=${allowedFormats}&folder=${folder}&max_file_size=${maxFileBytes}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  return NextResponse.json(
    { cloudName, apiKey, folder, timestamp, signature, allowedFormats, maxFileBytes },
    { headers: { ...corsHeaders(origin), ...limit.headers, "Cache-Control": "no-store" } }
  );
}
