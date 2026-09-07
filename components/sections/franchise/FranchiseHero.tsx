// -*- coding: utf-8 -*-
/** FRANCHISE AÇILIŞI — kitle yatırımcı, o yüzden ilk ekranda rakam var: anahtar teslim bedel
 *  başlığın hemen altında durur. Görsel dükkânın kendi cephesi; render değil, marka fotoğrafı. */
import Giris from "@/components/ui/Giris";
import Button from "@/components/ui/Button";
import { SES, GERCEK, MARKA } from "@/data/franchise";

import FotoSahne from "@/components/ui/FotoSahne";

export default function FranchiseHero() {
  return (
    <FotoSahne id="franchise-hero" foto="cephe" alt="Tarihi Antep Çiğköfte şube cephesi" en={1600} boy={1200} konum="64% 48%" oncelik hero>
          <Giris>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-yesil-acik">
              FRANCHISE · {MARKA.cepheSlogan.toLocaleUpperCase("tr")}
            </p>
          </Giris>
          <Giris gecikme={0.06}>
            <h1 className="mt-5 max-w-[13ch] font-display text-hero font-black text-krem">
              Tezgâhınızı biz kuruyoruz.
            </h1>
          </Giris>
          <Giris gecikme={0.1}>
            {/* Marka sahibinin kendi cümlesi, birebir. Başlığa sıkıştırılmadı, olduğu gibi duruyor. */}
            <p className="mt-6 max-w-[44ch] text-[1.05rem] leading-relaxed text-krem/78">{SES.acilis}</p>
          </Giris>

          <Giris gecikme={0.12}>
            <div className="mt-9 flex flex-wrap items-end gap-x-5 gap-y-2 border-t border-krem/14 pt-7">
              <p className="rakam font-display text-[clamp(2.6rem,5.5vw,4.4rem)] font-black leading-[0.86] tracking-tight text-krem">
                {GERCEK.ucret}
              </p>
              <p className="pb-1 text-[0.95rem] font-semibold text-yesil-acik">{GERCEK.ucretEtiket}</p>
            </div>
            <p className="mt-3 max-w-[44ch] text-[0.92rem] leading-relaxed text-soluk">
              {GERCEK.ucretOlcek} {GERCEK.ucretHaric}
            </p>
          </Giris>

          <Giris gecikme={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#basvuru">Franchise başvurusu</Button>
              <Button href="#paket" tur="hayalet">Pakette ne var?</Button>
            </div>
          </Giris>
        
    </FotoSahne>
  );
}
