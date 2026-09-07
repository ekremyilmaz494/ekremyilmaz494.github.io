"use client";
// -*- coding: utf-8 -*-
/** 3D ŞUBE TURU — bölüm sabitlenir, sayfa kaydırması kamerayı filmin onaylı yolu boyunca yürütür
 *  (sokak → cephe → kapı → tezgâh → ürün → salon → dışarı bakış). Her durakta künye kartı değişir.
 *  Kaydırma dışında giriş yok: sürükleme, tıklama, düğme yok.
 *  Yedekler: hareket azaltma (motion-reduce:) ve JS'siz (nojs:) durumda sahne yerine poster basılır,
 *  sr-only durak listesi görünür olur; her iki yedek de yalnız CSS ile çalışır. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll } from "motion/react";
import { GERCEK, GEZINTI, SES, SUBE_3D } from "@/data/franchise";
import { cn } from "@/lib/cn";
import SahneSiniri from "./SahneSiniri";
import { useAzaltilmisHareket } from "@/lib/useAzaltilmisHareket";
import { aktifDurak, yolKur } from "./gezintiYol";

// three + r3f (~2,5 MB) yalnız istemcide; statik export'ta ssr:false ancak client dosyada olabilir
const SubeSahne = dynamic(() => import("./SubeSahne"), { ssr: false });

const YUKLE_PAYI = "600px 0px";    // sahne paketi bölüme bu kadar kala iner (hero LCP/TBT'ye dokunmaz)
const GORUNUR_PAYI = "200px 0px";  // bunun dışına çıkınca çizim "demand"a düşer

// Yedek düzen: hareket azaltma, JS yok ve sahne hatası aynı poster/listeli düzeni kullanır.
const YEDEK_BOLUM = "motion-reduce:h-auto nojs:h-auto sahne-yedek:h-auto";
const YEDEK_SAHNE = "motion-reduce:relative motion-reduce:h-auto motion-reduce:aspect-[16/10] nojs:relative nojs:h-auto nojs:aspect-[16/10] sahne-yedek:relative sahne-yedek:h-auto sahne-yedek:aspect-[16/10]";
const YEDEK_GIZLE = "motion-reduce:hidden nojs:hidden sahne-yedek:hidden";
const YEDEK_LISTE =
  "motion-reduce:not-sr-only motion-reduce:mx-auto motion-reduce:grid motion-reduce:max-w-[var(--container-site)] motion-reduce:gap-4 motion-reduce:px-5 motion-reduce:py-12 motion-reduce:md:grid-cols-2 motion-reduce:md:px-8 motion-reduce:lg:grid-cols-3 " +
  "nojs:not-sr-only nojs:mx-auto nojs:grid nojs:max-w-[var(--container-site)] nojs:gap-4 nojs:px-5 nojs:py-12 nojs:md:grid-cols-2 nojs:md:px-8 nojs:lg:grid-cols-3 sahne-yedek:not-sr-only sahne-yedek:mx-auto sahne-yedek:grid sahne-yedek:max-w-[var(--container-site)] sahne-yedek:gap-4 sahne-yedek:px-5 sahne-yedek:py-12 sahne-yedek:md:grid-cols-2 sahne-yedek:md:px-8 sahne-yedek:lg:grid-cols-3";
const YEDEK_KART = "motion-reduce:rounded-kart motion-reduce:bg-yesil-orta/40 motion-reduce:p-6 nojs:rounded-kart nojs:bg-yesil-orta/40 nojs:p-6 sahne-yedek:rounded-kart sahne-yedek:bg-yesil-orta/40 sahne-yedek:p-6";

type Props = {
  /** Bölüm kimliği; sayfa içi bağlantı hedefi. */
  id?: string;
  /** Erişilebilir bölüm başlığı; yedek düzende görünür olur. Verilmezse SES.ornek. */
  baslik?: string;
  sinif?: string;
};

export default function SubeTuru({ id = "ornek-sube", baslik = SES.ornek, sinif }: Props) {
  const root = useRef<HTMLElement>(null);
  const kartlar = useRef<(HTMLDivElement | null)[]>([]);
  const noktalar = useRef<(HTMLSpanElement | null)[]>([]);
  const ilerleme = useRef(0);
  const aktif = useRef(-1);
  const azalt = useAzaltilmisHareket();
  const [hazir, setHazir] = useState(false);
  const [yedek, setYedek] = useState(false);
  const onHata = useCallback(() => setYedek(true), []);
  const [yukle, setYukle] = useState(false);
  const [gorunur, setGorunur] = useState(false);
  const yol = useMemo(() => yolKur(), []);
  const onHazir = useCallback(() => setHazir(true), []);
  const basliId = `${id}-baslik`;

  // Sahne paketi bölüm yaklaşınca iner; bölüm ekrandan çıkınca çizim durur (GPU boşa dönmesin)
  useEffect(() => {
    const el = root.current;
    if (!el || azalt) return;
    const ioYukle = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      ioYukle.disconnect();
      // Canvas'ın fallback çocuğu WebGL çalışırken de mount edilir; destek burada ölçülür.
      const tuval = document.createElement("canvas");
      let destek = false;
      try {
        const gl = tuval.getContext("webgl2");
        destek = Boolean(gl);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { /* Sürücü bağlam kuramazsa aynı statik karşılığa geç. */ }
      if (destek) setYukle(true);
      else onHata();
    }, { rootMargin: YUKLE_PAYI });
    const ioGorunur = new IntersectionObserver(([e]) => setGorunur(e.isIntersecting), { rootMargin: GORUNUR_PAYI });
    ioYukle.observe(el);
    ioGorunur.observe(el);
    return () => { ioYukle.disconnect(); ioGorunur.disconnect(); };
  }, [azalt, onHata]);

  // Kaydırma → ilerleme ref'i; kart ve nokta durumları DOM'da güncellenir (her karede React render yok)
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const uygula = useCallback((p: number) => {
    const i = aktifDurak(yol.durak, p * yol.toplam);
    if (i === aktif.current) return;
    aktif.current = i;
    kartlar.current.forEach((k, j) => {
      if (!k) return;
      k.style.opacity = j === i ? "1" : "0";
      k.style.transform = j === i ? "translateY(0)" : "translateY(14px)";
    });
    noktalar.current.forEach((n, j) => n?.setAttribute("data-aktif", j === i ? "1" : "0"));
  }, [yol]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    ilerleme.current = p;
    uygula(p);
  });
  // sayfa bölümün ortasında açılırsa (geri dönüş, yenileme) ilk kart değil doğru kart görünsün
  useEffect(() => {
    const p = scrollYProgress.get();
    ilerleme.current = p;
    uygula(p);
  }, [scrollYProgress, uygula]);

  return (
    <section
      ref={root}
      id={id}
      aria-labelledby={basliId}
      data-zemin="yesil-koyu"
      data-sahne-yedek={yedek}
      className={cn("relative isolate h-[620vh] bg-yesil-koyu text-krem md:h-[720vh]", YEDEK_BOLUM, sinif)}
    >
      <h2 id={basliId} className={cn("sr-only", "motion-reduce:not-sr-only motion-reduce:mx-auto motion-reduce:max-w-[var(--container-site)] motion-reduce:px-5 motion-reduce:pt-16 motion-reduce:pb-8 motion-reduce:font-display motion-reduce:text-h2 motion-reduce:font-extrabold motion-reduce:md:px-8", "nojs:not-sr-only nojs:mx-auto nojs:max-w-[var(--container-site)] nojs:px-5 nojs:pt-16 nojs:pb-8 nojs:font-display nojs:text-h2 nojs:font-extrabold nojs:md:px-8 sahne-yedek:not-sr-only sahne-yedek:mx-auto sahne-yedek:max-w-[var(--container-site)] sahne-yedek:px-5 sahne-yedek:pt-16 sahne-yedek:pb-8 sahne-yedek:font-display sahne-yedek:text-h2 sahne-yedek:font-extrabold sahne-yedek:md:px-8")}>
        {baslik}
      </h2>

      {/* Sabitlenen sahne alanı: 100svh, bölüm boyunca yapışık kalır; yedekte akışa döner ve poster oranını alır */}
      <div className={cn("sticky top-0 h-svh w-full overflow-hidden", YEDEK_SAHNE)}>
        {/* Sahne dekoratif: içerik sr-only listede. pointer-events yok, kaydırma altındaki sayfaya gider */}
        <div aria-hidden className={cn("pointer-events-none absolute inset-0", YEDEK_GIZLE)}>
          {yukle && !azalt && !yedek && (
            <SahneSiniri onHata={onHata}>
              <SubeSahne ilerleme={ilerleme} aktif={gorunur} onHazir={onHazir} onHata={onHata} />
            </SahneSiniri>
          )}
        </div>

        {/* Poster: model gelene kadar yer tutar, hareket azaltma ve JS'siz durumda sahnenin yerine geçer */}
        {/* eslint-disable-next-line @next/next/no-img-element -- statik webp, tek boyut */}
        <img
          src={SUBE_3D.poster}
          alt={SUBE_3D.alt}
          width={1456}
          height={839}
          loading="lazy"
          decoding="async"
          aria-hidden={(hazir && !yedek && !azalt) || undefined}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-cikis)]"
          style={{ opacity: hazir && !yedek && !azalt ? 0 : 1 }}
        />

        {/* Üst şerit: hangi şube, kaç metrekare */}
        <p className={cn("absolute left-5 top-[5.5rem] rounded-full bg-yesil-koyu/80 px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.2em] text-krem backdrop-blur-md md:left-12 md:top-[6rem]", YEDEK_GIZLE)}>
          {GERCEK.ornekSube.toLocaleUpperCase("tr-TR")}
        </p>

        {/* Künye kartları: koyu yeşil zemin, krem metin; aktif olanı kaydırma belirler. AT için tekrar olmasın diye gizli */}
        <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-12", YEDEK_GIZLE)}>
          <div className="relative min-h-[11rem] max-w-[34rem]">
            {GEZINTI.map((d, i) => (
              <div
                key={d.ad}
                ref={(el) => { kartlar.current[i] = el; }}
                className="absolute inset-x-0 bottom-0 rounded-kart bg-yesil-koyu/92 p-6 text-krem shadow-kart backdrop-blur-md transition-[opacity,transform] duration-500 ease-[var(--ease-cikis)] md:p-7"
                style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "translateY(0)" : "translateY(14px)" }}
              >
                <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-yesil-acik">
                  <span className="rakam text-sari">{String(i + 1).padStart(2, "0")}</span> · {d.ust}
                </p>
                <p className="mt-2 font-display text-h3 font-bold text-krem">{d.baslik}</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-krem/80">{d.metin}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Durak noktaları: yalnız gösterge, tıklanmaz; koyu pill içinde ki açık sahne üstünde okunsun */}
        <div aria-hidden className={cn("absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full bg-yesil-koyu/80 px-2 py-3 backdrop-blur-md md:right-6", YEDEK_GIZLE)}>
          {GEZINTI.map((d, i) => (
            <span
              key={d.ad}
              ref={(el) => { noktalar.current[i] = el; }}
              data-aktif={i === 0 ? "1" : "0"}
              className="block h-2 w-2 rounded-full bg-krem/35 transition-all duration-300 ease-[var(--ease-cikis)] data-[aktif=1]:h-5 data-[aktif=1]:bg-turuncu"
            />
          ))}
        </div>
      </div>

      {/* Duraklar: ekran okuyucu için her zaman; hareket azaltma ve JS'siz düzende herkes için görünür */}
      <ol className={cn("sr-only", YEDEK_LISTE)}>
        {GEZINTI.map((d, i) => (
          <li key={d.ad} className={YEDEK_KART}>
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-yesil-acik">
              <span className="rakam text-sari">{String(i + 1).padStart(2, "0")}</span> · {d.ust}
            </p>
            <h3 className="mt-2 font-display text-h3 font-bold text-krem">{d.baslik}</h3>
            <p className="mt-3 leading-relaxed text-krem/80">{d.metin}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
