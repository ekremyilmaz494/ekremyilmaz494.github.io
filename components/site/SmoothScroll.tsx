"use client";
// -*- coding: utf-8 -*-
/** Akıcı kaydırma yalnız fareli masaüstünde ve hareket izni varken kurulur.
 * Tercih değişiminde sayfa ağacı korunur; doldurulmuş form sıfırlanmaz. */
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useAzaltilmisHareket } from "@/lib/useAzaltilmisHareket";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const azalt = useAzaltilmisHareket();

  useEffect(() => {
    if (azalt) return;
    const fare = window.matchMedia("(hover: hover) and (pointer: fine)");
    let lenis: Lenis | undefined;
    const guncelle = () => {
      lenis?.destroy();
      lenis = fare.matches ? new Lenis({
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,
        touchMultiplier: 1.6,
        anchors: { offset: -84 },
      }) : undefined;
    };
    guncelle();
    fare.addEventListener("change", guncelle);
    return () => { fare.removeEventListener("change", guncelle); lenis?.destroy(); };
  }, [azalt]);

  return <MotionConfig reducedMotion={azalt ? "always" : "never"}>{children}</MotionConfig>;
}
