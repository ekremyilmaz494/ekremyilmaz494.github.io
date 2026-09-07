"use client";
// -*- coding: utf-8 -*-
/** MOBİL MENÜ — tam ekran katman. Esc kapatır, odak katmanın içinde döner, açıkken sayfa kaymaz.
 *  Yerleşik dialog üst katmanda açılır; arka planı inert yapar ve odağı içeride tutar.
 *  JS yoksa düğme hiç basılmaz (nojs:hidden) ve alt bilgideki gezinme yeterlidir. */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { NAV, CTA } from "@/data/site";
import { cn } from "@/lib/cn";

export default function MobileMenu({ yol }: { yol: string }) {
  const [acik, setAcik] = useState(false);
  const katman = useRef<HTMLDialogElement>(null);
  const dugme = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- yol değişince menü kapanmalı; olay kaynağı gezinme
  useEffect(() => { setAcik(false); }, [yol]);

  useEffect(() => {
    if (!acik) return;
    const oncekiTasma = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = katman.current;
    dialog?.showModal();
    const masaustu = window.matchMedia("(min-width: 1024px)");
    const boyutDegisti = () => { if (masaustu.matches) setAcik(false); };
    masaustu.addEventListener("change", boyutDegisti);
    boyutDegisti();
    return () => {
      masaustu.removeEventListener("change", boyutDegisti);
      dialog?.close();
      document.body.style.overflow = oncekiTasma;
    };
  }, [acik]);

  return (
    <>
      <button
        ref={dugme}
        type="button"
        onClick={() => setAcik(true)}
        aria-expanded={acik}
        aria-label="Menüyü aç"
        className="ml-auto grid size-11 place-items-center rounded-full border border-krem/18 text-krem transition-colors hover:bg-krem/10 lg:hidden nojs:hidden"
      >
        <List size={22} weight="bold" aria-hidden />
      </button>

      <dialog
        ref={katman}
        onCancel={() => setAcik(false)}
        aria-modal="true"
        aria-label="Gezinme"
        data-lenis-prevent
        className="fixed inset-0 m-0 hidden h-dvh max-h-none w-screen max-w-none flex-col overflow-y-auto overscroll-contain border-0 bg-yesil-koyu p-0 text-krem open:flex"
      >
        <div className="flex shrink-0 items-center justify-end px-5 py-4">
          <button
            type="button"
            onClick={() => { setAcik(false); dugme.current?.focus(); }}
            aria-label="Menüyü kapat"
            className="grid size-11 place-items-center rounded-full border border-krem/18 text-krem"
          >
            <X size={22} weight="bold" aria-hidden />
          </button>
        </div>

        <nav aria-label="Ana gezinme" className="flex shrink-0 grow flex-col justify-center gap-1 px-6 pb-16">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setAcik(false)}
              aria-current={yol === n.href ? "page" : undefined}
              className={cn(
                "border-b border-krem/10 py-4 font-display text-[2rem] leading-none tracking-tight transition-transform duration-300",
                acik ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                yol === n.href ? "text-yesil-acik" : "text-krem"
              )}
              style={{ transitionDelay: acik ? `${80 + i * 45}ms` : "0ms" }}
            >
              {n.ad}
            </Link>
          ))}
          <Link
            href={CTA.birincil.href}
            onClick={() => setAcik(false)}
            className="mt-8 rounded-full bg-turuncu px-6 py-4 text-center font-semibold text-murekkep"
          >
            {CTA.birincil.ad}
          </Link>
        </nav>
      </dialog>
    </>
  );
}
