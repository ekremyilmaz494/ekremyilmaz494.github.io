#!/bin/sh
# FONT ALT KÜMESİ — Google'ın latin-ext dilimi 114 KB ve içindeki Türkçe harf sayısı altı.
# Değişken TTF'yi Latin + Latin Genişletilmiş-A + noktalama + ₺ ile sınırlayıp woff2'ye çevirir.
# wght ekseni korunur (--no-instance yok), böylece tek dosya bütün ağırlıkları taşır.
# Gerekenler: python3 -m venv + `pip install fonttools brotli`. Kaynak TTF'ler ofl/ deposundan.
# Kullanım: sh scripts/font-kes.sh <pyftsubset yolu> <kaynak.ttf> <hedef.woff2>
set -e
PYFT="$1"; KAYNAK="$2"; HEDEF="$3"
"$PYFT" "$KAYNAK" --output-file="$HEDEF" --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0100-017F,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+20BA,U+2122,U+2190-2193,U+2264-2265" \
  --layout-features="kern,liga,calt,ccmp,locl,mark,mkmk,tnum,onum" \
  --name-IDs="1,2,3,4,5,6" --drop-tables+=DSIG --no-hinting
