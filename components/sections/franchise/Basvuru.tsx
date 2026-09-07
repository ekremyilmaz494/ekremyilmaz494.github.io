// -*- coding: utf-8 -*-
/** BAŞVURU — sayfanın çıkışı. Sol tarafta markanın kendi kapanış cümlesi ve iki hızlı kanal,
 *  sağda form. Form JS olmadan da gönderilir (native POST). */
import { WhatsappLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import GeciciNot from "@/components/ui/GeciciNot";
import BasvuruForm from "@/components/form/BasvuruForm";
import { SES, GERCEK, GECICI_VERI } from "@/data/franchise";

export default function Basvuru() {
  return (
    <section
      id="basvuru"
      data-zemin="yesil-orta"
      className="relative isolate overflow-x-clip bg-yesil-orta py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="max-w-[20ch] font-display text-h2 font-extrabold text-krem">{SES.kapanis}</h2>
            </Reveal>
            <Reveal gecikme={0.08}>
              <p className="mt-6 max-w-[44ch] leading-relaxed text-krem/78">
                Formu doldurun, ekibimiz sizi arasın. {GERCEK.alan}
              </p>
            </Reveal>

            <Reveal gecikme={0.14}>
              <div className="mt-9 grid gap-3 sm:max-w-[24rem]">
                <a
                  href={GECICI_VERI.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-kart border border-krem/20 px-5 py-4 font-semibold text-krem transition-colors hover:border-yesil-acik hover:bg-krem/6"
                >
                  <WhatsappLogo size={22} weight="regular" aria-hidden />
                  WhatsApp&apos;tan yazın
                </a>
                <a
                  href={GECICI_VERI.telefonHref}
                  className="flex items-center gap-3 rounded-kart border border-krem/20 px-5 py-4 font-semibold text-krem transition-colors hover:border-yesil-acik hover:bg-krem/6"
                >
                  <Phone size={22} weight="regular" aria-hidden />
                  <span className="rakam">{GECICI_VERI.telefon}</span>
                </a>
              </div>
              <GeciciNot sinif="max-w-[40ch]">
                WhatsApp numarası ve franchise hattı markadan gelene kadar geçici.
              </GeciciNot>
            </Reveal>
          </div>

          <Reveal gecikme={0.1}>
            <BasvuruForm konu="franchise" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
