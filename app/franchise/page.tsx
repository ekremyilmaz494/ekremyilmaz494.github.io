// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import FranchiseHero from "@/components/sections/franchise/FranchiseHero";
import Yatirim from "@/components/sections/franchise/Yatirim";
import Hediye from "@/components/sections/franchise/Hediye";
import SubeTuru from "@/components/sube3d/SubeTuru";
import Paket from "@/components/sections/franchise/Paket";
import Tezgah from "@/components/sections/franchise/Tezgah";
import Surec from "@/components/sections/franchise/Surec";
import Sss from "@/components/sections/franchise/Sss";
import Basvuru from "@/components/sections/franchise/Basvuru";
import StickyCta from "@/components/site/StickyCta";
import { FaqJsonLd } from "@/components/site/JsonLd";
import { SSS, GERCEK } from "@/data/franchise";

export const metadata: Metadata = {
  title: "Franchise",
  description: `Tarihi Antep Çiğköfte franchise: ${GERCEK.ucret} anahtar teslim kurulum, royalty yok, nakliye bedeli yok. Pakette ne var, süreç nasıl işler, başvuru formu.`,
  alternates: { canonical: "/franchise/" },
};

export default function FranchiseSayfasi() {
  return (
    <>
      <FaqJsonLd sorular={SSS} />
      <FranchiseHero />
      <Yatirim />
      <Hediye />
      <SubeTuru />
      <Paket />
      <Tezgah />
      <Surec />
      <Sss />
      <Basvuru />
      <StickyCta etiket="Franchise başvurusu" />
    </>
  );
}
