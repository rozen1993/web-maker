# Sistema repetible de webs con SEO y presupuesto controlado

Versión 3 — 9 de octubre de 2026. Astro + Tailwind, módulos combinables y criterios de entrega.

Este sistema recibe una idea o negocio que TÚ elijas, utiliza tus skills instaladas de agricidaniel, prepara contenido, diseña con Astra high e implementa con GPT-6.1 Sol en **Astro + Tailwind CSS**. Adapta estructura, contenido y funciones al proyecto: servicios, tiendas, blogs, catálogos, portfolios, directorios o combinaciones. Puedes usarlo para proyectos propios, asociaciones o clientes.

**Para usarlo, empieza en [EMPEZAR.md](EMPEZAR.md).** Describe la idea en pocas líneas; Codex completa la ficha y pregunta lo imprescindible. Los archivos y reglas que siguen los mantiene el coordinador, no necesitas editarlos manualmente.

## 1. Qué aporta cada pieza

- **Skill seo:** distribuye el trabajo entre especialistas.
- **Subskills:** procedimientos para planificación, intención, contenido, técnica, imágenes, schema, SEO local y demás necesidades.
- **MCP DataForSEO:** acceso a datos externos que algunas fases necesitan.
- **Este protocolo:** decide cuándo utilizar cada capacidad, comparte los datos y limita el gasto por proyecto y entre proyectos.
- **Tú:** eliges qué proyecto desarrollar, su propósito, el presupuesto y la dirección visual.

La amplitud de la skill permite cubrir muchos tipos de SEO. No es necesario ejecutar todas las subskills ni comprar todos los tipos de datos en cada web.

### Base común y módulos por tipo de web

La base compartida incluye Astro, Tailwind, datos validados, navegación accesible, metadatos, imágenes, componentes y comprobaciones. Cada proyecto mantiene su dirección visual, arquitectura, contenido y recorridos. Reutilizar una base no obliga a repetir la misma portada ni las mismas secciones.

| Módulo | Qué añade | Decisión que puede necesitar del usuario |
|---|---|---|
| Servicios o landing | Oferta, casos, proceso y contacto | Qué acción debe facilitar y quién recibe la consulta |
| Portfolio | Proyectos, galerías, piezas y fichas | Qué trabajos y materiales pueden mostrarse |
| Blog o publicación | Artículos, autores, temas y navegación editorial | Quién publica y si necesita un panel de edición |
| Catálogo | Productos o servicios, categorías, filtros y consulta | Pedido/cotización y datos reales de cada producto |
| Tienda | Catálogo, variantes, carrito, checkout y pedidos | Forma de cobro, moneda, disponibilidad y entrega |
| Directorio o recursos | Fichas, búsqueda, filtros y fuentes | De dónde provienen los datos y quién los mantiene |
| Reservas | Servicio, disponibilidad, solicitud o confirmación | Cómo se gestionan cupos y qué significa una reserva confirmada |

Los módulos se combinan: tienda + blog, servicios + portfolio + reservas, directorio + publicación. Cuentas, pagos recurrentes o contenido privado se añaden cuando sean parte del encargo. El sistema no cambia tu idea para encajarla en una plantilla.

Una tienda con pago, un CMS o reservas pueden necesitar servicios y accesos adicionales. Astro + Tailwind sigue siendo la base de la web; las dependencias se resuelven según la función y lo que ya tienes disponible. Se registra cualquier integración pendiente y se continúa el trabajo independiente. No se activa una suscripción ni se convierte una tienda en catálogo sin tu decisión.

El detalle de módulos y comprobaciones está en [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md). Activar otro módulo no multiplica el presupuesto de DataForSEO: se comparte la investigación, y se justifica cualquier ampliación por temas, mercados o información faltante.

### Instrucciones técnicas actualizadas

Para proyectos nuevos, utilizar la integración vigente de Tailwind 4 mediante `@tailwindcss/vite`; `@astrojs/tailwind` corresponde al soporte legado de Tailwind 3. Registrar versiones y lockfile de cada proyecto. [Documentación oficial de estilos](https://docs.astro.build/en/guides/styling/).

Para contenido repetido, usar colecciones y esquemas de Astro compatibles con la versión instalada. No copiar `Astro.glob()` de ejemplos antiguos: se eliminó en Astro 6. [Guía oficial de actualización](https://docs.astro.build/en/guides/upgrade-to/v6/#removed-astroglob).

Astro admite integraciones comerciales y un frontend propio. En tiendas, los datos que necesiten frescura y los pagos se verifican con el servidor o proveedor correspondiente; renderizar con SSR no actualiza por sí solo un catálogo cargado durante build. [Guía de comercio electrónico](https://docs.astro.build/en/guides/ecommerce/), [colecciones de contenido](https://docs.astro.build/en/guides/content-collections/).

## 2. Perfil inicial de DataForSEO

Estos son límites operativos propuestos, editables. Crear estos archivos no los activa como gasto autorizado ni modifica tu cuenta.

| Control | Valor del perfil base | Alcance |
|---|---:|---|
| Presupuesto por web | **USD 1** | Acumulado de investigación y ajustes iniciales, hasta la entrega; no se reinicia por chat ni por día |
| Máximo por llamada | **USD 0.10** | Estimación máxima según parámetros reales antes de enviarla |
| Búsquedas SERP | **20 llamadas** | Un motor, dispositivo y ubicación por consulta; también cuentan variaciones y reintentos |
| Profundidad inicial SERP | **10 resultados / 1 página** | No garantiza diez enlaces orgánicos: puede haber otros bloques |
| Descubrimiento de palabras | **2 llamadas de hasta 100 sugerencias** | Dos semillas útiles, sin paginación ni clickstream |
| Volúmenes adicionales | **1 lote de hasta 200 palabras** | Solo si añade información que no llegó con las sugerencias |
| Reintentos | **Máximo 1 por consulta y 2 en todo el proyecto** | Incluidos en los cupos anteriores; nunca automáticos si el coste previo es incierto |
| Presupuesto de una tanda de proyectos | **USD 10 propuestos** | Un techo compartido que debe autorizarse; no asigna ni exige una cantidad de webs |
| Límite diario del proveedor | **USD 3 propuestos** | Global para la cuenta; requiere configuración real en DataForSEO |
| Revisión posterior de un sitio | **USD 0.25 por revisión autorizada** | Separada del presupuesto inicial; sin ejecución mensual automática |

El dólar por web es un techo de autonomía para una primera versión de alcance reducido, no un precio obligatorio de SEO ni una cobertura universal para tiendas o portales grandes. Si hay demasiados temas o mercados para el lote base, la IA identifica lo que falta y estima una ampliación concreta. Al llegar al techo, continúa contenido, diseño y código con los datos disponibles; solo se detienen las nuevas compras. No declara investigación completa por haber agotado un cupo.

El seguimiento no se activa por el simple paso del tiempo. Cada revisión tiene periodo, objetivo y presupuesto; una vez autorizada, no se pide permiso para cada consulta incluida.

### Cuánto cuesta un lote concreto

Tarifas públicas consultadas el 9 de octubre de 2026, sin extras:

| Operación | Cálculo | USD |
|---|---:|---:|
| Dos llamadas Labs Keyword Suggestions con hasta 100 ítems cada una | 2 × (0.012 + 100 × 0.00012) | 0.048 |
| Veinte consultas Google SERP Live, una página cada una | 20 × 0.002 | 0.040 |
| Total cuando bastan esos datos | Suma | **0.088** |
| Opcional: un lote Google Ads Search Volume Live | 1 × 0.09 | 0.090 |
| Total incluyendo ese lote adicional | Suma | **0.178** |

Fuentes: [Labs Google](https://dataforseo.com/pricing/dataforseo-labs/dataforseo-google-api), [Google SERP](https://dataforseo.com/pricing/google-serp/google-organic-serp-api), [Google Ads](https://dataforseo.com/pricing/keywords-data/google-ads).

Suggestions ya incluye volúmenes: no volver a comprarlos sin motivo. Google Ads puede aportar una ubicación distinta admitida por el endpoint, palabras adicionales o datos faltantes. El MCP de Suggestions instalado admite país, mientras la herramienta de SERP permite ubicaciones más específicas. Declara siempre la granularidad real.

Este cálculo no incluye ranking garantizado, todas las APIs del catálogo, créditos de IA, alojamiento ni revisiones futuras. Tus USD 54 declarados son saldo disponible, no autorización para consumirlo completo. No se verificó el saldo ni se gastó DataForSEO al preparar este sistema.

## 3. El control real: tres niveles

**Instrucción:** el agente recibe los topes por web y consulta. Es una regla que debe cumplir.

**Registro y coordinación:** un único coordinador ejecuta las llamadas de pago y registra todas las reservas y costes. Los especialistas reutilizan los resultados. Esto evita que cada subskill compre la misma investigación.

**Límite del proveedor:** DataForSEO puede rechazar peticiones que excedan un máximo diario. Es la protección aplicada por el propio servicio.

En la instalación original, revisada el 9/10/2026, se encontró el helper en:
`C:/Users/MARCO/.codex/skills/seo/scripts/dataforseo_costs.py`.

Es una ruta de referencia histórica. En otro equipo, localizarlo desde el `SKILL.md` instalado. Esa revisión de solo lectura encontró:

- No había configuración personalizada de costes en las ubicaciones que usaba el helper; regían sus valores predeterminados: USD 10 diarios y umbral de aprobación de USD 0.50.
- Estimaba con una tabla aproximada. Por ejemplo, volumen figuraba como USD 0.05, mientras Google Ads Live publicaba USD 0.09 en la fecha de revisión.
- No calcula presupuesto por web ni recibe todos los parámetros que modifican el coste.
- Las operaciones check y log están separadas y no reservan presupuesto.
- No intercepta las llamadas MCP; en Windows no protege su registro con bloqueo entre procesos.
- Un resultado blocked no se expresa necesariamente como fallo de proceso. Hay que leer el JSON, no fiarse del código de salida.

Se conserva el procedimiento check/log que pide la subskill, pero la estimación vigente y el registro por proyecto de este protocolo son necesarios. No se modificaron la skill global, su helper, su ledger histórico ni tu cuenta.

### Configurar el límite que sí aplica el proveedor

En el panel DataForSEO, abre **API Settings → API Limits**, configura el máximo diario global deseado y comprueba que quedó guardado. El valor sugerido para este perfil es USD 3. Considera los demás proyectos que utilicen esa misma cuenta, porque también les afectará.

DataForSEO permite límites globales y por API/endpoint. Su día se reinicia a las 00:00 UTC, es decir, a las 19:00 de Lima. Rechaza las tareas que exceden el límite con código 40203. [Documentación oficial](https://dataforseo.com/help-center/limit-my-payments).

**Estado al preparar la copia original el 9/10/2026: ese límite no se configuró ni comprobó en la cuenta.** Verificar su estado real al utilizarlo. Los archivos locales no pueden activarlo por sí solos.

## 4. Reglas para que las subskills compartan presupuesto

1. **Un solo comprador de datos.** El coordinador es el único que llama a DataForSEO. Las demás subskills o subagentes le solicitan información y reciben datasets guardados.
2. **Una reserva antes de enviar.** Se registra proyecto, tanda, endpoint, parámetros, pregunta, coste máximo y request_id único. Se compara gasto confirmado + reservas pendientes + nueva reserva contra todos los límites.
3. **Un registro al terminar.** Se guarda el coste devuelto y el task_id; se sustituye la reserva por el coste, sin sumar ambos ni contar a la vez el total y sus subtareas.
4. **Un error no equivale a coste cero.** Si se pierde la respuesta, se mantiene la reserva y se marca coste pendiente. Se resuelve con evidencia antes de repetir o liberar.
5. **No ampliar por iniciativa propia.** No añadir backlinks, rastreos de pago, mapas masivos, monitorización de IA, clickstream, operadores especiales, profundidad o paginación. Son ampliaciones posibles cuando tú las autorizas con su presupuesto.
6. **Sin bucles para alcanzar una puntuación.** Terminar investigación cuando hay datos suficientes para decidir intención y arquitectura, aunque sobre presupuesto. Los informes no deben desencadenar consultas infinitas.

Si usas tus dos cuentas en paralelo, dedica una al coordinador que compra datos. La otra puede trabajar contenido, diseño o código con los datasets compartidos. Dos chats con acceso a un mismo archivo no constituyen por sí solos un bloqueo técnico.

La versión preparada es un **protocolo operativo con archivos**, no una pasarela que impida físicamente llamadas directas. Para permitir varios compradores simultáneos con un bloqueo duro por sitio haría falta que todas las llamadas pasaran por un ejecutor con reservas atómicas y acceso exclusivo a las credenciales. Esa automatización no está implementada ni es necesaria para usar ahora el flujo con un único comprador.

## 5. Una ficha de entrada y seis fases

La IA pregunta solo lo que falta, como máximo tres preguntas por turno:

- Idea y público: ¿para quién es y qué necesidad atiende?
- Acción principal: ¿contacto, compra, registro, participación, lectura u otra?
- Mercado: país, ciudad si aplica, idioma y alcance territorial.
- Materiales: información, fotos, pruebas disponibles y responsable del contenido especializado.
- Punto de partida: web/dominio, identidad y referencias que deban conservarse.
- Alcance y autonomía: qué debe incluir la primera versión, presupuesto de datos y autorización de publicación.

No es necesario saber SEO ni elegir subskills manualmente para cada fase.

| Fase | Modelo y skills | Resultado que permite avanzar |
|---|---|---|
| 1. Encargo | Sol + seo-plan; seo-page si se trabaja una URL existente | Brief, módulos y objetivo, sin cambiar tu proyecto o forma de asociación |
| 2. Investigación | Sol + seo-dataforseo; seo-sxo para intención; seo-cluster si la arquitectura lo necesita | Datos guardados, búsquedas agrupadas por intención, competidores pertinentes y mapa de URLs |
| 3. Contenido | Sol + seo-content; seo-local cuando corresponda | Texto real, jerarquía, metadatos y materiales por página |
| 4. Diseño | Astra high + frontend-design cuando aporte | Dirección visual y componentes con el contenido aprobado, móvil y escritorio |
| 5. Implementación | Sol + astro; seo-technical, seo-schema, seo-images, seo-sitemap según necesidad | Web Astro + Tailwind y flujos correspondientes a sus módulos |
| 6. Verificación | seo-page o seo-audit según alcance; seo-google con acceso; seo-drift para comparar cambios | Entrega verificable, línea base y pendientes explícitos |

Se activa seo-hreflang para sitios multilingües; seo-ecommerce para tiendas; seo-programmatic para generación a escala cuando corresponda. Esas capacidades no autorizan automáticamente compras adicionales. Un seo-audit solicitado sigue su procedimiento completo, pero sus especialistas comparten datos y no reciben presupuestos separados.

Las fases avanzan cuando su resultado cumple el encargo. Se consulta al usuario únicamente por decisiones que le corresponden: una incógnita decisiva, selección visual, ampliación de presupuesto/alcance o publicación todavía no autorizada. Una autorización existente no se vuelve a pedir.

### El contenido guía al diseño

Por página, definir antes del diseño: visitante, intención, información principal, pruebas disponibles, dudas y acción. Usar textos reales. Astra puede proponer dos direcciones comparables si no existe una elegida; no extender una elección estética sin tu decisión.

Luego Sol implementa esa dirección en Astro + Tailwind. Astra revisa el resultado contra el diseño elegido y se corrigen defectos materiales. En una tienda se revisan ficha de producto y compra; en un blog, artículo y navegación; en servicios, página interior y contacto. Ajustar la longitud y disposición del contenido es válido, conservando la información útil. No inventar datos para completar una sección visual.

En el ejemplo de autismo, el sistema pregunta si se trata de información, comunidad o servicio profesional, y quién valida las afirmaciones especializadas. Ese dato cambia la arquitectura y la revisión editorial; no implica elegir el negocio por ti.

## 6. Cuándo está terminado

Una entrega se verifica por resultados observables:

- El contenido responde al propósito y sus afirmaciones tienen respaldo.
- Las páginas y sus enlaces funcionan en móvil y escritorio.
- El contacto o acción principal se prueba de extremo a extremo.
- Metadatos, canonical, robots, sitemap e indexabilidad son coherentes con el entorno.
- Schema e imágenes se ajustan a los datos reales y al sitio.
- No quedan bloqueos críticos en el alcance comprobado; se documenta lo que no pudo probarse.
- La publicación, si está autorizada, se verifica en su URL real.
- La medición queda disponible o se identifica el acceso pendiente.

Cada comprobación se registra como aprobado, fallo, pendiente o no aplica, con evidencia. Antes de cerrar se corrigen fallos materiales de diseño, contenido y funcionamiento; se repiten las pruebas afectadas. Las pruebas específicas de cada módulo se suman a esta lista, no se sustituyen por una revisión de la portada.

El estado de entrega separa `preview_verificada`, `lista_para_publicar`, `publicada_verificada` y `operativa_verificada`. Un build correcto no acredita revisión visual; un carrito diseñado no acredita cobros; un botón que abre WhatsApp no demuestra recepción de pedido. No se declara listo el alcance si falta una dependencia esencial. Un resultado impecable se persigue con estas comprobaciones y correcciones, no con una etiqueta o puntuación automática.

Un score de la skill no es una probabilidad de posicionar. SEO implementado y probado es una entrega; visibilidad y resultados orgánicos se observan después. El presupuesto controla el trabajo de investigación, no compra una posición en Google.

## 7. Cómo repetir sin empezar desde cero

Conserva esta estructura dentro de la raíz del kit, donde está `AGENTS.md`:

```text
AGENTS.md                         reglas comunes para Codex
EMPEZAR.md                        entrada sencilla: idea, público y mercado
PROMPT-MAESTRO.md                  mensaje corto para iniciar o retomar
PERFILES-Y-CALIDAD.md              módulos y comprobaciones específicas
plantillas/proyecto.json           ficha y límites copiables
.control/dataforseo.jsonl          registro compartido; se crea al operar
proyectos/
  nombre-elegido/
    proyecto.json                 ficha, autorización y tanda
    ESTADO.md                     fase, decisiones, pendientes, siguiente paso
    CONTENIDO.md                  textos y mapa de páginas
    .seo-cache/                   datos y resultados de las subskills
    sitio/                        implementación
```

No crees todas las carpetas por adelantado. El coordinador crea lo necesario al iniciar cada proyecto.

El repositorio comparte las instrucciones, plantillas y guía PDF. `proyectos/`, `.control/`, cachés y evidencias privadas quedan fuera de Git; las webs pueden tener repositorios separados. Las skills y credenciales se configuran en el entorno que utiliza el clon.

Si retomas una cartera desde otro clon, vincula el registro privado existente o restaura su copia completa antes de operar. `control_root: "."` en la plantilla se resuelve desde la raíz del kit; el coordinador guarda la ubicación efectiva del registro de la cartera. Clonar no reinicia presupuestos ni autoriza nuevas compras. Conserva un respaldo privado de `.control/`, porque no se sube a GitHub.

La caché de la skill se mantiene en .seo-cache/, con sus esquemas. Añade parámetros, fecha de obtención y fecha de actualización del dato cuando exista. Para la planificación inicial, reutiliza SERPs hasta 7 días y volúmenes hasta 30 días si siguen respondiendo la misma pregunta. Son ventanas propuestas por este sistema, no reglas del proveedor. Si pides evidencia actual, cambian parámetros o hay una contradicción, decide una actualización dentro del presupuesto.

Se pueden compartir datos públicos entre proyectos cuando coincidan consulta, parámetros, fecha y mercado. No mezclar contenido privado, medición, credenciales ni identidad comercial de distintas webs. Live en Labs describe el modo de respuesta; no significa que su volumen se mida en ese instante.

Para escalar, duplica la ficha y reutiliza componentes y comprobaciones. Distribuye trabajo de contenido/código entre agentes; concentra investigación de pago en el coordinador. No reinicies gasto ni reservas al abrir otro chat.

## 8. Uso inmediato

Abre esta carpeta en Codex y utiliza [EMPEZAR.md](EMPEZAR.md). El coordinador aplica [AGENTS.md](AGENTS.md), [los perfiles](PERFILES-Y-CALIDAD.md) y copia [la ficha](plantillas/proyecto.json) para el proyecto que elijas. [PROMPT-MAESTRO.md](PROMPT-MAESTRO.md) conserva las opciones ampliadas para lotes y revisiones.

Si trabajas fuera de la copia del kit, indica su ruta o copia las reglas comunes al proyecto correspondiente. No supongas que una carpeta ajena hereda estas instrucciones. Compartir la URL de GitHub no instala las skills ni inicia el procedimiento por sí solo: Codex debe poder leer los archivos del repositorio.

El siguiente mensaje puede ser una idea de pocas líneas. El sistema completa la ficha mediante preguntas puntuales y ejecuta las fases; tú no necesitas redactar un megaprompt nuevo para cada web.
