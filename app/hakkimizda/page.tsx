// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import HakkHero from "@/components/sections/hakkimizda/HakkHero";
import Koken from "@/components/sections/hakkimizda/Koken";
import Ilke from "@/components/sections/hakkimizda/Ilke";
import Sozler from "@/components/sections/hakkimizda/Sozler";
import HakkCikis from "@/components/sections/hakkimizda/HakkCikis";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Tarihi Antep Çiğköfte 2009'da Konya'da başladı. Tek fabrika, tek tarif, etsiz üretim: markanın kökeni, ilkesi ve politikaları.",
  alternates: { canonical: "/hakkimizda/" },
};

export default function HakkimizdaSayfasi() {
  return (
    <>
      <HakkHero />
      <Koken />
      <Ilke />
      <Sozler />
      <HakkCikis />
    </>
  );
}
