import { NextRequest, NextResponse } from "next/server";
import { SHELF } from "@/lib/blends";
import { checkoutUrl, shopOpen } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  if (!shopOpen()) return NextResponse.json({ error: "The shop opens soon." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const known = new Set(SHELF.map((b) => b.handle));
  const lines = (Array.isArray(body.lines) ? body.lines : [])
    .filter((l: any) => l && known.has(l.handle))
    .map((l: any) => ({ handle: String(l.handle), qty: Number(l.qty) || 1 }));
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : "";
  const url = await checkoutUrl(lines, note);
  return url ? NextResponse.json({ url }) : NextResponse.json({ error: "Nothing in the basket is available right now." }, { status: 400 });
}
