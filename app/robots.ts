import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const live = process.env.NEXT_PUBLIC_INDEXABLE === "true";
  return { rules: live ? { userAgent: "*", allow: "/", disallow: ["/api/", "/basket"] } : { userAgent: "*", disallow: "/" } };
}
