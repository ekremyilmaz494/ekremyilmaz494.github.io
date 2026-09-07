// -*- coding: utf-8 -*-
/** MERKEZ — adres, e-posta ve yol tarifi. Harita KOORDİNATI markadan bekleniyor;
 *  yer tutucu bir pin basmak yerine yol tarifi bağlantısı adres metniyle çalışıyor. */
import { MapPin, EnvelopeSimple, InstagramLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import GeciciNot from "@/components/ui/GeciciNot";
import Picture from "@/components/ui/Picture";
import ClipFrame from "@/components/ui/ClipFrame";
import MaskReveal from "@/components/ui/MaskReveal";
import { ILETISIM } from "@/data/site";
import { MARKA } from "@/data/franchise";

export default function Merkez() {
  const m = ILETISIM.merkez;
  return (
    <section
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-[var(--container-site)] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{m.ust}</Eyebrow>
          </Reveal>
          <Reveal gecikme={0.06}>
            <h2 className="mt-4 font-display text-h2 font-extrabold text-krem">{m.baslik}</h2>
          </Reveal>

          <Reveal gecikme={0.12}>
            <dl className="mt-9 divide-y divide-krem/12 border-y border-krem/12">
              <div className="flex gap-4 py-5">
                <dt className="shrink-0 pt-0.5"><MapPin size={20} weight="regular" className="text-soluk" aria-hidden /><span className="sr-only">Adres</span></dt>
                <dd className="leading-relaxed text-krem/82">{m.adres}</dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="shrink-0 pt-0.5"><EnvelopeSimple size={20} weight="regular" className="text-soluk" aria-hidden /><span className="sr-only">E-posta</span></dt>
                <dd>
                  <a href={`mailto:${m.eposta}`} className="font-semibold text-krem hover:text-yesil-acik">{m.eposta}</a>
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="shrink-0 pt-0.5"><InstagramLogo size={20} weight="regular" className="text-soluk" aria-hidden /><span className="sr-only">Instagram</span></dt>
                <dd>
                  <a
                    href={MARKA.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-krem hover:text-yesil-acik"
                  >
                    {MARKA.sosyal}
                    <ArrowUpRight size={14} weight="bold" aria-hidden />
                  </a>
                  <GeciciNot sinif="max-w-[40ch]">{m.sosyalNot}</GeciciNot>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal gecikme={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={m.yol.href} disaridan>{m.yol.ad}</Button>
              <Button href={m.cikis.href} tur="hayalet">{m.cikis.ad}</Button>
            </div>
            <GeciciNot sinif="max-w-[46ch]">{m.haritaGecici}</GeciciNot>
          </Reveal>
        </div>

        <MaskReveal yon="sag">
          <ClipFrame sekil="bant" sinif="aspect-[4/3]">
            <Picture
              ad="cephe"
              alt="Tarihi Antep Çiğköfte şube cephesi: yeşil tabela ve cam giydirme"
              genislik={1600}
              yukseklik={1200}
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </ClipFrame>
        </MaskReveal>
      </div>
    </section>
  );
}
