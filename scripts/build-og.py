#!/usr/bin/env python3
"""Generates the static images the site ships, with the site's own fonts and tokens:
- public/og-en.png and public/og-es.png, the link-preview cards (home headline);
- public/plate-machine.png, the one dithered illustration (a small machine: "your own hardware"), 1-bit,
  ordered (Bayer 8x8) dithering, black on white. Static on purpose: nothing on the site animates but diagram lines.

Needs Pillow and node_modules; deliberately outside the npm build because these only change when the home
headline (src/i18n.ts, home.h1) or the palette does.

    python3 scripts/build-og.py
"""
import math
import pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FS = ROOT / 'node_modules'
PAPER, INK, MUTED, ACCENT, LINE = '#FFFFFF', '#111111', '#555550', '#c83a00', '#d9d9d4'
W, H = 1200, 630


def archivo(size, weight, width):
    f = ImageFont.truetype(str(FS / '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'), size)
    f.set_variation_by_axes([weight, width])
    return f


mono = ImageFont.truetype(str(FS / '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'), 22)
CARDS = {
    'en': (('You can’t paste your clients’', 'data into ChatGPT.'), 'PRIVATE AI AGENTS · ACCESS LIST OPEN'),
    'es': (('No puedes pegar los datos de', 'tus clientes en ChatGPT.'), 'AGENTES DE IA PRIVADOS · LISTA DE ACCESO ABIERTA'),
}
for lang, (lines, foot) in CARDS.items():
    img = Image.new('RGB', (W, H), PAPER)
    d = ImageDraw.Draw(img)
    # Dossier frame: hairline rules, a numbered header and a footer line.
    d.rectangle((48, 48, W - 48, H - 48), outline=INK, width=2)
    d.line((48, 120, W - 48, 120), fill=INK, width=1)
    d.text((76, 70), 'MDIB', font=archivo(36, 800, 100), fill=INK)
    d.text((196, 80), 'MACHINES DO IT BETTER', font=mono, fill=MUTED)
    d.text((W - 160, 80), 'FIG. 00', font=mono, fill=MUTED)
    head = archivo(70, 700, 100)
    d.text((74, 190), lines[0], font=head, fill=INK)
    d.text((74, 274), lines[1], font=head, fill=INK)
    d.rectangle((76, 392, 156, 396), fill=ACCENT)
    d.line((48, H - 120, W - 48, H - 120), fill=INK, width=1)
    d.text((76, H - 96), foot, font=mono, fill=INK)
    img.save(ROOT / 'public' / f'og-{lang}.png', optimize=True)
    print(f'public/og-{lang}.png')

# ---------- The dithered plate: an isometric mini PC, shaded, then ordered-dithered to 1 bit ----------
PW, PH = 240, 200


def bayer(n):
    if n == 1:
        return [[0]]
    m = bayer(n // 2)
    k = n // 2
    return [[4 * m[y % k][x % k] + [[0, 2], [3, 1]][y // k][x // k] for x in range(n)] for y in range(n)]


B = bayer(8)
grey = Image.new('L', (PW, PH), 255)
g = ImageDraw.Draw(grey)
cx, cy, s = PW / 2, 64, 1.0
# Isometric box: top, left and right faces (a small computer, about 2:2:1).
def iso(x, y, z):
    return (cx + (x - y) * 0.866 * s, cy + (x + y) * 0.5 * s - z * s)
a, b, h = 92, 92, 46
top = [iso(0, 0, h), iso(a, 0, h), iso(a, b, h), iso(0, b, h)]
left = [iso(0, b, h), iso(a, b, h), iso(a, b, 0), iso(0, b, 0)]
right = [iso(a, 0, h), iso(a, b, h), iso(a, b, 0), iso(a, 0, 0)]
# Shade each face with a soft gradient so the dither has something to say.
for face, (v0, v1) in ((top, (215, 182)), (left, (138, 96)), (right, (62, 30))):
    mask = Image.new('L', (PW, PH), 0)
    ImageDraw.Draw(mask).polygon(face, fill=255)
    ys = [p[1] for p in face]
    y0, y1 = min(ys), max(ys)
    grad = Image.new('L', (PW, PH))
    grad.putdata([int(v0 + (v1 - v0) * max(0, min(1, (y - y0) / max(1, y1 - y0)))) for y in range(PH) for _ in range(PW)])
    grey.paste(grad, (0, 0), mask)
# Front details: a vent and a status light on the left face.
for i in range(4):
    q0 = iso(18 + i * 10, b, 30)
    q1 = iso(18 + i * 10, b, 14)
    g.line((q0, q1), fill=60, width=2)
led = iso(78, b, 24)
g.ellipse((led[0] - 3, led[1] - 3, led[0] + 3, led[1] + 3), fill=255)
# Soft cast shadow on the "table".
shadow = Image.new('L', (PW, PH), 0)
sd = ImageDraw.Draw(shadow)
base = [iso(0, b, 0), iso(a, b, 0), iso(a, 0, 0), (iso(a, 0, 0)[0] + 26, iso(a, 0, 0)[1] + 14), (iso(a, b, 0)[0] + 26, iso(a, b, 0)[1] + 14), (iso(0, b, 0)[0] + 26, iso(0, b, 0)[1] + 14)]
sd.polygon(base, fill=255)
shade = Image.new('L', (PW, PH), 205)
grey.paste(shade, (0, 0), Image.composite(shadow, Image.new('L', (PW, PH), 0), Image.eval(grey, lambda v: 255 if v == 255 else 0)))
px = grey.load()
out = Image.new('1', (PW, PH), 1)
op = out.load()
for y in range(PH):
    for x in range(PW):
        op[x, y] = 1 if px[x, y] / 255 > (B[y % 8][x % 8] + 0.5) / 64 else 0
out.save(ROOT / 'public' / 'plate-machine.png', optimize=True)
print('public/plate-machine.png')
