import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET || request.headers.get("x-sanity-secret") !== process.env.SANITY_REVALIDATE_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  ["sanity-home", "sanity-site-settings", "sanity-legal", "sanity-consultation-form"].forEach((tag) => revalidateTag(tag));
  ["/", "/chinh-sach-bao-mat", "/dieu-khoan-su-dung"].forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths: ["/", "/chinh-sach-bao-mat", "/dieu-khoan-su-dung"] });
}
