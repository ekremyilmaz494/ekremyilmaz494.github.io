#!/usr/bin/env node
/**
 * İL MERKEZLERİ — data/harita.ts içindeki SVG yollarından her il için tek bir temsil noktası çıkarır.
 *
 * Neden: "en yakın il" hesabı ve haritanın sırayla yanma düzeni için koordinat lazım; tarayıcıda
 * `getBBox()` çağırmak yerine derleme öncesi bir kez hesaplanır.
 *
 * Yöntem: yol eğri üstü noktalara indirgenir (M/L/C bitiş noktaları), en büyük alt yol (ada değil
 * anakara) seçilir, alan ağırlıklı ağırlık merkezi alınır. Alan sıfıra yakınsa sınır kutusu ortası.
 *
 * Kullanım: node scripts/harita-merkez.mjs   →   data/harita-merkez.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const kaynak = readFileSync(join(KOK, "data", "harita.ts"), "utf8");

const iller = [...kaynak.matchAll(/\{\s*plaka:\s*(\d+),\s*ad:\s*"([^"]+)",\s*d:\s*"([^"]+)"\s*\}/g)]
  .map(([, plaka, ad, d]) => ({ plaka: +plaka, ad, d }));
if (iller.length !== 81) throw new Error(`81 il bekleniyordu, ${iller.length} bulundu`);

/** "M 519 537 C … z" → alt yolların köşe noktaları. Yalnız mutlak M/L/C ve z var. */
function altYollar(d) {
  const jeton = d.match(/[MLCz]|-?\d+(?:\.\d+)?/g) ?? [];
  const yollar = [];
  let simdi = null;
  for (let i = 0; i < jeton.length; ) {
    const k = jeton[i];
    if (k === "M") { simdi = [[+jeton[i + 1], +jeton[i + 2]]]; yollar.push(simdi); i += 3; }
    else if (k === "L") { simdi.push([+jeton[i + 1], +jeton[i + 2]]); i += 3; }
    else if (k === "C") { simdi.push([+jeton[i + 5], +jeton[i + 6]]); i += 7; }   // yalnız bitiş noktası
    else i += 1;                                                                  // z
  }
  return yollar.filter((p) => p.length >= 3);
}

/** Kapalı çokgenin işaretli alanı ve ağırlık merkezi (shoelace). */
function agirlikMerkezi(nokta) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, n = nokta.length; i < n; i++) {
    const [x0, y0] = nokta[i], [x1, y1] = nokta[(i + 1) % n];
    const c = x0 * y1 - x1 * y0;
    a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c;
  }
  a /= 2;
  if (Math.abs(a) < 1) {
    const xs = nokta.map((p) => p[0]), ys = nokta.map((p) => p[1]);
    return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2, alan: 0 };
  }
  return { x: cx / (6 * a), y: cy / (6 * a), alan: Math.abs(a) };
}

const cikti = {};
for (const il of iller) {
  const parcalar = altYollar(il.d).map(agirlikMerkezi).sort((a, b) => b.alan - a.alan);
  const m = parcalar[0];
  cikti[il.plaka] = { ad: il.ad, x: Math.round(m.x * 10) / 10, y: Math.round(m.y * 10) / 10 };
}

writeFileSync(join(KOK, "data", "harita-merkez.json"), JSON.stringify(cikti, null, 0).replace(/\},/g, "},\n ") + "\n");
console.log(`81 il merkezi yazıldı · örnek: 6 Ankara ${cikti[6].x},${cikti[6].y} · 42 Konya ${cikti[42].x},${cikti[42].y} · 34 İstanbul ${cikti[34].x},${cikti[34].y}`);
