"""Genera la guia solicitada sin red ni consultas de pago.

Uso: python scripts/generar_guia_pdf.py
Dependencia: reportlab. Busca fuentes del sistema; admite Windows y Linux.
"""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable, KeepTogether, PageBreak, Paragraph, Preformatted,
    SimpleDocTemplate, Spacer, Table, TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
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
styles.add(ParagraphStyle("BodyGuide", fontName=REGULAR, fontSize=10.5, leading=15,
                          textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle("SmallGuide", parent=styles["BodyGuide"], fontSize=8.6,
                          leading=12, textColor=MUTED, spaceAfter=6))
styles.add(ParagraphStyle("TitleGuide", fontName=BOLD, fontSize=27, leading=32,
                          textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle("StepGuide", fontName=BOLD, fontSize=15, leading=19,
                          textColor=ACCENT, spaceBefore=13, spaceAfter=8, keepWithNext=True))
styles.add(ParagraphStyle("CodeGuide", fontName=MONO, fontSize=8.6, leading=12,
                          textColor=INK, alignment=TA_LEFT))
styles.add(ParagraphStyle("BulletGuide", parent=styles["BodyGuide"], leftIndent=11,
                          firstLineIndent=-9, spaceAfter=4))


def paragraph(text, style="BodyGuide"):
    return Paragraph(text, styles[style])


def path_line(text):
    return paragraph(escape(text), "SmallGuide")


def code_box(text):
    block = Preformatted(text, styles["CodeGuide"])
    box = Table([[block]], colWidths=[174 * mm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 11),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
    ]))
    return box


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(BORDER)
    canvas.line(18 * mm, 16 * mm, width - 18 * mm, 16 * mm)
    canvas.setFont(REGULAR, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 11 * mm, "PLAN  /  Guía de uso  /  Astro + Tailwind")
    canvas.drawRightString(width - 18 * mm, 11 * mm, f"{doc.page}")
    canvas.restoreState()


PROMPT = """Quiero iniciar el proyecto cafe-ejemplo.

Lee las instrucciones de C:/Users/MARCO/Desktop/PLAN/AGENTS.md
y PERFILES-Y-CALIDAD.md.

Quiero una tienda online de café para compradores de Perú,
en español, con pago en línea y un blog con guías de café.
Todavía no tengo elegido el proveedor de pagos.

Construye en Astro + Tailwind.
Usa mis skills SEO de agricidaniel.
Producción con GPT-6.1 Sol y diseño con GPT-6 Astra high.

Autorizo hasta US$1 total de DataForSEO para la investigación
inicial, siguiendo los límites del sistema.

Crea la carpeta del proyecto y completa tú la ficha.
Hazme como máximo tres preguntas por turno.
Cuando la vista previa funcione, dame el enlace para verla.
Empieza por las preguntas que falten."""


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4,
                            leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=18 * mm, bottomMargin=23 * mm,
                            title="Guía de uso del sistema web + SEO",
                            author="PLAN", subject="Procedimiento de Codex, Astro y Tailwind",
                            pageCompression=1)
    story = [
        paragraph("GUÍA PRÁCTICA · 9 OCTUBRE 2026", "SmallGuide"),
        paragraph("Cómo usar el sistema<br/>web + SEO", "TitleGuide"),
        paragraph("Lo que hemos preparado es un <b>conjunto de instrucciones para que Codex construya las webs siguiendo un mismo procedimiento</b>. Todavía no hay una aplicación con botones ni una web creada."),
        paragraph("Está en esta carpeta de tu computadora:"),
        path_line(r"C:\Users\MARCO\Desktop\PLAN"),
        paragraph("<b>Ya puedes utilizarlo desde el chat de Codex abierto en esa carpeta.</b> AGENTS.md contiene las instrucciones para la IA. La guía para ti es EMPEZAR.md; no necesitas leer todos los archivos ni rellenar el JSON."),
        paragraph("1. Escribe qué web quieres", "StepGuide"),
        paragraph("Este es un ejemplo ficticio de una tienda de café con blog. Pega el mensaje <b>en el chat de Codex, no en la terminal</b>."),
        code_box(PROMPT),
        Spacer(1, 8),
        paragraph("Puedes cambiar café por cualquier idea. El ejemplo no se ha ejecutado. La autorización de gasto se aplicaría cuando envíes el mensaje para iniciar el proyecto.", "SmallGuide"),
        PageBreak(),
        paragraph("DEL ENCARGO A LA WEB", "SmallGuide"),
        paragraph("2. Responde las preguntas", "StepGuide"),
        paragraph("Codex te hará preguntas concretas, por ejemplo:"),
        paragraph("- ¿Qué productos y precios tendrá?", "BulletGuide"),
        paragraph("- ¿A qué zonas enviarás los pedidos?", "BulletGuide"),
        paragraph("- ¿Tienes nombre, fotografías o referencias visuales?", "BulletGuide"),
        paragraph("Responde con lo que sabes. Si algo falta, di «todavía no lo tengo». Codex guarda las respuestas y organiza el proyecto. Tú no necesitas decidir qué subskill ejecutar."),
        paragraph("3. Revisa el contenido y elige el diseño", "StepGuide"),
        paragraph("En este ejemplo, Codex identifica dos módulos: <b>tienda + blog</b>. Investiga dentro del presupuesto, propone las páginas y prepara sus textos."),
        paragraph("Al llegar al diseño, utiliza Astra high si puede delegarlo; de lo contrario, te indica que selecciones ese modelo para continuar. Te presenta dos direcciones visuales. Puedes responder:"),
        paragraph("<b>«Elijo la opción B. Mantén esa tipografía, pero utiliza las fotografías de la opción A».</b>"),
        paragraph("Esa decisión queda guardada."),
        paragraph("4. Abre el enlace y revisa la web", "StepGuide"),
        paragraph("Sol implementa la web en Astro + Tailwind. Cuando haya iniciado y comprobado la vista previa, te entregará su <b>dirección real</b>. Abre ese enlace en el navegador y pide los ajustes que necesites:"),
        paragraph("<b>«En móvil, aumenta el tamaño del texto de los productos».</b>"),
        paragraph("Para este ejemplo, el código quedaría en:"),
        path_line(r"C:\Users\MARCO\Desktop\PLAN\proyectos\cafe-ejemplo\sitio"),
        paragraph("Esa carpeta se creará al comenzar el proyecto."),
        paragraph("5. Recibe la entrega comprobada", "StepGuide"),
        paragraph("Codex debe mostrarte <b>qué funciona, qué falta, cuánto gastó en datos y cómo editar el contenido</b>. En una tienda también comprueba el pedido y el pago en modo de prueba. Una integración pendiente queda indicada."),
        paragraph("Para continuar otro día, escribe:"),
        code_box("Retoma proyectos/cafe-ejemplo.\nLee su estado y continúa la siguiente tarea.\nConserva las decisiones y el presupuesto acumulado."),
        Spacer(1, 10),
        paragraph("Para empezar, describe en el chat la primera web que quieras crear. El procedimiento y los archivos los maneja Codex."),
    ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
