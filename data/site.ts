// SİTENİN KALAN SAYFALARI İÇİN TEK KAYNAK — menü, gezinme, iletişim, ana sayfa ve hakkımızda kopyası.
// franchise.ts'e dokunulmaz; buradaki her şey ya MARKA BASKISINDAN (gerçek) ya da GECICI (işaretli) gelir.
import { GECICI, GECICI_VERI, GERCEK, MARKA, SES } from "@/data/franchise";

export { GECICI };

/** GEZİNME — header/footer. Sipariş kanalları (Yemeksepeti/Getir/Trendyol) markadan gelene kadar
 *  tüketici CTA'sı "Şube bul"dur; kanallar gelince buraya `siparis` eklenir. */
export const NAV = [
  { ad: "Menü", href: "/menu" },
  { ad: "Şubeler", href: "/subeler" },
  { ad: "Hakkımızda", href: "/hakkimizda" },
  { ad: "Franchise", href: "/franchise" },
  { ad: "İletişim", href: "/iletisim" },
] as const;

export const CTA = {
  birincil: { ad: "Franchise Başvurusu", href: "/franchise#basvuru" },
  ikincil: { ad: "Şube bul", href: "/subeler" },
} as const;

/** MENÜ — kaynak: markanın ışıklı tezgâh panosu "Light box antep güncel menüboard.pdf" (28.08.2026, tek sayfa 8504×1417 pt).
 *  Ekrem (30.08.2026): "Satılacak ürünler için bu PDF'i esas al." Adlar, gramajlar ve satırlar BİREBİR panodan; sıra da panonun sırası.
 *  Fiyat kutuları panoda BOŞ (şube basar) → sitede fiyat yok, uydurulmaz. Eski 6 sayfalık board (14.08) ve "Süper Fiyat" çiftleri KALKTI. */
export type MenuUrun = { ad: string; gramaj: string; lavas: 1 | 2; malzeme: readonly string[]; ek?: string };

/** Dürüm içi — panoda yazmıyor; Ekrem (30.08): çiğköfte lavaşa ince tabaka sürülür; içi marul, maydanoz, mor lahana turşusu, mısır. */
export const DURUM_ICI = ["Marul", "Maydanoz", "Mor lahana turşusu", "Mısır"] as const;

/** Panonun "Dürümler" tablosu — dört gramaj; 150 ve 175 g "Çift Lavaş". */
export const MENU_DURUM: readonly MenuUrun[] = [
  { ad: "Dürüm", gramaj: "75 g",  lavas: 1, malzeme: DURUM_ICI },
  { ad: "Dürüm", gramaj: "100 g", lavas: 1, malzeme: DURUM_ICI },
  { ad: "Dürüm", gramaj: "150 g", lavas: 2, malzeme: DURUM_ICI },
  { ad: "Dürüm", gramaj: "175 g", lavas: 2, malzeme: DURUM_ICI },
];

/** Panonun "Porsiyonlar" tablosu — tabakta çiğköfte, dört gramaj. */
export const MENU_PORSIYON = ["250 g", "500 g", "750 g", "1000 g"] as const;

/** Panonun büyük panelleri — görseller v3 için üretildi (public/*.avif). Metinler panodaki satırlar.
 *  Aile Porsiyon "Garnitür 1000gr ile sınırlıdır" = 1000 g garnitür verilir (Ekrem, 30.08.2026).
 *  Panonun BEŞİNCİ paneli (Anteppare) 31.08'de buradan çıkıp kendi bloğuna taşındı → `ANTEPPARE`. */
export type MenuPanel = {
  ad: string; gramaj?: string; ust?: string; satir: string; satir2?: string; kucuk?: string;
  lavas?: 2; foto: readonly string[]; alt: readonly string[];
};
export const MENU_PANO: readonly MenuPanel[] = [
  { ad: "Mega Dürüm", gramaj: "150 g", lavas: 2, satir: "Bol cips + bol çiğköfte, bol yeşillik + çift lavaş", satir2: "+ Ayran",
    foto: ["mega-durum"], alt: ["Mega Dürüm kesiti: çiğköfte, marul, turşu ve cips"] },
  { ad: "Eko Dürüm", gramaj: "100 g", satir: "Dürüm + Ayran",
    foto: ["eko-durum"], alt: ["Eko Dürüm ve yanında Antep ayranı"] },
  { ad: "Aile Dürüm", gramaj: "75 g", satir: "5 adet · 10 adet",
    foto: ["aile-durum"], alt: ["Beş dürüm üst üste dizili"] },
  { ad: "Aile Porsiyon", ust: "7–8 kişiliktir", satir: "1000 + 500 g", kucuk: "1000 g garnitür verilir.",
    foto: ["aile-porsiyon"], alt: ["Tepside çiğköfte, göbek marul, domates, limon ve maydanoz"] },
];

/**
 * ANTEPPARE — panonun BEŞİNCİ büyük paneli, `MENU_PANO`'dan ayrıldı.
 * Ekrem (31.08.2026): "menü boardu esas al · ana sayfada bunlardan başkasına yer verme ·
 * anteppare'yi ön plana çıkar." Bu yüzden panelin içinde bir satır olmaktan çıkıp hem ana
 * sayfada hem /menu'de KENDİ BÖLÜMÜ oldu. Metinlerin hepsi panodan birebir:
 * "ANTEPPARE · Bol Soslu · Bol Yeşillikli · 150g Çiğ Köfte · Yoğurt Burger Sos, Kajun Burger
 * Sos, Turşu, Mor Lahana, Mısır, Nar Ekşisi". Kutunun üstünde "anteppare — Murat Usta'dan".
 */
export const ANTEPPARE = {
  ad: "Anteppare",
  gramaj: "150 g çiğköfte",
  cesitler: [
    { etiket: "Bol Soslu", foto: "anteppare-kutu",
      alt: "Anteppare kutusunda dizili çiğköfte lokmaları, üstünde yoğurt ve kajun sos" },
    { etiket: "Bol Yeşillikli", foto: "anteppare-kutu",
      alt: "Anteppare kutusu, lokmaların üstünde mor lahana, mısır ve maydanoz" },
  ],
  icindekiler: ["Yoğurt burger sos", "Kajun burger sos", "Turşu", "Mor lahana", "Mısır", "Nar ekşisi"],
  /** Panodaki tek "ne dürüm ne porsiyon" ürün — panonun tamamı sayıldığında doğru. */
  ayrim: "Panonun ne dürüm ne porsiyon olan tek ürünü.",
  anaBaslik: "Anteppare, menü panosunun özel ürünü.",
  anaMetin: "Lavaşa sarılan çiğköfte lokmaları özel kutusunda sosuyla sunulur. Bol soslu ve bol yeşillikli iki seçeneğiyle menüde farklı bir lezzet deneyimi oluşturur.",
  menuBaslik: "Anteppare, kendi kutusunda.",
  menuLead: "Panonun beşinci paneli. Çiğköfte lavaşa sarılıp lokma lokma diziliyor; 150 gram, iki çeşit, sosu üstünde.",
  icindekilerUst: "Üstüne gelenler",
} as const;

/** Ana sayfa tezgâh şeridi — dört dürüm + panonun üç dürüm paneli (7 ürün). */
export const MENU_TEZGAH: readonly MenuUrun[] = [
  ...MENU_DURUM,
  { ad: "Mega Dürüm", gramaj: "150 g", lavas: 2, malzeme: ["Bol cips", "Bol çiğköfte", "Bol yeşillik"], ek: "+ Ayran" },
  { ad: "Eko Dürüm",  gramaj: "100 g", lavas: 1, malzeme: [], ek: "Dürüm + Ayran" },
  { ad: "Aile Dürüm", gramaj: "75 g",  lavas: 1, malzeme: [], ek: "5 · 10 adet" },
];

export const MENU_NOT = {
  fiyat: "Fiyatlar şubede belirlenir; panodaki fiyat alanını her şube kendisi basar.",
  alerjen: "Ürünlerimiz bulgur (gluten) içerir. Alerjen ve besin değeri tablosu hazırlanıyor.",
} as const;

/** MENÜ SAYFASI (31.08.2026 yeniden tasarım; 30.08 pano verisi) — İmza: sağa yaslı, yarısı görünen,
 *  kaydırdıkça yerinde dönen tepsi (IMG_8635, daire maske).
 *  31.08 ikinci tur (Ekrem: "bu menü boardu esas al"): tablo sırası panonunkiyle eşitlendi —
 *  panoda ÜSTTE Porsiyonlar, ALTTA Dürümler var; sayfa da artık öyle. */
export const MENU_SAYFA = {
  ust: "MENÜ · IŞIKLI PANODAN",
  baslik: "Tezgâh arkasındaki pano, olduğu gibi.",
  lead: "Dört porsiyon, dört dürüm ve panonun beş büyük paneli. Satılan ne varsa burada, panodaki sırayla.",
  /** Kategori rayı — sekme değil, çıpa: JS'siz çalışır, sahte "aktif" durumu yok. */
  ray: [
    { ad: "Porsiyonlar", href: "#porsiyonlar" },
    { ad: "Dürümler", href: "#durumler" },
    { ad: "Büyükler", href: "#pano" },
    { ad: "Anteppare", href: "#anteppare" },
    { ad: "İçinde ne var?", href: "#icindekiler" },
  ],
  durumUst: "Dürümler",
  lavasNot: "Çift lavaş: 150 ve 175 g dürümler iki lavaşla sarılır.",
  lavasGecici: "anlamı markadan teyit bekliyor",
  porsiyonUst: "Porsiyonlar",
  porsiyonNot: "Kalabalık için Aile Porsiyon (1000 + 500 g, 7–8 kişilik) aşağıda, panonun büyük panelinde.",
  panoBaslik: "Tezgâhın büyükleri.",
  cikisBaslik: "Panoyu gördünüz; tezgâh en yakın şubede.",
  cikis: { ad: "En yakın şube", href: "/subeler#harita" },
  franchise: { ad: "Kendi şubeniz için franchise", href: "/franchise" },
} as const;

/**
 * "İÇİNDE NE VAR?" — planın (§6 /menu) istediği bölüm. Üç katman, üçü de kaynaklı:
 *  · etsiz + hijyenik hat  → HAKKIMIZDA.ilke (markanın kendi sitesi) — GERÇEK
 *  · harcın içi            → LEZZET.malzeme (data/franchise.ts) — GEÇİCİ, öyle de basılıyor
 *  · dürümün içi           → DURUM_ICI (Ekrem, 30.08.2026) — GERÇEK
 * Alerjen satırı MENU_NOT.alerjen'den gelir. Kalori/besin tablosu YOK, uydurulmadı.
 */
export const MENU_ICINDEKILER = {
  ust: "İÇİNDEKİLER",
  baslik: "İçinde ne var, gizlisi yok.",
  etsizBaslik: "Etsiz.",
  harcBaslik: "Harcın içi",
  durumBaslik: "Dürümün içi",
  durumMetin: "Lavaşa ince tabaka çiğköfte sürülür, üstüne yeşillik gelir:",
} as const;

/** GERÇEK — antepcigkofte.tr/iletisim (30.08 tarama). Kapı üçünde ve merkezde aynı adres kullanılır. */
const EPOSTA = "info@antepcigkofte.tr";
const MERKEZ_ADRES = "Fevzi Çakmak Mah. 10509. Sok. No: 2J, Karatay / Konya";

/**
 * İLETİŞİM — v2 (31.08.2026 yenileme, plan §6 /iletisim).
 * Sayfanın işi kanal seçtirmek. Sıra: dev numaralar (dokun-ara) → ÜÇ KAPI → tek form → merkez.
 * Ana sayfadaki "İki kapı"dan farkı: orada KİTLE ayrılıyor (yiyen / yatırımcı), burada İŞ ayrılıyor
 * (sipariş · franchise · kurumsal) ve her kapı gerçek bir kanala çıkıyor — ikisi forma, biri franchise sayfasına.
 * İki numara mevcut siteden — HANGİ HAT NE İÇİN, markadan teyit bekliyor (GEÇİCİ).
 * IG: markanın kendi sitesi ÖLÜ bir hesaba bağlanıyor (@antepcigkoftesosyal — "page isn't available",
 * arastirma §7.D); canlı hesap @antepcigkoftetr. Ekrem (31.08): canlı hesap kalsın, not bunu söylesin.
 */
export const ILETISIM = {
  baslik: "Arayın, yazın; dönüyoruz.",
  lead: "Numaralara dokunun, telefon doğrudan açılır. Yazmayı tercih ederseniz form doğrudan bize gelir; franchise başvurusunun kendi formu var.",
  hatlar: [
    { ad: "ÇAĞRI MERKEZİ", numara: "0850 840 14 38", href: "tel:+908508401438", not: "hattın rolü teyit bekliyor" },
    { ad: "FRANCHISE HATTI", numara: "0544 844 77 42", href: "tel:+905448447742", not: "hattın rolü teyit bekliyor",
      yan: { ad: "Başvuru formu", href: "/franchise#basvuru" } },
  ],
  whatsapp: { ad: "WHATSAPP", metin: "Sohbet başlat", href: GECICI_VERI.whatsappHref, not: "numara markadan gelene kadar geçici" },
  /** SAATLER — plan bu bloğu merkeze koymuştu; saat sorusu numaranın sorusu olduğu için hatların altında kaldı.
   *  Hat saati BİLİNMİYOR (belgede 11.00–02.00 ↔ 09.00–22.00 çelişkisi) → uydurulmuyor, çelişki adıyla yazılıyor. */
  saat: {
    hat: "Hatların çalışma saatleri marka teyidi bekliyor: elimizdeki belgelerde iki farklı aralık yazıyor.",
    sube: "Çalışma saatlerini ve sipariş seçeneklerini öğrenmek için şubenizi arayın. İletişim bilgileri şube dizininde.",
    link: { ad: "Şube dizini", href: "/subeler#liste" },
  },
  /** ÜÇ KAPI — sayfanın yeni omurgası. Her kapının TEK hedefi var; `yan` ikinci, daha hafif yol. */
  kapilar: {
    baslik: "Hangi kapı sizin?",
    lead: "Üç ayrı iş, üç ayrı yol.",
    liste: [
      // Kapıların ETİKETİ YOK: küçük-punto etiket yerine paragrafın ilk kelimeleri kapıyı adlandırıyor
      // (eyebrow bütçesi, kural b). Başlık kapının cümlesi, paragraf kapının içeriği.
      {
        baslik: "Bir dürüm meselesi.",
        metin: "Şubenizin adresine, telefonuna ve yol tarifine dizinden ulaşın. Söyleyecek bir şeyiniz varsa, övgü de olur şikâyet de, buradan yazın.",
        cta: { ad: "Bize yazın", href: "/iletisim?k=siparis#yazin" },
        yan: { ad: "Şube dizini", href: "/subeler#liste" },
      },
      {
        baslik: "Kendi tezgâhınızı kurmak.",
        metin: `Franchise şartları, anahtar teslim kurulum bedeli (${GERCEK.ucret}; dükkânın metrekaresine göre değişebilir) ve başvuru formu franchise sayfasında.`,
        cta: { ad: "Franchise başvurusu", href: "/franchise#basvuru" },
        yan: { ad: "Önce şartları oku", href: "/franchise" },
      },
      {
        baslik: "Tedarik, basın, iş birliği.",
        metin: `Fatura ve tedarik, basın talebi, iş birliği önerisi: hepsi ${MARKA.sehir}'daki merkezden yürüyor.`,
        cta: { ad: "Kurumsal mesaj", href: "/iletisim?k=kurumsal#yazin" },
        yan: { ad: EPOSTA, href: `mailto:${EPOSTA}` },
      },
    ],
  },
  yazin: {
    baslik: "Mesajınız doğrudan bize gelir.",
    metin: "Franchise başvurusu için ayrı bir form var; orası metrekare ve bütçe gibi doğru soruları soruyor. Kalan her şey bu form.",
    /** Konu alanı: kapılar `?k=` ile buraya işaret eder. JS'siz de çalışır — o zaman ziyaretçi kendi seçer. */
    konuEtiket: "Konu",
    konular: [
      { k: "siparis", ad: "Sipariş ve şube" },
      { k: "oneri", ad: "Öneri ya da şikâyet" },
      { k: "kurumsal", ad: "Kurumsal: tedarik, basın, iş birliği" },
      { k: "diger", ad: "Diğer" },
    ],
    donus: `Dönüş ${GECICI_VERI.donusSuresi} içinde.`,
    donusNot: "dönüş süresi marka teyidi bekliyor",
  },
  merkez: {
    ust: "MERKEZ",
    baslik: `${MARKA.sehir}'dan yönetiyoruz.`,
    adres: MERKEZ_ADRES,
    eposta: EPOSTA,
    // Adreste iki bölünmez boşluk var (satır sonu "10509." ile "Sok." arasından geçmesin diye);
    // arama sorgusuna %C2%A0 olarak gitmesin diye URL için normal boşluğa çevriliyor.
    yol: { ad: "Yol tarifi", href: "https://www.google.com/maps/search/" + encodeURIComponent(`${MARKA.ad} ${MERKEZ_ADRES}`.replace(/\u00A0/g, " ")) },
    /** Harita gömme yolu hazır (konum gelince OSM çerçevesi kendiliğinden basar) ama KOORDİNAT UYDURULMAZ:
     *  merkezin enlem/boylamı markadan bekleniyor. Yol tarifi butonu adres metniyle bugün de çalışıyor. */
    konum: undefined as readonly [number, number] | undefined,
    haritaBaslik: "Merkez konumu haritada",
    haritaGecici: "Merkezin harita konumu markadan bekleniyor; yol tarifi bağlantısı adresle çalışıyor.",
    sosyalNot: "markanın kendi sitesi ölü bir hesaba bağlanıyor; canlı hesap bu. Resmî hesap teyidi bekleniyor",
    cikis: { ad: "En yakın şube", href: "/subeler#harita" },
  },
} as const;

/**
 * ANA SAYFA KOPYASI — sekiz perde (31.08.2026 yenileme, docs/YENILEME-PLANI.md §6).
 * ⭐ cümleler (SES/GERCEK) birebir; sayılar GECICI_VERI'den.
 * Etiket satırı (eyebrow) sekiz bölümde yalnız üç kez: künye · TEK TARİF, AYNI STANDART · İLKEMİZ.
 * Kalan başlıklar bilgiyi kendi taşır; kaydırma ipucu yok.
 */
export const ANA = {
  ust: `${MARKA.kurulus}'DAN BERİ · ${MARKA.sehir.toUpperCase()} · GÜVEN VEREN LEZZET STANDARDI`,
  slogan: { a: "Tarihi Antep Çiğköfte,", b: "lezzet standardını,", c: "her şubede yaşatır." },
  heroAlt: "Arduvaz üstünde el sıkımı çiğköfte, limon ve maydanoz; kaydırdıkça lavaşa sürülüp dürüm olarak sarılır",
  heroCta: {
    birincil: { ad: "Menüyü gör", href: "/menu" },
    ikincil: { ad: "En yakın şube", href: "/subeler#harita" },
  },
  /**
   * İKİ KAPI — sayfanın ilk kavşağı. Siteye gelen ya bir dürüm arıyor ya bir iş; ikisine ayrı
   * dille konuşulur (plan §2.6, iki ton rehberi). Slogandaki ikilik sayfanın yapısına taşınır:
   * tam genişlikte tek dikiş, iki yüzey. Franchise rakamı burada da metrekare kaydıyla yazılır.
   */
  kapilar: {
    yemek: {
      baslik: "Tarihi Antep lezzetine ulaşın.",
      metin: "Güncel menüde farklı gramajlarda dürümler, porsiyon seçenekleri ve Anteppare yer alır. Size en yakın şubeyi haritadan görüntüleyebilir, yol tarifine kolayca ulaşabilirsiniz.",
      cta: { ad: "En yakın şube", href: "/subeler#harita" },
    },
    is: {
      baslik: "Tarihi Antep markasıyla yatırımınızı planlayın.",
      metin: `Anahtar teslim kurulum bedeli ${GERCEK.ucret}; dükkânın metrekaresine göre değişebilir. İsim hakkı ve royalty alınmaz. Paket kapsamı, hariç kalemler ve başvuru adımları franchise sayfasında açıkça yer alır.`,
      cta: { ad: "Franchise şartları", href: "/franchise" },
    },
  },
  tezgah: { baslik: "Dürüm seçenekleri gramajlarıyla net.", tumMenu: { ad: "Tüm menü", href: "/menu" } },
  /** Anteppare bölümü ana sayfada kendi sahnesini aldı (Ekrem 31.08). Metinler `ANTEPPARE`'den. */
  anteppare: { link: { ad: "Menüde gör", href: "/menu#anteppare" } },
  fabrika: {
    ust: "TEK TARİF, AYNI STANDART",
    cumle: `Ürünlerimiz ${MARKA.sehir}'daki fabrikamızdan çıkar, her şubeye aynı kalite standardıyla ulaşır.`,
    sayilar: [
      { deger: Number(MARKA.kurulus), baslangic: 1990, etiket: `kuruluş, ${MARKA.sehir}`, gruplu: false },   // yıl → binlik ayracı yok
      { deger: 1, baslangic: 0, etiket: "fabrika, tek tarif" },
      { deger: parseInt(GECICI_VERI.agSayisi, 10), baslangic: 0, sonek: "+", etiket: GECICI_VERI.agEtiket, gecici: true },
    ],
    not: "Fabrika fotoğrafı ve videosu markadan geldiğinde bu bölüm görsel içerikle desteklenecektir.",   // GECICI
  },
  /**
   * ADI ANTEP, ELİ KONYA'DA — eski "Ustanın eli" perdesi, planın eksik bulduğu isim sorusuyla
   * birleşti (§6: "Antep adı nereden geliyor?"). Çiğköftenin Gaziantep yemeği olması ve markanın
   * adının oradan gelmesi güvenli okuma; kuruluş hikâyesinin tamamı markadan bekleniyor (GECICI).
   */
  koken: {
    baslik: "Adı Antep, eli Konya'da.",
    // "Gaziantep'in yemeği" → "Güneydoğu'nun yemeği": çiğköfte tek bir şehre mal edilemez (Urfa/Antep),
    // marka adı da yalnız tarifin memleketini söylüyor. /hakkimizda'daki tam anlatımla aynı cümle.
    lead: `Çiğköfte Güneydoğu'nun köklü lezzetlerinden biridir; markamızdaki Antep adı bu tarif geleneğine işaret eder. İlk tezgâh ${MARKA.kurulus}'da ${MARKA.sehir}'da açıldı; tarif o günden bu yana aynı anlayışla korunur.`,
    metin: "Yoğurma bizim için bir zanaattır: isot, ince bulgur ve sabır. Murat Usta'nın başlattığı bu lezzet bugün tek fabrikadan çıkar; şubeye ulaşan her ürün aynı tarif standardıyla hazırlanır.",
    fotoAlt: "Eldivenli eller çelik tepside çiğköfte hamurunu yoğuruyor; tepsinin kenarında domates, soğan, sarımsak, maydanoz, limon ve marul",
    gecici: "Antep–Konya bağının ve kuruluş hikâyesinin marka ağzından tam anlatımı bekleniyor.",
    link: { ad: "Hikâyemiz", href: "/hakkimizda" },
  },
  /** GÜVEN ŞERİDİ — içerik tamamen HAKKIMIZDA.ilke'den (markanın kendi sitesinden doğrulanmış).
   *  Burada yalnız ana sayfaya özel bağlantı durur; metin tekrar yazılmaz. */
  guven: {
    link: { ad: "Kalite ve politikalarımız", href: "/hakkimizda#ilke" },
  },
  sube: {
    ust: "ŞUBEDE",
    baslik: "Yeşil tabela, turuncu tezgâh: her şubede aynı.",
    metin: "Tarihi Antep şubeleri dışarıdan aynı marka kimliğiyle, içeride ise aynı servis düzeniyle karşılar. Dürüm tezgâhta hazırlanır, salata barından tamamlanır ve hızlı bir akışla servis edilir.",
    link: { ad: "En yakın şube", href: "/subeler#harita" },
  },
  kapi: {
    ust: "KENDİ ŞUBENİZ",
    baslik: SES.acilis,          // ⭐ birebir
    metin: GERCEK.hediye,        // ⭐ birebir
    birincil: { ad: "Franchise başvurusu", href: "/franchise#basvuru" },
    ikincil: { ad: "Örnek şubeyi gezin", href: "/franchise#ornek-sube" },
  },
} as const;

/**
 * HAKKIMIZDA KOPYASI — Ekrem 30.08: "Murat Babacan" adı ve alıntı KALIR; görseller fal.ai stüdyo seti
 * (Ekrem: gerçek kareler "pazar çekimi" gibiydi → nano-banana-pro/edit, referans: gerçek fotoğraflar +
 * hero-aci ışığı; usta-sikma / usta-eller / malzeme). Sayılar ve misyon markanın KENDİ sitesinden
 * doğrulandı (antepcigkofte.tr/kurumsal: 2009, Konya, Murat Babacan, 300+ satış noktası ve bayi) —
 * "teyit bekliyor" kalktı. Kilometre taşları hâlâ yok → Yolculuk bölümü yok.
 */
export const HAKKIMIZDA = {
  ust: `HAKKIMIZDA · ${MARKA.sehir.toLocaleUpperCase("tr")}`,
  h1: "Bir ustanın eli, bir fabrikanın düzeni.",
  // Ağ rakamı ("300+") lead'den ÇIKARILDI: plan §1.2 satır 21 → çelişkili (300+ ↔ 116 ↔ 170+),
  // tek rakam seçilene kadar yalnız GEÇİCİ etiketiyle ve notuyla basılabilir; hero lead'e dipnot sığmaz.
  lead: `Tarihi Antep Çiğköfte, ${MARKA.kurulus}'da Konya'da Murat Babacan'ın elinde başladı. Bugün üretim tek fabrikadan çıkıyor; şubeye giden her kilo aynı tarifle yoğruluyor.`,
  heroAlt: "Siyah eldivenli el, avucunda taze sıkılmış çiğköfteyi kameraya uzatıyor; arkada yoğrulmuş çiğköfte kütlesi, koyu stüdyo fonu",
  rakamlar: [
    { deger: MARKA.kurulus, etiket: "Konya'da ilk tezgâh", gecici: false },
    { deger: "1", etiket: "fabrika, tek tarif", gecici: false },
    { deger: GECICI_VERI.agSayisi, etiket: `${GECICI_VERI.agEtiket} ve bayi`, gecici: true },
  ],
  // 03.09.2026: sayı artık tahmin değil; markanın 25 il sayfası çekilip sayıldı (scripts/bayi-cek.mjs) → 118 kayıt.
  rakamNot: "Marka “300+ satış noktası” diyor; markanın kendi il sayfalarında listelenen bayi sayısı ise 118. İkisi aynı şeyi ölçmüyor olabilir, doğrulanmış rakam bekleniyor.",
  /** KÖKEN — araştırma §6'nın "hiç açıklanmamış" dediği bağ: marka Konya'da kuruldu, adı Antep.
   *  Ana sayfadaki kısa anlatımın (ANA.koken) tam hâli; başlık bilerek farklı, çünkü `/` buraya "Hikâyemiz" diye bağlanıyor. */
  koken: {
    baslik: "Neden Antep, neden Konya?",
    metin1: "Çiğköfte Güneydoğu'nun yemeği; Antep onun en bilinen mutfaklarından biri. Markanın adındaki “Antep” tarifin memleketini söylüyor: isot, ince bulgur, sabır.",
    metin2: `İşin adresi ise ${MARKA.sehir}. İlk tezgâh ${MARKA.kurulus}'da burada açıldı; bugün üretim tek fabrikadan çıkıyor, şubeye giden her kilo aynı tarifle yoğruluyor. Antep tarifin adı, Konya işin adresi.`,
    alinti: "Duayenimiz Murat Babacan bir hayal kurmuştu…",
    // Alıntı markanın KURUMSAL SAYFASINDAN; Murat Babacan'ın kendi ağzından DEĞİL (üçüncü tekil şahıs).
    // Eskiden "Murat Babacan, kurucu" diye künyelenmişti — yanlış atıftı, düzeltildi.
    alintiKaynak: "Tarihi Antep Çiğköfte kurumsal sayfası, birebir",
    gecici: "Kuruluş hikâyesinin tam metni ve kilometre taşları (2009'dan bugüne) marka ağzından bekleniyor.",
  },
  usta: {
    baslik: "Tarif aynı, el aynı, özen aynı.",
    fotoAlt: "Eldivenli eller çelik tepside çiğköfte yoğuruyor; tepside maydanoz, soğan, sarımsak ve domates; koyu stüdyo fonu",
    ifadeler: [
      { baslik: "Fabrikadan halka.", metin: "Aracı yok. Ürün fabrikamızdan çıkar, şubeye kadar aynı kalitede gelir." },
      { baslik: "Usta işi.", metin: `Yoğurma bir zanaattır: isot, ince bulgur ve sabır. Tarif ${MARKA.kurulus}'dan beri aynı elden.` },
      // "Herkes bol bol yesin diye" markanın sözlerinden biri; aynı sayfada iki kez geçmesin diye başlık cümlenin kendi sözcükleriyle.
      { baslik: "Herkesin dürümü.", metin: "Cebe dost fiyat, gerçek lezzet. Bir dürüm, herkesin dürümü." },
    ],
  },
  ilke: {
    ust: "İLKEMİZ",                                  // yalnız ana sayfanın güven şeridinde; /hakkimizda'da etiket bütçesi dışı
    baslik: "Önce insan sağlığı.",
    metin: "Öncelikli hedefimiz halkımıza sağlıklı, doğal, katkısız ve gerçek çiğköfte lezzetini sunmak. Çiğköftemiz etsizdir; bulgur, isot ve baharat karışımı hijyenik üretim hattında yoğrulur, soğuk zincirle şubeye gider.",
    politikaUst: "Politikalarımız",
    politikalar: ["Kalite, Şikâyet ve Hijyen Politikası", "Helal Gıda ve Gıda Güvenliği Politikası", "Çevre ve İş Sağlığı-Güvenliği Politikası"],
    politikaGecici: "Politika metinleri ve belgeler markadan gelince buraya bağlanır (sitedeki Kalite Belgelerimiz sayfası henüz boş).",
    fotoAlt: "Koyu taş zeminde domates, limon, soğan, sarımsak, maydanoz, bir kâse ince bulgur ve serpilmiş isot",
  },
  sozler: {
    ust: "SÖZLERİMİZ",
    liste: ["Herkes bol bol yesin diye", "Her lokmada lezzet tutkusu", "7'den 70'e herkese lezzetin ustası", "Afiyet olsun Türkiye'm"],
  },
  cikis: {
    ust: "SIRADA NE VAR?",
    baslik: "Ustanın eli, senin şubende.",
    metin: "Tarif bizden, tezgâh senden. Şubeni aç ya da en yakın şubede tadına bak.",
    birincil: { ad: "Franchise başvurusu", href: "/franchise#basvuru" },
    ikincil: { ad: "En yakın şube", href: "/subeler#harita" },
  },
} as const;

/** ŞUBELER SAYFASI (31.08.2026 yenileme adımı 6; ilk tasarım 30.08) — sayılar data/subeler.ts'den türer (Ekrem: "listeden";
 *  300+ satış noktası hakkımızda/franchise'ta kalır). Gerçek şube listesi markadan gelene kadar liste ÖRNEK (GECICI).
 *  İmza: ilk ekranda yanan harita. Eyebrow bütçesi (plan §10.B-b): dört bölümde tek eyebrow → yalnız çıkışta.
 *  Sayfanın işi tek: en yakın şubeyi bulmak. Dizin (il çipleri) haritayı tıklayamayan mobil kullanıcının yolu. */
export const SUBELER = {
  ilde: "ilde", sube: "şube",                       // H1: "<n> ilde <m> şube."
  lead: "Haritadan şehrini seç ya da dizinden tıkla; adres, telefon ve yol tarifi tek adım.",
  not: "Liste markanın kendi il sayfalarından alındı. Adres ve telefonlar oradaki hâliyle; şube saatleri markadan bekleniyor.",
  secLabel: "Şehrini seç", secTumu: "Tüm iller", goster: "Göster",
  haritaAlt: "Türkiye il haritası; şubemiz olan iller yeşil",
  lejantVar: "şube var", lejantYok: "henüz yok",    // harita altı okuma anahtarı
  listeBaslik: "Tüm şubeler", tumu: "Tümü", ilSayisi: "il", subeSayisi: "şube",
  dizin: "İl dizini",
  ara: "Ara", yol: "Yol tarifi",
  bosBaslik: "henüz şube yok.",                     // "<İl>: henüz şube yok."
  bosYakin: "En yakın şubeler:",
  bosFranchise: { ad: "Bu ili sen aç: franchise", href: "/franchise#basvuru" },
  subede: {
    baslik: "Tezgâh, salata barı ve kasa aynı hat üzerinde.",
    metin: "Her şubede aynı düzen: dürüm tezgâhta sarılır, salata barından tamamlanır, kasada biter. Kalabalık sofralar için tepsi, tek kişi için porsiyon.",
    pano: "Duvardaki ışıklı pano da her şubede aynı: aynı dürümler, aynı porsiyonlar, aynı Anteppare.",
    link: { ad: "Menüyü gör", href: "/menu" },
    altyazi: "Örnek şube düzeni (render); gerçek şube fotoğrafı gelince değişir.",
    fotoAlt: "Şube içi: turuncu duvar, yeşil tezgâh hattı, ışıklı menü panosu",
  },
  cikis: {
    ust: "ŞEHRİNDE ŞUBE YOK MU?",
    baslik: "O ili sen aç.",
    metin: "Haritada boş görünen her il bir fırsat. Fabrikadan aynı ürün, aynı tezgâh düzeni; kurulum ve eğitim bizden.",
    bosEtiket: "ilde henüz şube yok",               // sayı = 81 − şubeli il (data/subeler.ts), uydurma değil çıkarma
    bosNot: "Sayı, markanın kendi il sayfalarında listelenen bayilerden türüyor.",
    birincil: { ad: "Franchise başvurusu", href: "/franchise#basvuru" },
    ikincil: { ad: "WhatsApp'tan sor", href: GECICI_VERI.whatsappSubeHref },
  },
} as const;
