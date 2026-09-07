// -*- coding: utf-8 -*-
/** ÜÇ KAPI — burada KİTLE değil İŞ ayrılıyor: sipariş, franchise, kurumsal. Her kapının tek
 *  hedefi var; `yan` daha hafif ikinci yol. Kapıların etiketi yok, başlık kapıyı adlandırıyor. */
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import Kap from "@/components/ui/Kap";
import { ILETISIM } from "@/data/site";

export default function Kapilar() {
  const k = ILETISIM.kapilar;
  return (
    <section
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-24 text-murekkep md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Reveal>
            <h2 className="font-display text-h2 font-extrabold">{k.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.06}>
            <p className="text-soluk-koyu">{k.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {k.liste.map((kapi, i) => (
            <Reveal as="li" key={kapi.baslik} gecikme={i * 0.08}>
              <Kap yuzey="krem-koyu" sinif="flex h-full flex-col p-7 md:p-8">
                <h3 className="max-w-[18ch] font-display text-h3 font-extrabold">{kapi.baslik}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-murekkep/68">{kapi.metin}</p>
                <Link
                  href={kapi.cta.href}
                  className="group mt-7 inline-flex items-center gap-2 self-start rounded-full bg-yesil-koyu px-5 py-3 text-[0.92rem] font-semibold text-krem transition-colors hover:bg-yesil"
                >
                  {kapi.cta.ad}
                  <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={kapi.yan.href}
                  className="mt-3 self-start text-[0.88rem] font-semibold text-soluk-koyu underline-offset-4 hover:text-murekkep hover:underline"
                >
                  {kapi.yan.ad}
                </a>
              </Kap>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
