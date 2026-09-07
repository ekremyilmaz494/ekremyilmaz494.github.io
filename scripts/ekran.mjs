#!/usr/bin/env node
/**
 * EKRAN TARAMASI — her sayfayı iki genişlikte ve birkaç kaydırma konumunda çeker.
 * Amaç sayfayı gözle okumak: kompozisyon, yatay taşma, konsol hatası.
 *
 * Kullanım: node scripts/ekran.mjs [--url http://localhost:3000] [--yol /] [--cikti .qa]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const arg = (ad, varsayilan) => {
  const i = process.argv.indexOf(`--${ad}`);
  return i > -1 ? process.argv[i + 1] : varsayilan;
};

const KOK = arg("url", "http://localhost:3000");
const CIKTI = arg("cikti", ".qa");
const YOLLAR = (arg("yol", "/") || "/").split(",");
const KONUM = [0, 0.18, 0.36, 0.54, 0.72, 0.9];
const CIHAZ = [
  { ad: "masaustu", genislik: 1440, yukseklik: 900 },
  { ad: "mobil", genislik: 390, yukseklik: 844 },
];

mkdirSync(CIKTI, { recursive: true });
const tarayici = await chromium.launch();
const sorunlar = [];

for (const c of CIHAZ) {
  const baglam = await tarayici.newContext({
    viewport: { width: c.genislik, height: c.yukseklik },
    deviceScaleFactor: 1,
    reducedMotion: process.argv.includes("--sakin") ? "reduce" : "no-preference",
  });
  const sayfa = await baglam.newPage();
  sayfa.on("console", (m) => {
    if (m.type() === "error") sorunlar.push(`konsol · ${c.ad} · ${m.text().slice(0, 160)}`);
  });
  sayfa.on("pageerror", (e) => sorunlar.push(`sayfa · ${c.ad} · ${String(e).slice(0, 160)}`));

  for (const yol of YOLLAR) {
    await sayfa.goto(KOK + yol, { waitUntil: "networkidle" });
    await sayfa.waitForTimeout(700);

    const tasma = await sayfa.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (tasma > 1) sorunlar.push(`yatay taşma · ${yol} · ${c.ad} · ${tasma}px`);

    const yukseklik = await sayfa.evaluate(() => document.body.scrollHeight - window.innerHeight);
    const ad = yol.replace(/\//g, "_") || "_kok";

    for (const [i, k] of KONUM.entries()) {
      await sayfa.evaluate((y) => window.scrollTo(0, y), Math.round(yukseklik * k));
      await sayfa.waitForTimeout(750);
      await sayfa.screenshot({ path: join(CIKTI, `${c.ad}${ad}-${i}.png`) });
    }
  }
  await baglam.close();
}
await tarayici.close();

console.log(sorunlar.length ? "SORUNLAR:\n" + sorunlar.join("\n") : "sorun yok");
