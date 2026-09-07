// -*- coding: utf-8 -*-
/** BÜYÜKLER — panonun dört büyük paneli. Dördü eşit kart olarak dizilmez: Mega Dürüm
 *  bölümün başı olduğu için tam genişlikte durur ve künyesi görselin üstüne biner,
 *  ikili sıra ortada nefes aldırır, Aile Porsiyon metni en uzun olan panel olduğu için
 *  yarım yarıma yerleşir. Böylece satır aralarında ölü boşluk kalmaz. */
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import Reveal from "@/components/ui/Reveal";
import MaskReveal from "@/components/ui/MaskReveal";
import Parallax from "@/components/ui/Parallax";
import TiltCard from "@/components/ui/TiltCard";
import { MENU_PANO, MENU_SAYFA } from "@/data/site";

const [MEGA, EKO, AILE_DURUM, AILE_PORSIYON] = MENU_PANO;

function Kunye({ p, koyu }: { p: (typeof MENU_PANO)[number]; koyu?: boolean }) {
  return (
    <>
      {p.ust && (
        <p className={`text-[0.8rem] font-semibold uppercase tracking-[0.16em] ${koyu ? "text-turuncu" : "text-turuncu-koyu"}`}>
          {p.ust}
        </p>
      )}
      <h3 className={`mt-1.5 font-display text-h3 font-extrabold ${koyu ? "text-krem" : ""}`}>
        {p.ad}
        {p.gramaj && (
          <span className={`rakam ml-2.5 align-middle text-[0.58em] font-bold ${koyu ? "text-soluk" : "text-soluk-koyu"}`}>
            {p.gramaj}
          </span>
        )}
      </h3>
      <p className={`mt-3 max-w-[36ch] leading-relaxed ${koyu ? "text-krem/75" : "text-murekkep/72"}`}>{p.satir}</p>
      {p.satir2 && <p className={`mt-1 font-semibold ${koyu ? "text-turuncu" : "text-turuncu-koyu"}`}>{p.satir2}</p>}
      {p.kucuk && <p className={`mt-3 text-[0.88rem] ${koyu ? "text-soluk" : "text-soluk-koyu"}`}>{p.kucuk}</p>}
      {p.lavas === 2 && (
        <p className={`mt-4 inline-flex rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold ${koyu ? "bg-krem/12 text-krem" : "bg-yesil/12 text-yesil-koyu"}`}>
          Çift lavaş
        </p>
      )}
    </>
  );
}

export default function PanoBento() {
  return (
    <section
      id="pano"
      data-zemin="krem-koyu"
      className="relative isolate overflow-x-clip bg-krem-koyu py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-h2 font-extrabold">{MENU_SAYFA.panoBaslik}</h2>
        </Reveal>

        {/* Mega Dürüm: bölümün başı, künye görselin üstüne biner */}
        <MaskReveal yon="yukari" sinif="mt-12 md:mt-14">
          <div className="relative">
            <ClipFrame sekil="bant" sinif="aspect-[16/9] md:aspect-[21/9]">
              <Picture
                ad={MEGA.foto[0]}
                alt={MEGA.alt[0]}
                mobil
                genislik={1600}
                yukseklik={1067}
                sizes="100vw"
                konum="46% 52%"
              />
            </ClipFrame>
            <div className="relative z-10 -mt-8 w-full rounded-kart bg-yesil-koyu p-7 shadow-kart md:absolute md:bottom-7 md:right-7 md:mt-0 md:w-[26rem] md:p-8">
              <Kunye p={MEGA} koyu />
            </div>
          </div>
        </MaskReveal>

        {/* İkili sıra */}
        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {[EKO, AILE_DURUM].map((p, i) => (
            <Reveal key={p.ad} gecikme={i * 0.08}>
              <TiltCard siddet={6} sinif="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-kart bg-krem shadow-krem">
                  <div className="aspect-[3/2]">
                    <Picture
                      ad={p.foto[0]}
                      alt={p.alt[0]}
                      mobil
                      genislik={1600}
                      yukseklik={1067}
                      sizes="(max-width: 768px) 100vw, 44vw"
                    />
                  </div>
                  <div className="p-7">
                    <Kunye p={p} />
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Aile Porsiyon: tepsinin toplam gramajı sayı olarak konuşur */}
        <div className="mt-14 grid items-center gap-8 md:mt-16 md:grid-cols-[0.82fr_1.18fr] md:gap-12">
          <Reveal>
            <Kunye p={AILE_PORSIYON} />
            <p className="rakam mt-7 font-display text-[clamp(3rem,6vw,5rem)] font-black leading-[0.85] tracking-tight text-yesil">
              1500
              <span className="ml-2 align-top text-[0.26em] font-bold text-soluk-koyu">gram toplam</span>
            </p>
          </Reveal>
          <MaskReveal yon="sag">
            <Parallax mesafe={18}>
              <ClipFrame sekil="saget" sinif="aspect-[16/10]">
                <Picture
                  ad={AILE_PORSIYON.foto[0]}
                  alt={AILE_PORSIYON.alt[0]}
                  mobil
                  genislik={1600}
                  yukseklik={1000}
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </ClipFrame>
            </Parallax>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
