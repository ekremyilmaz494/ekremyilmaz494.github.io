"use client";

// -*- coding: utf-8 -*-
/** HEDİYE — sözleşmeye bağlı %10. Oran yazıyla değil şeritle anlatılıyor: on kutu sizin,
 *  on birincisi markadan. Kutular kaydırma ilerledikçe sırayla dolar, sonuncusu sarı yanar.
 *  Sayılar saf aritmetik; satış miktarları ÖRNEK olduğu için tabloda öyle etiketli. */

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Gift } from "@phosphor-icons/react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { HEDIYE } from "@/data/franchise";

const TOPLAM = HEDIYE.seritSatilan + 1;

/** Kutu i, ilerlemenin kendi dilimine gelince dolar. Aralık 0 ve 1'i kapsar ki
 *  ilerleme uçlarda başa sarmasın. */
function Kutu({ i, ilerleme }: { i: number; ilerleme: MotionValue<number> }) {
  const hediye = i === TOPLAM - 1;
  const a = 0.12 + (i / TOPLAM) * 0.6;
  const b = a + 0.1;
  const dolu = useTransform(ilerleme, [0, a, b, 1], [0, 0, 1, 1]);
  const yukseklik = useTransform(dolu, (v) => `${v * 100}%`);

  return (
    <li
      className={`relative aspect-[3/4] overflow-hidden rounded-alan border ${
        hediye ? "border-sari/70 bg-sari/8" : "border-krem/22 bg-krem/4"
      }`}
    >
      <motion.span
        aria-hidden
        style={{ height: yukseklik }}
        className={`absolute inset-x-0 bottom-0 ${hediye ? "bg-sari" : "bg-yesil"}`}
      />
      {hediye && (
        <motion.span
          style={{ opacity: dolu }}
          className="absolute inset-0 flex items-center justify-center text-murekkep"
        >
          <Gift size={22} weight="fill" aria-hidden />
        </motion.span>
      )}
    </li>
  );
}

export default function Hediye() {
  const kap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: kap, offset: ["start 88%", "start 25%"] });

  return (
    <section
      id="hediye"
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{HEDIYE.ust}</Eyebrow>
            </Reveal>
            <Reveal gecikme={0.06}>
              <h2 className="mt-4 max-w-[14ch] font-display text-h2 font-extrabold text-krem">{HEDIYE.baslik}</h2>
            </Reveal>
            <Reveal gecikme={0.12}>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-krem/78">{HEDIYE.lead}</p>
              <p className="mt-3 max-w-[46ch] text-[0.92rem] leading-relaxed text-soluk">{HEDIYE.kural}</p>
            </Reveal>
          </div>

          <div ref={kap}>
            <ul className="grid grid-cols-11 gap-1.5 sm:gap-2" aria-hidden>
              {Array.from({ length: TOPLAM }, (_, i) => (
                <Kutu key={i} i={i} ilerleme={scrollYProgress} />
              ))}
            </ul>
            <p className="sr-only">
              {HEDIYE.seritEtiket.satilan}, {HEDIYE.seritEtiket.hediye}.
            </p>
            <div className="mt-4 flex justify-between text-[0.84rem] font-semibold">
              <span className="text-soluk">{HEDIYE.seritEtiket.satilan}</span>
              <span className="text-sari">{HEDIYE.seritEtiket.hediye}</span>
            </div>

            <table className="mt-10 w-full border-t border-krem/14 text-left">
              <caption className="pb-4 text-left text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-soluk">
                {HEDIYE.ornekBaslik}
              </caption>
              <thead>
                <tr className="text-[0.8rem] uppercase tracking-[0.1em] text-soluk">
                  <th scope="col" className="py-3 font-semibold">Aylık satış</th>
                  <th scope="col" className="py-3 font-semibold">Hediye</th>
                  <th scope="col" className="py-3 text-right font-semibold">Yılda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-krem/10">
                {HEDIYE.ornekler.map((o) => (
                  <tr key={o.aylik} className="rakam">
                    <td className="py-3.5 text-krem/78">{o.aylik}</td>
                    <td className="py-3.5 font-semibold text-sari">{o.hediye}</td>
                    <td className="py-3.5 text-right font-semibold text-krem">{o.yillik}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[0.85rem] text-soluk">{HEDIYE.ornekNot}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
