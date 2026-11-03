import type { Metadata } from "next";
import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/dm-sans";
import "@fontsource/dm-mono/400.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGuard from "@/components/PhotoGuard";
import { BasketProvider } from "@/components/Basket";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.spicehanout.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Spice Hanout · spice blends for the hours of a day", template: "%s · Spice Hanout" },
  description: "Small-batch spice blends ground in Marrakech, for the morning, the long lunch and the evening.",
  openGraph: { type: "website", siteName: "Spice Hanout" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-[16px] leading-relaxed">
        <BasketProvider>
          <PhotoGuard />
          <Header />
          <main>{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
