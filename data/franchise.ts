// TEK KAYNAK. Bölümler buradan okur; hiçbir bileşen sayı ya da cümle hardcode etmez.
// GECICI true olduğu sürece `npm run build` DURUR (scripts/build-guard.mjs).

export const GECICI = true;

/** MARKA OLGULARI — marka dokümanından. Gerçek. */
export const MARKA = {
  ad: "Tarihi Antep Çiğköfte",
  tescil: "Murat Usta ®",
  kurulus: "2009",
  sehir: "Konya",
  cepheSlogan: "Fabrikadan Halka",
  // 31.08.2026 DÜZELTME: "antepcigkofte.com.tr" hiçbir kaynakta geçmiyordu (uydurma alan adı).
  // Markanın canlı kurumsal sitesi `antepcigkofte.tr` (rapor/arastirma-dosyasi.md §2 — 39 sayfa tarandı);
  // `antepcigkofte.com` DNS'te ÖLÜ ama Google hâlâ indeksliyor (§6.E → yayında .com → .tr 301 gerekiyor).
  // Bu değer layout.tsx'te metadataBase ve JSON-LD `url` — yani sitenin kanonik adresi; yanlışı OG/canonical'ı bozar.
  web: "antepcigkofte.tr",
  sosyal: "@antepcigkoftetr",
  instagram: "https://www.instagram.com/antepcigkoftetr",
} as const;

/** SÖZLEŞMEYE BAĞLI — marka sahibi yazılı bildirdi. Değiştirilemez, yuvarlanamaz. */
export const GERCEK = {
  // 31.08.2026 — Ekrem bildirdi: ANAHTAR TESLİM KURULUM BEDELİ. İsim hakkı/giriş bedeli AYRICA alınmıyor.
  // Sektörde hiçbir marka bu rakamı sayfasına koymuyor (araştırma §6.C) → açık yazmak diferansiyatör.
  ucret: "189.000 ₺",
  ucretEtiket: "anahtar teslim kurulum",
  ucretKapsam: "Kurulum paketinin tamamı bu bedele dahildir; ayrıca isim hakkı ya da giriş bedeli alınmaz.",
  // 31.08.2026 — Ekrem, ikinci tur teyit: "ilk stoğu içermiyor, fiyat dükkânın metrekaresine göre oynayabilir".
  // İkisi de GERÇEK; artık GEÇİCİ değil. Rakam yine sayfada açık yazılır, yanında bu iki kayıtla birlikte.
  ucretOlcek: "Bedel dükkânın metrekaresine göre değişebilir.",
  ucretHaric: "İlk ürün stoğu bu bedelin dışındadır; kurulum paketi ürünü kapsamaz.",
  hediye: "Üstelik her ay, sattığınız çiğköfte miktarının yüzde onu kadar ürün markamız tarafından hediye edilir.",
  hediyeNot: "Hesap miktar üzerinden (kilo/porsiyon), ciro üzerinden değil.",
  ikinciUrun: "Antep Çiğköfte ürünlerinin yanında kendi seçeceğiniz ikinci bir ürün grubunu da satabilirsiniz.",
  alan: "Sistemimiz, minimum yirmi beş, otuz metrekarelik dükkânlarda uygulanabiliyor.",
  minAlan: "25–30 m²",
  ornekSube: "örnek şube · 50 m²",
  teslim: "Yerleşim planı ve ölçüler size teslim edilir.",
} as const;

/** MARKA SAHİBİNİN CÜMLELERİ — birebir. */
export const SES = {
  acilis: "Kendi işinizi kurmak için güçlü bir marka arıyorsanız, Tarihi Antep Çiğköfte franchise modeliyle yanınızda.",
  ornek: "Üç boyutlu hazırlanan bu örnek şube, modern bir bayi konsepti sunuyor.",
  kapanis: "Tarihi Antep Çiğköfte ile kendi şubenizi açın, güçlü bir markanın parçası olun.",
} as const;

/** LEZZET — 31.08.2026, Ekrem: "çiğköftemizin lezzetinden de bahset; bunlar bayi adayının
 *  karar motivasyonu." Yatırımcıya verilen mesaj: ürün kendini satıyor, çünkü tarif tek elden
 *  ve her şubede aynı. GERÇEK olan kısım tarif standardı + tek fabrika + sevkiyat;
 *  harcın malzeme listesi marka teyidi bekliyor (GECICI işaretli, sayfada öyle basılır). */
export const LEZZET = {
  ust: "ÜRÜN",
  baslik: "Satan şey tabelası değil, tadı.",
  lead: "Çiğköfte tek fabrikada, tek tarifle karılır; şubeye hazır gelir. Bayi tarif tutturmaya çalışmaz. Açtığı gün ilk lokma, onuncu yıl aynı.",
  maddeler: [
    { ad: "Tek tarif", metin: "Harç merkezde karılır; ölçü şubeye bırakılmaz. Usta aramazsınız, tarif zaten kutuda gelir." },
    { ad: "Tek fabrika", metin: "Bütün şubeler aynı hattan beslenir. Konya'daki üretimden çıkan ne ise, tezgâhtaki o." },
    { ad: "Günü gününe", metin: "Sevkiyat soğuk zincirle yapılır; tezgâha çıkan çiğköfte günlük hazırlanır." },
  ],
  malzeme: ["Esmer bulgur", "İsot", "Nar ekşisi", "Domates ve biber salçası", "Ceviz", "Maydanoz", "Baharat karışımı"],
  malzemeGecici: "harcın tam içeriği ve oranları marka teyidi bekliyor",
} as const;

/** YATIRIM — sayfanın en güçlü kozu (plan §5.3). Rakam hero'nun hemen altında, dev tipte.
 *  "Yok" üçlüsü kart değil, hairline ile ayrılmış üç sütun: belge dili korunur. */
export const YATIRIM = {
  ust: "YATIRIM",
  baslik: "Anahtar teslim kurulum bedeli.",
  lead: "Anahtar teslim kurulum tek kalemde bu bedel. Görüşmede çıkan sürpriz bir giriş bedeli yok; neyin dahil olduğu ve neyin olmadığı aşağıda yazılı.",
  yoklar: [
    { ad: "İsim hakkı", metin: "Ayrıca giriş bedeli alınmaz." },
    { ad: "Royalty", metin: "Cirodan kâr payı istenmez." },
    { ad: "Nakliye", metin: "Sevkiyat markaya aittir." },
  ],
  kdv: "Fiyata KDV dahil değildir.",
} as const;

/** HEDİYE — 31.08.2026 Ekrem: "her ay satılan kaç kg çiğköfte varsa %10'u kadar hediye
 *  veriliyor; görselleştir ki insanlar anlasın." Çeviri: her ON kiloda BİR kilo markadan.
 *  Şerit 11 hücre (10 satılan + 1 hediye); örnek tablo saf aritmetik, satış miktarı ÖRNEK. */
export const HEDIYE = {
  ust: "SÖZLEŞMEYE BAĞLI",
  baslik: "Her on kilonun biri markadan.",
  lead: GERCEK.hediye,
  kural: GERCEK.hediyeNot,
  seritSatilan: 10,
  seritEtiket: { satilan: "sattığınız 10 kg", hediye: "1 kg bizden" },
  ornekBaslik: "Aylık satışınıza göre",
  ornekler: [
    { aylik: "100 kg", hediye: "10 kg", yillik: "120 kg" },
    { aylik: "250 kg", hediye: "25 kg", yillik: "300 kg" },
    { aylik: "500 kg", hediye: "50 kg", yillik: "600 kg" },
  ],
  ornekNot: "Satış miktarları örnektir, oran sabittir. Hesap kilo üzerinden yapılır.",
} as const;

/** İKİNCİ ÜRÜN — 31.08.2026 Ekrem: bayi çiğköftenin yanında başka ürün de satabiliyor.
 *  Ne satacağı bayinin kararı → marka adına ürün listesi UYDURULMAZ. */
export const IKINCI = {
  ust: "TEZGÂH",
  baslik: "Tezgâhınız tek kaleme bağlı değil.",
  lead: GERCEK.ikinciUrun,
  detay: "Ne satacağınıza siz karar verirsiniz; çiğköfte hattı ve tarifi aynı kalır. Günün her saatinde tek ürüne bakan bir tezgâh yerine, cironuzu taşıyan ikinci bir kalem olur.",
} as const;

/** DESTEK — markanın kendi sitesindeki (antepcigkofte.tr/franchise) destek kalemleri. */
export const DESTEK = [
  { ad: "Lokasyon", metin: "Yer seçiminde teknik danışmanlık verilir." },
  { ad: "Personel", metin: "Eğitimli personel ve usta desteği sağlanır." },
  { ad: "Açılış sonrası", metin: "Operasyonel destek açılışla bitmez, devam eder." },
  { ad: "Lojistik", metin: "Sevkiyat markaya aittir; nakliye bedeli alınmaz." },
] as const;

/** GEÇİCİ — tasarım turu için. Gerçekleri gelince YALNIZ burası değişir. */
export const GECICI_VERI = {
  // 31.08.2026: kurulum bedeli artık GERÇEK ve sabit (GERCEK.ucret = 189.000 ₺).
  // Buradaki aralıklar formdaki TOPLAM bütçe sorusu içindir (kira, depozito, ilk stok dahil) —
  // kurulum bedeliyle karıştırılmasın. Aralıkların kendisi hâlâ marka teyidi bekliyor.
  butceAraliklari: ["250–500 bin ₺", "500–750 bin ₺", "750 bin – 1 milyon ₺", "1 milyon ₺ ve üzeri"],
  // Marka dokümanı "300+ satış noktası" diyor; ticari kaynaklar "170+ bayi".
  // İkisi aynı şey olmayabilir. Marka teyit edene kadar etiket "satış noktası".
  agSayisi: "300+",
  agEtiket: "satış noktası",
  iller: ["Konya", "Gaziantep", "Ankara", "İstanbul", "İzmir", "Bursa", "Antalya", "Adana"],
  donusSuresi: "24 saat",
  telefon: "+90 000 000 00 00",
  telefonHref: "tel:+900000000000",
  whatsappHref: "https://wa.me/900000000000?text=Franchise%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
  whatsappSubeHref: "https://wa.me/900000000000?text=%C5%9Eube%20bilgisi%20almak%20istiyorum.",   // /subeler (tüketici ön-yazısı)
  formEndpoint: "https://formspree.io/f/PLACEHOLDER",
} as const;

/** FRANCHISE İÇERİĞİ — kaynak sırası: (1) markanın KENDİ sitesi antepcigkofte.tr/franchise (Ekrem 30.08:
 *  "oradaki bilgileri ekle") → Royalty yok, nakliye bedeli yok, lojistik/lokasyon/personel desteği,
 *  hazır konsept; (2) Babacan modeli (fiyat yazılmaz, bütçe aralığı, 3 adım) yapı için kalır.
 *  Babacan'ın ÜRÜN kalemleri (kova, sos stick'leri) Antep'te yok → yazılmaz; Babacan adı sitede geçmez.
 *  ÇELİŞKİ NOTU: sitedeki "Sınırsız ve Bedelsiz Çiğköfte Desteği" ile GERCEK.hediye (%10) farklı —
 *  sözleşmeye bağlı ⭐ cümle esas alındı, "sınırsız" yazılmadı (Ekrem'e soruldu). */
// 31.08.2026: "maliyet metrekareye göre değişir + bütçe aralığı seç" kurgusu, GERCEK.ucret
// (189.000 ₺ anahtar teslim) gelince çelişkiye düştü → bölüm "bu bedele ne dahil" listesine döndü.
export const MALIYET = {
  baslik: "Bu bedele ne dahil?",
  metin: "Turda gezdiğiniz dükkânın parçaları: tezgâh, tabela, cam giydirme, menü board ve mutfak. Ürün ile ambalaj bu listede değil; ilk stok ayrı bir kalem, sevkiyatı fabrikadan gelir.",
  not: "Fiyatlara KDV dahil değildir. Nakliye bedeli alınmaz; sevkiyatlar markaya aittir.",   // antepcigkofte.tr/franchise: "Nakliye Bedeli Yok"
} as const;

export const PAKET = [
  { ad: "Mobilya ve donanım", kalemler: [
    "Soğutuculu ön tezgâh, tam donanımlı", "Arka tezgâh, PVC kaplama", "Işıklı menü board", "Işıklı duvar panoları",
    "Pleksi zemin kutu harf tabela", "Cam giydirme, 8–10 m²", "Kayan yazılı LED tabela", "Masalar ve sandalyeler", "Yelken bayrak, 2 adet",
  ] },
  { ad: "Personel ve tanıtım", kalemler: ["Baskılı tişört, 3 adet", "Baskılı önlük ve bandana, 3'er adet", "Baskılı balon, 100 adet", "Logo ve masa menüleri"] },
  { ad: "Mutfak", kalemler: ["Mutfak malzemeleri, 60 parça"] },
] as const;
export const PAKET_TOPLAM = { kalem: 14, mutfak: 60, cam: "8–10 m²" } as const;

export const SUREC = [
  { ad: "Ön değerlendirme", metin: "Formu doldurun; lokasyon, metrekare ve iletişim bilgileriniz yeterli. Ekibimiz sizi arar." },
  { ad: "Uygunluk ve maliyet bilgilendirmesi", metin: "Metrekare, lokasyon ve hedefe göre kurulum planı ve net maliyet paylaşılır." },
  { ad: "Sözleşme ve açılış planı", metin: GERCEK.teslim + " Açılış takvimi birlikte belirlenir." },
] as const;

// Sıra itiraz sırasıdır (plan §5.1): önce para, sonra ürün, sonra "ben yapabilir miyim", sonra süreç.
export const SSS = [
  { soru: `${GERCEK.ucret} bedeline neler dahil?`, cevap: `${GERCEK.ucretKapsam} Liste bu sayfada kalem kalem yazılı: ${PAKET_TOPLAM.kalem} kalem mobilya ve donanım, ${PAKET_TOPLAM.mutfak} parça mutfak, ${PAKET_TOPLAM.cam} cam giydirme.` },
  { soru: "İlk ürün stoğu bu bedele dahil mi?", cevap: `${GERCEK.ucretHaric} Açılışta tezgâha çıkacak ilk sevkiyat ayrıca planlanır ve ön değerlendirmede konuşulur.` },
  { soru: "Bedel her dükkânda aynı mı?", cevap: `${GERCEK.ucretOlcek} Metrekare büyüdükçe tezgâh, cam giydirme ve tabela ölçüleri de büyür; net rakam yerinizi gördükten sonra çıkar.` },
  { soru: "Ayrıca isim hakkı ya da giriş bedeli var mı?", cevap: "Yok. Anahtar teslim kurulum bedeli dışında bir giriş ödemesi alınmaz." },
  { soru: "Royalty ya da ciro payı var mı?", cevap: "Yok. Cirodan kâr payı talep edilmez; kazanç şubenizde kalır." },
  { soru: "Nakliye ücreti ödeyecek miyim?", cevap: "Hayır. Sevkiyatlar düzenli ve bedelsizdir; lojistik markaya aittir." },
  { soru: "Fiyatlara KDV dahil mi?", cevap: "Hayır, fiyatlara KDV dahil değildir." },
  { soru: "Her ay hediye ürün nasıl hesaplanır?", cevap: `${GERCEK.hediye} ${GERCEK.hediyeNot} Başka bir deyişle her on kiloda biri markadan.` },
  { soru: "Yanında başka ürün satabilir miyim?", cevap: `${GERCEK.ikinciUrun} Ne satacağınıza siz karar verirsiniz, çiğköfte hattı değişmez.` },
  { soru: "Çiğköfteyi şubede ben mi hazırlayacağım?", cevap: "Hayır. Harç tek fabrikada, tek tarifle karılır ve şubeye hazır gelir. Tarif tutturmak bayinin işi değildir." },
  { soru: "Gıda tecrübem yok, bu işi yapabilir miyim?", cevap: "Ürün standart geldiği için işin zor kısmı şubede değil. Eğitimli personel ve usta desteği veriyoruz; açılış sonrası operasyonel destek sürüyor." },
  { soru: "Ürün nereden gelir?", cevap: `Konya'daki fabrikamızdan çıkar, şubenize aynı kalitede ulaşır. ${MARKA.cepheSlogan}: cephedeki söz bu.` },
  { soru: "Kaç metrekare gerekir?", cevap: `${GERCEK.alan} Gösterilen ${GERCEK.ornekSube}; minimum şart ${GERCEK.minAlan}.` },
  { soru: "Yer seçiminde ve personelde yardım var mı?", cevap: "Var. Lokasyon için teknik danışmanlık, eğitimli personel ve usta desteği, açılış sonrası operasyonel destek verilir." },
  { soru: "Başvurunca ne olur?", cevap: "Üç adım: ön değerlendirme, uygunluk ve maliyet bilgilendirmesi, sözleşme ve açılış planı." },
  { soru: "Sözleşme süresi ve bölge koruması?", cevap: "Görüşmede netleşir ve yazılı olarak teslim edilir; burada teyitsiz bir şey yazmıyoruz." },
] as const;

/** 3D MAKET — Blender'daki örnek şubeden dışa aktarıldı.
 *  Üretim: Babacan_3D_Modelleme/antep_cigkofte/Ornek_Dukkan/05_Scriptler/web_glb_hazirla.py
 *  Kaynak .blend değişirse script yeniden koşturulur, dosya buradan güncellenir. */
export const SUBE_3D = {
  dosya: "/models/antep_sube.glb",
  poster: "/models/antep_sube_poster.webp",
  alt: "Tarihi Antep Çiğköfte örnek şubesinin döndürülebilir 3D maketi: yeşil tabela, cam cephe, tezgâh ve salon.",
  ipucu: "Sürükleyerek çevirin.",
} as const;

/** 3D GEZİNTİ — franchise sayfasındaki kaydırmalı dükkân turu.
 *  Kamera yolu FİLMİN onaylı çekimlerinden alındı (Babacan_3D_Modelleme/antep_cigkofte/
 *  Ornek_Dukkan/05_Scriptler/bayi_film_antep.py → SAHNELER, 24.08.2026 ışın-izi denetimli).
 *  Koordinatlar filmin Blender dünyasında: cephe x=0 düzlemi, derinlik +x, kapı y=8.53, z yukarı.
 *  GLB'ye dönüşüm TEK yerde: components/gezintiYol.ts → filmToGl(). Burada koordinat çevrilmez.
 *  sn = filmdeki çekim süresi; kaydırma payı buna orantılı. lens = mm (35 mm tabanı). */
export const GEZINTI = [
  { ad: "sokak",  sn: 7.8, lens: 35, ust: "SOKAKTAN", baslik: "Uzaktan tanınır.",
    metin: "Tabelası ve cam giydirmesiyle cephe uzaktan tanınıyor.",
    kam:   [[-9.5, 12.0, 2.6], [-6.5, 10.0, 1.9], [-3.6, 8.3, 1.45]],
    hedef: [[3.44, 8.2, 2.4], [3.44, 8.2, 2.55], [3.44, 8.2, 2.3]] },
  { ad: "cephe",  sn: 3.9, lens: 40, ust: "TABELA VE CAM GİYDİRME", baslik: "Marka, cepheden başlar.",
    metin: SES.ornek,
    kam:   [[-2.2, 5.6, 1.3], [-1.0, 6.6, 1.45]],
    hedef: [[3.33, 8.2, 3.67], [3.4, 7.2, 1.1]] },
  { ad: "giris",  sn: 6.1, lens: 35, ust: "KAPIDAN İÇERİ", baslik: "Girince hat bir bakışta okunur.",
    metin: "Tezgâh, salata barı ve kasa aynı hat üzerinde.",
    kam:   [[-0.6, 8.53, 1.62], [2.6, 8.75, 1.6], [4.0, 8.9, 1.62]],
    hedef: [[9.0, 8.53, 1.55], [10.6, 9.4, 1.5], [11.3, 10.6, 1.45]] },
  { ad: "tezgah", sn: 4.4, lens: 35, ust: "TEZGÂH HATTI", baslik: "Her ay yüzde on hediye.",
    metin: GERCEK.hediye,
    kam:   [[3.65, 9.8, 2.22], [4.0, 9.58, 2.12], [4.35, 9.35, 2.0]],
    hedef: [[4.81, 7.2, 1.45], [5.21, 7.15, 1.36], [5.61, 7.12, 1.28]] },
  { ad: "urun",   sn: 4.0, lens: 50, ust: "ÜRÜN", baslik: "İkinci ürün grubu serbest.",
    metin: GERCEK.ikinciUrun,
    kam:   [[3.95, 8.45, 1.8], [4.75, 8.2, 1.68]],
    hedef: [[3.71, 7.18, 1.05], [4.26, 7.18, 1.04]] },
  { ad: "salon",  sn: 3.9, lens: 35, ust: "SALON", baslik: "Oturma alanı akışı kesmez.",
    metin: "Oturma alanı servis akışını kesmeyecek biçimde yerleştirilmiş.",
    kam:   [[4.7, 8.25, 1.55], [6.9, 8.35, 1.5]],
    hedef: [[8.2, 10.05, 0.95], [10.8, 9.8, 0.95]] },
  { ad: "sizin",  sn: 4.5, lens: 35, ust: "SİZİN ŞUBENİZ", baslik: "Müşteri kapıdan böyle girecek.",
    metin: SES.kapanis,
    kam:   [[7.9, 8.5, 1.58], [7.0, 8.6, 1.6]],
    hedef: [[0.5, 8.53, 1.75], [-1.5, 8.53, 2.0]] },
] as const;
