// -*- coding: utf-8 -*-
/** HATLAR — sayfanın işi kanal seçtirmek, o yüzden numaralar dev ve dokunulabilir.
 *  Hangi hattın ne için olduğu markadan teyit bekliyor; not numaranın yanında duruyor. */
import { Phone, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Giris from "@/components/ui/Giris";
import GeciciNot from "@/components/ui/GeciciNot";
import FotoSahne from "@/components/ui/FotoSahne";
import { ILETISIM } from "@/data/site";

export default function Hatlar() {
  return (
    <FotoSahne foto="tezgah" alt="Çiğköfte ve taze yeşilliklerin bulunduğu şube tezgâhı" en={1800} boy={1005} konum="50% 48%" oncelik hero genis>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Giris>
              <h1 className="max-w-[13ch] font-display text-hero font-black text-krem">{ILETISIM.baslik}</h1>
            </Giris>
            <Giris gecikme={0.08}>
              <p className="mt-6 max-w-[44ch] leading-relaxed text-krem/75">{ILETISIM.lead}</p>
            </Giris>
          </div>

          <div>
            <ul className="divide-y divide-krem/12 border-y border-krem/12">
              {ILETISIM.hatlar.map((h, i) => (
                <Giris as="li" key={h.numara} gecikme={i * 0.08} y={16}>
                  <div className="py-6">
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-yesil-acik">{h.ad}</p>
                    <a
                      href={h.href}
                      className="rakam mt-2 flex items-center gap-3 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-black leading-none text-krem transition-colors hover:text-yesil-acik"
                    >
                      <Phone size={24} weight="bold" className="shrink-0 text-soluk" aria-hidden />
                      {h.numara}
                    </a>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                      <GeciciNot>{h.not}</GeciciNot>
                      {"yan" in h && h.yan && (
                        <Link
                          href={h.yan.href}
                          className="mt-2 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-krem/78 underline-offset-4 hover:text-krem hover:underline"
                        >
                          {h.yan.ad}
                          <ArrowUpRight size={13} weight="bold" aria-hidden />
                        </Link>
                      )}
                    </div>
                  </div>
                </Giris>
              ))}

              <Giris as="li" gecikme={0.16} y={16}>
                <div className="py-6">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-yesil-acik">
                    {ILETISIM.whatsapp.ad}
                  </p>
                  <a
                    href={ILETISIM.whatsapp.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-3 font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-extrabold text-krem transition-colors hover:text-yesil-acik"
                  >
                    <WhatsappLogo size={24} weight="regular" className="shrink-0 text-soluk" aria-hidden />
                    {ILETISIM.whatsapp.metin}
                  </a>
                  <GeciciNot>{ILETISIM.whatsapp.not}</GeciciNot>
                </div>
              </Giris>
            </ul>

            <Giris gecikme={0.2}>
              <div className="mt-8 space-y-2 text-[0.88rem] leading-relaxed text-soluk">
                <p>{ILETISIM.saat.hat}</p>
                <p>
                  {ILETISIM.saat.sube}{" "}
                  <Link href={ILETISIM.saat.link.href} className="font-semibold text-krem/75 underline-offset-4 hover:underline">
                    {ILETISIM.saat.link.ad}
                  </Link>
                </p>
              </div>
            </Giris>
          </div>
        </div>
    </FotoSahne>
  );
}
