// Kamera yolu: data/franchise.ts → GEZINTI anahtar karelerini tek zaman eksenine dizer.
// Koordinat çevirisi de yalnız burada yapılır.
import { GEZINTI } from "@/data/franchise";

export type V3 = [number, number, number];
export type Anahtar = { t: number; kam: V3; hedef: V3; lens: number };
export type Durak = { i: number; t0: number; t1: number };

/** Duraklar arası süzülme süresi (film saniyesi cinsinden). */
export const GECIS = 2.4;

/** Film (şehir sahnesi Blender dünyası) → GLB (standalone dükkân, Y yukarı).
 *  ÖLÇÜLDÜ (30.08.2026, iki .blend'de aynı nesnelerin dünya sınırları):
 *    BS_Kapi_Cam   film y 7.90–9.17 ↔ dükkân x 2.03–3.30  → dükkân_x = 11.20 − film_y
 *    BS_Cam_Panel  film x 3.41–3.44 ↔ dükkân y −0.03–0.00 → dükkân_y = film_x − 3.44
 *    BS_Duvar_Arka film x 11.84–11.94 ↔ dükkân y 8.40–8.50 (aynı kayma, doğrulama)
 *  z aynı. glTF Y-yukarı: (dükkân_x, z, −dükkân_y).
 *  İlk sürüm cepheyi film x=0 sanıp kamerayı 3.44 m fazla içeri sokmuştu. */
const FILM_CEPHE_X = 3.44;
const FILM_SOL_Y = 11.2;
export const filmToGl = (p: readonly number[]): V3 => [FILM_SOL_Y - p[1], p[2], FILM_CEPHE_X - p[0]];

export function yolKur() {
  const anahtar: Anahtar[] = [];
  const durak: Durak[] = [];
  let t = 0;
  GEZINTI.forEach((d, i) => {
    const n: number = d.kam.length;
    const t0 = t;
    for (let j = 0; j < n; j++) {
      const f = n === 1 ? 0 : j / (n - 1);
      anahtar.push({ t: t0 + f * d.sn, kam: filmToGl(d.kam[j]), hedef: filmToGl(d.hedef[j]), lens: d.lens });
    }
    t = t0 + d.sn;
    durak.push({ i, t0, t1: t });
    if (i < GEZINTI.length - 1) t += GECIS;
  });
  return { anahtar, durak, toplam: t };
}

const yumusak = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const lerp3 = (a: V3, b: V3, f: number): V3 => [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];

/** t anındaki kamera durumu. Çekim içinde doğrusal, duraklar arası geçişte yumuşatılmış. */
export function ornekle(anahtar: Anahtar[], t: number) {
  if (t <= anahtar[0].t) return anahtar[0];
  const son = anahtar[anahtar.length - 1];
  if (t >= son.t) return son;
  let k = 0;
  while (k < anahtar.length - 2 && anahtar[k + 1].t <= t) k++;
  const a = anahtar[k], b = anahtar[k + 1];
  const ham = (t - a.t) / Math.max(b.t - a.t, 1e-6);
  const gecis = a.lens !== b.lens || b.t - a.t >= GECIS - 1e-6;   // durak sınırı
  const f = gecis ? yumusak(ham) : ham;
  return { t, kam: lerp3(a.kam, b.kam, f), hedef: lerp3(a.hedef, b.hedef, f), lens: lerp(a.lens, b.lens, f) };
}

/** Kaydırma ilerlemesi (0–1) için aktif durak; geçişlerde bir önceki kart kalır. */
export function aktifDurak(durak: Durak[], t: number) {
  let i = 0;
  for (const d of durak) if (t >= d.t0 - GECIS / 2) i = d.i;
  return i;
}
