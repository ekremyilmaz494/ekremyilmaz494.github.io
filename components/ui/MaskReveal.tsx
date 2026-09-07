"use client";
// -*- coding: utf-8 -*-
/** MASKE AÇILIŞI — görsel bir perde gibi açılır (clip-path), içerik karşı-ölçekle sabit durur.
 *  Yalnız clip-path ve transform kullanır; düzen hesabı tetiklemez.
 *
 *  ÖNEMLİ: görünürlük, kırpılmamış DIŞ sarmalayıcıdan okunur. IntersectionObserver, clip-path ile
 *  tamamen gizlenmiş bir öğeyi "görünmüyor" sayıyor; ölçüyü maskeli öğeden alırsak maske hiç açılmaz. */
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GORUNUM } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Yon = "yukari" | "sag" | "sol";

const KAPALI: Record<Yon, string> = {
  yukari: "inset(100% 0% 0% 0%)",
  sag: "inset(0% 100% 0% 0%)",
  sol: "inset(0% 0% 0% 100%)",
};
const ACIK = "inset(0% 0% 0% 0%)";

export default function MaskReveal({
  children, yon = "yukari", sure = 1.15, gecikme = 0, sinif,
}: {
  children: React.ReactNode;
  yon?: Yon;
  sure?: number;
  gecikme?: number;
  sinif?: string;
}) {
  const kap = useRef<HTMLDivElement>(null);
  const goruniyor = useInView(kap, { once: GORUNUM.once, amount: GORUNUM.amount });

  return (
    <div ref={kap} className={cn("relative", sinif)}>
      <motion.div
        data-maske
        initial={{ clipPath: KAPALI[yon] }}
        animate={{ clipPath: goruniyor ? ACIK : KAPALI[yon] }}
        transition={{ duration: sure, delay: gecikme, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.14 }}
          animate={{ scale: goruniyor ? 1 : 1.14 }}
          transition={{ duration: sure + 0.25, delay: gecikme, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
