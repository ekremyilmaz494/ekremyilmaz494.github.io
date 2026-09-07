// -*- coding: utf-8 -*-
/** TEZGÂH VE DESTEK — iki ayrı soru tek bölümde: "tezgâh tek ürüne mi bağlı" ve
 *  "yalnız mı bırakılıyorum". Ürün listesi UYDURULMAZ; ikinci ürüne bayi karar verir. */
import { MapPin, UsersThree, Lifebuoy, Truck } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import Kap from "@/components/ui/Kap";
import { IKINCI, DESTEK } from "@/data/franchise";

const IKON = [MapPin, UsersThree, Lifebuoy, Truck];

export default function Tezgah() {
  return (
    <section
      id="destek"
      data-zemin="krem-koyu"
      className="relative isolate overflow-x-clip bg-krem-koyu py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-turuncu-koyu">{IKINCI.ust}</p>
            </Reveal>
            <Reveal gecikme={0.06}>
              <h2 className="mt-4 max-w-[15ch] font-display text-h2 font-extrabold">{IKINCI.baslik}</h2>
            </Reveal>
            <Reveal gecikme={0.12}>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-murekkep/72">{IKINCI.lead}</p>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-murekkep/65">{IKINCI.detay}</p>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {DESTEK.map((d, i) => {
              const Ikon = IKON[i];
              return (
                <Reveal as="li" key={d.ad} gecikme={i * 0.07}>
                  <Kap yuzey="krem" sinif="h-full p-6">
                    <Ikon size={26} weight="regular" className="text-yesil" aria-hidden />
                    <h3 className="mt-4 font-display text-[1.15rem] font-extrabold">{d.ad}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-murekkep/65">{d.metin}</p>
                  </Kap>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
