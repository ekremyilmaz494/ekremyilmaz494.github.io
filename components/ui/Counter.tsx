"use client";
// -*- coding: utf-8 -*-
/** SAYAÇ — görünüme girince 0'dan hedefe sayar. Sunucuda basılan metin ZATEN son değerdir:
 *  JS yoksa doğru sayı görünür, arama motoru doğru sayıyı okur. Sayım DOM'a doğrudan yazılır. */
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { sayi as bicimle } from "@/lib/tr";

export default function Counter({
  deger, sure = 1.5, onek = "", sonek = "", sinif,
}: {
  deger: number;
  sure?: number;
  onek?: string;
  sonek?: string;
  sinif?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const goruniyor = useInView(ref, { once: true, amount: 0.6 });
  const azalt = useReducedMotion();

  useEffect(() => {
    if (!goruniyor || azalt || !ref.current) return;
    const dugum = ref.current;
    const kontrol = animate(0, deger, {
      duration: sure,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { dugum.textContent = `${onek}${bicimle(Math.round(v))}${sonek}`; },
    });
    return () => kontrol.stop();
  }, [goruniyor, azalt, deger, sure, onek, sonek]);

  return (
    <span ref={ref} className={`rakam ${sinif ?? ""}`}>
      {onek}
      {bicimle(deger)}
      {sonek}
    </span>
  );
}
