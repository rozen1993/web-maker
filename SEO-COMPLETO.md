# SEO completo con AgriciDaniel

Este protocolo utiliza la skill principal `seo` y sus **26 subskills**, cuyo catálogo y versión **1.9.6** se comprobaron en la instalación local el 10/10/2026. Las skills son externas al repositorio: descubrir su ubicación en el catálogo del entorno y leer sus `SKILL.md`; no asumir rutas personales ni que un clon las instala. Si cambia el catálogo o la versión, registrar la diferencia y actualizar la cobertura del proyecto.

«Completo» exige evaluar todas las disciplinas y ejecutar los procedimientos completos que correspondan al proyecto, con evidencia y límites explícitos. No implica contratar todas las APIs ni generar páginas, mapas o imágenes sin necesidad. La ausencia de acceso no vuelve irrelevante una disciplina.

## Preparación y routing

1. Leer el `SKILL.md` principal de `seo`, su routing, las respuestas, `META.md` y la caché compartida `.seo-cache/`. Registrar fecha y procedencia de datos reutilizados; no presentar una caché como consulta actual.
2. Evaluar **cada una de las 26 subskills** de la tabla. Crear `SEO-COBERTURA.md` con una fila por skill, incluso las que no apliquen.
3. Al cargar una disciplina pertinente, leer su `SKILL.md` y las referencias que ese flujo necesite. Localizar scripts desde la instalación real. No leer todas las referencias al inicio ni inventar comandos slash o capacidades.
4. Ejecutar sus pasos, verificaciones y entregables aplicables; guardar datos originales y resúmenes conforme a `references/shared-data-cache.md` de la instalación. En `ESTADO.md`, enlazar esos artefactos y resumir decisiones sin duplicar informes.
5. Sol high coordina SEO, investigación, contenido y QA. Los especialistas pueden trabajar en paralelo con datos compartidos; **solo Sol compra DataForSEO** y escribe reservas/costes. Sin slots suficientes, ejecutar las mismas disciplinas secuencialmente.

### Matriz por proyecto

Encabezado de `SEO-COBERTURA.md`: proyecto, fecha, versión/catálogo descubierto, entorno/URL, módulos, modelos reales y límites de evidencia. Columnas obligatorias:

| Skill | Motivo y aplica | Fase | Trabajo previsto o realizado | Evidencia | Estado |
|---|---|---|---|---|---|
| Una fila por cada entrada del catálogo | Sí/no y razón del proyecto | Exploración / investigación / contenido / construcción / auditoría | Procedimiento y alcance real | Fuente, URL/archivo, fecha y entorno; dependencia si falta | `pendiente` / `completada` / `no_aplica` / `bloqueada` |

- `completada`: el trabajo aplicable terminó con evidencia; mencionar una skill o generar código no lo demuestra.
- `no_aplica`: razón semántica concreta, por ejemplo, un único idioma para hreflang o ausencia de páginas de comparación para competitor-pages.
- `pendiente`: trabajo pertinente aún no ejecutado o evidencia todavía no disponible.
- `bloqueada`: condición concreta que impide continuar, como acceso indispensable o presupuesto no autorizado.

La falta de GSC, GBP, API, dominio público o créditos se registra como pendiente/bloqueo del trabajo que corresponda. Si una parte se comprobó y otra sigue pendiente, describir ambas y conservar el estado pendiente de la fila. Añadir a la matriz los criterios de calidad que necesita esa disciplina.

## Catálogo que debe evaluarse

| Skill | Trabajo y criterio de aplicación |
|---|---|
| `seo-audit` | Auditoría completa final del sitio; también punto de partida de una migración cuando aporte. Seguir todo su protocolo. |
| `seo-page` | Análisis profundo de URLs decisivas o existentes; no sustituye la auditoría completa del conjunto. |
| `seo-technical` | Nueve categorías de SEO técnico, crawlability/indexability y comportamiento del entorno. Siempre en auditoría final. |
| `seo-content` | Contenido, E-E-A-T, profundidad, legibilidad y citabilidad. Preparación editorial y auditoría final. |
| `seo-schema` | Detectar, generar cuando proceda y validar datos estructurados verdaderos. Siempre evaluar en auditoría final, aunque no haya tipos adicionales útiles. |
| `seo-images` | Imágenes, alt, formatos, dimensiones, entrega y riesgos; funciones de SERP/metadata solo si aportan. |
| `seo-sitemap` | Cobertura y calidad de sitemap, URLs y exclusión de borradores/privadas. Siempre en auditoría final. |
| `seo-geo` | Citabilidad, acceso de crawlers de IA y señales de marca. Siempre en auditoría final; comprobación de visibilidad externa separada. |
| `seo-performance` | Rendimiento y CWV: distinguir laboratorio y campo. Siempre en auditoría final. |
| `seo-visual` | Capturas, móvil, above-the-fold y recorridos. Siempre en auditoría final. |
| `seo-plan` | Objetivos, demanda, arquitectura y hoja de ruta de la investigación principal. |
| `seo-programmatic` | Sistemas de páginas generadas a escala; unicidad, index bloat y controles de publicación cuando existan. |
| `seo-competitor-pages` | Comparativas, alternativas o roundups cuando respondan a la oferta y la intención; fuentes y posicionamiento justo. |
| `seo-hreflang` | Idiomas/regiones múltiples; grafo, códigos, canonical y paridad de contenido cuando apliquen. |
| `seo-local` | Negocio local, área de servicio o múltiples ubicaciones; GBP, NAP, citas, reseñas y schema local. |
| `seo-maps` | Necesidad de mapas/visibilidad local; geo-grid, GBP, reseñas y competencia según objetivo y datos disponibles. |
| `seo-google` | GSC, GA4, PSI/CrUX, indexación y otras APIs pertinentes; separar acceso, pruebas y cobertura pública real. |
| `seo-backlinks` | Perfil y autoridad de dominio cuando aporten; fuentes gratuitas y datos premium justificados, sin compras automáticas. |
| `seo-cluster` | Varios temas o arquitectura editorial que necesiten agrupación por solapamiento SERP; no sustituirla por similitud textual. |
| `seo-sxo` | Intención, tipo de página, historias y personas. Siempre en auditoría final; usar en investigación para resolver el recorrido. |
| `seo-drift` | Comparación cuando exista baseline o revisión de cambios; una baseline no activa seguimiento recurrente. |
| `seo-ecommerce` | Catálogo/tienda y necesidades comerciales; schema, productos, marketplaces e inteligencia pertinente, sin activar cobros. |
| `seo-firecrawl` | Descubrimiento/rastreo y renderizado cuando la cobertura lo requiera; conector o créditos ausentes no se inventan. |
| `seo-dataforseo` | Datasets actuales pertinentes de demanda, SERP u otros endpoints, dentro del presupuesto aprobado y con parámetros explícitos. |
| `seo-image-gen` | Evaluación/plan de activos SEO y generación cuando sea útil y esté autorizada; no generar por defecto ni llamar portfolio real a material artificial. |
| `seo-flow` | Evaluar etapas Find → Leverage → Optimize → Win y prompts pertinentes al objetivo; aplicar los seleccionados con evidencia. |

## Exploración, presupuesto e investigación

La exploración previa sirve para estimar qué evidencia necesita el proyecto; no se declara investigación completa. Usa fuentes gratuitas y únicamente el cupo de preexploración autorizado en la ficha. Después presenta `PRESUPUESTO-SEO.md` y espera aprobación explícita de su versión y límites antes de comprar la investigación principal. Procedimiento de costes: [SISTEMA-PILOTO.md](SISTEMA-PILOTO.md) y [AGENTS.md](AGENTS.md).

Cerrada la exploración, congelar compras durante esa espera para conservar la base de gasto/reservas de la propuesta. Después de aprobar, todas las llamadas nuevas consumen su máximo adicional, incluso las que aclaren preguntas de la preexploración.

La propuesta debe justificar datasets, número de consultas, mercados, resultados esperados, incertidumbre, margen incluido, coste adicional máximo y total acumulado con gasto/reservas previos. No existe un USD 1 universal ni una tarifa vigente por copiar ejemplos históricos. La matriz determina la cobertura necesaria; el presupuesto aprobado permite los datos concretos, no una compra por subskill. Si el alcance excede lo aprobado, presentar una ampliación concreta conservando gasto y reservas; continuar el trabajo independiente.

Para DataForSEO, leer contrato/precio vigentes de cada endpoint y descubrir el helper de costes desde la skill instalada. Su check/log no sustituye autorización ni registro de cartera. Los defaults US/English/depth 100 de la subskill **ceden ante el país, idioma, dispositivo y límites explícitos del proyecto**. Declarar granularidad real de ubicación y diferencias entre volumen y SERP. Guardar respuestas originales, fecha, parámetros y coste. Caché: SERP 7 días y volúmenes 30 días; una solicitud de evidencia actual requiere consulta nueva autorizada.

Cubrir una disciplina no obliga a pagar todas sus APIs: utilizar evidencia gratuita válida cuando satisfaga el procedimiento y señalar qué no permite concluir. Nunca sustituir un dato real pedido por una estimación sin identificarla.

## Oportunidad orgánica, estimación y off-page opcional

`seo-plan` prepara `SEO-STRATEGY.md` usando [la plantilla de estrategia](plantillas/SEO-STRATEGY.md). Reutilizar allí los hallazgos de intención, competencia, contenido y autoridad, enlazando los demás entregables de las skills. No crear otro informe equivalente. La exploración solo ofrece indicios en el presupuesto; la investigación principal completa la evaluación antes del diseño y el cierre la contrasta con las páginas realmente entregadas.

El escenario base considera la web y el contenido inicial acordados, el dominio y sus señales existentes, **sin una nueva campaña de enlaces, PR, perfiles o reseñas**. Priorizar consultas con demanda pertinente, intención que podamos satisfacer y competencia analizada. Un volumen alto, una dificultad baja de una herramienta o una auditoría excelente no prueban que una web nueva vaya a posicionar. Justificar por qué esa página podría competir y qué incertidumbres quedan; no desechar la idea del usuario ni cambiar el alcance automáticamente si la evidencia es débil.

Estimar clics mensuales de Google a 3/6/12 meses únicamente cuando haya base suficiente. Documentar consultas sin duplicación, volúmenes y granularidad real, estacionalidad, páginas incluidas, hipótesis de visibilidad/posición y CTR por escenario, con su justificación y fuentes. Identificar como supuestos los valores no observados y comprobar sensibilidad; si cambiar una hipótesis razonable elimina el tráfico, mostrarlo. No suponer top 3 para todas las páginas, crecimiento automático por mes, suma de variantes de un mismo volumen ni conversiones sin datos. Separar marca/no marca cuando pueda identificarse; no mezclar clics de resultados web con Maps, referencias de IA o sesiones de Analytics.

El endpoint de DataForSEO `bulk_traffic_estimation` aproxima tráfico según posiciones y datos que ya observa; no predice el futuro de una web aún sin posicionamiento. Ninguna API ni porcentaje de auditoría reemplaza los supuestos de la proyección. `no_estimable` con explicación es válido; fabricar rangos para rellenar la tabla no lo es. No añadir llamadas fuera de la propuesta aprobada para completar cifras.

Al cierre, entregar oportunidades off-page concretas y opcionales en el mismo informe: por qué encajan con ese negocio, fuente/URL y fecha, acción del propietario, esfuerzo, coste conocido o por confirmar, beneficio esperado sin garantía y medición. Investigar no autoriza contactar terceros, editar perfiles, publicar ni comprar enlaces. Revisar `seo-backlinks`, `seo-local`, `seo-maps` y `seo-plan` en la matriz según pertinencia; separar análisis de ejecución. Para un negocio local, una recomendación sobre GBP puede ser importante para Maps, pero no puede contarse como realizada ni como tráfico futuro del sitio.

No exigir enlaces comprados, redes de enlaces, reseñas falsas o altas masivas para cumplir la entrega. Si el análisis señala que la competencia o las señales externas limitan seriamente el escenario on-site, comunicarlo con evidencia en la estrategia; no afirmar que off-page solo acelerará algo cuyo funcionamiento aún no está observado.

## Auditoría final completa — Sol high

Leer y ejecutar el `SKILL.md` instalado de `seo-audit`. Protocolo: caché compartida → homepage → tipo de negocio → rastreo de enlaces internos respetando robots → especialistas → puntuación con método de la skill → informe y plan priorizado → resumen de caché. El límite de rastreo del protocolo es hasta 500 páginas; registrar páginas conocidas, revisadas, exclusiones y limitaciones. Si Firecrawl está disponible y aporta, usarlo para descubrir URLs antes del análisis.

**Ocho especialistas siempre:** `seo-technical`, `seo-content`, `seo-schema`, `seo-sitemap`, `seo-performance`, `seo-visual`, `seo-geo` y `seo-sxo`.

**Siete condicionales:** `seo-google` por necesidades/datos Google; `seo-local` por negocio local; `seo-maps` por alcance local y herramientas pertinentes; `seo-backlinks` por autoridad/fuentes disponibles, incluyendo Common Crawl cuando proceda; `seo-cluster` por arquitectura editorial; `seo-drift` por baseline existente; `seo-ecommerce` por comercio electrónico. Evaluar las condiciones y documentar pendientes de acceso, sin marcar «no aplica» solo porque falten credenciales. Las otras disciplinas de la matriz también deben cubrirse en su fase cuando apliquen.

Delegar en paralelo cuando el entorno lo permita; con recursos limitados ejecutar secuencialmente sin recortar disciplinas. Subagentes no hacen compras: solicitan datasets al coordinador. La disponibilidad de un conector no autoriza endpoints, créditos ni cambios externos.

Generar los entregables de la skill (`FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, capturas y caché pertinentes), enlazarlos desde `ESTADO.md` y actualizar `SEO-COBERTURA.md`. Ofrecer el PDF opcional del informe conforme a la skill; no convertirlo en otra pausa necesaria ni modificar el PDF histórico del kit.

Separar resultados aprobados, fallos, pendientes y no aplicables por comprobación. No otorgar puntos favorables a una prueba ausente ni comunicar una puntuación como prueba de ventas. Una preview permite revisar código, navegación, contenido y pruebas de laboratorio; no demuestra indexación pública, rendimiento de campo, GSC, GBP, visitas ni conversiones reales. En entrega local esas evidencias externas conservan su pendiente y límites.

## Correcciones y cierre

Sol entrega a Astra ultra los defectos concretos de código/diseño, URLs afectadas y criterios de aceptación. Astra corrige toda la web dentro del alcance; Sol repite las pruebas afectadas. Corregir y comprobar los fallos críticos; evitar auditorías completas repetidas sin motivo y no perseguir una puntuación de 100. Contrastar cada elemento de `META.md`, la matriz y las dependencias antes de declarar el estado de entrega.

La entrega informa evidencia, cobertura pendiente, coste acumulado y recomendación de mantenimiento; esta recomendación **no autoriza monitorización, consultas ni gastos recurrentes**. El SEO listo no garantiza resultados: estos requieren evidencia posterior de indexación, visibilidad, visitas y acciones útiles.
