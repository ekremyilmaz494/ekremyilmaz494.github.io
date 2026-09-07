"use client";
// -*- coding: utf-8 -*-
/** ZEMİN GEÇİŞİ — sayfa zemini kaydırdıkça bölümün rengine yumuşak geçer.
 *  Bölüm yamaları yerine tek bir yolculuk hissi verir: <Section bg="krem"> `data-zemin` yazar,
 *  burası ekranın ortasındaki bölümü izleyip `<body>` üzerindeki --zemin değişkenini günceller.
 *  JS yoksa hiçbir şey olmaz; bölümlerin kendi arka planı zaten var. */
import { useEffect } from "react";

const RENK: Record<string, string> = {
  "yesil-koyu": "var(--color-yesil-koyu)",
  "yesil-orta": "var(--color-yesil-orta)",
  krem: "var(--color-krem)",
  "krem-koyu": "var(--color-krem-koyu)",
  turuncu: "var(--color-turuncu)",
};

export default function ZeminGecis() {
  useEffect(() => {
    const bolumler = Array.from(document.querySelectorAll<HTMLElement>("[data-zemin]"));
    if (!bolumler.length) return;

    let sonuncu = "";
    const yaz = () => {
      const orta = window.innerHeight / 2;
      // Ekranın ortasını kesen son bölüm kazanır; hiçbiri kesmiyorsa ilk bölüm.
      let secili = bolumler[0];
      for (const b of bolumler) {
        const k = b.getBoundingClientRect();
        if (k.top <= orta && k.bottom > orta) secili = b;
      }
      const ad = secili.dataset.zemin ?? "yesil-koyu";
      if (ad !== sonuncu) {
        sonuncu = ad;
        document.body.style.setProperty("--zemin", RENK[ad] ?? RENK["yesil-koyu"]);
      }
    };

    let bekleyen = false;
    const kaydir = () => {
      if (bekleyen) return;
      bekleyen = true;
      requestAnimationFrame(() => { bekleyen = false; yaz(); });
    };

    yaz();
    window.addEventListener("scroll", kaydir, { passive: true });
    window.addEventListener("resize", kaydir);
    return () => {
      window.removeEventListener("scroll", kaydir);
      window.removeEventListener("resize", kaydir);
    };
  }, []);

  return null;
}
