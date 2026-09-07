// -*- coding: utf-8 -*-
/** ÇIKIŞ — haritadaki boşluk bir fırsat olarak okunuyor. Boş il sayısı 81'den çıkarma;
 *  uydurma değil, listelenen il sayısının tamamlayanı. */
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Counter from "@/components/ui/Counter";
import GeciciNot from "@/components/ui/GeciciNot";
import { SUBELER } from "@/data/site";
import { IL_SAYISI } from "@/data/bayi";

const BOS = 81 - IL_SAYISI;

export default function SubelerCikis() {
  return (
    <section
      data-zemin="turuncu"
      className="relative isolate overflow-x-clip bg-turuncu py-20 text-murekkep md:py-24"
    >
      <div className="oluklu absolute inset-x-0 top-0 h-3 opacity-60" aria-hidden />
      <div className="mx-auto grid max-w-[var(--container-site)] items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow sinif="text-murekkep">{SUBELER.cikis.ust}</Eyebrow>
          </Reveal>
          <Reveal gecikme={0.06}>
            <h2 className="mt-4 font-display text-h2 font-extrabold">{SUBELER.cikis.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.12}>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-murekkep">{SUBELER.cikis.metin}</p>
          </Reveal>
          <Reveal gecikme={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SUBELER.cikis.birincil.href} tur="krem">{SUBELER.cikis.birincil.ad}</Button>
              <Button href={SUBELER.cikis.ikincil.href} tur="hayalet" disaridan>
                {SUBELER.cikis.ikincil.ad}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal gecikme={0.1}>
          <div className="rounded-kart bg-krem p-8 shadow-krem md:p-10">
            <Counter deger={BOS} sinif="rakam block font-display text-[clamp(3rem,6.5vw,5.5rem)] font-black leading-none text-yesil-koyu" />
            <p className="mt-3 text-[1rem] font-semibold text-murekkep/70">{SUBELER.cikis.bosEtiket}</p>
            <GeciciNot>{SUBELER.cikis.bosNot}</GeciciNot>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
