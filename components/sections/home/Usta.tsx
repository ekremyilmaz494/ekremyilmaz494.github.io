// -*- coding: utf-8 -*-
/** USTA — sayfanın nefes aldığı yer. Tek görsel perde gibi açılır, yanında iki paragraf.
 *  Kuruluş anlatısının tamamı markadan gelmediği için burada kısa durur; devamı /hakkimizda'da. */
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import { ANA } from "@/data/site";

import FotoSahne from "@/components/ui/FotoSahne";

export default function Usta() {
  return (
    <FotoSahne foto="sikma" alt={ANA.koken.fotoAlt} en={1400} boy={1738} konum="30% 46%" mobil taraf="sag">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-h2 font-extrabold text-krem">{ANA.koken.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.08}>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-krem/78">{ANA.koken.lead}</p>
          </Reveal>
          <Reveal gecikme={0.14}>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-krem/78">{ANA.koken.metin}</p>
          </Reveal>
          <Reveal gecikme={0.2}>
            <Link
              href={ANA.koken.link.href}
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-yesil-acik pb-1 font-semibold text-krem transition-colors hover:border-krem"
            >
              {ANA.koken.link.ad}
              <ArrowRight size={17} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <GeciciNot sinif="max-w-[46ch]">{ANA.koken.gecici}</GeciciNot>
          </Reveal>

    </FotoSahne>
  );
}
