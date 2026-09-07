// -*- coding: utf-8 -*-
/** İLK EKRAN GİRİŞİ — `Reveal`in JS'siz karşılığı. Sunucu bileşeni: paket büyümez.
 *
 *  NEDEN AYRI BİR BİLEŞEN: `Reveal` sunucuda `opacity:0` basıyor ve görünürlüğü
 *  IntersectionObserver'a bakarak açıyor. İlk ekranda bu, en büyük öğenin boyanmasını
 *  hidratlamaya kadar erteliyor (ölçüm: FCP 0,8 sn iken LCP 4,7 sn, ikisinin arası tamamen
 *  JS beklemesi). Katlamanın üstünde kalan her şey bu yüzden CSS ile girer: animasyon
 *  stil dosyası ayrıştırılır ayrıştırılmaz başlar, JS'i beklemez.
 *  Katlamanın altında `Reveal` doğru olan: orada kaydırmayı beklemek zaten isteniyor. */
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  /** Kaç piksel aşağıdan gelsin. */
  y?: number;
  /** Saniye. LCP öğesini geciktirmemek için ilk öğede 0 bırakılır. */
  gecikme?: number;
  sinif?: string;
  as?: "div" | "span" | "p" | "li";
};

export default function Giris({ children, y = 26, gecikme = 0, sinif, as: Etiket = "div" }: Props) {
  return (
    <Etiket
      data-giris
      style={{ "--giris-y": `${y}px`, "--giris-gecikme": `${gecikme}s` } as React.CSSProperties}
      className={sinif}
    >
      {children}
    </Etiket>
  );
}

/** Maske açılışının JS'siz karşılığı (`MaskReveal` ile aynı görüntü, ilk ekran için).
 *  Perde hemen açılmaya başlar; ilk karede birkaç piksel boyandığı için LCP hidratlamayı beklemez. */
export function GirisMaske({
  children, yon = "yukari", gecikme = 0, sinif,
}: {
  children: React.ReactNode;
  yon?: "yukari" | "sag" | "sol";
  gecikme?: number;
  sinif?: string;
}) {
  return (
    <div className={cn("relative", sinif)}>
      <div
        data-giris-maske={yon}
        style={{ "--giris-gecikme": `${gecikme}s` } as React.CSSProperties}
        className="h-full w-full overflow-hidden"
      >
        <div data-giris-olcek style={{ "--giris-gecikme": `${gecikme}s` } as React.CSSProperties} className="h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
