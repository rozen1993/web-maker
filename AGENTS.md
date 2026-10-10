# Sistema de webs y SEO: instrucciones del coordinador

Estas son instrucciones operativas para agentes; NO constituyen un bloqueo del MCP, un gateway ni un límite configurado en DataForSEO. Crear estos archivos no autoriza gastos, consultas de pago, publicaciones ni cambios en servicios externos. No modificar skills globales.

## Raíz y portabilidad

La raíz del sistema es la carpeta que contiene este `AGENTS.md`, aunque el repositorio se clone con otro nombre o en otro equipo. Resolver las rutas relativas desde esa raíz; no depender de una ruta personal. En la plantilla, `control_root: "."` se refiere a esta raíz, no al directorio de cada web. Al iniciar un proyecto, resolver y registrar dónde está el registro compartido de su cartera.

Este repositorio contiene el kit. `proyectos/`, `.control/`, `.seo-cache/` y evidencias privadas quedan fuera de Git. Las webs pueden tener repositorios propios. Clonar el kit no instala skills ni conecta servicios: descubrir lo disponible en el entorno y conservar credenciales fuera del repositorio.

Un clon no reinicia autorizaciones, gasto ni reservas de una cartera existente. Antes de pagar desde un clon o traslado, localizar el registro privado original o restaurar su copia completa, vincularlo y reconciliarlo con la misma cuenta y proyectos. No crear un registro vacío para sustituir uno con historial; no duplicar compradores. Una cartera nueva empieza sin autorización. Los registros privados requieren respaldo separado de Git.

## Alcance y fases

Respetar la idea y la modalidad de inversión o asociación elegida por el usuario. No imponer un modelo comercial, un negocio existente ni un piloto obligatorio. Reutilizar respuestas y archivos; preguntar solo lo que cambie una decisión.

**Stack obligatorio para las webs resultantes: Astro + Tailwind CSS.** Usar TypeScript para datos y lógica mantenibles. Leer las skills `astro` y `frontend-design`; contrastar instrucciones de versiones o APIs con documentación oficial vigente y el proyecto existente. No cambiar de framework por el tipo de web. Renderizado estático donde sirva; islas interactivas y rutas de servidor/integraciones solo cuando el flujo las necesite.

Para proyectos nuevos, la documentación verificada el 9/10/2026 recomienda Tailwind 4 con `@tailwindcss/vite`; `@astrojs/tailwind` es legado de Tailwind 3. No copiar `Astro.glob()` de la skill local: se eliminó en Astro 6. Usar colecciones/loaders y APIs compatibles con la versión instalada; registrar versiones y lockfile. No actualizar proyectos existentes indiscriminadamente. Los datos compilados durante build no se vuelven actuales por añadir SSR: precios y stock que requieran frescura se consultan/validan en servidor o proveedor al operar.

**Entrada sencilla:** el usuario describe su idea, público y mercado; el coordinador completa la ficha. No exigir que edite JSON, elija subskills ni conozca arquitectura. Clasificar por módulos combinables de `PERFILES-Y-CALIDAD.md`: servicios, portfolio, blog, catálogo, tienda, directorio/recursos y reservas; cuentas solo si son necesarias. Preguntar por funciones ambiguas que cambien el resultado: cobrar en línea frente a pedir por WhatsApp, editar desde un panel, gestionar stock o disponibilidad. Registrar el alcance sin activar funciones que no pidió.

1. **Brief — Sol:** usuario objetivo, necesidad, acción principal, mercado, módulos, alcance, materiales y límites. Entregar una ficha breve; identificar hipótesis, fuentes de datos y dependencias de integración.
2. **Investigación — Sol:** demanda, intención y páginas necesarias. Usar datos actuales cuando se soliciten, con fuentes, fecha, ubicación y costes. Guardar respuestas originales.
3. **Contenido — Sol:** preparar texto real, pruebas, jerarquía, metadatos y acción de cada página antes del diseño. No inventar casos, credenciales ni resultados; contenido especializado requiere revisión competente.
4. **Diseño — Astra high:** partir del contenido y la identidad existente. Si falta dirección, comparar dos opciones con contenido real y vistas representativas del tipo de web, incluyendo interior cuando corresponda; registrar la elección antes de extenderla. Comprobar móvil y escritorio y revisar la implementación contra la dirección elegida. Reutilizar bases técnicas sin clonar identidad, orden de secciones ni composición. El prompt no cambia el modelo: comprobar selección o preparar el traspaso.
5. **Construcción — Sol:** implementar en Astro + Tailwind CSS, con componentes reutilizables y datos centralizados y validados. Conservar URLs útiles; comprobar migraciones, flujos de los módulos activos, accesibilidad y SEO técnico. Usar una fuente de verdad para contenido, productos, precios y disponibilidad; no duplicarlos en páginas.
6. **Verificación y seguimiento — Sol:** comprobar entrega local y pública cuando esté autorizada, registrar pendientes y línea base. Distinguir SEO listo de resultados observados; proponer una mejora por ciclo.

Avanzar automáticamente cuando los criterios estén cumplidos y las acciones autorizadas. No pedir aprobación por fase o por llamada ya cubierta. Pausar la acción dependiente si falta una decisión esencial, se supera un límite, se necesita un endpoint de pago nuevo fuera de la autorización o una publicación no está autorizada; continuar el trabajo independiente.

## Skills y entregables

Descubrir en el catálogo disponible las skills instaladas de agricidaniel/SEO y leer sus SKILL.md al utilizarlas; no inventar comandos slash, rutas ni capacidades. Aplicar únicamente las necesarias:

- `seo-plan` para planificación; `seo-page` para una URL; `seo-audit` para revisión completa justificada.
- `seo-dataforseo` para datos; `seo-sxo` si la intención es incierta; `seo-cluster` si el volumen de temas justifica agrupar.
- `seo-content` para contenido; `seo-local` solo con alcance local; `seo-hreflang` si hay idiomas/regiones.
- `seo-ecommerce` para tiendas; `seo-cluster` para arquitectura editorial cuando aporte; `seo-programmatic` para directorios o contenido generado cuando sea necesario. Los módulos comparten el presupuesto de datos de la web, sin multiplicarlo por subskill.
- `seo-technical`, `seo-schema`, `seo-images` y `seo-sitemap` según necesidades reales.
- `seo-google` con accesos disponibles; `seo-drift` para cambios; performance/visual o GEO cuando correspondan al objetivo.

Mantener por proyecto `proyecto.json`, `ESTADO.md`, `CONTENIDO.md` y `.seo-cache/` conforme a la skill; usar `evidencias/` solo si hay capturas u otros artefactos que lo necesiten. Registrar dirección visual y verificaciones en ESTADO.md; evitar informes duplicados. Compartir componentes y procedimientos, sin reutilizar como hechos datos propios de otro negocio.

**SEO listo:** contenido y configuración comprobados, contacto operativo y medición comprobada o pendiente explícita. **SEO con resultados:** evidencia posterior de indexación, visibilidad, visitas y acciones útiles. No prometer posiciones ni tasas de éxito por completar fases.

## Calidad y funciones reales

Aplicar las comprobaciones comunes y de cada módulo activo de `PERFILES-Y-CALIDAD.md`. Usar resultados `aprobado`, `fallo`, `pendiente` o `no_aplica`, con evidencia y entorno. Registrar en ESTADO.md el estado de entrega: `en_construccion`, `preview_verificada`, `lista_para_publicar`, `publicada_verificada` u `operativa_verificada`; ninguna fase ni campo se aprueba por existir código.

- Revisar diseño con capturas completas y recorridos en móvil/escritorio; navegación, imágenes cargadas, teclado, contraste y estados de carga/vacío/error relevantes. Corregir defectos materiales encontrados y repetir las comprobaciones afectadas; no reiterar auditorías completas ya superadas sin motivo ni perseguir una puntuación 100.
- Ejecutar las comprobaciones de tipos y build del proyecto, revisar rutas/enlaces y probar de extremo a extremo los flujos críticos. En tiendas: precios/stock validados por servidor o proveedor, confirmación de pago verificada, no duplicar pedidos y pruebas en modo de prueba sin cobros reales.
- El frontend Astro puede necesitar un proveedor de pagos, motor comercial, CMS, base de datos o reservas. Usar servicios ya disponibles cuando cubran la necesidad; presentar opciones y costes solo si existe una dependencia que el usuario deba elegir. No contratar servicios ni activar cobros por inferencia; continuar trabajo independiente y marcar integración pendiente.
- Una tienda con pago no se sustituye silenciosamente por catálogo o pedido WhatsApp. Un diseño de carrito, botón de reserva o formulario simulado no acredita una operación real. Material de ejemplo queda fuera de publicación como dato comercial verdadero.
- `lista_para_publicar` exige comprobaciones locales/preview del alcance aprobadas y dependencias esenciales resueltas; `publicada_verificada` exige URL pública revisada; `operativa_verificada` exige el flujo real y su recepción/registro, usando eventos de prueba controlados cuando proceda. No ocultar pruebas faltantes bajo la palabra «impecable».

## Política DataForSEO propuesta: requiere autorización

- Un coordinador único ejecuta pagos y escribe el registro compartido. Subagentes solo solicitan datasets. No ejecutar pagos concurrentes desde otros chats, cuentas o proyectos; todos deben pasar por el mismo coordinador.
- El perfil base sirve para una primera versión de alcance reducido. Si el número de temas, mercados o páginas exige más datos, explicar qué queda sin cubrir y estimar una ampliación concreta; no declarar investigación completa solo por agotar el cupo.
- Registro único de una cartera nueva: `.control/dataforseo.jsonl`, resuelto desde la raíz del sistema. Para una cartera existente, usar su registro privado vinculado, aunque esté fuera del clon. Compartirlo entre proyectos y campañas; no crear contadores independientes. Un chat nuevo, otra cuenta, otro clon o reiniciar una fase NO reinicia presupuestos.
- Límite propuesto por sitio: **USD 1 acumulado para su investigación inicial**, no mensual; máximo **USD 0.10 por intento de llamada**. Estimar el máximo facturable con todos los parámetros antes de reservar.
- Hasta **2** intentos de Labs Keyword Suggestions, máximo **100 ítems** cada uno; hasta **1** intento de Google Ads Search Volume con hasta **200 keywords**, solo si añade información; hasta **20** intentos SERP, una tarea por llamada, `depth: 10`, `max_crawl_pages: 1`, sin extras.
- Los cupos anteriores incluyen reintentos: máximo **1 por consulta y 2 en total por sitio**, siempre dentro de los límites de dinero y del endpoint. No reintentar automáticamente un timeout o respuesta de coste desconocido.
- Propuesta de cartera: **USD 10 acumulados POR LOTE**, solo cuando el usuario autorice un lote identificado. No inventar ni activar lotes. Si se trabaja por lote, sus límites y los del sitio deben permitir la misma operación; no trasladar saldo entre ellos sin autorización. Un proyecto individual autorizado no exige crear un lote.
- Propuesta adicional: límite global del proveedor de **USD 3 por día**. No configurarlo ni afirmar que existe. No sustituye los límites acumulados y, sin configuración verificada, no protege los pagos.
- País, ciudad cuando aplique, idioma y dispositivo SERP deben ser explícitos. No usar valores US ni 100 resultados por defecto. Declarar diferencias de cobertura entre volúmenes y SERP.
- Caché por fecha, endpoint y parámetros completos: **7 días para SERP, 30 para volúmenes**. Si se pide evidencia actual, obtener nuevas SERP dentro de autorización y límites; no presentar caché como consulta actual.

## Comprobación de costes y registro

Leer el contrato y los precios vigentes del endpoint antes de usarlo. Sin precio máximo verificable, saldo suficiente conocido, autorización vigente y presupuesto restante reconciliado: **no pagar**. Tampoco pagar si existen reservas cuyo coste impide demostrar que queda presupuesto.

Localizar el helper de costes desde el `SKILL.md` de la instalación disponible y consultar su uso; no asumir una ruta fija. En la instalación original, el 9/10/2026 se observó en `C:/Users/MARCO/.codex/skills/seo/scripts/dataforseo_costs.py` (referencia histórica, no requisito del clon). Sus operaciones `check <endpoint> --count N` y `log <endpoint> <cost>` ayudan a estimar/registrar; verificar que sigan disponibles. Sus tarifas pueden estar desactualizadas y su log global no sustituye el registro de esta cartera. Un código de salida 0 NO es autorización ni prueba de que se cumpla el presupuesto.

Para cada intento, usar un `request_id` único y eventos JSONL con fecha, proyecto, campaña, lote autorizado, endpoint, parámetros, autorización, coste máximo reservado, coste real si se conoce y estado. Estados: `propuesta`, `reservado`, `completado`, `costependiente`.

1. Reconciliar el registro y los cupos globales antes de la llamada. Verificar autorización, tarifa y límites por llamada, sitio y lote cuando corresponda.
2. Escribir `reservado` con el máximo estimado ANTES de ejecutar. Si no puede escribirse o reconciliarse, no llamar. La reserva consume presupuesto y cupo de intento.
3. Si se conoce el coste facturado, escribir `completado` con ese coste y sustituir la reserva por el coste real. No sumar simultáneamente ambos.
4. Ante timeout o coste ausente, escribir `costependiente` y conservar íntegra la reserva y el cupo. No repetir ni liberar hasta resolver el estado/coste con evidencia. Un fallo confirmado sin cargo puede completarse con coste 0 documentado; el intento sigue contado.
5. Consolidar por `request_id`: los eventos de una misma operación no son llamadas nuevas ni costes adicionales. Un reintento permitido usa otro ID y referencia el anterior. No sumar dos veces costes de respuesta y subtareas.

El JSONL es la fuente de verdad de operaciones; los totales en proyecto.json son una vista derivada con fecha y estado de reconciliación. No editar `spent_usd` o `reserved_usd` manualmente para hacer cuadrar límites. Si difieren, reconciliar antes de pagar; presupuesto restante desconocido significa pagos prohibidos.

No existe aquí código que intercepte llamadas: el coordinador debe cumplir y verificar estas instrucciones. Los presupuestos de la plantilla están propuestos, su autorización es `null` y ninguna consulta se habilita por crearla.
