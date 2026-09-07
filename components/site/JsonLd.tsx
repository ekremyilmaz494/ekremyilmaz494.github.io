// -*- coding: utf-8 -*-
/** YAPILANDIRILMIŞ VERİ — arama motorlarına marka künyesi. Yalnız doğrulanmış alanlar yazılır;
 *  telefon rolü ya da koordinat teyitsiz olduğu için oraya girmez. */
import { MARKA } from "@/data/franchise";
import { ILETISIM } from "@/data/site";

export function OrganizationJsonLd() {
  const veri = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: MARKA.ad,
    alternateName: MARKA.tescil,
    url: `https://${MARKA.web}`,
    logo: `https://${MARKA.web}/logo.svg`,
    foundingDate: MARKA.kurulus,
    email: ILETISIM.merkez.eposta,
    address: {
      "@type": "PostalAddress",
      streetAddress: ILETISIM.merkez.adres,
      addressLocality: MARKA.sehir,
      addressCountry: "TR",
    },
    sameAs: [MARKA.instagram],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />;
}

/** SSS şeması — yalnız /franchise sayfasında, oradaki gerçek soru/cevaplarla. */
export function FaqJsonLd({ sorular }: { sorular: readonly { soru: string; cevap: string }[] }) {
  const veri = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sorular.map((s) => ({
      "@type": "Question",
      name: s.soru,
      acceptedAnswer: { "@type": "Answer", text: s.cevap },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />;
}
