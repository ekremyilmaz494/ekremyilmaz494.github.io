// -*- coding: utf-8 -*-
/** GÖRSEL — tek sarmalayıcı. next/image statik dışa aktarımda optimize etmediği için varlıklar
 *  derleme öncesi üçlü olarak hazırlanır (avif · webp · jpg/png) ve burada `<picture>` ile sunulur.
 *
 *  Adlandırma: /<ad>.avif · /<ad>.webp · /<ad>.jpg   (kesik görsellerde .png)
 *  `mobil` verilirse dar ekranda /<ad>-m.* kullanılır (art direction, daha küçük dosya).
 */
import { cn } from "@/lib/cn";

type Props = {
  ad: string;
  alt: string;
  /** Dar ekran için ayrı, küçük sürüm var mı (-m dosyaları). */
  mobil?: boolean;
  /** Kesik (alfa kanallı) görsel: yedek biçim png olur, jpg değil. */
  kesik?: boolean;
  /** İlk ekranda görünüyorsa: tembel yükleme kapanır, öncelik verilir. */
  oncelik?: boolean;
  genislik: number;
  yukseklik: number;
  sizes?: string;
  sinif?: string;
  /** <img> üzerindeki nesne uydurma; kap boyutunu belirleyen sarmalayıcıdır. */
  uydur?: "cover" | "contain";
  konum?: string;
};

export default function Picture({
  ad, alt, mobil, kesik, oncelik, genislik, yukseklik,
  sizes = "100vw", sinif, uydur = "cover", konum,
}: Props) {
  const yedek = kesik ? "png" : "jpg";
  const kesme = "(max-width: 640px)";

  return (
    <picture>
      {mobil && <source media={kesme} srcSet={`/${ad}-m.avif`} type="image/avif" />}
      {mobil && <source media={kesme} srcSet={`/${ad}-m.webp`} type="image/webp" />}
      <source srcSet={`/${ad}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`/${ad}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`/${ad}.${yedek}`}
        alt={alt}
        width={genislik}
        height={yukseklik}
        sizes={sizes}
        loading={oncelik ? "eager" : "lazy"}
        decoding={oncelik ? "sync" : "async"}
        fetchPriority={oncelik ? "high" : undefined}
        className={cn("block h-full w-full", uydur === "cover" ? "object-cover" : "object-contain", sinif)}
        style={konum ? { objectPosition: konum } : undefined}
      />
    </picture>
  );
}
