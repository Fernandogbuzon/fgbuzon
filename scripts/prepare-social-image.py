"""Produce the social card SVG using actual Geist outlines, never system fonts.

Requires fonttools==4.61.1 and brotli==1.2.0. Called by prepare-social-image.mjs.
"""

from html import escape
from pathlib import Path
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "dist/assets/geist-latin.woff2"
BG, INK, GREEN = "#f6f5f0", "#102019", "#16794f"


def text_paths(text, x, baseline, size, weight, tracking=0, green_period=False):
    font = instantiateVariableFont(TTFont(FONT), {"wght": weight}, inplace=True)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    units = font["head"].unitsPerEm
    scale = size / units
    paths, advance = [], 0
    for char in text:
        if ord(char) not in cmap:
            raise ValueError(f"Geist is missing character {char!r}")
        glyph = glyphs[cmap[ord(char)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        color = GREEN if green_period and char == "." else INK
        if green_period and char == ".":
            bounds = BoundsPen(glyphs)
            glyph.draw(bounds)
            left, bottom, right, top = bounds.bounds
            paths.append(
                f'<circle fill="{GREEN}" cx="{advance + (left + right) / 2:.3f}" '
                f'cy="{(bottom + top) / 2:.3f}" r="{(right - left) / 2:.3f}"/>'
            )
        elif pen.getCommands():
            paths.append(
                f'<path fill="{color}" transform="translate({advance:.3f} 0)" '
                f'd="{pen.getCommands()}"/>'
            )
        advance += glyph.width + tracking * units
    if x + (advance - tracking * units) * scale > 1116:
        raise ValueError(f"Text exceeds the social-card safe area: {text}")
    return (
        f'<g aria-label="{escape(text, quote=True)}" '
        f'transform="translate({x} {baseline}) scale({scale} {-scale})">'
        + "".join(paths)
        + "</g>"
    )


svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" '
    'viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">'
    '<title id="title">FG Buzón · Webs y herramientas de gestión</title>'
    '<desc id="desc">Fernando · Sanlúcar de Barrameda</desc>'
    f'<rect width="1200" height="630" fill="{BG}"/>'
    + text_paths("fgbuzon.", 84, 206, 152, 750, -0.07, True)
    + text_paths("Webs y herramientas", 84, 348, 62, 500, -0.025)
    + text_paths("de gestión", 84, 420, 62, 500, -0.025)
    + text_paths("Fernando · Sanlúcar de Barrameda", 87, 543, 27, 400)
    + "</svg>\n"
)
sys.stdout.buffer.write(svg.encode("utf-8"))
