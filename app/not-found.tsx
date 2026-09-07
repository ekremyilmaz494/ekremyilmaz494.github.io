// -*- coding: utf-8 -*-
/** 404 — yolun karşılığı yoksa ziyaretçi boşluğa bırakılmaz: üç gerçek çıkış verilir. */
import Link from "next/link";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { NAV } from "@/data/site";

export default function Bulunamadi() {
  return (
    <section
      data-zemin="yesil-koyu"
      className="relative isolate flex min-h-[76svh] items-center overflow-x-clip bg-yesil-koyu pt-28 pb-20"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 max-w-[16ch] font-display text-hero font-black text-krem">
          Bu sayfa tezgâhta yok.
        </h1>
        <p className="mt-6 max-w-[46ch] leading-relaxed text-krem/78">
          Adres değişmiş ya da yanlış yazılmış olabilir. Aradığınız muhtemelen aşağıdakilerden biri.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/menu">Menü</Button>
          <Button href="/subeler" tur="hayalet">En yakın şube</Button>
          <Button href="/franchise" tur="hayalet">Franchise</Button>
        </div>

        <nav aria-label="Tüm sayfalar" className="mt-12 border-t border-krem/14 pt-6">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.92rem] text-krem/78">
            <li><Link href="/" className="hover:text-krem">Ana sayfa</Link></li>
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-krem">{n.ad}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
