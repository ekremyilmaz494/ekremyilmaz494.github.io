// -*- coding: utf-8 -*-
/** MENÜ ÇIKIŞI — fiyat sitede yazmaz, panoda şube basar. Sayfa iki kapıyla kapanır:
 *  yiyecek olan şubeye, açmak isteyen franchise'a gider. */
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { MENU_SAYFA, MENU_NOT } from "@/data/site";

export default function FiyatNotu() {
  return (
    <section
      data-zemin="krem"
      className="relative isolate overflow-x-clip bg-krem py-20 text-murekkep md:py-24"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-10 border-t border-murekkep/12 pt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-h2 font-extrabold">{MENU_SAYFA.cikisBaslik}</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-murekkep/65">{MENU_NOT.fiyat}</p>
          </Reveal>

          <Reveal gecikme={0.08} sinif="flex flex-col items-start gap-3 md:items-end md:self-end">
            <Button href={MENU_SAYFA.cikis.href}>{MENU_SAYFA.cikis.ad}</Button>
            <Button href={MENU_SAYFA.franchise.href} tur="hayalet">
              {MENU_SAYFA.franchise.ad}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
