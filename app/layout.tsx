// -*- coding: utf-8 -*-
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MARKA } from "@/data/franchise";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import ZeminGecis from "@/components/site/ZeminGecis";
import { OrganizationJsonLd } from "@/components/site/JsonLd";
import "./globals.css";

/** Başlık ailesi: geniş, kararlı, tabela gibi.
 *  Google diliminden değil kendi alt kümemizden: `latin-ext` dilimi tek başına 114 KB ve
 *  içinden gerçekten gereken Türkçe harf sayısı beş (Ğ ğ İ Ş ş). Latin + Genişletilmiş-A +
 *  noktalama + ₺ ile kesilince ikisi birlikte 201 KB'den 86 KB'ye iniyor. Değişken eksen
 *  korunuyor: tek dosya bütün ağırlıkları taşıyor.
 *  Yeniden üretmek: `sh scripts/font-kes.sh <pyftsubset> <kaynak.ttf> app/fonts/<ad>.woff2` */
const display = localFont({
  src: "./fonts/unbounded-tr.woff2",
  weight: "200 900",
  variable: "--font-display-kaynak",
  display: "swap",
  adjustFontFallback: "Arial",
});

/** Metin ailesi: yüksek x-yüksekliği, ekranda rahat okunur. */
const metin = localFont({
  src: "./fonts/manrope-tr.woff2",
  weight: "200 800",
  variable: "--font-text-kaynak",
  display: "swap",
  adjustFontFallback: "Arial",
});

const ACIKLAMA =
  "2009'dan beri Konya'da üretilen, etsiz bulgur harcıyla hazırlanan çiğköfte. Menü, şubeler ve franchise şartları.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${MARKA.web}`),
  title: { default: `${MARKA.ad} · ${MARKA.tescil}`, template: `%s · ${MARKA.ad}` },
  description: ACIKLAMA,
  applicationName: MARKA.ad,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: MARKA.ad,
    title: `${MARKA.ad} · ${MARKA.tescil}`,
    description: ACIKLAMA,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: MARKA.ad, description: ACIKLAMA },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#1f4a10",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${metin.variable}`} suppressHydrationWarning>
      <head>
        {/* JS varsa işaretle: CSS "nojs" varyantı buna bakar, böylece JS yokken hiçbir şey gizli kalmaz. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute("data-js","1")` }} />
        <OrganizationJsonLd />
      </head>
      <body className="antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-krem focus:px-5 focus:py-3 focus:font-semibold focus:text-murekkep"
        >
          İçeriğe geç
        </a>
        <SmoothScroll>
          <ZeminGecis />
          <Header />
          <main id="icerik">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
