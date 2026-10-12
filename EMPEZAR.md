# Empieza una web desde el chat de Codex

Actualizada el 12 de octubre de 2026: comando $iniciar-web, un proyecto por copia, web en out/ y contraste entre suposiciones y evidencia del público.

Clona o descarga el kit una vez y abre su carpeta en Codex. La raíz contiene `AGENTS.md` e `iniciar.mjs`, puede tener cualquier nombre y debe conservar `.codex/` y `.agents/`, donde viven los roles y la skill de inicio. Para ejecutar las herramientas locales necesitas Node 20+. Descargar el kit no instala skills ni conecta servicios.

## 1. Responde una pregunta cada vez

Con el kit abierto, escribe en el chat:

```text
$iniciar-web [nombre]
```

Por ejemplo: `$iniciar-web Brújula Azul`. También puedes escribir solo `$iniciar-web`: te preguntará el nombre. Es una skill local de Codex; si no aparece, vuelve a abrir la sesión. Alternativa: «Lee .agents/skills/iniciar-web/SKILL.md e inicia». Cada copia admite un solo proyecto. El coordinador revisa primero si hay datos guardados y los reutiliza. Si la carpeta ya existe, retoma lo pendiente sin borrarla ni obligarte a empezar de cero. Puedes describir la idea con tus palabras; no necesitas conocimientos de SEO, editar JSON ni elegir subskills.

**Astra high lleva la entrevista**; Sol coordina y guarda las respuestas. Toda tu interacción será por este chat, sin usar la terminal. La primera decisión, si no está resuelta, es **web nueva o renovación de una web publicada**. Después concreta idea, público, mercado, acción principal, alcance y materiales. La IA puede añadir preguntas sobre pagos, stock, editor, reservas u otras necesidades: una por vez y solo cuando la respuesta cambie una decisión. No impone una lista rígida ni vuelve a preguntar lo ya respondido.

Si renuevas, indica la dirección actual, si mantendrás el dominio, qué mejorar y qué conservar. El asistente pregunta también por páginas/funciones importantes, accesos a medición, tecnología, alojamiento, código y respaldo. No compartas contraseñas: basta indicar qué accesos tienes. La IA preparará el inventario y el mapa de URLs; conservar el dominio no garantiza posiciones constantes.

Define si quieres preview o publicación, con destino y autorización explícitos. Preview es el punto de partida; crear la ficha no contrata servicios ni publica.

La entrevista en chat utiliza tu sesión de IA, pero no compra datos. Pregunta por una **preexploración pequeña**: USD 0 por defecto y USD 0.10 sugeridos, autorizables expresamente. Ese cupo sirve para estimar la investigación, no para autorizar todo el SEO. La investigación principal se presupuesta después según tu proyecto; no se limita por defecto a USD 1.

Para esa preexploración, indica un importe de USD 0 a USD 1 con **máximo dos decimales**, usando punto o coma: por ejemplo, `0.10` o `0,10`. Un importe positivo necesita autorización expresa; el importe confirmado debe coincidir con el guardado.

## 2. Lee la meta inicial

En chat, el coordinador guarda progresivamente en `proyectos/<nombre>/`:

- `proyecto.json`: respuestas, alcance y autorizaciones.
- `META.md`: páginas y cantidades, funciones, contenido, entrega, criterios comprobables, exclusiones y dependencias.
- `ESTADO.md`: respuestas parciales, decisiones y siguiente pregunta; conserva `brief_en_curso` hasta concretar la entrevista.
- `BITACORA.jsonl`: hechos, decisiones y pruebas registrados por el coordinador.
- `MEJORAS.md`: incidencias, correcciones y aprendizajes, inicialmente pendientes.
- Solo al renovar, `MIGRACION-SEO.md`: plantilla para la baseline, mapa de URLs y transición.

La meta se concreta a partir de tus respuestas y se muestra antes de producir. Guardar un borrador no marca el brief como terminado ni autoriza gastos. Si cierras el chat, puedes retomar desde el último estado guardado. `INICIAR-CODEX.md` se utiliza cuando hace falta un traspaso; no necesitas pegarlo si ya trabajas en esta conversación.

Sol concreta la meta antes de explorar, sin otra aprobación habitual. Resuelve las decisiones esenciales aún dentro de la entrevista. Por ejemplo, una tienda con blog conserva catálogo, pago en línea y artículos acordados; un proveedor pendiente se registra, y no se transforma la tienda en pedido por WhatsApp.

El iniciador de terminal se conserva por compatibilidad, pero no forma parte de tu flujo: puedes iniciar, responder, aprobar, elegir diseño y retomar desde el chat. La IA ejecuta las herramientas locales necesarias.

## 3. Aprueba el presupuesto de investigación

Sol hace una exploración acotada con fuentes gratuitas y el cupo de DataForSEO que hayas autorizado. Contrasta preliminarmente tu idea original con necesidades expresadas en búsquedas, resultados y oportunidades del sector; define temas, mercados, incertidumbres y evidencia necesaria. Todavía no ejecuta la investigación principal.

Recibirás `PRESUPUESTO-SEO.md` con tres alternativas identificadas y versionadas:

- **Mínimo suficiente:** evidencia necesaria para las decisiones prioritarias del alcance.
- **Estándar:** mayor contraste de competencia, temas y oportunidades pertinentes.
- **Óptimo:** profundidad adicional cuyo valor justifique el coste para tu proyecto.

Sol recomienda una y explica qué resuelve, cuánto cuesta ampliar y qué incertidumbre queda. Todas mantienen los controles esenciales; una alternativa insuficiente se declara no viable. Si dos opciones no aportan diferencias reales, lo indica. Puedes elegir o pedir ajuste; no hay obligación de pagar la más cara.

Cada opción viable detalla consultas, cantidades, mercado, tarifas verificadas, límites y exclusiones. Muestra **gasto y reservas previos, máximo adicional y total acumulado**, con margen incluido. La base previa es común: las tres propuestas no se suman y solo se ejecuta la elegida.

Esta es la primera pausa ordinaria después de la entrevista. Tu aprobación identifica opción, propuesta/version y límites exactos. Por ejemplo: «Apruebo la opción estándar de la propuesta SEO-01, versión 1, con los máximos adicional y total que indica». Es solo un ejemplo; usa los datos de tu propuesta real. Sin aprobación la autorización sigue vacía y no se compra investigación principal. La autorización cubre sus llamadas; no se pide permiso por cada una.

Los niveles de presupuesto no son porcentajes de éxito ni escenarios de tráfico. Antes de aprobar recibirás rangos preliminares solo si hay evidencia suficiente; de lo contrario, `no_estimable`. Más datos no garantizan más visitas para la misma web. Tras investigar se revisa la estimación de la opción elegida. En renovación se separan tráfico existente, total esperado e incremento.

Al presentar la propuesta se cierran las compras de preexploración para mantener estable el acumulado. Tras aprobar, todas las nuevas consultas consumen el máximo adicional aprobado, incluso las que aclaren una pregunta inicial.

Después, Sol aplica el sistema completo `seo` de AgriciDaniel y DataForSEO dentro de lo autorizado, prepara arquitectura y contenido reales y registra la evaluación de las 26 subskills en `SEO-COBERTURA.md`. Las disciplinas pertinentes siguen su procedimiento completo; las que no apliquen llevan una razón. Falta de acceso es pendiente o bloqueo, no una excusa para marcar «no aplica». Antes de escribir, compara la idea original con intención de búsqueda, competencia y capacidad real de cumplir la promesa.

Antes del diseño, recibirás `SEO-STRATEGY.md`, basado en [su plantilla](plantillas/SEO-STRATEGY.md): qué búsquedas pretende captar la web, con qué páginas, qué muestra la competencia y qué oportunidad existe **sin asumir una campaña nueva de enlaces ni otras acciones off-page**. Si los datos permiten estimarlo, incluirá escenarios conservador, central y favorable de clics orgánicos mensuales de Google en los meses 3, 6 y 12 desde la publicación, con fuentes y supuestos. Son rangos condicionados, no promesas; cero también es posible. Si faltan datos, indicará `no_estimable` y la incertidumbre concreta.

La estrategia incluye una comparación: **lo que creías que quería el público, evidencia a favor y en contra, qué conviene cambiar y cómo comprobarlo**. Las búsquedas aportan señales, no acceso directo a la mente del cliente. Se aprovechan consultas, objeciones y conversiones reales cuando existan. También se define el resultado útil: por ejemplo, consultas cualificadas recibidas, pedidos confirmados o reservas, con objetivo, plazo y fuente de medición. Un clic en WhatsApp no se cuenta como venta.

La estrategia recomienda mantener la idea, ajustar el enfoque del contenido o proponer una modificación concreta. Conserva tu idea original para que puedas comparar. Los cambios editoriales dentro del alcance se documentan y aplican; si propone cambiar público, oferta, acción principal, forma de ganar dinero, páginas o integraciones, necesita tu decisión expresa. Aprobar el presupuesto solo autoriza la investigación. Si mantienes la idea original, Sol la respeta y explica sus límites; no supone que harás off-page o publicarás contenido nuevo cada mes para sostener sus cifras. Esta evaluación no añade una aprobación habitual para cada texto o página.

## 4. Elige una homepage

**GPT-6 Astra / ultra** diseña **A, B y C**; Sol high programa sus páginas de prueba con el contenido real, diferencias de composición, tipografía y lenguaje visual. Recibirás un comparador navegable con URLs realmente comprobadas y homepages responsive revisadas en navegador, en escritorio y móvil. Una vista interior se añade cuando ayude a valorar el recorrido; no hace falta construir tres webs enteras para elegir.

Esta es la segunda pausa ordinaria. Responde, por ejemplo:

```text
Elijo B. Conserva su composición y tipografía; usa el tratamiento de fotos de A.
```

El agente guarda elección y ajustes antes de continuar. Si pides cambios a las propuestas, permanece en esta etapa.

El kit solicita Astra high como `entrevistador`; Sol high para coordinación, investigación, contenido, QA y programación de **toda** la web; Astra ultra para dirección y revisión visual. Los roles `disenador` (Astra ultra) y `desarrollador` (Sol high) están en `.codex/`. El cliente debe cargar esos roles y tu cuenta tener acceso. El agente registra selección real; si no es posible, explica el impedimento y prepara un traspaso sin sustituir modelos silenciosamente.

## 5. Recibe una entrega comprobada

Sol 6.1 high desarrolla el sitio elegido en **Astro + Tailwind CSS** con TypeScript y datos centralizados. Sol ejecuta la auditoría SEO completa, tipos, build, rutas, enlaces, accesibilidad, recorridos de móvil/escritorio y pruebas de los flujos críticos. Astra revisa el diseño; Sol 6.1 high programa las correcciones; Sol comprueba las correcciones hasta satisfacer `META.md` o dejar un bloqueo externo explícito.

Encontrarás la web completa en **`out/`**, separada de la ficha y los informes privados. Incluye código Astro, lockfile, configuración y `DESPLIEGUE.md` con instrucciones y pendientes del destino elegido. En estático, el build normalmente produce `out/dist/`; una web con servidor requiere su adaptador y configuración. La IA realiza las comprobaciones: existir en `out/` no basta para declararla lista. Lee [ENTREGA.md](ENTREGA.md).

La entrega incluye URL real, código, comparación contra la meta, cobertura SEO, evidencia, pendientes y costes acumulados. Una preview local funciona mientras su servidor siga activo. Una publicación autorizada exige comprobar la URL pública. Pagos se prueban en modo de prueba, sin cobros reales; una pantalla simulada no acredita operación.

Al renovar, el coordinador compara URLs y contenido con la baseline y documenta redirecciones, respaldo, reversión y riesgos de transición. Tras una publicación autorizada verifica las rutas y flujos públicos. Si acordaste preview, la entrega muestra qué falta probar en producción. El seguimiento posterior solo se ejecuta si se incluyó expresamente en el alcance.

Puedes consultar `ESTADO.md` para un resumen y `MEJORAS.md` para incidencias y soluciones. El coordinador registra hechos en `BITACORA.jsonl` usando el helper explicado en BITACORA.md: una solución propuesta no queda resuelta hasta comprobarla. No necesitas escribir eventos ni editar JSON. Este registro no captura automáticamente todas las acciones ni activa cambios en otros proyectos.

En `SEO-STRATEGY.md` tendrás también recomendaciones off-page **opcionales y específicas de tu rubro**, basadas en lo investigado: prioridad, motivo, evidencia, acción que te correspondería y esfuerzo o coste conocido. Tú decides si las aplicas; recibirlas no autoriza contactos, compras de datos, gastos ni servicios externos. La estrategia base y sus cifras no dependen de ejecutarlas, y las recomendaciones no dan por demostrado que la web ya recibe tráfico.

No hay aprobaciones ordinarias adicionales de contenido, arquitectura, construcción o pruebas. Accesos, permisos, cambios de alcance/coste y publicación sin autorización se resuelven solo cuando impiden una acción concreta. El SEO comprobado no garantiza posiciones ni resultados orgánicos. La recomendación de mantenimiento no activa consultas ni gastos recurrentes.

## Otra web u otro día

Para otra web, conserva esta entrega y descarga otra copia limpia del kit. No se crean varias webs dentro de la misma copia. Para retomar esta, basta `$iniciar-web retoma`. También puedes dar instrucciones explícitas:

```text
Retoma proyectos/[nombre]. Lee META.md, proyecto.json, ESTADO.md,
CONTENIDO.md, PRESUPUESTO-SEO.md, SEO-STRATEGY.md y SEO-COBERTURA.md si existen.
Revisa BITACORA.jsonl, MEJORAS.md y MIGRACION-SEO.md cuando corresponda.
Conserva decisiones y autorizaciones; continúa la siguiente fase pendiente.
Si el brief sigue en curso, hazme solo la siguiente pregunta necesaria.
No repitas la entrevista, aprobación del presupuesto ni elección visual resueltas.
Reconcilia gasto y reservas con el registro privado compartido antes de comprar.
```

Respalda proyectos y registro privado fuera de Git. Un traslado o clon conserva la misma cartera: no reinicia presupuestos ni reemplaza su historial.
