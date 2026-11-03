import Link from "next/link";
import { BasketCount } from "./Basket";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bone/95 border-b border-ink">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:px-10">
        <Link href="/" className="font-display text-[24px] leading-none">Spice Hanout</Link>
        <nav className="flex items-center gap-5 text-[15px] md:gap-8">
          <Link href="/#morning" className="hidden hover:underline underline-offset-4 md:inline">Morning</Link>
          <Link href="/#midday" className="hidden hover:underline underline-offset-4 md:inline">Midday</Link>
          <Link href="/#evening" className="hidden hover:underline underline-offset-4 md:inline">Evening</Link>
          <Link href="/magazine" className="hover:underline underline-offset-4">Magazine</Link>
          <Link href="/basket" className="hover:underline underline-offset-4"><BasketCount /></Link>
        </nav>
      </div>
    </header>
  );
}
