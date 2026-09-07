// -*- coding: utf-8 -*-
/** TEK FORM — franchise başvurusu ayrı formda; burası kalan her şey. Konu alanı `?k=` ile
 *  kapılardan ön seçilir, JS yoksa ziyaretçi kendisi seçer. */
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import BasvuruForm from "@/components/form/BasvuruForm";
import { ILETISIM } from "@/data/site";

export default function Yazin() {
  const y = ILETISIM.yazin;
  return (
    <section
      id="yazin"
      data-zemin="yesil-orta"
      className="relative isolate overflow-x-clip bg-yesil-orta py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-[var(--container-site)] gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="max-w-[15ch] font-display text-h2 font-extrabold text-krem">{y.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.08}>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-krem/78">{y.metin}</p>
            <p className="mt-6 text-[0.95rem] font-semibold text-yesil-acik">{y.donus}</p>
            <GeciciNot>{y.donusNot}</GeciciNot>
          </Reveal>
        </div>

        <Reveal gecikme={0.1}>
          <BasvuruForm konu="iletisim" konular={y.konular} konuEtiket={y.konuEtiket} />
        </Reveal>
      </div>
    </section>
  );
}
