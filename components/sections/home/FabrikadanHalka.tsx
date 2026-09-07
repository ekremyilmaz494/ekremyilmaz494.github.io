"use client";
// -*- coding: utf-8 -*-
/** FABRİKADAN HALKA — üç panel yatay kayar. Dikey kaydırma yatay yolculuğa çevrilir;
 *  aynı sayfada aynı hareketin tekrarlanmaması için anatomiden farklı bir eksen kullanılır.
 *  Hareket kapalıysa ya da JS yoksa üç panel alt alta okunur. */
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Picture from "@/components/ui/Picture";
import Counter from "@/components/ui/Counter";
import GeciciNot from "@/components/ui/GeciciNot";
import { ANA, HAKKIMIZDA } from "@/data/site";

const PANEL = [
  { ...HAKKIMIZDA.usta.ifadeler[0], foto: "tezgah", alt: "Şube tezgâhında çelik küvetlerde çiğköfte, marul, maydanoz, mısır ve mor lahana", en: 1800, boy: 1005 },
  { ...HAKKIMIZDA.usta.ifadeler[1], foto: "yogurma", alt: HAKKIMIZDA.usta.fotoAlt, en: 1800, boy: 1005 },
  { ...HAKKIMIZDA.usta.ifadeler[2], foto: "malzeme", alt: HAKKIMIZDA.ilke.fotoAlt, en: 1400, boy: 1875 },
];

function Panel({ p, sira, sabit = false }: { p: (typeof PANEL)[number]; sira: number; sabit?: boolean }) {
  return (
    <article className={`relative flex h-full shrink-0 overflow-hidden ${sabit ? "w-full" : "w-screen"}`}>
      <Picture
        ad={p.foto}
        alt={p.alt}
        mobil
        genislik={p.en}
        yukseklik={p.boy}
        sizes="100vw"
        sinif="absolute inset-0"
      />
      <div className="relative z-10 mt-auto w-full bg-gradient-to-t from-[rgb(10_16_7/0.94)] via-[rgb(10_16_7/0.5)] to-transparent p-7 pt-28 md:p-9 md:pt-32">
        <span className="rakam text-[0.74rem] font-semibold tracking-[0.2em] text-sari">
          {String(sira + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-display text-h3 font-bold text-krem">{p.baslik}</h3>
        <p className="mt-2.5 max-w-[38ch] leading-relaxed text-krem/78">{p.metin}</p>
      </div>
    </article>
  );
}

export default function FabrikadanHalka() {
  const bolum = useRef<HTMLElement>(null);
  const serit = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bolum, offset: ["start start", "end end"] });

  // Kaç piksel kayacağı şeridin gerçek genişliğinden ölçülür; yüzde vermek kırılma noktalarında
  // ya eksik ya fazla kaydırıyordu (paneller ekran genişliğini izliyor).
  const [mesafe, setMesafe] = useState(0);
  useEffect(() => {
    const olc = () => {
      const e = serit.current;
      if (e) setMesafe(Math.max(0, e.scrollWidth - window.innerWidth));
    };
    olc();
    window.addEventListener("resize", olc);
    return () => window.removeEventListener("resize", olc);
  }, []);

  // Aralık 0–1'i tam kapsar; motion kısmi aralıklarda son karede ilk değere dönüyor.
  const x = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 0, -mesafe, -mesafe]);

  return (
    <section ref={bolum} data-zemin="yesil-koyu" className="tane relative isolate bg-yesil-koyu">
      <div className="h-[240vh] motion-reduce:hidden nojs:hidden md:h-[280vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[var(--container-site)] px-5 md:px-8">
            <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-yesil-acik">{ANA.fabrika.ust}</p>
            <h2 className="mt-3 max-w-[24ch] font-display text-h2 font-extrabold text-krem">
              {ANA.fabrika.cumle}
            </h2>
          </div>

          <motion.div ref={serit} style={{ x }} className="mt-10 flex h-[62svh] w-max will-change-transform">
            {PANEL.map((p, i) => <Panel key={p.baslik} p={p} sira={i} />)}
          </motion.div>
        </div>
      </div>

      {/* Hareketsiz karşılık */}
      <div className="mx-auto hidden max-w-[var(--container-site)] px-5 py-24 md:px-8 motion-reduce:block nojs:block">
        <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-yesil-acik">{ANA.fabrika.ust}</p>
        <h2 className="mt-3 max-w-[24ch] font-display text-h2 font-extrabold text-krem">{ANA.fabrika.cumle}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PANEL.map((p, i) => (
            <div key={p.baslik} className="relative h-[26rem] overflow-hidden rounded-kart">
              <Panel p={p} sira={i} sabit />
            </div>
          ))}
        </div>
      </div>

      {/* Sayılar: yalnız doğrulanmış olanlar sayaçla. Notlar sayıların YANINDA duruyor;
          altına alındığında sağ yarı boş kalıyordu. */}
      <div className="mx-auto max-w-[var(--container-site)] px-5 pb-24 md:px-8 md:pb-28">
        <div className="grid gap-10 border-t border-krem/12 pt-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <dl className="grid grid-cols-2 gap-8">
            {ANA.fabrika.sayilar.filter((x) => !("gecici" in x && x.gecici)).map((s) => (
              <div key={s.etiket}>
                <dt className="sr-only">{s.etiket}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.8rem,6.2vw,5rem)] font-extrabold leading-none text-krem">
                    {"gruplu" in s && s.gruplu === false ? (
                      <span className="rakam">{s.deger}</span>
                    ) : (
                      <Counter deger={s.deger} sonek={"sonek" in s ? s.sonek : ""} />
                    )}
                  </span>
                  <span className="mt-3 block text-[0.95rem] text-krem/78">{s.etiket}</span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Ağ büyüklüğü çelişkili olduğu için sayaç değil, not: gerçek liste /subeler'de sayılıyor. */}
          <div className="md:pt-2">
            <GeciciNot sinif="max-w-[54ch]">{HAKKIMIZDA.rakamNot}</GeciciNot>
            <GeciciNot sinif="max-w-[54ch]">{ANA.fabrika.not}</GeciciNot>
          </div>
        </div>
      </div>
    </section>
  );
}
