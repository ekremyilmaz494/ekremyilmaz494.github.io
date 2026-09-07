// -*- coding: utf-8 -*-
/** MENÜ AÇILIŞI — tam ekran Anteppare fotoğrafı üstünde başlık ve kategori bağlantıları.
 *  Ray sekme değil çıpa: JS'siz çalışır, sahte "aktif" durumu yoktur. */
import Giris from "@/components/ui/Giris";
import Eyebrow from "@/components/ui/Eyebrow";
import { MENU_SAYFA, ANTEPPARE } from "@/data/site";

import FotoSahne from "@/components/ui/FotoSahne";

export default function MenuHero() {
  return (
    <FotoSahne foto="anteppare-kutu" alt={ANTEPPARE.cesitler[0].alt} en={1600} boy={1200} konum="65% 50%" mobil oncelik hero>
          <Giris>
            <Eyebrow>{MENU_SAYFA.ust}</Eyebrow>
          </Giris>
          <Giris gecikme={0.06}>
            <h1 className="mt-5 max-w-[15ch] font-display text-hero font-black text-krem">
              {MENU_SAYFA.baslik}
            </h1>
          </Giris>
          <Giris gecikme={0.12}>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-krem/75">{MENU_SAYFA.lead}</p>
          </Giris>

          <Giris gecikme={0.18}>
            <nav aria-label="Menü bölümleri" className="mt-9">
              <ul className="flex flex-wrap gap-2.5">
                {MENU_SAYFA.ray.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="inline-flex rounded-full border border-krem/22 px-4 py-2 text-[0.9rem] font-semibold text-krem/85 transition-colors hover:border-yesil-acik hover:bg-yesil-acik/10 hover:text-krem"
                    >
                      {r.ad}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Giris>
        
    </FotoSahne>
  );
}
