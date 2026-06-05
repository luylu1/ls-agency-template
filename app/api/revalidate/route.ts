import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity Webhook → revalidiert Pages wenn Content geändert wird
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType: string = body._type ?? "";

    // Welche Seiten werden durch welchen Dokumenttyp invalidiert?
    const pathMap: Record<string, string[]> = {
      siteSettings: ["/", "/leistungen", "/ueber-uns", "/kontakt", "/impressum", "/datenschutz"],
      homePage:     ["/"],
      service:      ["/", "/leistungen"],
      aboutPage:    ["/", "/ueber-uns"],
      legalPage:    ["/impressum", "/datenschutz"],
    };

    const paths = pathMap[docType] ?? ["/"];
    paths.forEach((p) => revalidatePath(p));

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
