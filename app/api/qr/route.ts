import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { site } from "../../../lib/site";

export const runtime = "nodejs";

export async function GET() {
  const svg = await QRCode.toString(site.url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#10211a", light: "#ffffff" }
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800"
    }
  });
}
