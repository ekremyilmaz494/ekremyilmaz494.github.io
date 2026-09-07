import type { ReactNode } from "react";
import Picture from "./Picture";
import { cn } from "@/lib/cn";

/** Fotoğraf ekranın iki kenarına uzanır; yalnız okuma alanı sınırlanır.
 * Kadraj her sahnede ayrıca seçilir. Koyulaştırma fotoğrafı değil metnin arkasını taşır. */
export default function FotoSahne({
  children, foto, alt, en, boy, konum = "65% 55%", mobil = false,
  oncelik = false, taraf = "sol", hero = false, genis = false, sinif, id,
}: {
  children: ReactNode;
  foto: string;
  alt: string;
  en: number;
  boy: number;
  konum?: string;
  mobil?: boolean;
  oncelik?: boolean;
  taraf?: "sol" | "sag";
  hero?: boolean;
  genis?: boolean;
  sinif?: string;
  id?: string;
}) {
  return (
    <section id={id} data-zemin="yesil-koyu" data-foto-sahne
      className={cn("foto-sahne", hero && "foto-sahne--hero", taraf === "sag" && "foto-sahne--sag", genis && "foto-sahne--genis", sinif)}>
      <div className="foto-sahne__gorsel">
        <Picture ad={foto} alt={alt} genislik={en} yukseklik={boy} konum={konum}
          mobil={mobil} oncelik={oncelik} sizes="100vw" />
      </div>
      <div className="foto-sahne__perde" aria-hidden />
      <div className="foto-sahne__alan">
        <div className="foto-sahne__icerik">{children}</div>
      </div>
    </section>
  );
}
