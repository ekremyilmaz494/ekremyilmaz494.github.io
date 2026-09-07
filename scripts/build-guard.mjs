import { readFileSync, readdirSync, statSync } from "node:fs";
/**
 * YAYIN KİLİDİ — üç katman.
 *
 * 1) GECICI bayrağı: true olduğu sürece derleme durur.
 * 2) YER TUTUCU TARAMASI: bayrak false yapılsa BİLE veri dosyalarında yer tutucu
 *    değer varsa derleme durur. Sebebi: GECICI yalnızca sayfadaki geçici UYARILARI
 *    gizler, değerleri değiştirmez. Bayrağı tek başına çevirmek `wa.me/900000000000`
 *    gibi değerleri sessizce yayına taşırdı, üstelik uyarı da görünmezdi.
 * 3) VERİ TAZELİĞİ + YAZIM: bayi listesi ne kadar eski ve kaç kayıt; görünür metinde
 *    uzun tire (—) var mı. İkisi de yayın kalitesi kilidi.
 *
 * Yeni bir yer tutucu eklendiğinde buraya da bir satır eklenir.
 */
const KOK = new URL("..", import.meta.url);
const oku = (yol) => readFileSync(new URL(yol, KOK), "utf8");
const hatalar = [];
/* ---------- 1) GECICI bayrağı ---------- */
const franchise = oku("data/franchise.ts");
if (/export const GECICI\s*=\s*true/.test(franchise)) {
  hatalar.push(
    "data/franchise.ts: GECICI = true.\n" +
    "     Yatırım, destek ve iletişim değerlerinin bir bölümü hâlâ GEÇİCİ.\n" +
    "     Gerçek değerleri girip GECICI = false yapmadan yayın derlemesi yapılamaz."
  );
}
/* ---------- 2) Yer tutucular ---------- */
const YER_TUTUCULAR = [
  { dosya: "data/franchise.ts", desen: /formspree\.io\/f\/PLACEHOLDER/, ad: "form endpoint'i", cozum: "markadan gelen gerçek Formspree (ya da eşdeğer) adresi" },
  { dosya: "data/franchise.ts", desen: /wa\.me\/900000000000/, ad: "WhatsApp numarası", cozum: "gerçek WhatsApp hattı" },
  { dosya: "data/franchise.ts", desen: /\+90 000 000 00 00|tel:\+900000000000/, ad: "yedek telefon numarası", cozum: "GECICI_VERI.telefon / telefonHref" },
  { dosya: "data/site.ts", desen: /formspree\.io\/f\/PLACEHOLDER/, ad: "iletişim formu endpoint'i", cozum: "gerçek form adresi" },
];
for (const y of YER_TUTUCULAR) {
  if (y.desen.test(oku(y.dosya))) hatalar.push(`${y.dosya}: ${y.ad} hâlâ yer tutucu.\n     → ${y.cozum}`);
}
/* ---------- 3) Bayi verisi tazeliği ---------- */
const meta = JSON.parse(oku("data/bayiler.meta.json"));
const gun = Math.floor((Date.now() - new Date(meta.cekim).getTime()) / 86400000);
if (!(meta.toplam >= 100)) {
  hatalar.push(`data/bayiler.json: yalnız ${meta.toplam} kayıt var (beklenen ≥ 100).\n     → npm run bayi ile listeyi yeniden çek, çıktıyı gözden geçir.`);
}
if (gun > 180) {
  hatalar.push(`data/bayiler.json: liste ${gun} gün önce çekilmiş (sınır 180).\n     → npm run bayi ile tazele.`);
}
/* ---------- 3b) Görünür metinde uzun tire ---------- */
function* dosyalar(dizin) {
  for (const ad of readdirSync(new URL(dizin + "/", KOK))) {
    const yol = `${dizin}/${ad}`;
    if (statSync(new URL(yol, KOK)).isDirectory()) yield* dosyalar(yol);
    else if (/\.(tsx?|json)$/.test(ad)) yield yol;
  }
}
const tireli = [];
const yorumSil = (m) => m
  .replace(/\/\*[\s\S]*?\*\//g, (b) => b.replace(/[^\n]/g, " "))
  .replace(/(^|[^:])\/\/[^\n]*/g, (b, o) => o + " ".repeat(b.length - o.length));
for (const dizin of ["app", "components", "data"]) {
  for (const yol of dosyalar(dizin)) {
    yorumSil(oku(yol)).split("\n").forEach((satir, i) => {
      if (satir.includes("\u2014")) tireli.push(`${yol}:${i + 1}`);
    });
  }
}
if (tireli.length) {
  hatalar.push(`Uzun tire (—) ${tireli.length} yerde: ${tireli.slice(0, 6).join(", ")}${tireli.length > 6 ? " ..." : ""}\n     → Görünür metinde uzun tire kullanılmaz; nokta, virgül ya da iki nokta.`);
}
/* ---------- rapor ---------- */
if (hatalar.length) {
  console.error(`\n⛔ Yayın derlemesi durdu. ${hatalar.length} engel:\n`);
  hatalar.forEach((h, i) => console.error(`  ${i + 1}. ${h}\n`));
  console.error("  Geliştirirken derlemek için: npx next build (kilidi atlar, yayınlamaz).\n");
  process.exit(1);
}
console.log(`✅ Yayın kilidi açık. Bayi listesi ${meta.toplam} kayıt, ${gun} gün önce çekildi.`);
