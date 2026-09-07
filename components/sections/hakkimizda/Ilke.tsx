// -*- coding: utf-8 -*-
/** İLKE — markanın kendi sayfasındaki cümle ve üç politika başlığı. Politika METİNLERİ yok:
 *  markanın "Kalite Belgelerimiz" sayfası boş, o yüzden burada yalnız başlıklar ve bir not var. */
import { FileText } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import { HAKKIMIZDA } from "@/data/site";

import FotoSahne from "@/components/ui/FotoSahne";

export default function Ilke() {
  const i = HAKKIMIZDA.ilke;
  return (
    <FotoSahne foto="kampanya-malzeme-v1" alt="Çiğköfte, bulgur, baharat ve taze yeşilliklerden oluşan kompozisyon" en={1672} boy={941} konum="65% 50%">
            <Reveal><h2 className="font-display text-h2 font-extrabold text-krem">{i.baslik}</h2>
          </Reveal>
          <Reveal gecikme={0.08}>
            <p className="mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-krem/78">{i.metin}</p>
          </Reveal>

          <Reveal gecikme={0.14}>
            <p className="mt-10 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-yesil-acik">
              {i.politikaUst}
            </p>
            <ul className="mt-4 divide-y divide-krem/12 border-y border-krem/12">
              {i.politikalar.map((p) => (
                <li key={p} className="flex items-start gap-3 py-4 text-[0.98rem] text-krem/80">
                  <FileText size={19} weight="regular" className="mt-0.5 shrink-0 text-soluk" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <GeciciNot sinif="max-w-[48ch]">{i.politikaGecici}</GeciciNot>
          </Reveal>
        
    </FotoSahne>
  );
}
