#!/usr/bin/env node
/**
 * BAYİ ÇEKİCİ — antepcigkofte.tr'nin 25 il sayfasındaki GERÇEK bayi listesini alır.
 *
 * Neden: markanın kendi sitesinde yayında olan tek gerçek şube verisi burası.
 * Uydurma yok: ad/adres/telefon sayfada ne yazıyorsa o; okunamayan alan boş bırakılır
 * ve `bayiler.meta.json` içine uyarı düşer.
 *
 * Kullanım: node scripts/bayi-cek.mjs [--tolerate]
 * Çıktı:    data/bayiler.json · data/bayiler.meta.json
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOLERE = process.argv.includes("--tolerate");

/** slug → [plaka, ad] · plakalar resmî trafik kodları, adlar TDK yazımı. */
const ILLER = {
  adana: [1, "Adana"], afyon: [3, "Afyonkarahisar"], amasya: [5, "Amasya"],
  ankara: [6, "Ankara"], antalya: [7, "Antalya"], aydin: [9, "Aydın"],
  bitlis: [13, "Bitlis"], bursa: [16, "Bursa"], denizli: [20, "Denizli"],
  diyarbakir: [21, "Diyarbakır"], eskisehir: [26, "Eskişehir"], gaziantep: [27, "Gaziantep"],
  hatay: [31, "Hatay"], mersin: [33, "Mersin"], kars: [36, "Kars"],
  kayseri: [38, "Kayseri"], konya: [42, "Konya"], manisa: [45, "Manisa"],
  kahramanmaras: [46, "Kahramanmaraş"], mardin: [47, "Mardin"], mugla: [48, "Muğla"],
  nevsehir: [50, "Nevşehir"], tokat: [60, "Tokat"], aksaray: [68, "Aksaray"],
  karaman: [70, "Karaman"],
};

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const uyarilar = [];
const uyar = (id, kod, ham) => uyarilar.push({ id, kod, ham });

/* ---------- metin temizliği ---------- */

const VARLIK = {
  "&#8211;": "-", "&#8212;": "-", "&#8217;": "'", "&#8216;": "'",
  "&#8220;": '"', "&#8221;": '"', "&nbsp;": " ", "&amp;": "&",
  "&quot;": '"', "&#039;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
};
const cozVarlik = (s) =>
  s.replace(/&#\d+;|&#x[0-9a-f]+;|&[a-z]+;/gi, (m) => {
    if (VARLIK[m]) return VARLIK[m];
    if (/^&#x/i.test(m)) return String.fromCodePoint(parseInt(m.slice(3, -1), 16));
    if (m.startsWith("&#")) return String.fromCodePoint(parseInt(m.slice(2, -1), 10));
    return m;
  });

const temizle = (s) =>
  cozVarlik(s.replace(/<[^>]+>/g, " ")).replace(/ /g, " ").replace(/\s+/g, " ").trim();

/* ---------- Türkçe başlık biçimi ---------- */

const trKucuk = (s) => s.toLocaleLowerCase("tr-TR");
const trBuyuk = (s) => s.toLocaleUpperCase("tr-TR");

/** Kaynaktaki büyük harfli sözcük → doğru Türkçe yazım. Yalnız genel adres sözcükleri. */
const YAZIM = JSON.parse(readFileSync(join(KOK, "data", "bayi-yazim.json"), "utf8"));
/** Kısaltmalar büyük kalır. */
const BUYUK_KAL = new Set(["TOKİ", "OSB", "AVM", "PK", "TR"]);

/**
 * Büyük harfli kaynak metnini başlık biçimine çevirir.
 * Rakamlı jetonlar ve ayraçlar korunur; harf dizileri tek tek dönüştürülür.
 */
function baslikBicimi(s) {
  return s
    .replace(/\.(?=[^\s.])/g, ". ")            // MAH.ŞEHİT → MAH. ŞEHİT
    .replace(/\s*:\s*/g, ":")
    .replace(/[A-Za-zÇĞİÖŞÜÎÂçğıöşüîâ]+/g, (dizi, ofs, tam) => {
      const B = trBuyuk(dizi);
      if (dizi.length <= 2 && /[\d/]/.test(tam[ofs - 1] ?? "")) return B;   // No:9/AB, 12/C
      if (YAZIM[B]) return YAZIM[B];
      if (BUYUK_KAL.has(B)) return B;
      if (dizi.length === 1) return B;
      const k = trKucuk(dizi);
      return trBuyuk(k.slice(0, 1)) + k.slice(1);
    })
    .replace(/\s+([.,;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/* ---------- telefon ---------- */

/** 10 hane, alan/operatör kodu 2-5 ile başlar. Dönen: {e164, goster, href} ya da null. */
function telefonCozumle(ham) {
  let n = ham.replace(/\D/g, "");
  if (n.length === 12 && n.startsWith("90")) n = n.slice(2);
  else if (n.length === 11 && n.startsWith("0")) n = n.slice(1);
  if (n.length !== 10 || !/^[2-5]/.test(n)) return null;
  return {
    e164: "+90" + n,
    goster: `0${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 8)} ${n.slice(8)}`,
    href: "tel:+90" + n,
  };
}

/* ---------- ayrıştırma ---------- */

const TEL_SON = /(?:\+?90[\s.\-]*)?0?[\s(]*\d{3}[\s)]*(?:[\s.\-/]*\d){7}\s*$/;
const TEL_ON = /^\s*(?:TELEFON|TEL|T)\s*[.:]+\s*/i;
const TEL_ARTIK = /[\s.,:;-]*\b(?:TELEFON|TEL|T)\s*[.:]+\s*$/i;
const ADRES_IZ = /\b(MAH|MAHALLESİ|MAHALLESI|MH|CAD|CADDESİ|CADDESI|SOK|SOKAK|SK|BLV|BULVAR|BULVARI|NO|APT|SİT|SITE|KÖYÜ|KOYU|ÇARŞI|CARSI|BLOK|PLAZA|KARŞISI|MERKEZ|TOKİ|SANAYİ|MEYDAN|AVM|CD)\b|\bNO\s*[:.]/iu;
const ILCE_AYIR = /^(.{2,26}?)\s*[-–—]\s*(.+)$/u;
const MAH_BOL = /^(.*?)\s*(\S{2,20}\s+(?:MAH\.|MAHALLESİ|MAHALLESI|MH\.)[\s\S]*)$/iu;

function kayitCozumle(paragraflar, slug, ilAd, plaka) {
  const ham = [...paragraflar];
  let ad = paragraflar[0] ?? "";
  let adres, telHam;

  for (const p of paragraflar.slice(1)) {
    const m = p.match(TEL_SON);
    if (m) {
      telHam = telHam ?? m[0];
      const kalan = p.slice(0, m.index).replace(TEL_ARTIK, "").replace(TEL_ON, "").trim();
      if (kalan && !adres && kalan.length > 8) adres = kalan;
      continue;
    }
    const duz = p.replace(TEL_ON, "").trim();
    if (duz && !adres && (ADRES_IZ.test(duz) || duz.length > 12)) adres = duz;
  }

  // Adres bold satıra yapışmışsa ayır.
  if (!adres && ADRES_IZ.test(ad)) {
    const m = ad.match(MAH_BOL);
    if (m && m[1].trim().length >= 3) { ad = m[1].trim(); adres = m[2].trim(); }
  }

  // Telefon bold satırın sonundaysa.
  if (!telHam) {
    const m = ad.match(TEL_SON);
    if (m && m.index > 2) { telHam = m[0]; ad = ad.slice(0, m.index).replace(TEL_ARTIK, "").trim(); }
  }

  ad = ad.replace(/[\s.,:;-]+$/u, "").trim();

  let ilce;
  const m = ad.match(ILCE_AYIR);
  if (m && m[1].trim().split(/\s+/).length <= 3 && m[2].trim().length >= 3) {
    ilce = m[1].trim();
    ad = m[2].trim();
  }

  const id = `${slug}-${createHash("sha1").update(ham.join("|")).digest("hex").slice(0, 8)}`;
  const tel = telHam ? telefonCozumle(telHam) : null;
  if (telHam && !tel) uyar(id, "TEL_GECERSIZ", telHam);
  if (!telHam) uyar(id, "TEL_YOK", ham.join(" | "));
  if (!adres) uyar(id, "ADRES_YOK", ham.join(" | "));
  if (ADRES_IZ.test(ad)) uyar(id, "AD_ADRES_BIRLESIK", ad);

  return {
    id, il: ilAd, plaka, slug,
    ...(ilce ? { ilce: baslikBicimi(ilce) } : {}),
    ad: baslikBicimi(ad),
    ...(adres ? { adres: baslikBicimi(adres) } : {}),
    ...(tel ? { telefon: tel.e164, telefonGoster: tel.goster, tel: tel.href } : {}),
    ham,
  };
}

async function sayfaCek(slug) {
  const url = `https://antepcigkofte.tr/${slug}/`;
  for (let deneme = 0; deneme < 3; deneme++) {
    try {
      const y = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(25000) });
      if (!y.ok) throw new Error(`HTTP ${y.status}`);
      return { url, html: await y.text() };
    } catch (e) {
      if (deneme === 2) {
        if (TOLERE) { console.warn(`  ! ${slug} alınamadı: ${e.message}`); return null; }
        throw new Error(`${url} alınamadı: ${e.message}`);
      }
      await new Promise((r) => setTimeout(r, 900));
    }
  }
}

/** Her bayi bir Elementor metin bileşeni; bileşen sınırında bölünür. */
function kayitlariCikar(html) {
  return html
    .split("elementor-widget-text-editor")
    .slice(1)
    .map((parca) =>
      [...parca.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => temizle(m[1])).filter(Boolean)
    )
    .filter((ps) => ps.length > 0 && ps.length <= 6);
}

/* ---------- ana akış ---------- */

const bayiler = [];
const kaynaklar = [];
const sayim = {};

for (const [slug, [plaka, ilAd]] of Object.entries(ILLER)) {
  const s = await sayfaCek(slug);
  if (!s) continue;
  kaynaklar.push(s.url);
  const kayitlar = kayitlariCikar(s.html);
  for (const ps of kayitlar) bayiler.push(kayitCozumle(ps, slug, ilAd, plaka));
  sayim[slug] = kayitlar.length;
  console.log(`  ${ilAd.padEnd(16)} ${String(kayitlar.length).padStart(3)} kayıt`);
  await new Promise((r) => setTimeout(r, 250));
}

// Elle düzeltmeler en son uygulanır (kaynak bozuksa tek müdahale yeri burası).
const duzeltmeYol = join(KOK, "data", "bayi-duzeltme.json");
const duzeltme = existsSync(duzeltmeYol) ? JSON.parse(readFileSync(duzeltmeYol, "utf8")) : {};
delete duzeltme._not;
const son = bayiler
  .map((b) => (duzeltme[b.id] ? { ...b, ...duzeltme[b.id] } : b))
  .filter((b) => !b.sil);

// Aynı telefon ya da adres birden çok kayıtta ise işaretle (silinmez: gerçek olabilir).
const say = (alan) => son.reduce((a, b) => (b[alan] ? ((a[b[alan]] = (a[b[alan]] || 0) + 1), a) : a), {});
const telSayim = say("telefon"), adresSayim = say("adres");
for (const b of son) {
  if ((b.telefon && telSayim[b.telefon] > 1) || (b.adres && adresSayim[b.adres] > 1))
    uyar(b.id, "TEKRAR", `${b.ad} · ${b.telefonGoster ?? ""} · ${b.adres ?? ""}`);
}

son.sort((a, b) =>
  a.plaka - b.plaka ||
  (a.ilce ?? "").localeCompare(b.ilce ?? "", "tr") ||
  a.ad.localeCompare(b.ad, "tr")
);

writeFileSync(join(KOK, "data", "bayiler.json"), JSON.stringify(son, null, 1) + "\n");
writeFileSync(
  join(KOK, "data", "bayiler.meta.json"),
  JSON.stringify(
    { cekim: new Date().toISOString(), kaynaklar, toplam: son.length, iller: sayim, uyarilar },
    null, 1
  ) + "\n"
);

console.log(`\nToplam ${son.length} bayi · ${Object.keys(sayim).length} il · ${uyarilar.length} uyarı`);
const kodlar = uyarilar.reduce((a, u) => ((a[u.kod] = (a[u.kod] || 0) + 1), a), {});
for (const [k, v] of Object.entries(kodlar)) console.log(`  ${k}: ${v}`);
