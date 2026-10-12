# Mensajes para iniciar, autorizar o retomar

La entrada habitual es este chat con la carpeta del kit abierta; [EMPEZAR.md](EMPEZAR.md) explica el uso. Basta escribir:

```text
$iniciar-web [nombre]
Si ya existe el proyecto, retoma sus respuestas y pregunta solo lo que falte.
```

Puedes omitir el nombre o escribir `$iniciar-web retoma`. La skill local está en `.agents/skills/iniciar-web/`; un proyecto por copia y código en `out/`, según ENTREGA.md. La IA guarda respuestas y pendientes conforme avanza. `node iniciar.mjs` queda como alternativa opcional por terminal; `--solo-preparar` conserva su función de guardar sin abrir Codex. No necesitas usar esos comandos ni pegar el mensaje largo siguiente para empezar por chat.

## Iniciar en el chat

Este mensaje no autoriza datos de pago ni publicación:

```text
Lee AGENTS.md, PERFILES-Y-CALIDAD.md, SISTEMA-PILOTO.md y SEO-COMPLETO.md.
Quiero una web sobre [idea], para [público/mercado], cuyo objetivo es [acción].
Materiales disponibles: [materiales]. Lee ENTREGA.md. Una sola web en esta copia:
ficha e informes en proyectos/[nombre], código completo en out/. Usa el helper
abrirProyectoChat de scripts/iniciar-chat.mjs para iniciar o retomar;
si ya existe, lee y retoma sus archivos sin sobrescribir decisiones ni autorizaciones.

Pregunta lo que falte UNA COSA CADA VEZ y reutiliza mis respuestas.
Formula preguntas adicionales según lo que vaya respondiendo, solo cuando cambien
una decisión de alcance, datos, accesos, coste o entrega. Usa supuestos explícitos
para detalles reversibles. No me envíes a otro asistente ni a un cuestionario terminal.
Guarda cada respuesta y el siguiente pendiente en la ficha y ESTADO.md. Durante
el brief usa brief_en_curso; no declares entrevista completada antes de resolver
el alcance esencial ni conviertas una declaración de intención en autorización.
Identifica web nueva o renovación. Si renuevo, recoge URL, continuidad de dominio,
mejoras/conservación, prioridades y accesos; aplica MIGRACIONES.md y prepara
MIGRACION-SEO.md con baseline, mapa de URLs, respaldo, transición y reversión.
No exijas que yo inventaríe keywords ni atribuyas permisos por elegir renovación.
Conserva mi idea y modalidad de inversión/asociación. Resuelve funciones esenciales:
pago frente a contacto, editor, stock/disponibilidad, materiales y destino.
No me pidas JSON ni selección de subskills. Preexploración de pago USD 0 por ahora.

Escribe y muestra META.md: público, páginas/cantidades, funciones, contenido,
entrega prevista, criterios comprobables, límites, exclusiones y pendientes.
Concreta la meta antes de explorar, sin otra aprobación ordinaria del plan.

Usa GPT-6 Astra / high, rol entrevistador, únicamente para la entrevista por chat.
El coordinador transmite las respuestas reales, presenta una pregunta cada vez
y guarda el estado; no me pidas usar terminal ni cambiar de conversación.
Usa GPT-6.1 Sol / high para coordinación, investigación, contenido, SEO y QA.
Usa GPT-6 Astra / ultra para diseñar y revisar TODA LA PARTE VISUAL.
Usa GPT-6.1 Sol / high para programar TODO: mockups navegables, estilos, páginas,
interacciones, lógica, integraciones y correcciones. Astra transfiere especificaciones
y revisa capturas/recorridos; Sol implementa fielmente esa dirección visual.
Comprueba configuración/modelo/esfuerzo reales y delegación de disenador y
desarrollador en .codex/. Si falta acceso, registra el bloqueo y prepara traspaso;
no atribuyas selección a un nombre en el prompt ni sustituyas sin avisar.

Haz una exploración pequeña con fuentes gratuitas y cualquier cupo previo autorizado.
Presenta PRESUPUESTO-SEO.md con minimo, estandar y optimo identificados/versionados:
plan de consultas/parámetros, tarifas verificadas, evidencia, incertidumbre y margen
por opción viable. Mantén controles esenciales; marca opciones sin valor o inviables.
Recomienda una con motivos y valor marginal. Compara máximos adicionales y totales
sobre la misma base de gasto/reservas; no sumes los tres ni compres planes alternativos.
Espera mi elección y aprobación expresa de opción/ID/versión antes de investigar;
selected_option_id y authorization siguen null hasta entonces. Rellena proposal y
límites solo con la opción aprobada. No elijas por mí ante una respuesta ambigua.
No impongas USD 1 como presupuesto universal ni reinicies gastos de la exploración.
Al cerrar la exploración, congela compras hasta aprobar para conservar la base.
Después de aprobar, todas las llamadas nuevas consumen el máximo adicional,
incluso si aclaran preguntas de la preexploración.

Aplica la skill seo completa de AgriciDaniel: lee la principal y routing, evalúa
las 26 subskills en SEO-COBERTURA.md y ejecuta los procedimientos completos
pertinentes. Carga sus SKILL.md y referencias cuando correspondan. No reduzcas
por defecto la cobertura; acceso faltante es pendiente/bloqueo, no no_aplica.
Solo Sol compra DataForSEO con precios, saldo, reservas y registro reconciliados;
subagentes solicitan datasets. Guarda respuestas originales y caché compartida.

Antes del diseño, completa SEO-STRATEGY.md desde su plantilla: contrasta la
idea original con necesidades, intención, competencia y oportunidades del
sector. Registra literalmente lo que creo que desea el público; contrasta cada
hipótesis con evidencia a favor/en contra, fuentes, límites y estado apoyada,
contradicha o inconclusa. Vincula los cambios a páginas y acciones medibles.
Define qué resultado útil contará, objetivo/horizonte, baseline, fuente y estado
de medición; clics, contactos recibidos y ventas son métricas distintas.
No tomes búsquedas como prueba de voluntad de compra ni prometas resultados.
Recomienda mantenerla, ajustar su enfoque o proponer un cambio concreto
con fuentes y límites. Aplica y registra ajustes editoriales dentro del alcance;
un cambio de público, oferta, acción, ingresos, páginas o integraciones requiere
mi decisión expresa. Aprobar el presupuesto no acepta un giro de la idea.
Fundamenta la oportunidad de captar tráfico con el contenido inicial y SEO
del sitio, sin asumir campañas nuevas de enlaces ni otras acciones off-page. Relaciona demanda,
intención, competencia y páginas del alcance; reconoce la autoridad existente.
Si hay datos suficientes, estima escenarios conservador, central y favorable de
clics orgánicos mensuales de Google en los meses 3, 6 y 12 desde la publicación,
con fuentes, método y supuestos. No son cifras acumuladas ni visitas garantizadas.
Datos insuficientes: no_estimable, sin inventar volúmenes, CTR, posiciones ni
probabilidades de éxito. Cero también es posible. No supongas contenido mensual
adicional ni acciones del usuario para sostener el escenario base.
Los tres presupuestos no equivalen a escenarios de tráfico. Más investigación
de la misma web no justifica prometer más visitas. En renovación distingue baseline
observada, total previsto e incremento, con periodos/mercado comparables.
Explica una oportunidad débil o incierta antes de diseñar, sin decidir por mí,
cambiar silenciosamente el alcance ni añadir otra aprobación ordinaria.

Prepara arquitectura y contenido real antes del diseño; no inventes pruebas,
precios, casos ni credenciales. Astra ultra diseña 3 homepages mockup A/B/C; Sol high las programa
navegables, distintas en composición, tipografía y lenguaje visual, responsive,
con URLs reales comprobadas y revisión en navegador escritorio/móvil.
Añade un interior representativo cuando aporte, sin construir 3 webs enteras.
Revisa e itera antes de presentarlas. Espera mi elección A/B/C o combinación
concreta y guarda ajustes antes de desarrollar toda la web elegida.

Construye en Astro + Tailwind CSS, con TypeScript, componentes reutilizables,
datos centralizados/validados y versiones compatibles verificadas.
Sol ejecuta seo-audit completo con sus 8 especialistas siempre y 7 condicionales,
además de tipos, build, rutas, enlaces, accesibilidad y E2E de flujos críticos.
Astra ultra revisa el diseño; Sol 6.1 high corrige el código; Sol verifica hasta cumplir META o señalar
un bloqueo externo concreto. Registra evidencia y pendientes, sin declarar
operativas integraciones simuladas ni indexación real desde una preview.

Solo dos pausas ordinarias tras la entrevista: presupuesto y elección visual.
No añadas aprobaciones de fases o llamadas ya autorizadas; continúa tareas
independientes de accesos, permisos o dependencias externas pendientes.
Entrega URL, código, comparación contra META, cobertura SEO, pruebas, pendientes
y coste acumulado. Finaliza SEO-STRATEGY.md con recomendaciones off-page
opcionales y personalizadas: prioridad, evidencia del rubro, acción del usuario,
esfuerzo/coste conocido y señal que permitiría evaluarla. No ejecutes contactos,
acciones externas ni compras adicionales por recomendarlas. No presupongas que
las aplicaré ni incluyas su efecto en el escenario base. Completar las skills no
demuestra tráfico: separa SEO listo de resultados observados tras publicar.
La recomendación de mantenimiento no activa gastos recurrentes.
Mantén BITACORA.jsonl y MEJORAS.md conforme a BITACORA.md: hechos, decisiones,
verificaciones, incidencias, corrección, prueba y aprendizaje. Usa el helper local;
no cierres incidencias sin evidencia ni modifiques reglas o permisos por aprender.
No registres secretos ni razonamiento interno. ESTADO resume y enlaza; el registro
financiero conserva su función exclusiva. No inventes historia de proyectos previos.
```

## Autorizar únicamente la preexploración

Añade esta instrucción solo si quieres permitir ese cupo previo. La entrada acotada admite hasta USD 1; USD 0.10 es la sugerencia. No autoriza la investigación principal.

```text
Autorizo hasta USD [importe] de DataForSEO para la preexploración de
proyectos/[nombre], máximo USD 0.10 por intento, hasta 3 intentos SERP
(depth 10, max_crawl_pages 1, una tarea por llamada, sin extras) y 1 intento
Labs Keyword Suggestions con hasta 25 ítems. Máximo 1 reintento por consulta
y 1 total, incluidos en esos cupos. Respeta precios vigentes verificados,
saldo suficiente y el registro privado reconciliado; no repitas costes inciertos.
No autoriza investigación principal, servicios, publicación ni seguimiento.
```

## Aprobar el presupuesto principal presentado

Usa los límites exactos de la propuesta que hayas revisado. No sustituirlos por un presupuesto genérico ni interpretar copiar este ejemplo como autorización.

```text
Apruebo PRESUPUESTO-SEO.md, propuesta [ID], versión [versión], opción
[minimo / estandar / optimo: elegir una], para proyectos/[nombre].
Autorizo exclusivamente su máximo adicional de USD [importe],
con total máximo acumulado del proyecto USD [total], incluidos gasto y reservas
previos que muestra la propuesta. Apruebo los endpoints, cantidades, parámetros,
máximos por llamada y cupos/reintentos allí identificados, con margen incluido.
No apruebo las otras opciones ni la suma de sus presupuestos.
Sol es el único comprador y debe verificar precio, saldo y registro antes de pagar.
No pidas aprobación por llamadas cubiertas. No autoriza otros servicios,
publicación, SEM, revisiones recurrentes ni un reinicio de gasto/reservas.
```

Un lote existente necesita su ID, proyectos y límites aprobados; no crearlo por inferencia. Si se autoriza uno, la propuesta y registro respetan simultáneamente sus límites y los de cada proyecto. No trasladar saldo sin autorización.

## Retomar

```text
Retoma proyectos/[nombre]. Lee META.md, proyecto.json, ESTADO.md,
CONTENIDO.md, PRESUPUESTO-SEO.md, SEO-STRATEGY.md, SEO-COBERTURA.md y caché disponibles.
Consulta BITACORA.jsonl y MEJORAS.md; MIGRACION-SEO.md si es renovación.
Conserva alcance, modelos, decisiones, autorizaciones y costes acumulados.
Reconcilia registro privado, gasto y reservas antes de cualquier compra.
Continúa la siguiente tarea pendiente; no repitas entrevista, aprobación del
presupuesto ni elección visual ya resueltas. Contrasta entrega contra META.
En proyectos anteriores incorpora registros desde hoy sin inventar historial ni
cambiar autorizaciones vigentes por actualizar una plantilla.
```

## Revisión posterior concreta

```text
Revisa proyectos/[nombre] en [periodo] para responder [pregunta].
Presenta una propuesta de evidencia y coste adicional para esta revisión,
reutilizando GSC y datos pertinentes disponibles, con acumulado reconciliado.
No programes monitorización ni actives gastos recurrentes por esta petición.
```

El kit solicita modelos/esfuerzos en `.codex/`; el cliente debe cargarlos y la cuenta tener acceso. Descubrir las skills y herramientas reales del entorno, consultar su documentación oficial vigente al verificar configuración y preparar un traspaso cuando haga falta. El nombre de un modelo no demuestra que ejecutó una tarea.
