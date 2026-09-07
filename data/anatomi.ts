// -*- coding: utf-8 -*-
/**
 * ANATOMİ — ana sayfanın imza hareketi. Bir dürümün nasıl kurulduğu, kaydırma çubuğu
 * zaman çizgisine dönüşerek anlatılır.
 *
 * Katmanlar BİRİKİMLİDİR: her kare bir öncekinin üstüne bir malzeme eklenmiş hâlidir
 * (lavaş → sürülmüş çiğköfte → yeşillik → mısır ve mor lahana → sarılmış dürüm).
 * Beşi de aynı kadrajdan, aynı ışıkta üretildi ve alfa kanallı kesildi; bu yüzden
 * `inset-0` ile üst üste bindiklerinde birbirine tam oturur.
 *
 * Pencereler 0–1 arası kaydırma ilerlemesidir (bölümün kendi ilerlemesi).
 * Aralıklar bilerek ÜST ÜSTE BİNER: bir malzeme yerine otururken bir sonraki yola çıkar,
 * böylece hareket kesintisiz akar.
 */
export type AnatomiAsama = {
  /** public/ içindeki kesik görselin adı. */
  dosya: string;
  etiket: string;
  aciklama: string;
  alt: string;
  /** Katman kaç yüzde yukarıdan iner (kabın yüksekliğine oranla). */
  girisY: number;
  /** Katmanın belirme aralığı [başla, bitir]. */
  giris: [number, number];
  /** Etiket yazısının [belir, tamGörün, solmayaBaşla, kaybol] aralığı. */
  etiketPencere: [number, number, number, number];
};

export const ASAMALAR: readonly AnatomiAsama[] = [
  {
    dosya: "anat-lavas",
    etiket: "Lavaş",
    aciklama: "İnce, açık lavaş. Her şey bunun üstüne kuruluyor.",
    alt: "Koyu tezgâhta açık duran ince yuvarlak lavaş",
    girisY: 0,
    giris: [0, 0.02],
    etiketPencere: [0, 0.02, 0.14, 0.2],
  },
  {
    dosya: "anat-surme",
    etiket: "Çiğköfte",
    aciklama: "Etsiz bulgur harcı lavaşa ince bir tabaka sürülür. Parça değil, tabaka.",
    alt: "Lavaşın üstüne ince ve eşit sürülmüş kiremit kırmızısı çiğköfte tabakası",
    girisY: -46,
    giris: [0.05, 0.3],
    etiketPencere: [0.08, 0.16, 0.3, 0.36],
  },
  {
    dosya: "anat-yesillik",
    etiket: "Marul ve maydanoz",
    aciklama: "Kıyılmış marul, üstüne maydanoz.",
    alt: "Sürülmüş çiğköftenin üstüne serpilmiş kıyılmış marul ve maydanoz",
    girisY: -40,
    giris: [0.2, 0.48],
    etiketPencere: [0.24, 0.32, 0.46, 0.52],
  },
  {
    dosya: "anat-master",
    etiket: "Mor lahana turşusu ve mısır",
    aciklama: "Turşu keskinliği, mısır tatlılığı. Soğan yok.",
    alt: "Yeşilliğin üstüne eklenen mor lahana turşusu ve tatlı mısır taneleri",
    girisY: -34,
    giris: [0.38, 0.66],
    etiketPencere: [0.42, 0.5, 0.64, 0.7],
  },
  {
    dosya: "anat-durum",
    etiket: "Ve sarılır",
    aciklama: "Tek hareketle sarılır, ağzı açık kalır.",
    alt: "Sarılmış çiğköfte dürümü, açık ucundan içindeki malzemeler görünüyor",
    girisY: 30,
    giris: [0.76, 0.92],
    etiketPencere: [0.8, 0.88, 0.99, 1],
  },
];

/** Yığının (ilk dört katman) solduğu aralık; dürüm gelirken sahneyi boşaltır. */
export const YIGIN_SOLMA: [number, number] = [0.72, 0.86];

/** Kapanış başlığı ve çağrısı. */
export const ANATOMI = {
  ust: "BİR DÜRÜM NASIL KURULUR",
  baslik: "Beş katman, tek hareket.",
  lead: "Çiğköfte lavaşa sürülür; üstüne marul, maydanoz, mor lahana turşusu ve mısır gelir. Sonra tek hamlede sarılır.",
  kapanis: "Dürüm hazır.",
  cta: { ad: "Menüyü gör", href: "/menu" },
  /** JS ya da hareket kapalıyken gösterilen liste; sahnenin bilgisi metinle de tam verilir. */
  duzListe: "Aşağıdaki sıra, dürümün kuruluş sırasıdır.",
} as const;
