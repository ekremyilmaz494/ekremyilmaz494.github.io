// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import Hatlar from "@/components/sections/iletisim/Hatlar";
import Kapilar from "@/components/sections/iletisim/Kapilar";
import Yazin from "@/components/sections/iletisim/Yazin";
import Merkez from "@/components/sections/iletisim/Merkez";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Tarihi Antep Çiğköfte iletişim: çağrı merkezi, franchise hattı, WhatsApp, e-posta ve Konya'daki merkez adresi.",
  alternates: { canonical: "/iletisim/" },
};

export default function IletisimSayfasi() {
  return (
    <>
      <Hatlar />
      <Kapilar />
      <Yazin />
      <Merkez />
    </>
  );
}
