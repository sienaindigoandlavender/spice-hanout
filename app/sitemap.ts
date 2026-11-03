import type { MetadataRoute } from "next";
import { BLENDS } from "@/lib/blends";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.spicehanout.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/notes", ...BLENDS.map((b) => `/blends/${b.handle}`)].map((p) => ({ url: `${SITE}${p}` }));
}
