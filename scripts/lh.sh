#!/bin/sh
# LIGHTHOUSE — üretim çıktısı üzerinde ölçüm. Önce `npm run build`, sonra `npm run serve`.
# Kullanım: sh scripts/lh.sh [kök] [mobil|masaustu]   (varsayılan: mobil)
# Hedef: erişilebilirlik = 100 her sayfada; performans mobilde 4G benzetimi altında ölçülür.
set -e
KOK="${1:-http://localhost:4173}"
KIP="${2:-mobil}"
[ "$KIP" = "masaustu" ] && ONAYAR="--preset=desktop" || ONAYAR=""
mkdir -p ".qa/lh-$KIP"
for yol in "" menu franchise subeler hakkimizda iletisim kvkk; do
  ad="${yol:-ana}"
  npx --yes lighthouse "$KOK/$yol" \
    --quiet --chrome-flags="--headless" $ONAYAR \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output=html \
    --output-path=".qa/lh-$KIP/$ad" || { echo "  atlandı: /$yol"; continue; }
  node -e '
    const r = require("./.qa/lh-'"$KIP"'/'"$ad"'.report.json");
    const p = (k) => Math.round(r.categories[k].score * 100);
    const m = (k) => r.audits[k].displayValue || "-";
    console.log("'"$ad"'".padEnd(11),
      "perf", String(p("performance")).padStart(3),
      "eris", String(p("accessibility")).padStart(3),
      "iyi",  String(p("best-practices")).padStart(3),
      "seo",  String(p("seo")).padStart(3),
      "| LCP", m("largest-contentful-paint"), "TBT", m("total-blocking-time"), "CLS", m("cumulative-layout-shift"));
  '
done
echo "Raporlar: .qa/lh-$KIP/"
