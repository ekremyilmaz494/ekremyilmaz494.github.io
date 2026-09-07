"use client";
// -*- coding: utf-8 -*-
/** EĞİLEN KART — imleç kartın üstünde gezerken 3B eğim + hafif kalkış.
 *  Yalnız gerçek fareyle çalışır (pointerType "mouse"); dokunmatikte ve hareket-azaltmada düz kalır.
 *  Hareket azaltmada DOM DEĞİŞMEZ (sunucu bunu bilemez, hidratlama çatlardı): dinleyici çalışmaz,
 *  dönüşümü de `data-tilt` üzerinden globals.css nötrler.
 *  Sürekli değerler motion value ile taşınır; React ağacı her karede yeniden çizilmez. */
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { YAY } from "@/lib/motion";
import { cn } from "@/lib/cn";

export default function TiltCard({
  children, siddet = 9, kaldir = 8, sinif,
}: {
  children: React.ReactNode;
  /** En fazla kaç derece eğilsin. */
  siddet?: number;
  /** Kaç piksel kalksın. */
  kaldir?: number;
  sinif?: string;
}) {
  const kap = useRef<HTMLDivElement>(null);
  const azalt = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const z = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [siddet, -siddet]), YAY);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-siddet, siddet]), YAY);
  const yy = useSpring(z, YAY);

  return (
    <div ref={kap} className={cn("[perspective:1100px]", sinif)}>
      <motion.div
        data-tilt
        onPointerMove={(e) => {
          if (azalt || e.pointerType !== "mouse" || !kap.current) return;
          const k = kap.current.getBoundingClientRect();
          mx.set((e.clientX - k.left) / k.width - 0.5);
          my.set((e.clientY - k.top) / k.height - 0.5);
          z.set(-kaldir);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); z.set(0); }}
        style={{ rotateX: rx, rotateY: ry, y: yy, transformStyle: "preserve-3d" }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
