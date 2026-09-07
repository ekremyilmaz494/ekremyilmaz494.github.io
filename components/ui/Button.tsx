// -*- coding: utf-8 -*-
/** DÜĞME — tek biçim: tam yuvarlak. Birincil turuncu üstünde MÜREKKEP metin (kontrast 5.9:1);
 *  turuncu üstüne beyaz küçük metin konmaz. `hayalet` koyu zeminde ince kenarlıklı ikinci yol. */
import Link from "next/link";
import { cn } from "@/lib/cn";

type Tur = "birincil" | "hayalet" | "krem";

const BICIM: Record<Tur, string> = {
  birincil:
    "bg-turuncu text-murekkep shadow-turuncu hover:bg-turuncu-koyu hover:text-krem",
  hayalet:
    "border border-current/25 text-current hover:bg-current/8",
  krem:
    "bg-krem text-murekkep shadow-krem hover:bg-krem-koyu",
};

type Props = {
  href: string;
  children: React.ReactNode;
  tur?: Tur;
  sinif?: string;
  disaridan?: boolean;
};

export default function Button({ href, children, tur = "birincil", sinif, disaridan }: Props) {
  const s = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.98rem] font-semibold",
    "transition-all duration-200 ease-[var(--ease-cikis)] active:translate-y-px",
    BICIM[tur],
    sinif
  );
  if (disaridan || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:"))
    return <a href={href} className={s} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
  return <Link href={href} className={s}>{children}</Link>;
}
