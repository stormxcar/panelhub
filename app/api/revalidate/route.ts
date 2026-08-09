import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET || request.headers.get("x-sanity-secret") !== process.env.SANITY_REVALIDATE_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const payload = await request.json().catch(() => null) as { _type?: string; slug?: { current?: string } } | null;
  ["sanity-home", "sanity-site-settings", "sanity-legal", "sanity-consultation-form", "sanity-articles"].forEach((tag) => revalidateTag(tag));
  const paths = ["/", "/chinh-sach-bao-mat", "/dieu-khoan-su-dung", "/bai-viet"];
  if (payload?._type === "article" && payload.slug?.current) paths.push(`/bai-viet/${payload.slug.current}`);
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}
