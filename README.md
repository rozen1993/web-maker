# Kit de webs con Astro, Tailwind y SEO completo

Convierte tu idea en una web con contenido, diseño, SEO y verificaciones. Admite servicios, portfolios, blogs, catálogos, tiendas, directorios y reservas combinados según el proyecto.

**Empieza en [EMPEZAR.md](EMPEZAR.md).** Clona o descarga el kit una vez. Para cada web ejecuta desde su raíz:

```sh
node iniciar.mjs
```

Necesitas **Node 20 o superior**. El iniciador hace una pregunta cada vez, guarda el proyecto en `proyectos/<nombre>/` e intenta abrir Codex CLI con **GPT-6.1 Sol / high**. La entrevista es código local: no utiliza IA ni compra datos. Para continuar en el chat del IDE:

```sh
node iniciar.mjs --solo-preparar
```

Pega allí el mensaje de `INICIAR-CODEX.md`. No necesitas editar JSON, elegir subskills ni escribir un megaprompt.

## El recorrido

1. **Entrevista y meta inicial:** Sol concreta público, páginas, cantidades, funciones, contenido y criterios de entrega en `META.md`.
2. **Exploración pequeña y presupuesto:** con fuentes gratuitas y, solo si autorizaste, un cupo mínimo de DataForSEO, Sol identifica qué investigación necesita el proyecto y contrasta preliminarmente tu idea con lo que busca la gente. Presenta `PRESUPUESTO-SEO.md` con hipótesis, coste adicional máximo y total acumulado. **Tú apruebas expresamente esa propuesta antes de la investigación principal.**
3. **SEO y contenido completos:** Sol aplica la skill `seo` de AgriciDaniel, evalúa sus **26 subskills** y ejecuta los procedimientos completos que correspondan. Registra trabajo, evidencia y pendientes en `SEO-COBERTURA.md`; no reduce la investigación a una selección básica por defecto. Antes de redactar y diseñar, entrega en `SEO-STRATEGY.md` un diagnóstico de la idea original, oportunidades del sector, recomendación concreta, páginas y contenido para captar búsquedas pertinentes, y estimación condicionada a los datos disponibles. Los ajustes editoriales dentro del alcance se registran; un cambio material de oferta, público o negocio lo decides tú expresamente.
4. **Tres homepages A/B/C:** **GPT-6 Astra / ultra** prepara mockups reales, distintos en composición, tipografía y lenguaje visual, comprobados en navegador en escritorio y móvil. Añade una vista interior representativa cuando ayude a decidir. **Tú eliges A, B, C o una combinación concreta.**
5. **Toda la web:** Astra ultra desarrolla la dirección elegida en **Astro + Tailwind CSS**, con TypeScript, componentes y datos centralizados.
6. **Auditoría y entrega:** Sol high realiza la auditoría SEO completa y las pruebas del alcance. Astra ultra corrige defectos de código y diseño hasta cumplir `META.md`; Sol verifica las correcciones. `SEO-STRATEGY.md` incorpora recomendaciones off-page personalizadas y opcionales para que tú decidas si las aplicas.

Hay **dos pausas ordinarias después de la entrevista: presupuesto y elección visual**. El resto avanza dentro de lo autorizado. Un acceso indispensable, modelo no disponible o permiso del entorno se señala como bloqueo concreto y se continúa el trabajo independiente. Si se acordó preview, la entrega es una preview; publicar requiere autorización previa.

La estrategia base busca captar tráfico con contenido útil y SEO del propio sitio, **sin asumir una campaña nueva de enlaces u otras acciones off-page**. La investigación debe explicar qué oportunidad respalda esa estrategia y sus límites; si la evidencia no basta, lo indica antes del diseño. Con datos suficientes, muestra escenarios de clics orgánicos mensuales de Google en los meses 3, 6 y 12; si faltan, registra `no_estimable`, sin inventar cifras. Publicar y completar las skills no acredita tráfico: también es posible obtener cero. El off-page queda como recomendación, sin ejecución ni gasto automático, y no se usa para justificar las cifras del escenario base.

## Qué necesitas

- Node 20+, Codex CLI o Codex en el IDE, herramientas de build y navegador.
- Acceso real a Sol high y Astra ultra, y un cliente que cargue la configuración y permita delegación o traspaso.
- Skills `astro`, `frontend-design` y el sistema `seo` de AgriciDaniel con sus 26 subskills. Son instalaciones externas; el clon no las instala.
- Para datos de pago, MCP DataForSEO y credenciales fuera de Git. La preexploración parte de **USD 0**; **USD 0.10** es una sugerencia que requiere autorización explícita. La investigación principal tiene su presupuesto concreto, aprobado después de explorar; no existe un techo universal de USD 1.

La configuración solicita los modelos, pero no garantiza acceso de tu cuenta ni demuestra cuál ejecutó una tarea. El coordinador registra la selección real por fase y prepara un traspaso si falta soporte. Una tienda, CMS o reservas pueden requerir proveedores y accesos adicionales; no se contratan por crear la ficha. El SEO comprobado no garantiza posiciones ni resultados orgánicos.

## Archivos del kit

| Archivo | Uso |
|---|---|
| [EMPEZAR.md](EMPEZAR.md) | Pasos de uso |
| [iniciar.mjs](iniciar.mjs) | Entrevista y preparación del proyecto |
| [.codex/config.toml](.codex/config.toml) y [.codex/agents/](.codex/agents/) | Sol coordinador; Astra en los roles `disenador` y `desarrollador` |
| [AGENTS.md](AGENTS.md) | Reglas operativas y control de costes |
| [PROMPT-MAESTRO.md](PROMPT-MAESTRO.md) | Mensajes de arranque y continuidad |
| [SEO-COMPLETO.md](SEO-COMPLETO.md) | Cobertura de las 26 subskills y auditoría final |
| [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md) | Módulos y pruebas |
| [SISTEMA-PILOTO.md](SISTEMA-PILOTO.md) | Flujo y presupuesto por proyecto |
| [plantillas/proyecto.json](plantillas/proyecto.json) | Ficha del proyecto |
| [plantillas/PRESUPUESTO-SEO.md](plantillas/PRESUPUESTO-SEO.md) | Propuesta de costes que prepara el coordinador antes de pedir aprobación |
| [plantillas/SEO-STRATEGY.md](plantillas/SEO-STRATEGY.md) | Oportunidad orgánica, escenarios fundamentados y recomendaciones off-page opcionales |

Conserva `.codex/` al clonar. La [guía PDF](output/pdf/guia-de-uso.pdf) se genera desde `EMPEZAR.md` con `python scripts/generar_guia_pdf.py`; vuelve a generarla cuando cambie esa guía.

## Un kit, varios proyectos privados

Cada web conserva ficha, meta, contenido, presupuesto, estrategia, cobertura SEO y código propios en `proyectos/<nombre>/`. Las webs pueden tener repositorios propios. `proyectos/`, `.control/`, `.seo-cache/`, credenciales y evidencias privadas quedan fuera de Git: respáldalos por separado.

Para una cartera nueva, el registro es `.control/dataforseo.jsonl`, resuelto desde la raíz del kit. Al trasladar una cartera, vincula o restaura su registro privado completo y reconcílialo antes de pagar. **Un clon no reinicia autorizaciones, gasto ni reservas.** Sol es el único comprador; los demás agentes solicitan y reutilizan datasets. Estas reglas no son un bloqueo técnico del MCP ni un límite configurado en el proveedor.
