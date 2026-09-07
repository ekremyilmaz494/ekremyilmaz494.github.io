"use client";
// -*- coding: utf-8 -*-
/** PARALAKS — kap ekrandan geçerken içeriği ters yönde kaydırır. Derinlik hissi, düzen maliyeti yok.
 *  Hareket azaltmada JS ile dal değiştirilmez (sunucu bunu bilemez, hidratlama çatlar):
 *  yapı aynı kalır, `data-paralaks` globals.css'te nötrlenir. */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

export default function Parallax({
  children, mesafe = 70, sinif,
}: {
  children: React.ReactNode;
  /** Toplam kayma (px). Pozitif: içerik yavaş kalır (arka plan gibi). */
  mesafe?: number;
  sinif?: string;
}) {
  const kap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: kap, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [mesafe, -mesafe]);

  return (
    <div ref={kap} className={cn("relative", sinif)}>
      <motion.div data-paralaks style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
