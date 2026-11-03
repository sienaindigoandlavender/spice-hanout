import Link from "next/link";
import { COMPANY } from "@/lib/company";

const COLS: { title: string; links: [string, string][] }[] = [
  { title: "Shop", links: [["Morning", "/#morning"], ["Midday", "/#midday"], ["Evening", "/#evening"], ["The box", "/#box"], ["The world's blends", "/world"], ["Basket", "/basket"]] },
  { title: "Read", links: [["The magazine", "/magazine"], ["About us", "/about"], ["How we write about spices", "/notes"]] },
  { title: "Help", links: [["Shipping and taxes", "/shipping"], ["Returns", "/returns"], ["Questions", "/faq"], ["Wholesale", "/contact?topic=Wholesale"], ["Gifts and weddings", "/contact?topic=Gifts%20and%20weddings"], ["Contact", "/contact"]] },
  { title: "Small print", links: [["Privacy", "/privacy"], ["Terms of sale", "/terms"]] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-4 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-[40px] leading-none">Spice Hanout</p>
            <p className="mt-4 max-w-xs text-[16px] leading-[1.6]">Spice blends for the hours of a day. Ground in small batches in Marrakech.</p>
          </div>
          <nav className="grid grid-cols-2 gap-10 md:col-span-8 md:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[12px] uppercase tracking-[0.16em]">{c.title}</p>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {c.links.map(([label, href]) => <li key={href}><Link href={href} className="hover:italic">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-bone pt-6 text-[13px] md:flex-row md:items-baseline md:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.legalName || COMPANY.brand} · {COMPANY.city}</p>
          <p>Prices in dirhams, all taxes included.</p>
          <p>Food, not medicine. Nothing on this site is medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
