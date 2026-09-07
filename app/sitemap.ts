import type { MetadataRoute } from "next";
import { MARKA } from "@/data/franchise";

export const dynamic = "force-static";

/** Statik export: 7 rota, tümü elle. Öncelikler sayfanın iş değerine göre. */
const ROTALAR = [
  { yol: "/", oncelik: 1, siklik: "monthly" },
  { yol: "/menu/", oncelik: 0.9, siklik: "monthly" },
  { yol: "/franchise/", oncelik: 0.9, siklik: "monthly" },
  { yol: "/subeler/", oncelik: 0.8, siklik: "weekly" },
  { yol: "/hakkimizda/", oncelik: 0.6, siklik: "yearly" },
  { yol: "/iletisim/", oncelik: 0.6, siklik: "yearly" },
  { yol: "/kvkk/", oncelik: 0.2, siklik: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const simdi = new Date();
  return ROTALAR.map((r) => ({
    url: `https://${MARKA.web}${r.yol}`,
    lastModified: simdi,
    changeFrequency: r.siklik,
    priority: r.oncelik,
  }));
}
