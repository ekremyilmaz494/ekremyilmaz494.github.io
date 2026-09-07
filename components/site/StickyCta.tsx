"use client";

// -*- coding: utf-8 -*-
/** MOBİL YAPIŞKAN CTA — yalnız /franchise. Hero geçilince görünür, başvuru bölümü
 *  ekrana girince gizlenir (çubuk formu örtmesin). JS yoksa hiç render edilmez. */

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function StickyCta({
  href = "#basvuru",
  etiket,
  tetik = "#franchise-hero",
}: {
  href?: string;
  etiket: string;
  tetik?: string;
}) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(tetik);
    const hedef = document.querySelector(href.startsWith("#") ? href : "#basvuru");
    if (!hero || !hedef) return;
    let heroGecti = false;
    let hedefGorunur = false;
    const guncelle = () => setGorunur(heroGecti && !hedefGorunur);
    const io1 = new IntersectionObserver(([e]) => {
      heroGecti = !e.isIntersecting && e.boundingClientRect.bottom < 0;
      guncelle();
    });
    const io2 = new IntersectionObserver(
      ([e]) => { hedefGorunur = e.isIntersecting; guncelle(); },
      { rootMargin: "0px 0px -30% 0px" }
    );
    io1.observe(hero);
    io2.observe(hedef);
    return () => { io1.disconnect(); io2.disconnect(); };
  }, [href, tetik]);

  return (
    <div
      aria-hidden={!gorunur}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden",
        "transition-[transform,opacity] duration-300 ease-[var(--ease-cikis)]",
        gorunur ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <a
        href={href}
        tabIndex={gorunur ? 0 : -1}
        className="inline-flex w-full max-w-[26rem] items-center justify-center rounded-full bg-turuncu px-6 py-3.5 text-[0.98rem] font-semibold text-murekkep shadow-[0_14px_38px_-8px_rgb(9_20_5/0.55)] active:translate-y-px"
      >
        {etiket}
      </a>
    </div>
  );
}
