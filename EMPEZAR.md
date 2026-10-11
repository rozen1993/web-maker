# Empieza una web desde la terminal

Clona o descarga el kit una vez y abre su carpeta. La raíz contiene `AGENTS.md` e `iniciar.mjs`, puede tener cualquier nombre y debe conservar `.codex/`. Necesitas Node 20+ y Codex CLI con sesión disponible, o Codex en tu IDE. Descargar el kit no instala skills ni conecta servicios.

## 1. Responde una pregunta cada vez

Desde la raíz ejecuta:

```sh
node iniciar.mjs
```

Describe idea, público, mercado, acción principal, alcance y materiales con tus palabras. El iniciador pregunta también por pagos, stock, editor o reservas cuando correspondan. No exige conocimientos de SEO ni JSON.

Define si quieres preview o publicación, con destino y autorización explícitos. Preview es el punto de partida; crear la ficha no contrata servicios ni publica.

La entrevista no consume DataForSEO. Solo pregunta por una **preexploración pequeña**: USD 0 por defecto y USD 0.10 sugeridos, autorizables expresamente. Ese cupo sirve para estimar la investigación, no para autorizar todo el SEO. La investigación principal se presupuesta después según tu proyecto; no se limita por defecto a USD 1.

## 2. Lee la meta inicial

El iniciador guarda en `proyectos/<nombre>/`:

- `proyecto.json`: respuestas, alcance y autorizaciones.
- `META.md`: páginas y cantidades, funciones, contenido, entrega, criterios comprobables, exclusiones y dependencias.
- `ESTADO.md`: etapa y pendientes.
- `INICIAR-CODEX.md`: mensaje de arranque.

Sol concreta la meta antes de explorar, sin otra aprobación habitual. Resuelve las decisiones esenciales aún dentro de la entrevista. Por ejemplo, una tienda con blog conserva catálogo, pago en línea y artículos acordados; un proveedor pendiente se registra, y no se transforma la tienda en pedido por WhatsApp.

El iniciador intenta abrir Codex CLI con **GPT-6.1 Sol / high**. Si falta el CLI o prefieres el IDE, ejecuta:

```sh
node iniciar.mjs --solo-preparar
```

Pega `INICIAR-CODEX.md` en el chat con esta carpeta abierta. **El comando va en la terminal; el mensaje generado va en el chat.** Inicio de sesión, confianza y permisos siguen dependiendo del entorno.

## 3. Aprueba el presupuesto de investigación

Sol hace una exploración acotada con fuentes gratuitas y el cupo de DataForSEO que hayas autorizado. Define temas, mercados, incertidumbres y evidencia necesaria; no ejecuta todavía la investigación principal.

Recibirás `PRESUPUESTO-SEO.md`: propuesta identificada y versionada, consultas previstas, cantidades, ubicación/idioma/dispositivo, tarifas verificadas y sus fuentes, resultados esperados y cobertura pendiente. Muestra por separado **gasto y reservas previos, máximo adicional y total acumulado del proyecto**, con margen incluido y exclusiones. Puedes elegir una opción o ajustar alcance antes de aprobar. No basta el saldo de la cuenta ni un presupuesto escrito por el agente.

Esta es la primera pausa ordinaria después de la entrevista. Tu aprobación debe identificar la propuesta y sus límites exactos. Sin ella se conserva `dataforseo.investigacion.authorization: null` y no se hacen compras de investigación principal. La autorización cubre sus llamadas; no se pide permiso por cada una.

Al presentar la propuesta se cierran las compras de preexploración para mantener estable el acumulado. Tras aprobar, todas las nuevas consultas consumen el máximo adicional aprobado, incluso las que aclaren una pregunta inicial.

Después, Sol aplica el sistema completo `seo` de AgriciDaniel y DataForSEO dentro de lo autorizado, prepara arquitectura y contenido reales y registra la evaluación de las 26 subskills en `SEO-COBERTURA.md`. Las disciplinas pertinentes siguen su procedimiento completo; las que no apliquen llevan una razón. Falta de acceso es pendiente o bloqueo, no una excusa para marcar «no aplica».

## 4. Elige una homepage

**GPT-6 Astra / ultra** prepara **A, B y C** con el contenido real, diferencias de composición, tipografía y lenguaje visual. Recibirás un comparador navegable con URLs realmente comprobadas y homepages responsive revisadas en navegador, en escritorio y móvil. Una vista interior se añade cuando ayude a valorar el recorrido; no hace falta construir tres webs enteras para elegir.

Esta es la segunda pausa ordinaria. Responde, por ejemplo:

```text
Elijo B. Conserva su composición y tipografía; usa el tratamiento de fotos de A.
```

El agente guarda elección y ajustes antes de continuar. Si pides cambios a las propuestas, permanece en esta etapa.

El kit solicita Sol high para coordinación, investigación, contenido y QA; Astra ultra para mockups y desarrollo de **toda** la web, mediante `disenador` y `desarrollador` en `.codex/`. El cliente debe cargar esos roles y tu cuenta tener acceso. El agente registra selección real; si no es posible, explica el impedimento y prepara un traspaso sin sustituir modelos silenciosamente.

## 5. Recibe una entrega comprobada

Astra desarrolla el sitio elegido en **Astro + Tailwind CSS** con TypeScript y datos centralizados. Sol ejecuta la auditoría SEO completa, tipos, build, rutas, enlaces, accesibilidad, recorridos de móvil/escritorio y pruebas de los flujos críticos. Astra corrige defectos de código y diseño; Sol comprueba las correcciones hasta satisfacer `META.md` o dejar un bloqueo externo explícito.

La entrega incluye URL real, código, comparación contra la meta, cobertura SEO, evidencia, pendientes y costes acumulados. Una preview local funciona mientras su servidor siga activo. Una publicación autorizada exige comprobar la URL pública. Pagos se prueban en modo de prueba, sin cobros reales; una pantalla simulada no acredita operación.

No hay aprobaciones ordinarias adicionales de contenido, arquitectura, construcción o pruebas. Accesos, permisos, cambios de alcance/coste y publicación sin autorización se resuelven solo cuando impiden una acción concreta. El SEO comprobado no garantiza posiciones ni resultados orgánicos. La recomendación de mantenimiento no activa consultas ni gastos recurrentes.

## Otra web u otro día

Para otra web, ejecuta `node iniciar.mjs` en esta misma copia y usa otro nombre. Para retomar, abre el kit y pega:

```text
Retoma proyectos/[nombre]. Lee META.md, proyecto.json, ESTADO.md,
CONTENIDO.md, PRESUPUESTO-SEO.md y SEO-COBERTURA.md si existen.
Conserva decisiones y autorizaciones; continúa la siguiente fase pendiente.
No repitas la entrevista, aprobación del presupuesto ni elección visual resueltas.
Reconcilia gasto y reservas con el registro privado compartido antes de comprar.
```

Respalda proyectos y registro privado fuera de Git. Un traslado o clon conserva la misma cartera: no reinicia presupuestos ni reemplaza su historial.
