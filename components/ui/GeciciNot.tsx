// -*- coding: utf-8 -*-
/** GEÇİCİ NOT — teyit bekleyen bilgi. Ekranda küçük ve dürüst durur; yayına çıkmadan hepsi temizlenir.
 *  Bu bileşenin varlığı build-guard'ın aradığı işaretlerden biridir.
 *  Renk opaklıkla kısılmaz (AA altına düşüyordu): zemin `--soluk` değişkenini verir. */
import { Info } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export default function GeciciNot({ children, sinif }: { children: React.ReactNode; sinif?: string }) {
  return (
    <p
      data-gecici
      className={cn("mt-2 flex items-start gap-1.5 text-[0.78rem] leading-snug text-[color:var(--soluk,currentColor)]", sinif)}
    >
      <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
