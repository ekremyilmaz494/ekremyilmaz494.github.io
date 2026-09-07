// -*- coding: utf-8 -*-
/** GEOMETRİK ÇERÇEVE — görseli dikdörtgen olmayan bir siluetle keser.
 *  Gölge dış sarmalayıcıda `drop-shadow` ile verilir ki silueti izlesin, kutuyu değil.
 *  `tasma` ile çerçeve kabın dışına taşar (kenardan çıkan görsel etkisi). */
import { cn } from "@/lib/cn";

const SEKIL = {
  /** Sol üstten sağ alta eğik kesim. */
  diyagonal: "polygon(0% 8%, 100% 0%, 100% 92%, 0% 100%)",
  /** Aşağı bakan sivri uç. */
  ucgen: "polygon(0% 0%, 100% 0%, 50% 100%)",
  /** Sağa bakan ok bandı. */
  saget: "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)",
  /** Yumuşak eğik köşe: sağ üst kırpılır. */
  kirpik: "polygon(0% 0%, 82% 0%, 100% 18%, 100% 100%, 0% 100%)",
  /** Yatay bant, üstü ve altı eğik. */
  bant: "polygon(0% 6%, 100% 0%, 100% 94%, 0% 100%)",
  /** Kama: sol kenar eğik iner, görsel yeşil zemine saplanır. */
  kama: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
} as const;

export type SekilAdi = keyof typeof SEKIL;

export default function ClipFrame({
  sekil = "diyagonal", children, sinif, golge = true,
}: {
  sekil?: SekilAdi;
  children: React.ReactNode;
  sinif?: string;
  golge?: boolean;
}) {
  return (
    <div
      className={cn("relative", sinif)}
      style={golge ? { filter: "drop-shadow(0 30px 60px rgb(9 20 5 / 0.45))" } : undefined}
    >
      <div className="h-full w-full" style={{ clipPath: SEKIL[sekil] }}>
        {children}
      </div>
    </div>
  );
}
