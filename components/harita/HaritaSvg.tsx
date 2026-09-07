"use client";
// -*- coding: utf-8 -*-
/** TÜRKİYE HARİTASI — 81 il tek SVG. Bayisi olan iller yanar; seçili il vurgulanır.
 *  `onSec` verilirse iller düğme gibi davranır (klavye ile gezilebilir, `aria-pressed` taşır);
 *  verilmezse harita salt görseldir ve ekran okuyucudan gizlenir (bilgi yanındaki listede yazılı). */
import { motion, useReducedMotion } from "motion/react";
import { HARITA_VIEWBOX, IL_YOLLARI } from "@/data/harita";
import merkezler from "@/data/harita-merkez.json";
import { cn } from "@/lib/cn";

type Merkez = { ad: string; x: number; y: number };
const MERKEZ = merkezler as Record<string, Merkez>;

type Props = {
  yanan: readonly number[];
  secili?: number | null;
  onSec?: (plaka: number) => void;
  /** Yanma sırası: verilirse iller bu sırayla belirir. */
  sira?: readonly number[];
  sinif?: string;
};

export default function HaritaSvg({ yanan, secili, onSec, sira, sinif }: Props) {
  const azalt = useReducedMotion();
  const yananKume = new Set(yanan);
  const gecikme = (plaka: number) => {
    if (azalt || !sira) return 0;
    const i = sira.indexOf(plaka);
    return i < 0 ? 0 : 0.25 + i * 0.045;
  };

  return (
    <svg
      viewBox={HARITA_VIEWBOX}
      className={cn("h-auto w-full", sinif)}
      role={onSec ? "group" : "presentation"}
      aria-label={onSec ? "Türkiye haritası, il seçin" : undefined}
      aria-hidden={onSec ? undefined : true}
      focusable="false"
    >
      {IL_YOLLARI.map((il) => {
        const acik = yananKume.has(il.plaka);
        const bu = secili === il.plaka;
        const yol = (
          <motion.path
            data-harita-il
            d={il.d}
            initial={acik && !azalt ? { opacity: 0.16 } : false}
            whileInView={acik ? { opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: gecikme(il.plaka), ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "harita-il-yolu transition-[fill,stroke] duration-200",
              bu
                ? "fill-sari stroke-krem"
                : acik
                  ? "fill-yesil-acik stroke-yesil-koyu hover:fill-sari"
                  : "fill-krem/14 stroke-yesil-koyu"
            )}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        );

        const merkez = MERKEZ[String(il.plaka)];
        const etiket = merkez && (
          <text
            data-harita-etiket
            x={merkez.x}
            y={merkez.y}
            dy="0.32em"
            textAnchor="middle"
            aria-hidden="true"
            className={cn(
              "harita-il-etiket",
              bu ? "harita-il-etiket--secili" : acik ? "harita-il-etiket--acik" : "harita-il-etiket--kapali"
            )}
          >
            {il.ad}
          </text>
        );

        if (!onSec) return <g key={il.plaka}>{yol}{etiket}</g>;

        return (
          <g
            key={il.plaka}
            role="button"
            tabIndex={acik ? 0 : -1}
            aria-label={`${il.ad}${acik ? "" : ", bayi yok"}`}
            aria-pressed={bu}
            aria-disabled={!acik}
            onClick={() => acik && onSec(il.plaka)}
            onKeyDown={(e) => {
              if (acik && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSec(il.plaka); }
            }}
            className={cn("harita-il-grup outline-none", acik ? "cursor-pointer" : "cursor-default")}
          >
            <title>{`${il.ad}${acik ? " — şubeleri görmek için seçin" : " — henüz bayi yok"}`}</title>
            {yol}
            {etiket}
          </g>
        );
      })}
    </svg>
  );
}
