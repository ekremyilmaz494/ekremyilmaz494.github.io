#!/usr/bin/env python3
"""Masaüstü ürün akışları: menü, bölüm bağlantıları, hareketsiz paneller ve 3D tur.
Python Playwright + Chromium gerekir. Dış ağ istekleri engellenir.
"""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--url', default='http://127.0.0.1:3100')
parser.add_argument('--cikti', default='.qa/masaustu-akis')
args = parser.parse_args()
root = args.url.rstrip('/')
out = Path(args.cikti)
out.mkdir(parents=True, exist_ok=True)
results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])

    def context(**kwargs):
        ctx = browser.new_context(viewport={'width':1440,'height':900}, **kwargs)
        ctx.route('**/*', lambda r: r.continue_() if urlparse(r.request.url).netloc == urlparse(root).netloc else r.abort())
        return ctx

    def check(name, run):
        try:
            run()
            result = {'kontrol': name, 'durum':'geçti'}
        except Exception as e:
            result = {'kontrol': name, 'durum':'kaldı', 'hata':str(e)}
        results.append(result)
        print(json.dumps(result, ensure_ascii=False), flush=True)

    def menu():
        ctx = context(); q = ctx.new_page()
        q.goto(root+'/menu/', wait_until='networkidle')
        nav=q.get_by_role('navigation',name='Menü bölümleri')
        for link in nav.get_by_role('link').all():
            target=link.get_attribute('href')
            link.click()
            expect(q).to_have_url(root+'/menu/'+target)
            assert q.locator(target).count()==1
        slider=q.get_by_role('slider',name='Gramajı seç')
        slider.press('Home')
        for i,(grams,wraps) in enumerate([(75,'Tek'),(100,'Tek'),(150,'Çift'),(175,'Çift')]):
            if i: slider.press('ArrowRight')
            expect(slider).to_have_attribute('aria-valuetext',f'{grams} g dürüm, {wraps.lower()} lavaş')
            expect(q.locator('#durumler').get_by_text(wraps+' lavaş',exact=True)).to_be_visible()
        q.locator('#durumler').scroll_into_view_if_needed()
        q.screenshot(path=str(out/'gramaj-175.png'))
        ctx.close()

    def panels(js):
        ctx=context(java_script_enabled=js,reduced_motion='reduce');q=ctx.new_page()
        q.goto(root+'/',wait_until='networkidle')
        panels=q.locator('article').filter(visible=True)
        assert panels.count()==3
        for panel in panels.all():
            assert panel.evaluate('(e)=>e.offsetWidth <= e.parentElement.clientWidth+1')
            assert panel.locator('p').evaluate_all('(els)=>els.every(e=>e.scrollWidth<=e.clientWidth+1)')
        panels.first.scroll_into_view_if_needed()
        q.wait_for_function('Array.from(document.querySelectorAll("article img")).filter(e=>e.getBoundingClientRect().width>0).every(e=>e.complete && e.naturalWidth>0)')
        q.locator('article img').evaluate_all('(es)=>Promise.all(es.filter(e=>e.getBoundingClientRect().width>0).map(e=>e.decode()))')
        q.screenshot(path=str(out/('paneller-hareketsiz.png' if js else 'paneller-js-yok.png')))
        ctx.close()

    def tour_failure(no_webgl=False):
        ctx=context()
        if no_webgl:
            ctx.add_init_script('''const original=HTMLCanvasElement.prototype.getContext;
                HTMLCanvasElement.prototype.getContext=function(type,...args){
                  if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;
                  return original.call(this,type,...args);
                };''')
        else:
            ctx.route('**/models/antep_sube.glb',lambda r:r.fulfill(status=503,body='unavailable'))
        q=ctx.new_page(); errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
        q.goto(root+'/franchise/',wait_until='networkidle')
        tour=q.locator('#ornek-sube');tour.scroll_into_view_if_needed()
        expect(tour).to_have_attribute('data-sahne-yedek','true',timeout=20000)
        expect(tour.locator('ol')).to_have_css('position','static')
        expect(tour.locator('img')).to_have_css('opacity','1')
        assert tour.bounding_box()['height']<4000,'Boş 720vh kaydırma alanı kaldı'
        expect(tour.locator('canvas')).to_have_count(0)
        tour.scroll_into_view_if_needed()
        q.screenshot(path=str(out/('webgl-yok.png' if no_webgl else 'model-yuklenemedi.png')))
        q.locator('form [name=ad]').fill('Yerel QA')
        expect(q.locator('form [name=ad]')).to_have_value('Yerel QA')
        # R3F geliştirme kipinde yakalanmış yükleme hatasını da bildirir. Yalnız
        # kasıtlı 503'e ait tanı kabul edilir; başka JS hatası başarısızlıktır.
        unexpected = [e for e in errors if not (not no_webgl and
                      'Could not load /models/antep_sube.glb' in e and '503' in e)]
        assert not unexpected, unexpected
        ctx.close()

    def tour():
        ctx=context();q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
        q.goto(root+'/franchise/',wait_until='networkidle')
        tour=q.locator('#ornek-sube')
        def progress(value):
            tour.evaluate('(e,p)=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p)',value)
        progress(0)
        expect(tour.locator('canvas')).to_be_visible(timeout=30000)
        expect(tour.locator('img')).to_have_css('opacity','0',timeout=30000)
        expect(tour).to_have_attribute('data-sahne-yedek','false')
        assert not tour.locator('canvas').evaluate('(e)=>e.getContext("webgl2").isContextLost()')
        dots=tour.locator('[data-aktif]')
        expect(dots.first).to_have_attribute('data-aktif','1')
        progress(0.97)
        expect(dots.last).to_have_attribute('data-aktif','1')
        q.wait_for_timeout(900)
        q.screenshot(path=str(out/'tur-son-durak.png'))
        progress(0)
        expect(dots.first).to_have_attribute('data-aktif','1')
        q.locator('form [name=ad]').fill('Korunan başvuru')
        q.emulate_media(reduced_motion='reduce')
        expect(tour.locator('img')).to_have_css('opacity','1')
        expect(tour.locator('ol')).to_have_css('position','static')
        expect(q.locator('form [name=ad]')).to_have_value('Korunan başvuru')
        q.emulate_media(reduced_motion='no-preference')
        expect(tour.locator('canvas')).to_have_count(1)
        expect(q.locator('form [name=ad]')).to_have_value('Korunan başvuru')
        assert not errors, errors
        # Grafik desteği sayfa açıkken kaybolursa da boş sahne bırakma.
        tour.locator('canvas').evaluate('(e)=>e.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext()')
        expect(tour).to_have_attribute('data-sahne-yedek','true')
        expect(tour.locator('img')).to_have_css('opacity','1')
        expect(q.locator('form [name=ad]')).to_have_value('Korunan başvuru')
        ctx.close()

    check('Masaüstü menü: 5 bölüm bağlantısı, 4 gramaj ve lavaş etiketi',menu)
    check('Hareket azaltma: 3 panelin metni kapsayıcısına sığıyor',lambda:panels(True))
    check('JavaScript kapalı: 3 panelin metni kapsayıcısına sığıyor',lambda:panels(False))
    check('3D model yüklenemedi: poster, açıklamalar ve form kullanılabilir',tour_failure)
    check('WebGL yok: poster, açıklamalar ve form kullanılabilir',lambda:tour_failure(True))
    check('3D tur: ileri/geri, hareket tercihi, form korunması ve bağlam kaybı',tour)
    browser.close()

(out/'sonuc.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
raise SystemExit(any(r['durum']!='geçti' for r in results))
