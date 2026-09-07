// -*- coding: utf-8 -*-
import Hero from "@/components/sections/home/Hero";
import Anatomi from "@/components/sections/home/Anatomi";
import TezgahBento from "@/components/sections/home/TezgahBento";
import FabrikadanHalka from "@/components/sections/home/FabrikadanHalka";
import Usta from "@/components/sections/home/Usta";
import Turkiye from "@/components/sections/home/Turkiye";
import FranchiseKapisi from "@/components/sections/home/FranchiseKapisi";

export default function AnaSayfa() {
  return (
    <>
      <Hero />
      <Anatomi />
      <TezgahBento />
      <FabrikadanHalka />
      <Usta />
      <Turkiye />
      <FranchiseKapisi />
    </>
  );
}
