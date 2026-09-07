// -*- coding: utf-8 -*-
/** ALT BİLGİ — sunucu bileşeni. Yoğun ve iş görür: adres, hatlar, e-posta, gezinme, KVKK.
 *  Numaralar ve adres data/site.ts'ten gelir; burada hiçbir bilgi yazılı değildir. */
import Link from "next/link";
import { InstagramLogo, MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { MARKA } from "@/data/franchise";
import { NAV, ILETISIM, CTA } from "@/data/site";
import { BAYI_SAYISI, IL_SAYISI } from "@/data/bayi";

export default function Footer() {
  const yil = new Date().getFullYear();

  return (
    <footer data-zemin="yesil-koyu" className="relative bg-yesil-koyu text-krem">
      <div className="oluklu h-2 w-full" aria-hidden />

      <div className="mx-auto max-w-[var(--container-site)] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
          <div>
            <Link
              href="/"
              aria-label={`${MARKA.ad} ana sayfa`}
              className="inline-flex rounded-[12px] bg-krem px-4 py-3 shadow-[0_18px_34px_-22px_rgb(4_14_7/0.9)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {/* Başlıkta da kullanılan tam renkli logo, koyu zeminde krem plaka üzerinde korunur. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt={MARKA.ad} width={184} height={51} className="h-10 w-auto" />
            </Link>
            <p className="mt-5 max-w-[36ch] text-krem/78">
              {MARKA.kurulus}&apos;dan beri {MARKA.sehir}. Bugün {IL_SAYISI} ilde {BAYI_SAYISI} listelenen bayi.
            </p>
            <Link
              href={CTA.birincil.href}
              className="mt-7 inline-block rounded-full bg-turuncu px-6 py-3 font-semibold text-murekkep shadow-turuncu transition-colors hover:bg-turuncu-koyu hover:text-krem"
            >
              {CTA.birincil.ad}
            </Link>
          </div>

          <nav aria-label="Alt gezinme">
            <h2 className="text-[0.78rem] font-semibold tracking-[0.18em] text-yesil-acik">SAYFALAR</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-krem/75 transition-colors hover:text-krem">
                    {n.ad}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kvkk" className="text-krem/75 transition-colors hover:text-krem">
                  KVKK ve gizlilik
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.78rem] font-semibold tracking-[0.18em] text-yesil-acik">ULAŞIM</h2>
            <ul className="mt-4 space-y-3.5 text-krem/75">
              {ILETISIM.hatlar.map((h) => (
                <li key={h.numara}>
                  <a href={h.href} className="flex items-start gap-2.5 transition-colors hover:text-krem">
                    <Phone size={18} className="mt-0.5 shrink-0 text-yesil-acik" aria-hidden />
                    <span>
                      <span className="rakam block">{h.numara}</span>
                      <span className="text-[0.82rem] text-soluk">{h.ad}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${ILETISIM.merkez.eposta}`} className="flex items-start gap-2.5 transition-colors hover:text-krem">
                  <EnvelopeSimple size={18} className="mt-0.5 shrink-0 text-yesil-acik" aria-hidden />
                  {ILETISIM.merkez.eposta}
                </a>
              </li>
              <li>
                <a href={ILETISIM.merkez.yol.href} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-krem">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-yesil-acik" aria-hidden />
                  <span className="max-w-[26ch]">{ILETISIM.merkez.adres}</span>
                </a>
              </li>
              <li>
                <a href={MARKA.instagram} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-krem">
                  <InstagramLogo size={18} className="mt-0.5 shrink-0 text-yesil-acik" aria-hidden />
                  {MARKA.sosyal}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-krem/12 pt-6 text-[0.85rem] text-soluk">
          <p>
            © {yil} {MARKA.ad} · {MARKA.tescil}
          </p>
        </div>
      </div>
    </footer>
  );
}
