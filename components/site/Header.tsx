"use client";
// -*- coding: utf-8 -*-
/** BAŞLIK — krem tabela plakası üstünde marka kilidi, yanında cam çubuk.
 *  Aşağı kaydırırken gizlenir, yukarı kaydırırken döner; en tepede her zaman açık.
 *  JS yokken `nojs:` varyantı çubuğu sabit ve görünür bırakır. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, CTA } from "@/data/site";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const yol = usePathname();
  const [gizli, setGizli] = useState(false);
  const [tepede, setTepede] = useState(true);
  const sonY = useRef(0);

  useEffect(() => {
    const kaydir = () => {
      const y = window.scrollY;
      setTepede(y < 24);
      // Küçük titremelerde durum değiştirme: 8 px eşik.
      if (Math.abs(y - sonY.current) > 8) {
        setGizli(y > sonY.current && y > 220);
        sonY.current = y;
      }
    };
    kaydir();
    window.addEventListener("scroll", kaydir, { passive: true });
    return () => window.removeEventListener("scroll", kaydir);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-cikis)] nojs:translate-y-0 focus-within:translate-y-0",
        gizli && "-translate-y-full"
      )}
    >
      <div
        className={cn(
          "transition-colors duration-500",
          tepede ? "bg-transparent" : "cam border-b border-krem/10"
        )}
      >
        <div className="mx-auto flex max-w-[var(--container-site)] items-center gap-4 px-5 py-3 md:px-8">
          <Link
            href="/"
            aria-label={`${"Tarihi Antep Çiğköfte"} ana sayfa`}
            className="shrink-0 rounded-[10px] bg-krem px-3 py-2 shadow-[0_10px_28px_-16px_rgb(9_20_5/0.8)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {/* Logo bordo kilit; krem plaka dükkândaki tabelanın karşılığı. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Tarihi Antep Çiğköfte" width={152} height={42} className="h-[26px] w-auto md:h-[30px]" />
          </Link>

          <nav aria-label="Ana gezinme" className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const etkin = yol === n.href || yol.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={etkin ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.94rem] font-medium transition-colors duration-200",
                    etkin ? "bg-krem/12 text-krem" : "text-krem/78 hover:bg-krem/8 hover:text-krem"
                  )}
                >
                  {n.ad}
                </Link>
              );
            })}
          </nav>

          <Link
            href={CTA.birincil.href}
            className="ml-auto hidden rounded-full bg-turuncu px-5 py-2.5 text-[0.92rem] font-semibold text-murekkep shadow-turuncu transition-all duration-200 hover:bg-turuncu-koyu hover:text-krem active:translate-y-px lg:ml-0 lg:block"
          >
            {CTA.birincil.ad}
          </Link>

          <MobileMenu yol={yol} />
        </div>
      </div>
    </header>
  );
}
