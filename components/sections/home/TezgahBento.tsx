// -*- coding: utf-8 -*-
/** TEZGÂH — menü panosunun beş paneli asimetrik bir bento düzeninde. Hücre sayısı içerik
 *  sayısına eşittir; boş kutu ya da dolgu kart yoktur. Dört hücre görselli, biri tipografik. */
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Picture from "@/components/ui/Picture";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { ANA, ANTEPPARE, MENU_PANO, MENU_PORSIYON, DURUM_ICI } from "@/data/site";

const PANO = Object.fromEntries(MENU_PANO.map((p) => [p.ad, p]));

/** Kenardan kenara ürün panosu hücresi. Yerleşim `yer` sınıfıyla verilir. */
function Hucre({ yer, children, sinif = "" }: { yer: string; children: React.ReactNode; sinif?: string }) {
  return (
    <div className={`relative overflow-hidden ${yer} ${sinif}`}>{children}</div>
  );
}

export default function TezgahBento() {
  const mega = PANO["Mega Dürüm"];
  const ailePorsiyon = PANO["Aile Porsiyon"];
  const eko = PANO["Eko Dürüm"];

  return (
    <section data-zemin="krem" className="relative bg-krem pt-16 pb-10 text-murekkep md:pt-20">
      <div className="w-full">
        <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-[5.5vw]">
          <Reveal>
            <h2 className="max-w-[19ch] font-display text-h2 font-extrabold">{ANA.tezgah.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.1}>
            <Link
              href={ANA.tezgah.tumMenu.href}
              className="group inline-flex items-center gap-2 border-b-2 border-turuncu pb-1 font-semibold transition-colors hover:text-turuncu-koyu"
            >
              {ANA.tezgah.tumMenu.ad}
              <ArrowUpRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <Reveal y={30} gecikme={0.08}>
          <div className="mt-10 grid grid-cols-1 gap-1 lg:h-[64rem] lg:grid-cols-4 lg:grid-rows-3">
              {/* A · Anteppare: panonun özel ürünü, en büyük hücre */}
              <Hucre yer="lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1" sinif="min-h-[22rem] bg-bordo text-krem">
                <TiltCard siddet={5} kaldir={4} sinif="absolute inset-0">
                  <Picture
                    ad="anteppare-kutu"
                    alt="Kırmızı Anteppare kutusunda lavaşa sarılı çiğköfte lokmaları; üstünde yoğurt ve kajun sos, turşu, mor lahana, mısır"
                    mobil
                    genislik={1600}
                    yukseklik={1195}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    konum="50% 26%"
                    sinif="scale-105"
                  />
                </TiltCard>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(20_6_10/0.92)] via-[rgb(20_6_10/0.55)] to-transparent p-7 pt-24">
                  <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-sari">
                    {ANTEPPARE.gramaj.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-display text-h3 font-bold">{ANTEPPARE.ad}</h3>
                  <p className="mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed text-krem/80">
                    {ANTEPPARE.icindekiler.join(" · ")}
                  </p>
                </div>
              </Hucre>

              {/* B · Mega Dürüm */}
              <Hucre yer="lg:col-span-2 lg:col-start-3 lg:row-start-1" sinif="min-h-[14rem] bg-murekkep text-krem">
                <Picture
                  ad="mega-durum"
                  alt={mega.alt[0]}
                  mobil
                  genislik={1600}
                  yukseklik={1073}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  konum="50% 42%"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-[rgb(10_16_7/0.9)] via-[rgb(10_16_7/0.35)] to-transparent p-7">
                  <p className="rakam text-[0.72rem] font-semibold tracking-[0.2em] text-sari">
                    {mega.gramaj} · ÇİFT LAVAŞ
                  </p>
                  <h3 className="mt-2 font-display text-h3 font-bold">{mega.ad}</h3>
                  <p className="mt-1.5 max-w-[30ch] text-[0.95rem] text-krem/80">{mega.satir}</p>
                </div>
              </Hucre>

              {/* C · Aile Porsiyon */}
              <Hucre yer="lg:col-start-3 lg:row-start-2 lg:row-span-2" sinif="min-h-[16rem] bg-yesil-koyu text-krem">
                <Picture
                  ad="aile-porsiyon"
                  alt={ailePorsiyon.alt[0]}
                  mobil
                  genislik={1400}
                  yukseklik={1045}
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  konum="50% 46%"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgb(10_16_7/0.92)] via-[rgb(10_16_7/0.3)] to-transparent p-6">
                  <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-sari">
                    {ailePorsiyon.ust?.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-display text-h3 font-bold">{ailePorsiyon.ad}</h3>
                  <p className="rakam mt-1 text-[0.95rem] text-krem/80">{ailePorsiyon.satir}</p>
                </div>
              </Hucre>

              {/* D · Porsiyon ölçeği: görsel değil, tipografik. Gramaj arttıkça çubuk uzar. */}
              <Hucre yer="lg:col-start-4 lg:row-start-2 lg:row-span-2" sinif="min-h-[16rem] bg-krem-koyu">
                <div className="flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-turuncu-koyu">PORSİYONLAR</p>
                    <h3 className="mt-2 font-display text-h3 font-bold">Tabakta çiğköfte</h3>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {MENU_PORSIYON.map((g, i) => (
                      <li key={g} className="flex items-center gap-3">
                        <span
                          className="h-2 rounded-full bg-turuncu"
                          style={{ width: `${28 + i * 22}%` }}
                          aria-hidden
                        />
                        <span className="rakam shrink-0 text-[0.9rem] font-semibold">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Hucre>

              {/* E · Eko Dürüm */}
              <Hucre yer="lg:col-span-2 lg:col-start-1 lg:row-start-3" sinif="min-h-[14rem] bg-murekkep text-krem">
                <Picture
                  ad="eko-durum"
                  alt={eko.alt[0]}
                  mobil
                  genislik={1400}
                  yukseklik={1400}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  konum="42% 50%"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-[rgb(10_16_7/0.9)] via-[rgb(10_16_7/0.3)] to-transparent p-7">
                  <p className="rakam text-[0.72rem] font-semibold tracking-[0.2em] text-sari">{eko.gramaj}</p>
                  <h3 className="mt-2 font-display text-h3 font-bold">{eko.ad}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-krem/80">{eko.satir}</p>
                </div>
              </Hucre>
          </div>
        </Reveal>

        <Reveal gecikme={0.12}>
          <p className="mt-8 mx-5 md:mx-[5.5vw] max-w-[62ch] text-[0.95rem] text-murekkep/65">
            Her dürümün içi aynı: {DURUM_ICI.join(", ").toLocaleLowerCase("tr-TR")}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
