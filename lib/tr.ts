// -*- coding: utf-8 -*-
/** TÜRKÇE YARDIMCILARI — sıralama, sayı ve para biçimi. */
export const trSirala = (a: string, b: string) => a.localeCompare(b, "tr");

const SAYI = new Intl.NumberFormat("tr-TR");
export const sayi = (n: number) => SAYI.format(n);

/** Tutar: 189000 → "189.000 ₺". Kuruş gösterilmez. */
export const para = (n: number) => `${SAYI.format(n)} ₺`;

/** Slug: URL ve dosya adları için. */
export const slug = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
