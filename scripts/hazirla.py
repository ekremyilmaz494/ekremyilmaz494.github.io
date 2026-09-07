#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""VARLIK HAZIRLAMA — üretilen görselleri sitenin public/ dizinine üçlü biçimde yazar.

Statik dışa aktarımda next/image optimize etmediği için her görsel önceden
avif + webp + yedek (jpg ya da kesikte png) olarak üretilir; `-m` sonekli dar ekran
sürümü isteğe bağlıdır.

    python3 scripts/hazirla.py foto  <kaynak> <ad> [genislik] [--m <genislik>]
    python3 scripts/hazirla.py kesik <kaynak> <ad> [genislik] [--m <genislik>] [--kirp]
    python3 scripts/hazirla.py og    <kaynak>

`kesik` alfa kanalını korur ve VARSAYILAN OLARAK KIRPMAZ: anatomi katmanları aynı
tuvalde üst üste bineceği için kadraj bozulmamalıdır. `--kirp` yalnız tek başına
duran kesitler içindir.
"""
import os, sys
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CIKTI = os.path.join(KOK, "public")


def kb(p):
    return os.path.getsize(p) / 1024


def yaz(im, ad, kesik=False, avif_q=52, webp_q=80, jpg_q=82):
    hedef = os.path.join(CIKTI, ad)
    if kesik:
        # Yedek PNG yalnız avif/webp desteklemeyen tarayıcılar için; paletli yazılır (≈4 kat küçük).
        im.quantize(colors=255, method=Image.FASTOCTREE).save(hedef + ".png", optimize=True)
        yedek = hedef + ".png"
    else:
        im.convert("RGB").save(hedef + ".jpg", quality=jpg_q, optimize=True, progressive=True)
        yedek = hedef + ".jpg"
    im.save(hedef + ".avif", quality=avif_q)
    im.save(hedef + ".webp", quality=webp_q, method=6, lossless=False)
    print(f"  {ad}: {im.size[0]}×{im.size[1]} · avif {kb(hedef+'.avif'):.0f} KB · "
          f"webp {kb(hedef+'.webp'):.0f} KB · yedek {kb(yedek):.0f} KB")


def ac(kaynak, kesik):
    im = Image.open(os.path.join(KOK, "..", kaynak) if not os.path.isabs(kaynak) and not os.path.exists(kaynak) else kaynak)
    return im.convert("RGBA" if kesik else "RGB")


def olcekle(im, gen):
    if im.width <= gen:
        return im.copy()
    return im.resize((gen, round(im.height * gen / im.width)), Image.LANCZOS)


def foto(kaynak, ad, gen=2000, mgen=None, kesik=False, kirp=False):
    im = ac(kaynak, kesik)
    if kesik and kirp:
        kutu = im.getchannel("A").getbbox()
        if kutu:
            im = im.crop(kutu)
    yaz(olcekle(im, gen), ad, kesik)
    if mgen:
        yaz(olcekle(im, mgen), ad + "-m", kesik)


def og(kaynak):
    """Sosyal paylaşım kartı: 1200×630, ortadan kırpılır."""
    im = ac(kaynak, False)
    o = max(1200 / im.width, 630 / im.height)
    im = im.resize((round(im.width * o), round(im.height * o)), Image.LANCZOS)
    sx, sy = (im.width - 1200) // 2, (im.height - 630) // 2
    im = im.crop((sx, sy, sx + 1200, sy + 630))
    hedef = os.path.join(KOK, "app", "opengraph-image.jpg")
    im.save(hedef, quality=86, optimize=True, progressive=True)
    print(f"  opengraph-image.jpg: 1200×630 · {kb(hedef):.0f} KB")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    kip = a[0]
    if kip == "og":
        og(a[1])
    else:
        kirp = "--kirp" in a
        mgen = int(a[a.index("--m") + 1]) if "--m" in a else None
        kalan = [x for i, x in enumerate(a) if x not in ("--kirp", "--m") and (i == 0 or a[i - 1] != "--m")]
        kaynak, ad = kalan[1], kalan[2]
        gen = int(kalan[3]) if len(kalan) > 3 else 2000
        foto(kaynak, ad, gen, mgen, kesik=(kip == "kesik"), kirp=kirp)
