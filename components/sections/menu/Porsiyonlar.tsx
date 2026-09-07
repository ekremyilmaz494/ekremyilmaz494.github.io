// -*- coding: utf-8 -*-
/** PORSİYONLAR — panonun üst tablosu. Dört gramaj; sayı yerine BÜYÜYEN bir bant
 *  gösterilir, böylece 250 ile 1000 arasındaki fark okunmadan görülür. */
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import Reveal from "@/components/ui/Reveal";
import MaskReveal from "@/components/ui/MaskReveal";
import { MENU_PORSIYON, MENU_SAYFA } from "@/data/site";

const EN_BUYUK = 1000;

export default function Porsiyonlar() {
  return (
    <section
      id="porsiyonlar"
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto grid max-w-[var(--container-site)] items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <MaskReveal yon="yukari" sinif="order-2 lg:order-1">
          <ClipFrame sekil="kirpik" sinif="aspect-[4/5]">
            <Picture
              ad="porsiyon-tabak"
              alt="Tabakta çiğköfte porsiyonu; yanında göbek marul, limon ve maydanoz"
              mobil
              genislik={1400}
              yukseklik={1750}
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </ClipFrame>
        </MaskReveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="font-display text-h2 font-extrabold">{MENU_SAYFA.porsiyonUst}</h2>
          </Reveal>

          <ul className="mt-10 divide-y divide-murekkep/12 border-y border-murekkep/12">
            {MENU_PORSIYON.map((g, i) => {
              const gram = parseInt(g, 10);
              const oran = Math.round((gram / EN_BUYUK) * 100);
              return (
                <Reveal as="li" key={g} gecikme={i * 0.07} y={16}>
                  <div className="flex items-center gap-5 py-5">
                    <span className="rakam w-[5.5rem] shrink-0 font-display text-[1.7rem] font-extrabold leading-none tracking-tight">
                      {gram}
                      <span className="ml-1 text-[0.8rem] font-bold text-soluk-koyu">g</span>
                    </span>
                    <span className="relative h-3.5 flex-1 overflow-hidden rounded-full bg-murekkep/8">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-yesil"
                        style={{ width: `${oran}%` }}
                      />
                    </span>
                    <span className="w-[4.5rem] shrink-0 text-right text-[0.82rem] font-semibold text-soluk-koyu">
                      tabakta
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal gecikme={0.2}>
            <p className="mt-7 max-w-[48ch] text-[0.95rem] leading-relaxed text-murekkep/62">
              {MENU_SAYFA.porsiyonNot}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
