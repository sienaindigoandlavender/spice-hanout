import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-[28px]">Spice Hanout</p>
          <p className="mt-3 text-[15px]">Spice blends for the hours of a day. Ground in small batches in Marrakech.</p>
        </div>
        <div className="text-[15px]">
          <ul className="space-y-1.5">
            <li><Link href="/#morning" className="hover:underline">Morning</Link></li>
            <li><Link href="/#midday" className="hover:underline">Midday</Link></li>
            <li><Link href="/#evening" className="hover:underline">Evening</Link></li>
            <li><Link href="/notes" className="hover:underline">How we write about spices</Link></li>
          </ul>
        </div>
        <p className="text-[14px] md:text-end">Food, not medicine. Nothing on this site is medical advice.</p>
      </div>
      <p className="mx-auto max-w-[1400px] px-4 pb-10 text-[13px] md:px-10">© {new Date().getFullYear()} Spice Hanout</p>
    </footer>
  );
}
