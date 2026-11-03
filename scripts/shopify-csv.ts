// Writes shopify-products.csv from lib/blends.ts, for Products → Import in Shopify admin.
// Every product comes in as a DRAFT at price 0: set the real price, then make it Active and
// available on the Headless channel. Handle = blend handle, so the site finds it.
import { writeFileSync } from "node:fs";
import { BLENDS } from "../lib/blends";

const cols = ["Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published", "Option1 Name", "Option1 Value", "Variant SKU", "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", "Variant Requires Shipping", "Variant Taxable", "Status"];
const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
const rows = BLENDS.map((b) => {
  const body = `<p>${b.line}</p><p><strong>Inside:</strong> ${b.inside.map((i) => i.name).join(", ")}.</p><p><strong>How to use it:</strong></p><ul>${b.use.map((u) => `<li>${u}</li>`).join("")}</ul><p>Food, not medicine.</p>`;
  const grams = parseFloat(b.weight) || 50;
  return [b.handle, b.name, body, "Spice Hanout", "Spice blend", `${b.moment}`, "FALSE", "Title", "Default Title", `SH-${b.handle.toUpperCase()}`, grams, "shopify", 0, "deny", "manual", 0, "TRUE", "TRUE", "draft"].map(q).join(",");
});
writeFileSync("shopify-products.csv", [cols.join(","), ...rows].join("\n") + "\n");
console.log(`${rows.length} products → shopify-products.csv`);
