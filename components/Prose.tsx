// Small print, set to read: one column, ink at full strength, headings in Bodoni.
export function Page({ kicker, title, intro, updated, children }: { kicker: string; title: React.ReactNode; intro?: React.ReactNode; updated?: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-[1400px] px-4 pt-16 pb-28 md:px-10 md:pt-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em]">{kicker}</p>
          <h1 className="mt-5 font-display text-[48px] leading-[0.95] md:text-[72px]">{title}</h1>
          {updated && <p className="mt-6 font-mono text-[13px]">Updated {updated}</p>}
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {intro && <p className="font-display text-[26px] leading-[1.3] md:text-[32px]">{intro}</p>}
          <div className="mt-10 text-[18px] leading-[1.7] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-clay [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:ps-6 [&_li]:mb-1.5">{children}</div>
        </div>
      </div>
    </article>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink pt-6 pb-4">
      <h2 className="mb-4 font-display text-[28px] leading-tight md:text-[32px]">{title}</h2>
      {children}
    </section>
  );
}
