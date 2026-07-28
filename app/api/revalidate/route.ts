import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET || request.headers.get("x-sanity-secret") !== process.env.SANITY_REVALIDATE_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  revalidateTag("sanity-home");
  return NextResponse.json({ revalidated: true });
}
