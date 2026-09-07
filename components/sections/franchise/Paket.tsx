// -*- coding: utf-8 -*-
/** PAKET — "bu bedele ne dahil" sorusunun tam cevabı, kalem kalem. Üç grup üç sütun değil:
 *  kalem sayıları eşit olmadığı için sütunlar farklı ağırlıkta ve liste sayıyla açılıyor. */
import Picture from "@/components/ui/Picture";
import ClipFrame, { type SekilAdi } from "@/components/ui/ClipFrame";
import Reveal from "@/components/ui/Reveal";
import MaskReveal from "@/components/ui/MaskReveal";
import { MALIYET, PAKET, PAKET_TOPLAM } from "@/data/franchise";

const GORSELLER: readonly { ad: string; alt: string; sekil: SekilAdi }[] = [
  { ad: "franchise-tezgah", alt: "Soğutuculu ön tezgâh ve arka tezgâh; üstünde ışıklı menü panosu", sekil: "kama" },
  { ad: "franchise-tabela", alt: "Pleksi zemin üzerine kutu harf tabela ve kayan yazılı LED", sekil: "bant" },
  { ad: "franchise-vitrin", alt: "Cam giydirmeli cephe ve vitrin düzeni", sekil: "kirpik" },
];

export default function Paket() {
  return (
    <section
      id="paket"
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-[12ch] font-display text-h2 font-extrabold">{MALIYET.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.08} sinif="lg:self-end">
            <p className="max-w-[52ch] leading-relaxed text-murekkep/70">{MALIYET.metin}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-14 md:gap-6">
          {GORSELLER.map((g, i) => (
            <MaskReveal key={g.ad} yon="yukari" gecikme={i * 0.09}>
              <ClipFrame sekil={g.sekil} sinif="aspect-[4/3]">
                <Picture
                  ad={g.ad}
                  alt={g.alt}
                  genislik={1200}
                  yukseklik={900}
                  sizes="(max-width: 640px) 100vw, 31vw"
                />
              </ClipFrame>
            </MaskReveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-murekkep/12 pt-12 md:mt-16 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:gap-12">
          {PAKET.map((grup, gi) => (
            <Reveal key={grup.ad} gecikme={gi * 0.08}>
              <h3 className="font-display text-h3 font-extrabold">{grup.ad}</h3>
              <ol className="mt-5 space-y-2.5">
                {grup.kalemler.map((k, i) => (
                  <li key={k} className="flex gap-3 text-[0.96rem] leading-snug text-murekkep/78">
                    <span className="rakam w-5 shrink-0 pt-px text-[0.78rem] font-bold text-turuncu-koyu">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {k}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        <Reveal gecikme={0.1}>
          <dl className="mt-14 grid gap-8 border-t border-murekkep/12 pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-soluk-koyu">
                Mobilya ve donanım
              </dt>
              <dd className="rakam mt-2 font-display text-[2.4rem] font-black leading-none text-yesil">
                {PAKET_TOPLAM.kalem}
                <span className="ml-2 text-[0.34em] font-bold text-soluk-koyu">kalem</span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-soluk-koyu">Mutfak</dt>
              <dd className="rakam mt-2 font-display text-[2.4rem] font-black leading-none text-yesil">
                {PAKET_TOPLAM.mutfak}
                <span className="ml-2 text-[0.34em] font-bold text-soluk-koyu">parça</span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-soluk-koyu">
                Cam giydirme
              </dt>
              <dd className="rakam mt-2 font-display text-[2.4rem] font-black leading-none text-yesil">
                {PAKET_TOPLAM.cam}
              </dd>
            </div>
          </dl>
          <p className="mt-8 max-w-[52ch] text-[0.9rem] leading-relaxed text-soluk-koyu">{MALIYET.not}</p>
        </Reveal>
      </div>
    </section>
  );
}
