"use client";
// -*- coding: utf-8 -*-
/**
 * ANATOMİ — sayfanın imza hareketi ve zirvesi.
 *
 * Bölüm 300vh yüksekliğinde; içindeki sahne yapışkan durur, kaydırma çubuğu da dürümün
 * kuruluş zaman çizgisine dönüşür. Katmanlar birikimli kesitlerdir (data/anatomi.ts):
 * her biri bir öncekinin üstüne iner, sonuncusunda yığın söner ve sarılmış dürüm gelir.
 *
 * Sürekli değerler motion value ile taşınır; kaydırma sırasında React ağacı yeniden çizilmez.
 * JS yokken ya da hareket azaltıldığında sahne gizlenir, altındaki dizi listesi görünür:
 * bilginin tamamı orada da vardır.
 */
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import Picture from "@/components/ui/Picture";
import Button from "@/components/ui/Button";
import { ASAMALAR, YIGIN_SOLMA, ANATOMI, type AnatomiAsama } from "@/data/anatomi";

/** Tek katman: kendi penceresinde iner ve belirir; son katmandan önce yığın söner. */
function Katman({ asama, ilerleme, sonuncu }: {
  asama: AnatomiAsama;
  ilerleme: MotionValue<number>;
  sonuncu: boolean;
}) {
  const [a, b] = asama.giris;
  // Aralıklar 0 ve 1'i AÇIKÇA kapsar: motion, giriş aralığı ilerlemenin tamamını örtmediğinde
  // son karede ilk değere geri dönüyor (dürüm katmanı sonda sönüyordu).
  const opaklik = useTransform(
    ilerleme,
    sonuncu ? [0, a, b, 1] : [0, a, b, YIGIN_SOLMA[0], YIGIN_SOLMA[1], 1],
    sonuncu ? [0, 0, 1, 1] : [0, 0, 1, 1, 0, 0]
  );
  const y = useTransform(ilerleme, [0, a, b, 1], [`${asama.girisY}%`, `${asama.girisY}%`, "0%", "0%"]);
  const olcek = useTransform(
    ilerleme,
    [0, a, b, 1],
    [sonuncu ? 0.92 : 1.06, sonuncu ? 0.92 : 1.06, 1, 1]
  );

  return (
    <motion.div style={{ opacity: opaklik, y, scale: olcek }} className="absolute inset-0 will-change-transform">
      <Picture
        ad={asama.dosya}
        alt={asama.alt}
        mobil
        kesik
        genislik={1600}
        yukseklik={1074}
        sizes="(max-width: 768px) 92vw, 56vw"
        uydur="contain"
      />
    </motion.div>
  );
}

/** Sağdaki metin sütununda tek aşamanın adı; kendi penceresinde belirip solar. */
function Etiket({ asama, ilerleme, sira }: {
  asama: AnatomiAsama;
  ilerleme: MotionValue<number>;
  sira: number;
}) {
  const [a, b, c, d] = asama.etiketPencere;
  const opaklik = useTransform(ilerleme, [0, a, b, c, d, 1], [0, 0, 1, 1, 0.22, 0.22]);
  const x = useTransform(ilerleme, [0, a, b, 1], [22, 22, 0, 0]);

  return (
    <motion.li style={{ opacity: opaklik, x }} className="flex gap-4 border-l-2 border-yesil/40 pl-5">
      <span className="rakam mt-1 text-[0.8rem] font-semibold text-yesil-acik">
        {String(sira + 1).padStart(2, "0")}
      </span>
      <span>
        <span className="block font-display text-h3 font-bold text-krem">{asama.etiket}</span>
        <span className="mt-1.5 block max-w-[34ch] text-[0.98rem] leading-relaxed text-krem/78">
          {asama.aciklama}
        </span>
      </span>
    </motion.li>
  );
}

export default function Anatomi() {
  const bolum = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: bolum, offset: ["start start", "end end"] });
  const [kapanisAcik, setKapanisAcik] = useState(false);
  // Görünmez CTA ne fareyle tıklanır ne Tab sırasına girer. React yalnız eşik geçişinde güncellenir.
  const kapanisDurumu = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (ilerleme) => {
    const acik = ilerleme >= 0.93;
    if (acik !== kapanisDurumu.current) {
      kapanisDurumu.current = acik;
      setKapanisAcik(acik);
    }
  });

  const kapanisOpaklik = useTransform(scrollYProgress, [0, 0.86, 0.93, 1], [0, 0, 1, 1]);
  const kapanisY = useTransform(scrollYProgress, [0, 0.86, 0.93, 1], [18, 18, 0, 0]);
  const basligiSil = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [1, 1, 0, 0]);

  return (
    <section
      ref={bolum}
      id="anatomi"
      data-zemin="yesil-koyu"
      className="tane relative isolate bg-yesil-koyu"
    >
      {/* Yapışkan sahne: JS ve hareket açıkken. */}
      <div className="relative h-[260vh] motion-reduce:hidden nojs:hidden md:h-[300vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[var(--container-site)] gap-6 px-5 md:px-8 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-10">
            {/* Kesitlerin tuvalinde yemeğin çevresinde boşluk var; sahne bir miktar büyütülür. */}
            <div className="relative aspect-[3/2] w-full scale-[1.1] lg:aspect-auto lg:h-[70svh] lg:scale-[1.16]">
              {ASAMALAR.map((a, i) => (
                <Katman key={a.dosya} asama={a} ilerleme={scrollYProgress} sonuncu={i === ASAMALAR.length - 1} />
              ))}
            </div>

            <div className="relative">
              <motion.div style={{ opacity: basligiSil }}>
                <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-yesil-acik">{ANATOMI.ust}</p>
                <h2 className="mt-3 font-display text-h2 font-extrabold text-krem">{ANATOMI.baslik}</h2>
                <ul className="mt-8 space-y-6">
                  {ASAMALAR.slice(0, 4).map((a, i) => (
                    <Etiket key={a.dosya} asama={a} ilerleme={scrollYProgress} sira={i} />
                  ))}
                </ul>
              </motion.div>

              <motion.div
                style={{ opacity: kapanisOpaklik, y: kapanisY }}
                inert={!kapanisAcik}
                aria-hidden={!kapanisAcik}
                className="absolute inset-x-0 top-0 flex flex-col items-start"
              >
                <h2 className="font-display text-h2 font-extrabold text-krem">{ANATOMI.kapanis}</h2>
                <p className="mt-4 max-w-[36ch] text-krem/78">{ANATOMI.lead}</p>
                <Button href={ANATOMI.cta.href} sinif="mt-8">{ANATOMI.cta.ad}</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hareketsiz karşılık: JS yokken ya da hareket azaltıldığında. Aynı bilgi, düz sıra. */}
      <div className="mx-auto hidden max-w-[var(--container-site)] px-5 py-24 md:px-8 motion-reduce:block nojs:block">
        <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-yesil-acik">{ANATOMI.ust}</p>
        <h2 className="mt-3 max-w-[18ch] font-display text-h2 font-extrabold text-krem">{ANATOMI.baslik}</h2>
        <p className="mt-4 max-w-[52ch] text-krem/78">{ANATOMI.lead}</p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[3/2]">
            {/* Monte hâl: son katman, yani sarılmış dürüm. */}
            <Picture
              ad="anat-durum"
              alt={ASAMALAR[ASAMALAR.length - 1].alt}
              mobil
              kesik
              genislik={1600}
              yukseklik={1074}
              sizes="(max-width: 768px) 92vw, 46vw"
              uydur="contain"
            />
          </div>
          <dl className="space-y-5">
            {ASAMALAR.map((a, i) => (
              <div key={a.dosya} className="border-l-2 border-yesil/40 pl-5">
                <dt className="font-display text-h3 font-bold text-krem">
                  <span className="rakam mr-3 text-[0.8rem] font-semibold text-yesil-acik">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a.etiket}
                </dt>
                <dd className="mt-1.5 max-w-[40ch] text-krem/78">{a.aciklama}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Button href={ANATOMI.cta.href} sinif="mt-10">{ANATOMI.cta.ad}</Button>
      </div>
    </section>
  );
}
