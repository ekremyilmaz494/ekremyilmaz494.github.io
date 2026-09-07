// -*- coding: utf-8 -*-
/** ŞUBEDE NE VAR — dizin uzun bir listedir; bu bölüm listeyi kapatıp mekânı gösterir.
 *  Görsel örnek şube renderı, altyazısı bunu açıkça söyler. */
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import { SUBELER } from "@/data/site";

import FotoSahne from "@/components/ui/FotoSahne";

export default function Subede() {
  return (
    <FotoSahne foto="sube-giris" alt={SUBELER.subede.fotoAlt} en={1600} boy={1000} konum="38% 50%" taraf="sag">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-h2 font-extrabold text-krem">{SUBELER.subede.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.08}>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-krem/75">{SUBELER.subede.metin}</p>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-soluk">{SUBELER.subede.pano}</p>
          </Reveal>
          <Reveal gecikme={0.14}>
            <Link
              href={SUBELER.subede.link.href}
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-yesil-acik pb-1 font-semibold text-krem transition-colors hover:border-krem"
            >
              {SUBELER.subede.link.ad}
              <ArrowRight size={17} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
<p className="mt-8 text-sm text-krem/75">{SUBELER.subede.altyazi}</p>
    </FotoSahne>
  );
}
