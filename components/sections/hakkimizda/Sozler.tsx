// -*- coding: utf-8 -*-
/** SÖZLERİMİZ — markanın kendi sloganları. Sayfadaki tek kayan şerit. */
import Marquee from "@/components/ui/Marquee";
import { HAKKIMIZDA } from "@/data/site";

export default function Sozler() {
  return (
    <section
      data-zemin="turuncu"
      className="relative isolate overflow-x-clip bg-turuncu py-20 text-murekkep md:py-24"
      aria-label={HAKKIMIZDA.sozler.ust}
    >
      <div className="oluklu absolute inset-x-0 top-0 h-3 opacity-60" aria-hidden />

      <Marquee ogeler={HAKKIMIZDA.sozler.liste} hiz={44} sinif="font-display text-h3 font-extrabold" />
    </section>
  );
}
