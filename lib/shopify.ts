// Headless Shopify (Storefront API). Product handle = blend handle. Prices and stock live in Shopify.
// Without SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN the site still runs and shows "Soon".
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API = "2025-01";

export const shopOpen = () => !!(DOMAIN && TOKEN);

async function sf<T>(query: string, variables: Record<string, unknown> = {}, revalidate = 300): Promise<T | null> {
  if (!shopOpen()) return null;
  try {
    const res = await fetch(`https://${DOMAIN}/api/${API}/graphql.json`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN! },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    const j = await res.json();
    if (j.errors) console.error("shopify", j.errors);
    return (j.data as T) ?? null;
  } catch (e) {
    console.error("shopify", e);
    return null;
  }
}

export interface Offer {
  variantId: string;
  price: string; // formatted
  available: boolean;
}

const fmt = (amount: string, currency: string) => {
  const n = Number(amount);
  const v = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return currency === "EUR" ? `€${v}` : currency === "MAD" ? `${v} DH` : `${v} ${currency}`;
};

/** Price and the variant to buy, for each handle that exists in Shopify. */
export async function offers(handles: string[]): Promise<Record<string, Offer>> {
  const out: Record<string, Offer> = {};
  if (!shopOpen() || !handles.length) return out;
  const q = handles.map((h, i) => `p${i}: product(handle: ${JSON.stringify(h)}) { handle availableForSale variants(first: 1) { nodes { id availableForSale price { amount currencyCode } } } }`).join("\n");
  const data = await sf<Record<string, any>>(`{ ${q} }`);
  for (const p of Object.values(data || {})) {
    const v = p?.variants?.nodes?.[0];
    if (p && v) out[p.handle] = { variantId: v.id, price: fmt(v.price.amount, v.price.currencyCode), available: !!(p.availableForSale && v.availableForSale) };
  }
  return out;
}

/** A Shopify cart for these lines; returns the checkout URL. */
export async function checkoutUrl(lines: { handle: string; qty: number }[]): Promise<string | null> {
  const o = await offers(lines.map((l) => l.handle));
  const cartLines = lines.filter((l) => o[l.handle]?.available).map((l) => ({ merchandiseId: o[l.handle].variantId, quantity: Math.max(1, Math.min(20, l.qty)) }));
  if (!cartLines.length) return null;
  const data = await sf<any>(
    `mutation($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { checkoutUrl } userErrors { message } } }`,
    { lines: cartLines },
    0,
  );
  return data?.cartCreate?.cart?.checkoutUrl ?? null;
}
