"use client";
// -*- coding: utf-8 -*-
/** KAYAN ŞERİT — sayfada en fazla bir kez. Hareket azaltıldığında durur ve tek sıra olarak okunur.
 *  Karar JS ile değil CSS ile verilir; sunucu `prefers-reduced-motion` bilmediği için dal değiştirmek
 *  hidratlamayı çatlatıyordu. */
import { cn } from "@/lib/cn";

export default function Marquee({
  ogeler, hiz = 38, sinif,
}: {
  ogeler: readonly string[];
  /** Bir turun saniyesi. */
  hiz?: number;
  sinif?: string;
}) {
  return (
    <div
      className={cn("relative flex overflow-hidden motion-reduce:overflow-visible", sinif)}
      aria-label={ogeler.join(", ")}
    >
      {[0, 1].map((k) => (
        <ul
          key={k}
          aria-hidden={k === 1}
          className={cn(
            "flex shrink-0 items-center gap-10 pr-10 [animation:kay_var(--sure)_linear_infinite]",
            "motion-reduce:[animation:none] motion-reduce:flex-wrap motion-reduce:gap-x-8 motion-reduce:gap-y-2",
            k === 1 && "motion-reduce:hidden"
          )}
          style={{ "--sure": `${hiz}s` } as React.CSSProperties}
        >
          {ogeler.map((o) => <li key={o} className="whitespace-nowrap">{o}</li>)}
        </ul>
      ))}
    </div>
  );
}
