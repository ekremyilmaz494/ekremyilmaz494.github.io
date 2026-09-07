// -*- coding: utf-8 -*-
/** KÖKEN — "neden Antep, neden Konya" sorusu markanın hiçbir yerinde açıklanmıyordu.
 *  Alıntı markanın kurumsal sayfasından; kurucunun ağzından değil, künyesi öyle yazıyor. */
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import { HAKKIMIZDA } from "@/data/site";

export default function Koken() {
  const k = HAKKIMIZDA.koken;
  return (
    <section
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-[12ch] font-display text-h2 font-extrabold lg:sticky lg:top-28">{k.baslik}</h2>
          </Reveal>
          <div>
            <Reveal gecikme={0.06}>
              <p className="max-w-[58ch] text-[1.08rem] leading-relaxed text-murekkep/78">{k.metin1}</p>
            </Reveal>
            <Reveal gecikme={0.12}>
              <p className="mt-5 max-w-[58ch] text-[1.08rem] leading-relaxed text-murekkep/78">{k.metin2}</p>
            </Reveal>

            <Reveal gecikme={0.18}>
              <figure className="mt-10 border-l-4 border-turuncu pl-6">
                <blockquote className="font-display text-h3 font-bold leading-snug text-yesil-koyu">
                  {k.alinti}
                </blockquote>
                <figcaption className="mt-3 text-[0.86rem] text-soluk-koyu">{k.alintiKaynak}</figcaption>
              </figure>
              <GeciciNot sinif="max-w-[52ch]">{k.gecici}</GeciciNot>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
