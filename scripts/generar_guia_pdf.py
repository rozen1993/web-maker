"""Genera la guía PDF desde EMPEZAR.md sin consultar servicios externos.

Uso: python scripts/generar_guia_pdf.py (requiere reportlab).
"""

import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Preformatted, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "EMPEZAR.md"
OUTPUT = ROOT / "output" / "pdf" / "guia-de-uso.pdf"
INK = colors.HexColor("#173236")
MUTED = colors.HexColor("#506265")
ACCENT = colors.HexColor("#087F78")
LIGHT = colors.HexColor("#EFF5F4")
BORDER = colors.HexColor("#D1DFDC")


def register_fonts():
    candidates = [
        (Path("C:/Windows/Fonts"), "segoeui.ttf", "segoeuib.ttf", "consola.ttf"),
        (Path("/usr/share/fonts/truetype/dejavu"), "DejaVuSans.ttf", "DejaVuSans-Bold.ttf", "DejaVuSansMono.ttf"),
    ]
    for directory, normal, bold, mono in candidates:
        if all((directory / name).is_file() for name in (normal, bold, mono)):
            for label, name in (("Guide", normal), ("GuideBold", bold), ("GuideMono", mono)):
                pdfmetrics.registerFont(TTFont(label, str(directory / name)))
            pdfmetrics.registerFontFamily("Guide", normal="Guide", bold="GuideBold")
            return "Guide", "GuideBold", "GuideMono"
    return "Helvetica", "Helvetica-Bold", "Courier"


REGULAR, BOLD, MONO = register_fonts()
styles = getSampleStyleSheet()
styles.add(ParagraphStyle("BodyGuide", fontName=REGULAR, fontSize=10, leading=14,
                          textColor=INK, spaceAfter=6, allowWidows=0, allowOrphans=0))
styles.add(ParagraphStyle("SmallGuide", parent=styles["BodyGuide"], fontSize=8.6,
                          leading=12, textColor=MUTED, spaceAfter=6))
styles.add(ParagraphStyle("TitleGuide", fontName=BOLD, fontSize=25, leading=29,
                          textColor=INK, spaceAfter=12))
styles.add(ParagraphStyle("StepGuide", fontName=BOLD, fontSize=15, leading=19,
                          textColor=ACCENT, spaceBefore=13, spaceAfter=8, keepWithNext=True))
styles.add(ParagraphStyle("CodeGuide", fontName=MONO, fontSize=8.5, leading=12,
                          textColor=INK, alignment=TA_LEFT))
styles.add(ParagraphStyle("BulletGuide", parent=styles["BodyGuide"], leftIndent=12,
                          firstLineIndent=-10, spaceAfter=5))


TOKEN = re.compile(r"(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))")
LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def rich(text):
    pieces = []
    for piece in TOKEN.split(text):
        match = LINK.fullmatch(piece)
        if piece.startswith("**") and piece.endswith("**"):
            pieces.append(f"<b>{escape(piece[2:-2])}</b>")
        elif piece.startswith("`") and piece.endswith("`"):
            pieces.append(f'<font name="{MONO}">{escape(piece[1:-1])}</font>')
        elif match:
            label, path = match.groups()
            pieces.append(f"<b>{escape(label)}</b> ({escape(path)})")
        else:
            pieces.append(escape(piece))
    return "".join(pieces)


def code_box(text):
    box = Table([[Preformatted(text, styles["CodeGuide"])]], colWidths=[174 * mm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return box


def story_from_markdown(markdown):
    lines = markdown.splitlines()
    story = [Paragraph("GUÍA PRÁCTICA / EMPEZAR.md", styles["SmallGuide"])]
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        if not line:
            index += 1
            continue
        if line.startswith("```"):
            if story and isinstance(story[-1], Paragraph):
                story[-1].keepWithNext = True
            code = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code.append(lines[index])
                index += 1
            story.extend([code_box("\n".join(code)), Spacer(1, 8)])
            index += 1
            continue
        if line.startswith("## "):
            story.append(Paragraph(rich(line[3:]), styles["StepGuide"]))
        elif line.startswith("# "):
            story.append(Paragraph(rich(line[2:]), styles["TitleGuide"]))
        elif line.startswith("- "):
            story.append(Paragraph("- " + rich(line[2:]), styles["BulletGuide"]))
        else:
            group = [line]
            while index + 1 < len(lines):
                following = lines[index + 1].strip()
                if not following or following.startswith(("#", "- ", "```")):
                    break
                index += 1
                group.append(following)
            story.append(Paragraph(rich(" ".join(group)), styles["BodyGuide"]))
        index += 1
    return story


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(BORDER)
    canvas.line(18 * mm, 16 * mm, width - 18 * mm, 16 * mm)
    canvas.setFont(REGULAR, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 11 * mm, "PLAN / Guía de uso / Astro + Tailwind")
    canvas.drawRightString(width - 18 * mm, 11 * mm, f"{doc.page}")
    canvas.restoreState()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4,
                            leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=18 * mm, bottomMargin=23 * mm,
                            title="Empieza una web desde la terminal | PLAN",
                            author="PLAN", subject="Guía generada desde EMPEZAR.md",
                            pageCompression=1)
    story = story_from_markdown(SOURCE.read_text(encoding="utf-8-sig"))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
