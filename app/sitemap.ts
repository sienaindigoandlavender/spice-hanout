import type { MetadataRoute } from "next";
import { SHELF } from "@/lib/blends";
import { KINDS, allEntries } from "@/lib/magazine";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.spicehanout.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/notes", "/magazine", "/world", "/about", "/contact", "/shipping", "/returns", "/faq", "/privacy", "/terms", ...KINDS.map((k) => `/magazine/${k}`), ...SHELF.map((b) => `/blends/${b.handle}`), ...allEntries().map((e) => `/magazine/${e.kind}/${e.slug}`)].map((p) => ({ url: `${SITE}${p}` }));
}
