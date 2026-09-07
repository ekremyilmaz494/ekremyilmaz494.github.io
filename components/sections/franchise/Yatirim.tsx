// -*- coding: utf-8 -*-
/** YATIRIM — sayfanın en güçlü kozu: rakam açık yazılıyor. "Yok" üçlüsü kart değil,
 *  ince çizgiyle ayrılmış üç sütun; belge dili korunsun diye kutu içine alınmadı. */
import { Prohibit } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Eyebrow from "@/components/ui/Eyebrow";
import { YATIRIM, GERCEK } from "@/data/franchise";

export default function Yatirim() {
  return (
    <section
      id="yatirim"
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow sinif="text-turuncu-koyu">{YATIRIM.ust}</Eyebrow>
            </Reveal>
            <Reveal gecikme={0.06}>
              <h2 className="mt-4 max-w-[14ch] font-display text-h2 font-extrabold">{YATIRIM.baslik}</h2>
            </Reveal>
            <Reveal gecikme={0.12}>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-murekkep/70">{YATIRIM.lead}</p>
            </Reveal>
          </div>

          <Reveal gecikme={0.1}>
            <TiltCard siddet={6}>
              <div className="rounded-kart bg-yesil-koyu p-8 text-krem shadow-kart md:p-10">
                <p className="rakam whitespace-nowrap font-display text-[clamp(2.6rem,4.4vw,3.9rem)] font-black leading-none">{GERCEK.ucret}</p>
                <p className="mt-4 text-[1.05rem] font-semibold text-yesil-acik">{GERCEK.ucretEtiket}</p>
                <p className="mt-5 max-w-[38ch] leading-relaxed text-krem/78">{GERCEK.ucretKapsam}</p>
                <dl className="mt-7 grid gap-3 border-t border-krem/14 pt-6 text-[0.9rem]">
                  <div className="flex gap-3">
                    <dt className="w-[7.5rem] shrink-0 text-soluk">Ölçek</dt>
                    <dd className="text-krem/78">{GERCEK.ucretOlcek}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-[7.5rem] shrink-0 text-soluk">Dahil değil</dt>
                    <dd className="text-krem/78">{GERCEK.ucretHaric}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-[7.5rem] shrink-0 text-soluk">KDV</dt>
                    <dd className="text-krem/78">{YATIRIM.kdv}</dd>
                  </div>
                </dl>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border-y border-murekkep/12 md:mt-20 md:grid-cols-3 md:gap-0 md:divide-x md:divide-murekkep/12">
          {YATIRIM.yoklar.map((y, i) => (
            <Reveal key={y.ad} gecikme={i * 0.08} sinif="py-7 md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="flex items-center gap-2.5 font-display text-h3 font-extrabold">
                <Prohibit size={24} weight="bold" className="shrink-0 text-turuncu-koyu" aria-hidden />
                {y.ad}
              </p>
              <p className="mt-3 max-w-[30ch] leading-relaxed text-murekkep/65">{y.metin}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
