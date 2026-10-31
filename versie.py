#!/usr/bin/env python3
"""Zet achter elk eigen script en stylesheet een versienummer (?v=...).

Het nummer is een korte hash van de inhoud van het bestand. Verandert een
bestand, dan verandert het nummer, en haalt de browser meteen de nieuwe
versie op in plaats van een oude uit de cache.

Draai dit vóór elke commit waarin een .js- of .css-bestand is veranderd:
    python3 versie.py
"""
import hashlib
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
# src="iets.js" of href="iets.css", met of zonder ?v=..., maar geen http(s)-adressen
LINK = re.compile(r'((?:src|href)=")(?!https?:|//)([^"?#]+\.(?:js|css))(?:\?v=[0-9a-f]*)?(")')


def html_bestanden():
    uit = subprocess.run(['git', 'ls-files', '*.html'], cwd=ROOT, capture_output=True, text=True, check=True)
    return [ROOT / p for p in uit.stdout.split()]


def zet_versies(html):
    tekst = html.read_text(encoding='utf-8')

    def vervang(m):
        doel = html.parent / m.group(2)
        if not doel.exists():
            return m.group(0)
        versie = hashlib.sha1(doel.read_bytes()).hexdigest()[:8]
        return f'{m.group(1)}{m.group(2)}?v={versie}{m.group(3)}'

    nieuw = LINK.sub(vervang, tekst)
    if nieuw != tekst:
        html.write_text(nieuw, encoding='utf-8')
        return True
    return False


if __name__ == '__main__':
    for html in html_bestanden():
        if zet_versies(html):
            print(f'versies bijgewerkt: {html.relative_to(ROOT)}')
