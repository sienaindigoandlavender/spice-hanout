import { NextResponse } from 'next/server';
import { shopOpen as shopifyConfigured } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function storefront(version: string, query: string, variables: Record<string, unknown>) {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN ?? '' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  return res.json();
}

/** Newsletter sign-up → a Shopify customer who accepts email marketing (send with Shopify Email). */
export async function POST(req: Request) {
  let email = '';
  try {
    email = String((await req.json())?.email ?? '').trim().toLowerCase();
  } catch {
    /* fall through */
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }
  if (!shopifyConfigured()) {
    console.log('[newsletter] signup (Shopify not configured):', email);
    return NextResponse.json({ ok: true });
  }

  // 1) The newsletter-only mutation (no account created).
  try {
    const a = await storefront(
      'unstable',
      'mutation ($email: String!) { customerEmailMarketingSubscribe(email: $email) { customerUserErrors { code message } } }',
      { email },
    );
    const errs = a?.data?.customerEmailMarketingSubscribe?.customerUserErrors;
    if (a?.data?.customerEmailMarketingSubscribe && (!errs || errs.length === 0)) return NextResponse.json({ ok: true });
  } catch {
    /* try the fallback */
  }

  // 2) Fallback: a customer record that accepts marketing.
  try {
    const password = crypto.randomUUID() + 'Sh!';
    const b = await storefront(
      '2025-01',
      'mutation ($input: CustomerCreateInput!) { customerCreate(input: $input) { customerUserErrors { code message } } }',
      { input: { email, password, acceptsMarketing: true } },
    );
    const errs: { code?: string }[] = b?.data?.customerCreate?.customerUserErrors ?? [];
    if (errs.length === 0 || errs.some((e) => e.code === 'TAKEN')) return NextResponse.json({ ok: true });
    console.error('[newsletter] shopify errors', JSON.stringify(errs));
  } catch (e) {
    console.error('[newsletter] failed', e);
  }
  return NextResponse.json({ error: 'Something went wrong. Please try again in a moment.' }, { status: 502 });
}
