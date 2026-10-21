#!/usr/bin/env python3
"""Generates public/og.png, the link-preview card, with the site's own fonts and tokens.

Needs Pillow and node_modules; deliberately outside the npm build because the card only
changes when the headline or the palette does.

    python3 scripts/build-og.py
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FS = ROOT / 'node_modules'
PAPER, INK, MUTED, ACCENT = '#F3F2EE', '#121211', '#55544F', '#FF5A1F'
W, H = 1200, 630


def archivo(size, weight, width):
    f = ImageFont.truetype(str(FS / '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'), size)
    f.set_variation_by_axes([weight, width])
    return f


mono = ImageFont.truetype(str(FS / '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'), 24)
img = Image.new('RGB', (W, H), PAPER)
d = ImageDraw.Draw(img)
d.text((72, 64), 'MDIB', font=archivo(44, 900, 115), fill=INK)
d.text((232, 80), 'MACHINES DO IT BETTER', font=mono, fill=MUTED)
head = archivo(104, 850, 108)
d.text((68, 200), 'Delega lo que te', font=head, fill=INK)
d.text((68, 300), 'roba la semana.', font=head, fill=INK)
d.rectangle((0, H - 120, W, H), fill=INK)
d.rectangle((W - 120, H - 120, W, H), fill=ACCENT)
d.text((72, H - 76), 'Agentes personales de IA · diagnóstico gratuito', font=mono, fill=PAPER)
img.save(ROOT / 'public' / 'og.png', optimize=True)
print('public/og.png')
