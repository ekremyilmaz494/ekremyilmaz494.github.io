// -*- coding: utf-8 -*-
/** HAREKET SABİTLERİ — tek kaynak. Sayfa boyunca aynı yumuşama ve aynı görünme eşiği kullanılır. */
import type { Transition } from "motion/react";

/** Çıkış eğrisi: hızlı başlar, uzun yavaşlar. globals.css'teki --ease-cikis ile aynı. */
export const CIKIS = [0.16, 1, 0.3, 1] as const;
export const GIRIS_CIKIS = [0.65, 0, 0.35, 1] as const;

export const GECIS: Transition = { duration: 0.8, ease: CIKIS };
export const GECIS_KISA: Transition = { duration: 0.45, ease: CIKIS };
export const YAY = { stiffness: 160, damping: 18, mass: 0.6 } as const;

/** Görünme eşiği: bölüm ekranın altından bir miktar girince başlar, bir kez oynar. */
export const GORUNUM = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;

/** Sıralı gecikme; listelerde kart başına. */
export const sira = (i: number, adim = 0.07) => ({ ...GECIS, delay: i * adim });
