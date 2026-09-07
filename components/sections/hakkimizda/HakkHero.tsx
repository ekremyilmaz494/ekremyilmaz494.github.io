// -*- coding: utf-8 -*-
/** HAKKIMIZDA AÇILIŞI — üç rakam, biri hâlâ teyitsiz ve öyle de yazıyor.
 *  Yıl sayaçla saydırılmaz; 2009 bir miktar değil, bir tarih. */
import Giris from "@/components/ui/Giris";
import Eyebrow from "@/components/ui/Eyebrow";
import GeciciNot from "@/components/ui/GeciciNot";
import { HAKKIMIZDA } from "@/data/site";

import FotoSahne from "@/components/ui/FotoSahne";

export default function HakkHero() {
  return (
    <FotoSahne foto="yogurma" alt={HAKKIMIZDA.usta.fotoAlt} en={1800} boy={1005} konum="65% 46%" mobil oncelik hero>
          <Giris>
            <Eyebrow>{HAKKIMIZDA.ust}</Eyebrow>
          </Giris>
          <Giris gecikme={0.06}>
            <h1 className="mt-5 max-w-[14ch] font-display text-hero font-black text-krem">{HAKKIMIZDA.h1}</h1>
          </Giris>
          <Giris gecikme={0.12}>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-krem/75">{HAKKIMIZDA.lead}</p>
          </Giris>

          <Giris gecikme={0.18}>
            <dl className="mt-10 grid max-w-[34rem] grid-cols-3 divide-x divide-krem/14 border-y border-krem/14">
              {HAKKIMIZDA.rakamlar.map((r) => (
                <div key={r.etiket} className="px-4 py-6 first:pl-0">
                  <dt className="sr-only">{r.etiket}</dt>
                  <dd>
                    <span className="rakam block font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-black leading-none text-krem">
                      {r.deger}
                    </span>
                    <span className={`mt-2 block text-[0.86rem] leading-snug ${r.gecici ? "text-soluk" : "text-krem/78"}`}>
                      {r.etiket}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <GeciciNot sinif="max-w-[52ch]">{HAKKIMIZDA.rakamNot}</GeciciNot>
          </Giris>
        
    </FotoSahne>
  );
}
