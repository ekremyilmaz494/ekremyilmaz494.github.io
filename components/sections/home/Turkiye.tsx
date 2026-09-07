// -*- coding: utf-8 -*-
/** TÜRKİYE — markanın kendi sitesinde yayınladığı bayi listesinden çıkan gerçek yayılım.
 *  Sayı listeden hesaplanır; iddia edilen ağ büyüklüğü ayrı bir not olarak durur, sayaç olmaz. */
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import HaritaSvg from "@/components/harita/HaritaSvg";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import GeciciNot from "@/components/ui/GeciciNot";
import { BAYILER, BAYI_SAYISI, IL_SAYISI, ILLER, YANAN_PLAKALAR, YANMA_SIRASI } from "@/data/bayi";
import { HAKKIMIZDA } from "@/data/site";

export default function Turkiye() {
  const enCok = ILLER.slice(0, 8);

  return (
    <section id="harita" data-zemin="yesil-koyu" className="tane relative isolate bg-yesil-koyu py-24 md:py-32">
      <div className="mx-auto grid max-w-[var(--container-site)] gap-14 px-5 md:px-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
        <div>
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-h2 font-extrabold text-krem">
              {IL_SAYISI} ilde, {BAYI_SAYISI} bayi.
            </h2>
          </Reveal>
          <Reveal gecikme={0.08}>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-krem/78">
              Harita, markanın kendi sitesinde yayınlanan bayi listesinden çıkarıldı. Şehrine tıkla,
              adresi ve telefonu gör.
            </p>
          </Reveal>

          <Reveal gecikme={0.14}>
            {/* Rakam text-sayi ile basılınca sütunu taşırıp diğerinin üstüne biniyordu; ölçek burada ayrı. */}
            <dl className="mt-10 grid max-w-[26rem] grid-cols-2 divide-x divide-krem/15">
              <div className="pr-6">
                <dd className="font-display text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-none text-krem">
                  <Counter deger={BAYI_SAYISI} />
                </dd>
                <dt className="mt-2 text-[0.92rem] text-krem/78">listelenen bayi</dt>
              </div>
              <div className="pl-6">
                <dd className="font-display text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-none text-krem">
                  <Counter deger={IL_SAYISI} />
                </dd>
                <dt className="mt-2 text-[0.92rem] text-krem/78">il</dt>
              </div>
            </dl>
            <GeciciNot sinif="max-w-[46ch]">{HAKKIMIZDA.rakamNot}</GeciciNot>
          </Reveal>

          <Reveal gecikme={0.2}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {enCok.map((il) => (
                <li key={il.plaka}>
                  <Link
                    href={`/subeler/?il=${il.plaka}`}
                    className="inline-flex items-baseline gap-2 rounded-full border border-krem/18 px-4 py-2 text-[0.92rem] text-krem/80 transition-colors hover:border-yesil-acik hover:text-krem"
                  >
                    {il.ad}
                    <span className="rakam text-[0.78rem] text-yesil-acik">{il.sayi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal gecikme={0.26}>
            <Button href="/subeler#liste" tur="hayalet" sinif="mt-8">
              Tüm şubeler
              <ArrowRight size={17} weight="bold" aria-hidden />
            </Button>
          </Reveal>
        </div>

        <div className="relative">
          <HaritaSvg yanan={YANAN_PLAKALAR} sira={YANMA_SIRASI} sinif="drop-shadow-[0_24px_50px_rgb(9_20_5/0.5)]" />
          {/* Harita süs değil, veri: ekran okuyucu için aynı bilgi listede. */}
          <p className="sr-only">
            Bayisi olan iller: {ILLER.map((i) => `${i.ad} (${i.sayi})`).join(", ")}. Toplam{" "}
            {BAYILER.length} bayi.
          </p>
        </div>
      </div>
    </section>
  );
}
