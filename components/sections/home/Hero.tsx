import FotoSahne from "@/components/ui/FotoSahne";
import Button from "@/components/ui/Button";
import Giris from "@/components/ui/Giris";
import { ANA } from "@/data/site";

export default function Hero() {
  return (
    <FotoSahne foto="kampanya-durum-v1" alt="Lavaş, çiğköfte, taze yeşillikler ve limonun yakın plan kampanya kompozisyonu" en={1672} boy={941}
      konum="65% 50%" oncelik hero sinif="ana-foto-hero">
      <Giris y={16}>
        <p className="max-w-[42ch] text-[0.76rem] font-semibold tracking-[0.18em] text-yesil-acik">{ANA.ust}</p>
      </Giris>
      <Giris gecikme={0.08}>
        <h1 className="mt-6 font-display font-extrabold text-krem">
          {ANA.slogan.a} {ANA.slogan.b} {ANA.slogan.c}
        </h1>
      </Giris>
      <Giris gecikme={0.2}>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={ANA.heroCta.birincil.href}>{ANA.heroCta.birincil.ad}</Button>
          <Button href={ANA.heroCta.ikincil.href} tur="hayalet">{ANA.heroCta.ikincil.ad}</Button>
        </div>
      </Giris>
    </FotoSahne>
  );
}
