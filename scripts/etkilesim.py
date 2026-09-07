#!/usr/bin/env python3
"""Yerel etkileşim QA: python3 scripts/etkilesim.py --url http://127.0.0.1:3100
Gereken: Python Playwright + Chromium. Form POST'ları yakalanır; dışarı veri gönderilmez.
"""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--url', default='http://127.0.0.1:3100')
parser.add_argument('--cikti', default='.qa/etkilesim')
parser.add_argument('--mobil', action='store_true', help='Ek mobil menü regresyonunu da çalıştır')
args = parser.parse_args()
root = args.url.rstrip('/')
out = Path(args.cikti)
out.mkdir(parents=True, exist_ok=True)
results = []


def check(name, run):
    try:
        run()
        results.append({'kontrol': name, 'durum': 'geçti'})
    except Exception as error:
        results.append({'kontrol': name, 'durum': 'kaldı', 'hata': str(error)})
    print(json.dumps(results[-1], ensure_ascii=False), flush=True)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    def context(**kwargs):
        ctx = browser.new_context(**kwargs)
        # Dış ağ istekleri hiçbir testte gerçek servise ulaşmaz.
        ctx.route('**/*', lambda route: route.continue_() if
                  urlparse(route.request.url).netloc == urlparse(root).netloc
                  else route.abort())
        return ctx

    def menu():
        ctx = context(viewport={'width': 390, 'height': 844})
        page = ctx.new_page()
        page.goto(root + '/menu/', wait_until='networkidle')
        opener = page.get_by_role('button', name='Menüyü aç', exact=True)
        opener.click()
        dialog = page.get_by_role('dialog', name='Gezinme')
        expect(dialog).to_be_visible()
        assert dialog.evaluate('(e)=>e.matches(":modal")'), 'Arka plan modal olarak kapanmadı'
        first = dialog.get_by_role('button', name='Menüyü kapat')
        last = dialog.get_by_role('link').last
        first.focus()
        page.keyboard.press('Shift+Tab')
        if not last.evaluate('(e)=>e===document.activeElement'):
            page.keyboard.press('Shift+Tab')
        expect(last).to_be_focused()
        page.keyboard.press('Tab')
        # Yerleşik dialog tarayıcı chrome'una bir Tab durağı bırakabilir, arka sayfaya değil.
        if not first.evaluate('(e)=>e===document.activeElement'):
            page.keyboard.press('Tab')
        expect(first).to_be_focused()
        page.keyboard.press('Escape')
        expect(dialog).not_to_be_visible()
        expect(opener).to_be_focused()
        opener.click()
        dialog.get_by_role('link', name='Menü', exact=True).click()
        expect(opener).to_have_attribute('aria-expanded', 'false')
        opener.click()
        page.set_viewport_size({'width': 1440, 'height': 900})
        expect(dialog).not_to_be_visible()
        assert page.locator('body').evaluate('(e)=>getComputedStyle(e).overflow') != 'hidden'
        page.set_viewport_size({'width': 844, 'height': 390})
        opener.click()
        last.scroll_into_view_if_needed()
        box = last.bounding_box()
        assert box['y'] >= 0 and box['y'] + box['height'] <= 391
        page.screenshot(path=str(out / 'mobil-menu-yatay.png'))
        last.click()
        expect(dialog).not_to_be_visible()
        ctx.close()

    def keyboard():
        ctx = context(viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        page.goto(root + '/subeler/', wait_until='networkidle')
        page.keyboard.press('Tab')
        expect(page.get_by_role('link', name='İçeriğe geç')).to_be_focused()
        page.keyboard.press('Enter')
        assert page.url.endswith('#icerik')
        konya = page.get_by_role('button', name='Konya', exact=True)
        konya.focus()
        assert konya.evaluate('(e)=>getComputedStyle(e).outlineStyle') != 'none'
        konya.press('Enter')
        expect(konya).to_have_attribute('aria-pressed', 'true')
        assert 'il=42' in page.url
        expect(page.locator('#liste h2')).to_contain_text('Konya')
        konya.press('Space')
        expect(konya).to_have_attribute('aria-pressed', 'false')
        assert 'il=' not in page.url
        page.evaluate('window.scrollTo(0,1200)')
        page.wait_for_timeout(600)
        page.locator('header a').first.focus()
        page.wait_for_timeout(600)
        box = page.locator('header a').first.bounding_box()
        assert box['y'] >= 0, 'Klavye odağı gizlenen başlıkta ekran dışında kaldı'
        ctx.close()

    def anatomy():
        ctx = context(viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        page.goto(root + '/', wait_until='networkidle')
        cta = page.locator('#anatomi a').first
        assert cta.evaluate('(e)=>!!e.closest("[inert]")')
        def scroll_to(progress):
            page.locator('#anatomi').evaluate('(e,p)=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p)', progress)
        scroll_to(0.98)
        expect(cta.locator('..')).to_have_attribute('aria-hidden', 'false')
        cta.focus()
        expect(cta).to_be_focused()
        scroll_to(0.3)
        expect(cta.locator('..')).to_have_attribute('inert', '')
        ctx.close()

    def nojs():
        ctx = context(java_script_enabled=False, viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        for path in ['/', '/menu/', '/subeler/', '/hakkimizda/', '/iletisim/', '/kvkk/', '/franchise/']:
            page.goto(root + path, wait_until='networkidle')
            expect(page.locator('h1')).to_be_visible()
            assert page.locator('[data-reveal]').evaluate_all(
                '(els)=>els.every(e=>getComputedStyle(e).opacity==="1")')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
        summary = page.locator('#sss summary').first
        summary.click()
        assert page.locator('#sss details').first.get_attribute('open') is not None
        summary.press('Enter')
        assert page.locator('#sss details').first.get_attribute('open') is None
        page.goto(root + '/subeler/', wait_until='networkidle')
        assert page.locator('#liste [id^="il-"]').count() == 25
        assert page.get_by_role('button', name='Konya', exact=True).locator('path').evaluate(
            '(e)=>getComputedStyle(e).opacity') == '1'
        ctx.close()

    def form(js, kind):
        ctx = context(java_script_enabled=js, reduced_motion='reduce', viewport={'width': 1440, 'height': 900})
        posts = []
        fail = [js]
        def receive(route):
            posts.append({'method': route.request.method, 'body': route.request.post_data})
            if fail[0]:
                fail[0] = False
                route.fulfill(status=503, content_type='application/json', body='{}')
            else:
                route.fulfill(status=200, content_type='application/json' if js else 'text/html; charset=utf-8',
                              body='{"ok":true}' if js else '<h1>Yerel POST alındı</h1>')
        ctx.route('https://formspree.io/**', receive)
        page = ctx.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(root + ('/franchise/' if kind == 'franchise' else '/iletisim/?k=kurumsal'), wait_until='networkidle')
        form_el = page.locator('form')
        form_el.locator('button[type=submit]').click()
        assert not posts, 'Boş form gönderildi'
        form_el.locator('[name=ad]').fill('Yerel QA')
        form_el.locator('[name=telefon]').fill('05000000000')
        form_el.locator('[name=il]' if kind == 'franchise' else '[name=sehir]').fill('Konya')
        if kind == 'franchise':
            form_el.locator('[name=metrekare]').fill('50')
        elif js:
            expect(form_el.locator('[name=konu_detay]')).to_have_value('kurumsal')
        form_el.locator('[name=kvkk]').check()
        expect(form_el.locator('[name=ileti]')).not_to_be_checked()
        form_el.locator('button[type=submit]').click()
        if js:
            expect(form_el.get_by_role('alert')).to_contain_text('Gönderilemedi')
            expect(form_el.locator('[name=ad]')).to_have_value('Yerel QA')
            form_el.locator('button[type=submit]').click()
            expect(page.get_by_role('status')).to_contain_text('alındı')
        else:
            expect(page.get_by_role('heading', name='Yerel POST alındı')).to_be_visible()
        assert posts and all(r['method'] == 'POST' for r in posts)
        assert not errors, errors
        ctx.close()

    if args.mobil:
        check('Mobil menü: odak, Esc, aynı sayfa, boyut değişimi, yatay ekran', menu)
    check('Klavye: içeriğe geç, harita Enter/Space, başlık odağı', keyboard)
    check('Masaüstü Anatomi: CTA yalnız görünürken etkileşimli', anatomy)
    check('JavaScript kapalı: 7 sayfa, SSS, 25 il ve harita görünürlüğü', nojs)
    for kind in ['franchise', 'iletisim']:
        for js in [True, False]:
            check(f'{kind} formu JS={js}: doğrulama ve yerel POST', lambda js=js, kind=kind: form(js, kind))
    browser.close()

(out / 'sonuc.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
raise SystemExit(any(r['durum'] != 'geçti' for r in results))
