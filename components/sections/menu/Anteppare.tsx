// -*- coding: utf-8 -*-
/** ANTEPPARE — panonun ne dürüm ne porsiyon olan tek ürünü, o yüzden kendi zemini var.
 *  Görsel turuncu bandın dışına taşar; üstüne gelenler ikon değil, sıralı liste. */
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { ANTEPPARE } from "@/data/site";

export default function Anteppare() {
  return (
    <section
      id="anteppare"
      data-zemin="turuncu"
      className="relative isolate overflow-x-clip bg-turuncu py-24 text-murekkep md:py-28"
    >
      <div className="oluklu absolute inset-x-0 top-0 h-3 opacity-60" aria-hidden />

      <div className="mx-auto grid max-w-[var(--container-site)] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-murekkep">
              {ANTEPPARE.ayrim}
            </p>
          </Reveal>
          <Reveal gecikme={0.06}>
            <h2 className="mt-4 max-w-[14ch] font-display text-h2 font-extrabold">{ANTEPPARE.menuBaslik}</h2>
          </Reveal>
          <Reveal gecikme={0.12}>
            <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-murekkep">
              {ANTEPPARE.menuLead}
            </p>
          </Reveal>

          <Reveal gecikme={0.18}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ANTEPPARE.cesitler.map((c) => (
                <li
                  key={c.etiket}
                  className="rounded-full bg-murekkep/88 px-4 py-2 text-[0.88rem] font-semibold text-krem"
                >
                  {c.etiket}
                </li>
              ))}
              <li className="rakam rounded-full border border-murekkep/30 px-4 py-2 text-[0.88rem] font-semibold">
                {ANTEPPARE.gramaj}
              </li>
            </ul>
          </Reveal>

          <Reveal gecikme={0.24}>
            <div className="mt-8 rounded-kart bg-krem p-6 shadow-krem md:p-7">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-soluk-koyu">
                {ANTEPPARE.icindekilerUst}
              </p>
              <ul className="mt-4 grid gap-y-2.5 text-[0.96rem] text-murekkep/80 sm:grid-cols-2 sm:gap-x-6">
                {ANTEPPARE.icindekiler.map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-turuncu" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:-mr-[8vw]">
          <TiltCard siddet={7}>
            <ClipFrame sekil="diyagonal" sinif="aspect-[4/3]">
              <Picture
                ad="anteppare-kutu"
                alt={ANTEPPARE.cesitler[1].alt}
                mobil
                genislik={1600}
                yukseklik={1200}
                sizes="(max-width: 1024px) 100vw, 52vw"
                konum="52% 46%"
              />
            </ClipFrame>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
