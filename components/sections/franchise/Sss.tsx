// -*- coding: utf-8 -*-
/** SIK SORULANLAR — sıra itiraz sırasıdır: önce para, sonra ürün, sonra "ben yapabilir miyim",
 *  sonra süreç. Yerleşik <details> kullanılır; JS olmadan da açılır kapanır. */
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import { SSS } from "@/data/franchise";

export default function Sss() {
  return (
    <section
      id="sss"
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-[12ch] font-display text-h2 font-extrabold text-krem lg:sticky lg:top-28">
              Aklınıza gelen soru, muhtemelen burada.
            </h2>
          </Reveal>

          <ul className="divide-y divide-krem/12 border-y border-krem/12">
            {SSS.map((s, i) => (
              <Reveal as="li" key={s.soru} gecikme={Math.min(i, 6) * 0.04} y={14}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-[1.02rem] font-semibold text-krem marker:hidden [&::-webkit-details-marker]:hidden">
                    <Plus
                      size={20}
                      weight="bold"
                      aria-hidden
                      className="mt-0.5 shrink-0 text-yesil-acik transition-transform duration-300 ease-[var(--ease-cikis)] group-open:rotate-45"
                    />
                    <span className="max-w-[44ch]">{s.soru}</span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 pl-9 leading-relaxed text-krem/78">{s.cevap}</p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
