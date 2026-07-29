import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const studioOrigin = "https://panedninhthuan.sanity.studio";

function corsHeaders(origin: string | null): Record<string, string> {
  return origin === studioOrigin ? { "Access-Control-Allow-Origin": studioOrigin, Vary: "Origin" } : {};
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: { ...corsHeaders(request.headers.get("origin")), "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin !== studioOrigin) return new NextResponse("Forbidden", { status: 403 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "panelhub";
  if (!cloudName || !apiKey || !apiSecret) return new NextResponse("Cloudinary is not configured", { status: 500 });

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  return NextResponse.json({ cloudName, apiKey, folder, timestamp, signature }, { headers: corsHeaders(origin) });
}
