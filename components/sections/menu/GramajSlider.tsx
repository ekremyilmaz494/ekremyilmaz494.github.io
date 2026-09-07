"use client";

// -*- coding: utf-8 -*-
/** DÜRÜMLER — panonun alt tablosu, kaydırıcıyla. Dört gramaj arasında gezinirken dürüm
 *  görseli aynı oranda büyür ve 150 g'da "çift lavaş" rozeti yanar: fark okunmadan görülür.
 *  Değer sürekli değil (dört durak) → useState uygundur. JS yoksa düz tablo gösterilir. */

import { useId, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";
import Picture from "@/components/ui/Picture";
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import { MENU_DURUM, MENU_SAYFA, DURUM_ICI } from "@/data/site";
import { YAY } from "@/lib/motion";

/** 75 g en küçük duraktır; ölçek gramajın karekökü ile artar ki büyüme göze doğru gelsin. */
const OLCEK = MENU_DURUM.map((u) => {
  const g = parseInt(u.gramaj, 10);
  return 0.68 + 0.32 * Math.sqrt((g - 75) / 100);
});

export default function GramajSlider() {
  const [i, setI] = useState(1);
  const secili = MENU_DURUM[i];
  const kimlik = useId();

  return (
    <section
      id="durumler"
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-h2 font-extrabold text-krem">{MENU_SAYFA.durumUst}</h2>
        </Reveal>

        {/* --- kaydırıcılı hâl --- */}
        <div className="nojs:hidden mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="relative flex h-[46svh] min-h-[16rem] items-center justify-center lg:h-[58svh]">
            <motion.div
              className="h-full w-full max-w-[34rem] origin-center"
              animate={{ scale: OLCEK[i] }}
              transition={{ type: "spring", ...YAY }}
            >
              <Picture
                ad="hero-durum"
                alt="Kesilmiş çiğköfte dürümü; içinde marul, maydanoz, mor lahana ve mısır"
                mobil
                kesik
                genislik={1600}
                yukseklik={1600}
                sizes="(max-width: 1024px) 86vw, 40vw"
                uydur="contain"
                sinif="drop-shadow-[0_34px_70px_rgb(9_20_5/0.6)]"
              />
            </motion.div>
          </div>

          <div>
            <p className="rakam font-display text-sayi font-black leading-none text-krem">
              {parseInt(secili.gramaj, 10)}
              <span className="ml-2 align-top text-[0.28em] font-bold text-yesil-acik">gram</span>
            </p>

            <div className="mt-8">
              <label htmlFor={kimlik} className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-soluk">
                Gramajı seç
              </label>
              <input
                id={kimlik}
                type="range"
                min={0}
                max={MENU_DURUM.length - 1}
                step={1}
                value={i}
                onChange={(e) => setI(Number(e.currentTarget.value))}
                aria-valuetext={`${secili.gramaj} dürüm, ${secili.lavas === 2 ? "çift lavaş" : "tek lavaş"}`}
                className="gramaj-kaydirici mt-4 w-full"
              />
              <ul className="mt-3 flex justify-between text-[0.82rem] font-semibold text-soluk">
                {MENU_DURUM.map((u, n) => (
                  <li key={u.gramaj} aria-hidden className={n === i ? "text-yesil-acik" : undefined}>
                    {u.gramaj}
                  </li>
                ))}
              </ul>
            </div>

            <p aria-live="polite" className="sr-only">
              {secili.gramaj} dürüm, {secili.lavas === 2 ? "çift lavaş" : "tek lavaş"}.
            </p>

            <div
              className={`mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors duration-300 ${
                secili.lavas === 2 ? "bg-sari text-murekkep" : "border border-krem/18 text-soluk"
              }`}
            >
              <CheckCircle size={17} weight="bold" aria-hidden />
              {secili.lavas === 2 ? "Çift lavaş" : "Tek lavaş"}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {DURUM_ICI.map((m) => (
                <li key={m} className="rounded-full border border-krem/18 px-3.5 py-1.5 text-[0.86rem] text-krem/75">
                  {m}
                </li>
              ))}
            </ul>

            <GeciciNot sinif="max-w-[44ch]">
              {MENU_SAYFA.lavasNot} Çift lavaşın {MENU_SAYFA.lavasGecici}.
            </GeciciNot>
          </div>
        </div>

        {/* --- JS yokken: düz tablo --- */}
        <div className="hidden nojs:block">
          <ul className="mt-10 divide-y divide-krem/12 border-y border-krem/12">
            {MENU_DURUM.map((u) => (
              <li key={u.gramaj} className="flex items-baseline justify-between gap-4 py-4">
                <span className="rakam font-display text-[1.5rem] font-extrabold text-krem">{u.gramaj}</span>
                <span className="text-[0.92rem] text-krem/78">
                  {u.lavas === 2 ? "Çift lavaş" : "Tek lavaş"} · {DURUM_ICI.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
