// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import HaritaDizin from "@/components/sections/subeler/HaritaDizin";
import Subede from "@/components/sections/subeler/Subede";
import SubelerCikis from "@/components/sections/subeler/SubelerCikis";
import { BAYI_SAYISI, IL_SAYISI } from "@/data/bayi";

export const metadata: Metadata = {
  title: "Şubeler",
  description: `Tarihi Antep Çiğköfte ${IL_SAYISI} ilde ${BAYI_SAYISI} şube. Haritadan şehrinizi seçin; adres, telefon ve yol tarifi tek adımda.`,
  alternates: { canonical: "/subeler/" },
};

export default function SubelerSayfasi() {
  return (
    <>
      <HaritaDizin />
      <Subede />
      <SubelerCikis />
    </>
  );
}
