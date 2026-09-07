"use client";

// -*- coding: utf-8 -*-
/** BAŞVURU / İLETİŞİM FORMU — aşamalı çalışır: JS yoksa form doğrudan Formspree'ye POST eder
 *  (Formspree kendi teşekkür sayfasını gösterir), JS varsa fetch ile gider ve sayfa yerinde
 *  "alındı" durumuna geçer.
 *
 *  Franchise alanları: ad · telefon · il/ilçe · metrekare · toplam bütçe · not.
 *  İletişim alanları: ad · telefon · şehir · konu · mesaj.
 *  Bütçe alanı KURULUM BEDELİ DEĞİLDİR (o sabit: GERCEK.ucret); kira, depozito ve ilk stok
 *  dahil toplam bütçedir. Doğrulama alandan çıkarken yapılır, gönderirken değil.
 *
 *  KVKK onayı bilerek İKİYE ayrıldı: veri işleme ZORUNLU, ticari elektronik ileti AYRI ve
 *  işaretsiz gelir. Tek kutuda birleştirmek açık rızayı sakatlar. */

import { useEffect, useState } from "react";
import { GECICI_VERI } from "@/data/franchise";

type Durum = "bekliyor" | "gonderiliyor" | "alindi" | "hata";
type Konu = { k: string; ad: string };

const ALAN =
  "w-full rounded-alan border border-krem/28 bg-krem/6 px-4 py-3 text-krem outline-none transition-colors duration-200 placeholder:text-soluk focus:border-yesil-acik aria-[invalid=true]:border-sari";
const ETIKET = "grid gap-1.5 text-[0.85rem] font-medium text-krem/80";

export default function BasvuruForm({
  konu = "franchise",
  konular,
  konuEtiket = "Konu",
}: {
  konu?: "franchise" | "iletisim";
  konular?: readonly Konu[];
  konuEtiket?: string;
}) {
  const iletisim = konu === "iletisim";
  const [durum, setDurum] = useState<Durum>("bekliyor");
  const [hatalar, setHatalar] = useState<Record<string, string>>({});
  const [secilenKonu, setSecilenKonu] = useState("");

  // Kapıdan gelen niyet: /iletisim?k=kurumsal#yazin → konu ön seçili gelir.
  // Statik export'ta sunucu sorguyu göremez; hidratlama uyuşmazlığı olmasın diye ilk boyamadan SONRA okunur.
  useEffect(() => {
    if (!konular?.length) return;
    const k = new URLSearchParams(window.location.search).get("k");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sunucu sorguyu göremez; ilk boyamadan sonra okumak zorunlu
    if (k && konular.some((o) => o.k === k)) setSecilenKonu(k);
  }, [konular]);

  function dogrula(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const el = e.currentTarget;
    const mesaj = el.validity.valueMissing
      ? "Bu alan gerekli."
      : el.validity.typeMismatch || el.validity.patternMismatch
        ? "Biçimi kontrol edin."
        : "";
    setHatalar((h) => ({ ...h, [el.name]: mesaj }));
  }
  const hata = (ad: string) =>
    hatalar[ad] ? (
      <span id={`${ad}-hata`} role="alert" className="text-[0.8rem] text-sari">
        {hatalar[ad]}
      </span>
    ) : null;
  const gecersiz = (ad: string) =>
    hatalar[ad] ? { "aria-invalid": true as const, "aria-describedby": `${ad}-hata` } : {};

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setDurum("gonderiliyor");
    try {
      const r = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error(String(r.status));
      setDurum("alindi");
      form.reset();
    } catch {
      setDurum("hata");
    }
  }

  if (durum === "alindi") {
    return (
      <div role="status" className="rounded-kart border border-yesil-acik/40 bg-yesil-orta p-8">
        <p className="font-display text-[1.6rem] font-extrabold leading-tight text-krem">
          {iletisim ? "Mesajınız alındı." : "Başvurunuz alındı."}
        </p>
        <p className="mt-3 text-krem/78">
          {GECICI_VERI.donusSuresi} içinde sizi arıyoruz. Acele ediyorsanız WhatsApp hattımız açık.
        </p>
      </div>
    );
  }

  return (
    <form action={GECICI_VERI.formEndpoint} method="POST" onSubmit={gonder} className="grid gap-4">
      <input type="hidden" name="konu" value={konu} />

      <label className={ETIKET}>
        Ad Soyad
        <input name="ad" required autoComplete="name" className={ALAN} onBlur={dogrula} {...gecersiz("ad")} />
        {hata("ad")}
      </label>

      <label className={ETIKET}>
        Telefon
        <input
          name="telefon"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={ALAN}
          onBlur={dogrula}
          {...gecersiz("telefon")}
        />
        {hata("telefon")}
      </label>

      {iletisim ? (
        <>
          <label className={ETIKET}>
            Şehir
            <input
              name="sehir"
              required
              autoComplete="address-level2"
              className={ALAN}
              onBlur={dogrula}
              {...gecersiz("sehir")}
            />
            {hata("sehir")}
          </label>
          {konular?.length ? (
            <label className={ETIKET}>
              {konuEtiket}
              <select
                name="konu_detay"
                value={secilenKonu}
                onChange={(e) => setSecilenKonu(e.currentTarget.value)}
                className={`${ALAN} appearance-none`}
              >
                <option value="" className="text-murekkep">Seçiniz</option>
                {konular.map((o) => (
                  <option key={o.k} value={o.k} className="text-murekkep">{o.ad}</option>
                ))}
              </select>
            </label>
          ) : null}
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={ETIKET}>
              İl / İlçe
              <input
                name="il"
                required
                autoComplete="address-level2"
                placeholder="Konya / Karatay"
                className={ALAN}
                onBlur={dogrula}
                {...gecersiz("il")}
              />
              {hata("il")}
            </label>
            <label className={ETIKET}>
              İşletme metrekaresi
              <input
                name="metrekare"
                required
                inputMode="numeric"
                pattern="[0-9]{2,4}"
                placeholder="50"
                className={`${ALAN} rakam`}
                onBlur={dogrula}
                {...gecersiz("metrekare")}
              />
              {hata("metrekare")}
            </label>
          </div>
          <label className={ETIKET}>
            Toplam bütçe aralığı
            <select name="butce" defaultValue="" className={`${ALAN} appearance-none`}>
              <option value="" className="text-murekkep">Seçiniz</option>
              {GECICI_VERI.butceAraliklari.map((b, i) => (
                <option key={b} value={i} className="text-murekkep">{b}</option>
              ))}
            </select>
          </label>
        </>
      )}

      <label className={ETIKET}>
        {iletisim ? "Mesaj" : "Not"}
        <textarea name="mesaj" rows={iletisim ? 4 : 3} className={ALAN} />
      </label>

      <fieldset className="mt-1 grid gap-3 border-t border-krem/18 pt-4">
        <legend className="sr-only">Onaylar</legend>
        <label className="flex items-start gap-3 text-[0.85rem] leading-snug text-krem/78">
          <input name="kvkk" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-turuncu" />
          <span>
            Kişisel verilerimin {iletisim ? "mesajımı yanıtlamak" : "franchise başvurumu değerlendirmek"} amacıyla
            işlenmesini kabul ediyorum.{" "}
            <a href="/kvkk" className="underline decoration-krem/45 underline-offset-2 hover:text-krem">
              Aydınlatma metni
            </a>
          </span>
        </label>
        <label className="flex items-start gap-3 text-[0.85rem] leading-snug text-krem/78">
          <input name="ileti" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-turuncu" />
          <span>
            Kampanya ve duyuruları ticari elektronik ileti olarak almak istiyorum. İsteğe bağlı: işaretlemeseniz de{" "}
            {iletisim ? "mesajınız" : "başvurunuz"} bize ulaşır.
          </span>
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-turuncu px-6 py-3.5 text-[0.98rem] font-semibold text-murekkep shadow-turuncu transition-colors hover:bg-turuncu-koyu hover:text-krem active:translate-y-px disabled:opacity-60"
      >
        {durum === "gonderiliyor" ? "Gönderiliyor…" : iletisim ? "Mesajı gönder" : "Başvuruyu gönder"}
      </button>

      {durum === "hata" && (
        <p role="alert" className="text-[0.9rem] text-sari">
          Gönderilemedi. WhatsApp&apos;tan yazın ya da {GECICI_VERI.telefon} numarasını arayın.
        </p>
      )}
    </form>
  );
}
