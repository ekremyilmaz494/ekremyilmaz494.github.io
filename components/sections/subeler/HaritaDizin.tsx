"use client";

// -*- coding: utf-8 -*-
/** ŞUBE DİZİNİ — harita, il çipleri ve liste tek bileşende, çünkü üçü aynı seçimi paylaşıyor.
 *
 *  Karar: liste SUNUCUDA tamamı basılır, JS yalnızca filtreler. Böylece JS olmadan da 118 kaydın
 *  hepsi okunur ve arama motoru hepsini görür. `?il=` derin bağlantısı (eski il sayfalarından
 *  gelen 301'ler bu adrese düşüyor) ilk boyamadan sonra okunur; statik dışa aktarımda sunucu
 *  sorguyu göremediği için useSearchParams kullanılmaz, adres çubuğu history.replaceState ile
 *  güncellenir (yeni geçmiş kaydı bırakmadan). */

import { useEffect, useState } from "react";
import { MapPin, Phone, ArrowUpRight, X } from "@phosphor-icons/react";
import HaritaSvg from "@/components/harita/HaritaSvg";
import Giris from "@/components/ui/Giris";
import Button from "@/components/ui/Button";
import GeciciNot from "@/components/ui/GeciciNot";
import { cn } from "@/lib/cn";
import {
  BAYILER, ILLER, IL_SAYISI, BAYI_SAYISI, YANAN_PLAKALAR, YANMA_SIRASI,
  CEKIM_TARIHI, ilBayileri, ilBul, enYakinIller, yolTarifi,
} from "@/data/bayi";
import { SUBELER } from "@/data/site";

const tarih = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export default function HaritaDizin() {
  const [secili, setSecili] = useState<number | null>(null);

  // Derin bağlantı: /subeler/?il=6 (eski /ankara sayfasından 301 ile gelen ziyaretçi)
  useEffect(() => {
    const p = Number(new URLSearchParams(window.location.search).get("il"));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- statik dışa aktarımda ?il= ancak istemcide okunabilir
    if (p > 0 && p <= 81) setSecili(p);
  }, []);

  function sec(plaka: number | null) {
    setSecili(plaka);
    const u = new URL(window.location.href);
    if (plaka) u.searchParams.set("il", String(plaka));
    else u.searchParams.delete("il");
    window.history.replaceState(null, "", u);
  }

  const secilenIl = secili ? ilBul(secili) : undefined;
  const bosSecim = secili !== null && !secilenIl;
  const gosterilen = secili ? ILLER.filter((i) => i.plaka === secili) : ILLER;

  return (
    <>
      {/* ---- harita ---- */}
      <section
        id="harita"
        data-zemin="yesil-koyu"
        className="relative isolate overflow-x-clip bg-yesil-koyu pt-28 pb-14 md:pt-32 md:pb-20 lg:min-h-svh"
      >
        <div className="mx-auto max-w-[112rem] px-5 md:px-8 lg:px-[4vw]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
            <Giris>
              <h1 className="max-w-[12ch] font-display text-hero font-black text-krem">
                {IL_SAYISI} {SUBELER.ilde}, {BAYI_SAYISI} {SUBELER.sube}.
              </h1>
            </Giris>
            </div>
            <div className="lg:pb-2">
            <Giris gecikme={0.08}>
              <p className="max-w-[58ch] leading-relaxed text-krem/75">{SUBELER.lead}</p>
            </Giris>
            <Giris gecikme={0.14}>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem] text-krem/78">
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px] bg-yesil-acik" aria-hidden />
                  {SUBELER.lejantVar}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px] border border-krem/30 bg-krem/10" aria-hidden />
                  {SUBELER.lejantYok}
                </li>
              </ul>
              <GeciciNot sinif="max-w-[44ch]">{SUBELER.not}</GeciciNot>
            </Giris>
            </div>
          </div>

          <div className="relative mt-10 border-y border-krem/12 py-5 md:mt-12 md:py-8">
            <HaritaSvg
              yanan={YANAN_PLAKALAR}
              secili={secili}
              onSec={(p) => sec(p === secili ? null : p)}
              sira={YANMA_SIRASI}
              sinif="mx-auto w-full"
            />
          </div>

          <div aria-live="polite" className="mt-5 flex min-h-8 flex-wrap items-center justify-between gap-3 text-[0.9rem] text-krem/72">
            <p>{secilenIl ? `${secilenIl.ad} seçildi · ${secilenIl.sayi} şube` : "Şube listesini görmek için haritadaki bir şehri seçin."}</p>
            {secilenIl && <a href="#liste" className="font-semibold text-yesil-acik underline-offset-4 hover:underline">Şubeleri göster</a>}
          </div>
        </div>
      </section>

      {/* ---- çipler + liste ---- */}
      <section
        id="liste"
        data-zemin="krem"
        className="relative isolate overflow-x-clip bg-krem py-20 text-murekkep md:py-24"
      >
        <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h2 font-extrabold">
              {secilenIl ? `${secilenIl.ad}: ${secilenIl.sayi} ${SUBELER.sube}` : SUBELER.listeBaslik}
            </h2>
            <p className="rakam text-[0.88rem] text-soluk-koyu">
              {tarih(CEKIM_TARIHI)} tarihli liste
            </p>
          </div>

          <nav aria-label={SUBELER.dizin} className="mt-8">
            <ul className="flex flex-wrap gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => sec(null)}
                  aria-pressed={secili === null}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors",
                    secili === null
                      ? "bg-yesil-koyu text-krem"
                      : "border border-murekkep/18 text-murekkep/70 hover:border-yesil hover:text-murekkep"
                  )}
                >
                  {SUBELER.tumu}
                </button>
              </li>
              {ILLER.map((il) => (
                <li key={il.plaka}>
                  <button
                    type="button"
                    onClick={() => sec(il.plaka === secili ? null : il.plaka)}
                    aria-pressed={secili === il.plaka}
                    className={cn(
                      "rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors",
                      secili === il.plaka
                        ? "bg-yesil-koyu text-krem"
                        : "border border-murekkep/18 text-murekkep/70 hover:border-yesil hover:text-murekkep"
                    )}
                  >
                    {il.ad}
                    <span className="rakam ml-2 text-[0.78rem] text-current">{il.sayi}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {secili !== null && (
            <button
              type="button"
              onClick={() => sec(null)}
              className="mt-6 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-turuncu-koyu underline-offset-4 hover:underline"
            >
              <X size={15} weight="bold" aria-hidden />
              Seçimi temizle
            </button>
          )}

          {/* Şubesi olmayan bir il seçildiyse: en yakın iller ve franchise yolu */}
          {bosSecim && (
            <div className="mt-10 rounded-kart border border-murekkep/12 bg-krem-koyu p-7 md:p-8">
              <p className="font-display text-h3 font-extrabold">Bu ilde {SUBELER.bosBaslik}</p>
              <p className="mt-4 text-[0.92rem] font-semibold uppercase tracking-[0.12em] text-soluk-koyu">
                {SUBELER.bosYakin}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {enYakinIller(secili, 3).map((y) => (
                  <li key={y.plaka}>
                    <button
                      type="button"
                      onClick={() => sec(y.plaka)}
                      className="rounded-full border border-murekkep/18 px-4 py-2 text-[0.88rem] font-semibold hover:border-yesil"
                    >
                      {y.ad}
                      <span className="rakam ml-2 text-[0.78rem] text-soluk-koyu">{y.sayi}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Button href={SUBELER.bosFranchise.href} sinif="mt-7">{SUBELER.bosFranchise.ad}</Button>
            </div>
          )}

          {/* Liste: sunucuda tamamı basılır, seçim yalnız filtreler */}
          <div className="mt-12 space-y-14">
            {gosterilen.map((il) => (
              <div key={il.plaka} id={`il-${il.plaka}`}>
                <h3 className="flex items-baseline gap-3 border-b border-murekkep/12 pb-3 font-display text-h3 font-extrabold">
                  {il.ad}
                  <span className="rakam text-[0.5em] font-bold text-soluk-koyu">
                    {il.sayi} {SUBELER.sube}
                  </span>
                </h3>
                <ul className="grid gap-x-8 gap-y-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {ilBayileri(il.plaka).map((b) => (
                    <li key={b.id} className="border-t border-murekkep/10 pt-4">
                      {b.ilce && (
                        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-turuncu-koyu">
                          {b.ilce}
                        </p>
                      )}
                      <p className="mt-1 font-semibold leading-snug">{b.ad}</p>
                      {b.adres && <p className="mt-1.5 text-[0.9rem] leading-relaxed text-murekkep/62">{b.adres}</p>}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.88rem] font-semibold">
                        {b.tel && (
                          <a href={b.tel} className="rakam inline-flex items-center gap-1.5 text-yesil-koyu hover:text-turuncu-koyu">
                            <Phone size={15} weight="bold" aria-hidden />
                            {b.telefonGoster}
                          </a>
                        )}
                        <a
                          href={yolTarifi(b)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-soluk-koyu hover:text-murekkep"
                        >
                          <MapPin size={15} weight="bold" aria-hidden />
                          {SUBELER.yol}
                          <ArrowUpRight size={13} weight="bold" aria-hidden />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 text-[0.85rem] text-soluk-koyu">
            Toplam {BAYILER.length} kayıt, {IL_SAYISI} il.
          </p>
        </div>
      </section>
    </>
  );
}
