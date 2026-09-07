"use client";

// -*- coding: utf-8 -*-
/** SÜREÇ — üç adım, üçü de kaynaklı. Adımlar arasındaki çizgi kaydırdıkça çizilir;
 *  yedi adıma şişirilmiş sahte bir yol haritası yerine gerçekte olan üç adım. */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { SUREC } from "@/data/franchise";

export default function Surec() {
  const kap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: kap, offset: ["start 80%", "end 60%"] });
  const uzunluk = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0, 1, 1]);

  return (
    <section
      id="surec"
      data-zemin="turuncu"
      className="relative isolate overflow-x-clip bg-turuncu py-24 text-murekkep md:py-28"
    >
      <div className="oluklu absolute inset-x-0 top-0 h-3 opacity-60" aria-hidden />

      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-[13ch] font-display text-h2 font-extrabold">Başvurunca ne oluyor?</h2>
        </Reveal>

        <div ref={kap} className="relative mt-14 md:mt-16">
          {/* Adımları birbirine bağlayan çizgi: mobilde dikey, masaüstünde yatay */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 top-[3.875rem] hidden h-0.5 w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 1"
          >
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="rgb(21 32 15 / 0.22)" strokeWidth="1" />
            <motion.line
              x1="0" y1="0.5" x2="100" y2="0.5"
              stroke="var(--color-murekkep)"
              strokeWidth="1"
              style={{ pathLength: uzunluk }}
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-10 md:pt-10">
            {SUREC.map((s, i) => (
              <Reveal as="li" key={s.ad} gecikme={i * 0.1}>
                <span className="rakam inline-flex h-11 w-11 items-center justify-center rounded-full bg-murekkep font-display text-[1.05rem] font-extrabold text-krem">
                  {i + 1}
                </span>
                <h3 className="mt-5 max-w-[18ch] font-display text-h3 font-extrabold">{s.ad}</h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-murekkep">{s.metin}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
