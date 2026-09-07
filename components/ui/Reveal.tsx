"use client";
// -*- coding: utf-8 -*-
/** ORTAYA ÇIKIŞ — görünüme girince yukarı süzülür. `data-reveal` işaretiyle JS/hareket-azaltma
 *  yedeği globals.css'te: JS yoksa ya da kullanıcı hareketi kapattıysa içerik olduğu gibi durur. */
import { motion } from "motion/react";
import { GECIS, GORUNUM } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  /** Kaç piksel aşağıdan gelsin. */
  y?: number;
  gecikme?: number;
  sinif?: string;
  as?: "div" | "li" | "p" | "span";
};

export default function Reveal({ children, y = 26, gecikme = 0, sinif, as = "div" }: Props) {
  const M = motion[as];
  return (
    <M
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={GORUNUM}
      transition={{ ...GECIS, delay: gecikme }}
      className={sinif}
    >
      {children}
    </M>
  );
}
