// -*- coding: utf-8 -*-
/** ETİKET SATIRI — sayfada seyrek kullanılır (üç bölümde en fazla bir). Başlık kendini taşıyorsa yazılmaz. */
import { cn } from "@/lib/cn";

export default function Eyebrow({ children, sinif }: { children: React.ReactNode; sinif?: string }) {
  return (
    <p className={cn("text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-yesil-acik", sinif)}>
      {children}
    </p>
  );
}
