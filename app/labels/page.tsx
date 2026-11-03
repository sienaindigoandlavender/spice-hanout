import type { Metadata } from "next";
import { SHELF } from "@/lib/blends";
import Label from "@/components/Label";

// Print sheet for the tins: each blend's front and back at real size (70 × 93 mm), with cut lines.
// Print at 100% on A4. Not linked anywhere and kept out of search.
export const metadata: Metadata = { title: "Labels", robots: { index: false, follow: false } };

export default function Labels() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 print:p-0">
      <div className="no-print mb-10">
        <h1 className="font-display text-[48px] leading-none">The labels</h1>
        <p className="mt-4 max-w-xl text-[17px]">Front and back for every tin, at real size: 70 × 93 mm. Print at 100% on A4, cut on the lines, write the batch number and the date by hand.</p>
      </div>
      <div className="flex flex-wrap gap-[6mm] print:gap-[4mm]">
        {SHELF.map((b) => (
          <div key={b.handle} className="flex gap-[3mm] break-inside-avoid">
            {(["front", "back"] as const).map((f) => (
              <div key={f} className="relative w-[70mm] text-[9pt] outline-dashed outline-1 outline-offset-[1mm] outline-ink">
                <Label b={b} size="print" face={f} uid={`-print-${f}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
