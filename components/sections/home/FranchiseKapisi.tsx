// -*- coding: utf-8 -*-
/** FRANCHISE KAPISI — sayfanın kararlı kapanışı ve tek turuncu bloğu.
 *  Rakam markanın yazılı bildirdiği bedel; yanındaki üç kalem sözleşmeye bağlı "alınmayanlar". */
import { Prohibit } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import { ANA } from "@/data/site";
import { GERCEK, YATIRIM } from "@/data/franchise";

export default function FranchiseKapisi() {
  return (
    <section data-zemin="turuncu" className="relative isolate overflow-x-clip bg-turuncu py-24 text-murekkep md:py-32">
      {/* Oluklu tezgâh bandı: dükkândaki turuncu yüzeyin dokusu */}
      <div className="oluklu absolute inset-x-0 top-0 h-2 opacity-70" aria-hidden />

      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Reveal>
              <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-murekkep">{ANA.kapi.ust}</p>
            </Reveal>
            <Reveal gecikme={0.06}>
              <h2 className="mt-3 max-w-[26ch] font-display text-h3 font-extrabold md:text-[clamp(1.6rem,2.5vw,2.3rem)] md:leading-[1.06]">{ANA.kapi.baslik}</h2>
            </Reveal>
            <Reveal gecikme={0.12}>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-murekkep">{ANA.kapi.metin}</p>
            </Reveal>
            <Reveal gecikme={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={ANA.kapi.birincil.href} tur="krem">{ANA.kapi.birincil.ad}</Button>
                <Button href={ANA.kapi.ikincil.href} tur="hayalet">{ANA.kapi.ikincil.ad}</Button>
              </div>
            </Reveal>
          </div>

          <Reveal y={30} gecikme={0.1}>
            <TiltCard siddet={6} kaldir={6}>
              <div className="rounded-kart bg-krem p-8 shadow-[0_28px_60px_-24px_rgb(60_16_4/0.55)] md:p-10">
                <p className="text-[0.74rem] font-semibold tracking-[0.2em] text-turuncu-koyu">
                  {GERCEK.ucretEtiket.toLocaleUpperCase("tr-TR")}
                </p>
                {/* Kart genişliğine sığsın: text-sayi burada "189.000 ₺"yi alt satıra atıyordu. */}
                <p className="rakam mt-3 whitespace-nowrap font-display text-[clamp(2.6rem,4.6vw,4.1rem)] font-extrabold leading-none text-murekkep">
                  {GERCEK.ucret}
                </p>
                <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-murekkep/65">
                  {GERCEK.ucretOlcek} {YATIRIM.kdv}
                </p>

                <ul className="mt-8 space-y-3 border-t border-murekkep/12 pt-6">
                  {YATIRIM.yoklar.map((y) => (
                    <li key={y.ad} className="flex items-start gap-3">
                      <Prohibit size={20} weight="bold" className="mt-0.5 shrink-0 text-turuncu-koyu" aria-hidden />
                      <span>
                        <span className="font-semibold">{y.ad} yok.</span>{" "}
                        <span className="text-murekkep/62">{y.metin}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
