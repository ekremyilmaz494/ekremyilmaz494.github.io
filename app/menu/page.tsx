// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import MenuHero from "@/components/sections/menu/MenuHero";
import Porsiyonlar from "@/components/sections/menu/Porsiyonlar";
import GramajSlider from "@/components/sections/menu/GramajSlider";
import PanoBento from "@/components/sections/menu/PanoBento";
import Anteppare from "@/components/sections/menu/Anteppare";
import IcindeNeVar from "@/components/sections/menu/IcindeNeVar";
import FiyatNotu from "@/components/sections/menu/FiyatNotu";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "Tarihi Antep Çiğköfte menüsü: dört porsiyon, dört dürüm, Mega ve Eko Dürüm, Aile Porsiyon ve Anteppare. Işıklı panodaki sırayla.",
  alternates: { canonical: "/menu/" },
};

export default function MenuSayfasi() {
  return (
    <>
      <MenuHero />
      <Porsiyonlar />
      <GramajSlider />
      <PanoBento />
      <Anteppare />
      <IcindeNeVar />
      <FiyatNotu />
    </>
  );
}
