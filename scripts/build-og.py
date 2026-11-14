#!/usr/bin/env python3
"""Generates public/og-en.png and public/og-es.png, the link-preview cards, with the site's own fonts and tokens.

Needs Pillow and node_modules; deliberately outside the npm build because the card only
changes when the home headline (src/i18n.ts, home.h1) or the palette does.

    python3 scripts/build-og.py
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FS = ROOT / 'node_modules'
PAPER, INK, MUTED, ACCENT = '#FFFFFF', '#0B0B0B', '#5A5A55', '#c83a00'
W, H = 1200, 630


def archivo(size, weight, width):
    f = ImageFont.truetype(str(FS / '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'), size)
    f.set_variation_by_axes([weight, width])
    return f


mono = ImageFont.truetype(str(FS / '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'), 24)
CARDS = {
    'en': (('Your AI. Your rules.', 'Your machine.'), 'AI for individuals and small businesses'),
    'es': (('Tu IA. Tus reglas.', 'Tu máquina.'), 'IA para personas y pequeños negocios'),
}
for lang, (lines, foot) in CARDS.items():
    img = Image.new('RGB', (W, H), PAPER)
    d = ImageDraw.Draw(img)
    d.text((72, 64), 'MDIB', font=archivo(44, 900, 115), fill=INK)
    d.text((232, 80), 'MACHINES DO IT BETTER', font=mono, fill=MUTED)
    head = archivo(100, 900, 108)
    d.text((66, 170), lines[0], font=head, fill=INK)
    d.text((66, 272), lines[1], font=head, fill=INK)
    d.rectangle((72, 420, 252, 436), fill=ACCENT)
    d.rectangle((0, H - 110, W, H - 106), fill=INK)
    d.text((72, H - 72), foot, font=mono, fill=INK)
    img.save(ROOT / 'public' / f'og-{lang}.png', optimize=True)
    print(f'public/og-{lang}.png')
