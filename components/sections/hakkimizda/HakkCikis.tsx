// -*- coding: utf-8 -*-
/** ÇIKIŞ — iki kapı: şubeni aç ya da en yakın şubede tat. Sayfa burada çözülür. */
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import MaskReveal from "@/components/ui/MaskReveal";
import { HAKKIMIZDA } from "@/data/site";

export default function HakkCikis() {
  const c = HAKKIMIZDA.cikis;
  return (
    <section
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto grid max-w-[var(--container-site)] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow sinif="text-turuncu-koyu">{c.ust}</Eyebrow>
          </Reveal>
          <Reveal gecikme={0.06}>
            <h2 className="mt-4 max-w-[14ch] font-display text-h2 font-extrabold">{c.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.12}>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-murekkep/70">{c.metin}</p>
          </Reveal>
          <Reveal gecikme={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={c.birincil.href}>{c.birincil.ad}</Button>
              <Button href={c.ikincil.href} tur="hayalet">{c.ikincil.ad}</Button>
            </div>
          </Reveal>
        </div>

        <MaskReveal yon="yukari">
          <ClipFrame sekil="saget" sinif="aspect-[4/5]">
            <Picture
              ad="sikma"
              alt={HAKKIMIZDA.heroAlt}
              mobil
              genislik={1400}
              yukseklik={1750}
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </ClipFrame>
        </MaskReveal>
      </div>
    </section>
  );
}
