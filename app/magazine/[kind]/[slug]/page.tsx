import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KIND_ONE, KIND_MANY, allEntries, entry, relatedOf, inlineHtml, fmtDate, inkFor } from "@/lib/magazine";
import { MOMENTS, itemBy } from "@/lib/blends";
import { offers } from "@/lib/shopify";
import Label from "@/components/Label";
import EntryCard from "@/components/EntryCard";
import { AddButton } from "@/components/Basket";

export const revalidate = 300;
export const dynamicParams = false;
export const generateStaticParams = () => allEntries().map((e) => ({ kind: e.kind, slug: e.slug }));

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.spicehanout.com";

export async function generateMetadata({ params }: { params: Promise<{ kind: string; slug: string }> }): Promise<Metadata> {
  const { kind, slug } = await params;
  const e = entry(kind, slug);
  return e ? { title: e.title, description: e.dek, alternates: { canonical: `/magazine/${kind}/${slug}` }, openGraph: { type: "article", title: e.title, description: e.dek } } : {};
}

export default async function EntryPage({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const e = entry(kind, slug);
  if (!e) notFound();
  const blends = e.blends.map(itemBy).filter((b): b is NonNullable<typeof b> => !!b);
  const o = await offers(blends.map((b) => b.handle));
  const related = relatedOf(e).slice(0, 4);
  const hour = e.hour ? MOMENTS.find((m) => m.key === e.hour) : undefined;
  const url = `${SITE}/magazine/${e.kind}/${e.slug}`;

  const ld: Record<string, unknown>[] = [
    e.kind === "recipes"
      ? {
          "@context": "https://schema.org", "@type": "Recipe", name: e.title, description: e.dek, datePublished: e.date, url,
          author: { "@type": "Organization", name: "Spice Hanout" },
          recipeYield: e.serves, recipeIngredient: e.ingredients,
          recipeInstructions: e.steps?.map((s) => ({ "@type": "HowToStep", text: s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") })),
        }
      : { "@context": "https://schema.org", "@type": "Article", headline: e.title, description: e.dek, datePublished: e.date, url, author: { "@type": "Organization", name: "Spice Hanout" }, publisher: { "@type": "Organization", name: "Spice Hanout" } },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Magazine", item: `${SITE}/magazine` },
        { "@type": "ListItem", position: 2, name: KIND_MANY[e.kind], item: `${SITE}/magazine/${e.kind}` },
        { "@type": "ListItem", position: 3, name: e.title, item: url },
      ],
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header style={{ background: e.tint, color: inkFor(e.tint) }}>
        <div className="mx-auto max-w-[1400px] px-4 pt-14 pb-16 md:px-10 md:pt-24 md:pb-24">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em]">
            <Link href="/magazine" className="hover:underline underline-offset-4">Magazine</Link> · <Link href={`/magazine/${e.kind}`} className="hover:underline underline-offset-4">{KIND_ONE[e.kind]}</Link>
            {hour && <> · {hour.title}</>}
          </p>
          {e.arabic && <p className="mt-8 text-[30px] leading-none" dir="rtl" lang="ar">{e.arabic}</p>}
          <h1 className="mt-5 max-w-5xl font-display text-[48px] leading-[0.98] md:text-[96px]">{e.title}</h1>
          <p className="mt-8 max-w-2xl text-[19px] leading-snug md:text-[22px]">{e.dek}</p>
          <p className="mt-8 font-mono text-[13px]">
            {e.darija && <>{e.darija} · </>}{fmtDate(e.date)}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-7">
          {e.kind === "recipes" && (e.ingredients?.length || e.steps?.length) ? (
            <div className="mb-14 border-y border-ink py-8">
              <p className="font-mono text-[13px]">{[e.serves && `Serves ${e.serves}`, e.time].filter(Boolean).join(" · ")}</p>
              {e.ingredients && (
                <>
                  <h2 className="mt-6 font-mono text-[13px] uppercase tracking-[0.14em]">You need</h2>
                  <ul className="mt-3 space-y-1.5 text-[17px]">{e.ingredients.map((i) => <li key={i}>{i}</li>)}</ul>
                </>
              )}
              {e.steps && (
                <>
                  <h2 className="mt-8 font-mono text-[13px] uppercase tracking-[0.14em]">Then</h2>
                  <ol className="mt-3 space-y-3 text-[17px] leading-[1.6]">
                    {e.steps.map((s, i) => (
                      <li key={i} className="grid grid-cols-[2rem_1fr]"><span className="font-mono text-[14px] pt-0.5">{i + 1}</span><span className="mag-inline" dangerouslySetInnerHTML={{ __html: inlineHtml(s) }} /></li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          ) : null}
          <div className="mag" dangerouslySetInnerHTML={{ __html: e.html }} />
        </div>

        {blends.length > 0 && (
          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-24">
              <p className="font-mono text-[13px] uppercase tracking-[0.14em]">From the shelf</p>
              <div className="mt-5 space-y-10">
                {blends.map((b) => (
                  <div key={b.handle}>
                    <Link href={`/blends/${b.handle}`} className="block"><Label b={b} /></Link>
                    <p className="mt-4 text-[15px]">{b.line.split(".")[0]}.</p>
                    <div className="mt-4"><AddButton handle={b.handle} available={!!o[b.handle]?.available} price={o[b.handle]?.price} /></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-20">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em]">Keep reading</p>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {related.map((r) => <EntryCard key={r.slug} e={r} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
