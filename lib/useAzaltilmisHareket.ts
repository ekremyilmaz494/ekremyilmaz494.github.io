"use client";

import { useSyncExternalStore } from "react";

const SORGU = "(prefers-reduced-motion: reduce)";
const oku = () => window.matchMedia(SORGU).matches;
const sunucuda = () => false;
const aboneOl = (bildir: () => void) => {
  const sorgu = window.matchMedia(SORGU);
  sorgu.addEventListener("change", bildir);
  return () => sorgu.removeEventListener("change", bildir);
};

/** İlk hidratlama sunucuyla aynı; sistem tercihi değişince aboneler yeniden çizilir. */
export function useAzaltilmisHareket() {
  return useSyncExternalStore(aboneOl, oku, sunucuda);
}
