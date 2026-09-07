// -*- coding: utf-8 -*-
/** İÇİNDE NE VAR — üç katman: etsiz üretim, harcın içi, dürümün içi. Harcın tam içeriği
 *  marka teyidi beklediği için o sütun GEÇİCİ etiketiyle basılır; kalori tablosu yok. */
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import GeciciNot from "@/components/ui/GeciciNot";
import { MENU_ICINDEKILER, MENU_NOT, DURUM_ICI, HAKKIMIZDA } from "@/data/site";
import { LEZZET } from "@/data/franchise";

export default function IcindeNeVar() {
  return (
    <section
      id="icindekiler"
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="max-w-[14ch] font-display text-h2 font-extrabold text-krem">
                {MENU_ICINDEKILER.baslik}
              </h2>
            </Reveal>

            <Reveal gecikme={0.08}>
              <div className="mt-10 border-t border-krem/14 pt-6">
                <h3 className="font-display text-h3 font-bold text-yesil-acik">
                  {MENU_ICINDEKILER.etsizBaslik}
                </h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-krem/78">{HAKKIMIZDA.ilke.metin}</p>
              </div>
            </Reveal>

            <Reveal gecikme={0.14}>
              <div className="mt-8 border-t border-krem/14 pt-6">
                <h3 className="font-display text-h3 font-bold text-krem">{MENU_ICINDEKILER.durumBaslik}</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-krem/78">{MENU_ICINDEKILER.durumMetin}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {DURUM_ICI.map((m) => (
                    <li key={m} className="rounded-full bg-yesil/22 px-3.5 py-1.5 text-[0.88rem] font-semibold text-krem">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <Parallax mesafe={26}>
              <ClipFrame sekil="bant" sinif="aspect-[3/4]">
                <Picture
                  ad="malzeme"
                  alt={HAKKIMIZDA.ilke.fotoAlt}
                  mobil
                  genislik={1200}
                  yukseklik={1600}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                />
              </ClipFrame>
            </Parallax>

            <Reveal gecikme={0.1}>
              <div className="mt-8 rounded-kart bg-yesil-orta p-7 shadow-kart">
                <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-yesil-acik">
                  {MENU_ICINDEKILER.harcBaslik}
                </h3>
                <ul className="mt-4 grid gap-y-2 text-[0.96rem] text-krem/85 sm:grid-cols-2 sm:gap-x-6">
                  {LEZZET.malzeme.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-yesil-acik" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
                <GeciciNot>{LEZZET.malzemeGecici}</GeciciNot>
              </div>
            </Reveal>

            <Reveal gecikme={0.16}>
              <p className="mt-6 max-w-[46ch] text-[0.92rem] leading-relaxed text-soluk">{MENU_NOT.alerjen}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
