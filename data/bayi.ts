// -*- coding: utf-8 -*-
/** BAYİ LİSTESİ — kaynak: antepcigkofte.tr il sayfaları, `npm run bayi` ile çekilir (scripts/bayi-cek.mjs).
 *  Buradaki her satır markanın kendi yayınladığı veridir; elle bayi eklenmez, uydurulmaz.
 *  Eksik alan (adres ya da telefon) kaynakta da yoktur; arayüz eksik alanı gizler. */
import ham from "./bayiler.json";
import meta from "./bayiler.meta.json";
import merkezler from "./harita-merkez.json";

export type Bayi = {
  id: string;
  il: string;
  plaka: number;
  slug: string;
  ilce?: string;
  ad: string;
  adres?: string;
  telefon?: string;
  telefonGoster?: string;
  tel?: string;
  /** Kaynak sayfadaki ham satırlar; denetim için saklanır, ekranda gösterilmez. */
  ham: string[];
};

export const BAYILER: readonly Bayi[] = ham as Bayi[];

/** Listenin çekildiği gün (ISO). Sayfada "… tarihli liste" olarak gösterilir. */
export const CEKIM_TARIHI = meta.cekim;

export type IlOzeti = { plaka: number; ad: string; slug: string; sayi: number };

/** Bayisi olan iller, bayi sayısına göre çoktan aza. */
export const ILLER: readonly IlOzeti[] = Object.values(
  BAYILER.reduce<Record<number, IlOzeti>>((toplam, b) => {
    toplam[b.plaka] ??= { plaka: b.plaka, ad: b.il, slug: b.slug, sayi: 0 };
    toplam[b.plaka].sayi += 1;
    return toplam;
  }, {})
).sort((a, b) => b.sayi - a.sayi || a.ad.localeCompare(b.ad, "tr"));

export const BAYI_SAYISI = BAYILER.length;
export const IL_SAYISI = ILLER.length;
/** Haritada yanacak plakalar. */
export const YANAN_PLAKALAR: readonly number[] = ILLER.map((i) => i.plaka);

export const ilBayileri = (plaka: number) => BAYILER.filter((b) => b.plaka === plaka);
export const ilBul = (plaka: number) => ILLER.find((i) => i.plaka === plaka);

/** Bayinin adresini Google Haritalar aramasında açar. Koordinat uydurulmaz; arama metni kullanılır. */
export function yolTarifi(b: Bayi) {
  const metin = [b.ad, b.adres, b.ilce, b.il].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(metin)}`;
}

type Merkez = { ad: string; x: number; y: number };
const MERKEZ = merkezler as Record<string, Merkez>;

/** Bayisi olmayan bir il seçildiğinde en yakın kaç ilde bayi var: harita düzlemindeki uzaklığa göre. */
export function enYakinIller(plaka: number, adet = 2): readonly IlOzeti[] {
  const b = MERKEZ[String(plaka)];
  if (!b) return [];
  return [...ILLER]
    .map((i) => {
      const m = MERKEZ[String(i.plaka)];
      return { il: i, uzaklik: m ? (m.x - b.x) ** 2 + (m.y - b.y) ** 2 : Infinity };
    })
    .sort((x, y) => x.uzaklik - y.uzaklik)
    .slice(0, adet)
    .map((x) => x.il);
}

/** Haritanın sırayla yanması için: batıdan doğuya. */
export const YANMA_SIRASI: readonly number[] = [...YANAN_PLAKALAR].sort(
  (a, b) => (MERKEZ[String(a)]?.x ?? 0) - (MERKEZ[String(b)]?.x ?? 0)
);
