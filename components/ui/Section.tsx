// -*- coding: utf-8 -*-
/** BÖLÜM — zemin rengini hem kendisi boyar hem de `data-zemin` ile sayfa zeminine bildirir.
 *  `tasma` açıkken içerik kaptan taşabilir (clip-path çerçeveler için) ama sayfa yatay kaymaz. */
import { cn } from "@/lib/cn";

const ZEMIN = {
  "yesil-koyu": "bg-yesil-koyu text-krem",
  "yesil-orta": "bg-yesil-orta text-krem",
  krem: "bg-krem text-murekkep",
  "krem-koyu": "bg-krem-koyu text-murekkep",
  turuncu: "bg-turuncu text-murekkep",
} as const;

export type ZeminAdi = keyof typeof ZEMIN;

type Props = {
  bg: ZeminAdi;
  id?: string;
  children: React.ReactNode;
  sinif?: string;
  /** Kap genişliğini uygulama; bölüm tam genişlikte kalsın. */
  tam?: boolean;
  etiket?: string;
};

export default function Section({ bg, id, children, sinif, tam, etiket }: Props) {
  return (
    <section
      id={id}
      data-zemin={bg}
      aria-label={etiket}
      className={cn("relative isolate overflow-x-clip", ZEMIN[bg], sinif)}
    >
      {tam ? children : <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">{children}</div>}
    </section>
  );
}
