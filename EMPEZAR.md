# Empieza una web desde la terminal

Clona o descarga este kit **una vez** y abre su carpeta. La raíz es donde están `AGENTS.md` e `iniciar.mjs`; puede tener cualquier nombre y estar en otro equipo. Descargarlo no inicia ninguna web. Conserva también la carpeta oculta `.codex/` incluida en el clon.

Necesitas Node 20 o superior. Para que el iniciador abra Codex, necesitas también Codex CLI instalado y una sesión disponible; puedes usar el chat del IDE en su lugar. Las skills, modelos y servicios se comprueban después: no se instalan ni conectan al descargar el kit.

## 1. Ejecuta el iniciador

Abre una terminal **en la raíz del kit** y ejecuta:

```sh
node iniciar.mjs
```

Responde con tus palabras. Verás **una pregunta cada vez**, sobre idea, público, mercado, acción principal, alcance y materiales. Según lo que necesites, aparecerán preguntas de tienda o reservas: comprar en línea frente a pedir por contacto, disponibilidad, proveedor, gestión y edición. Si te falta algo, indícalo; no tienes que conocer arquitectura ni rellenar JSON.

Ejemplo: una tienda de café con blog para compradores de Perú, en español, con pago en línea. El sistema conserva esa intención; si todavía no elegiste proveedor de pagos, lo registra como dependencia pendiente.

También defines si quieres solo preview o publicación, con destino y autorización explícitos. La opción inicial es preview; no se contrata hosting ni se publica por crear una ficha.

El presupuesto de datos parte de **USD 0**. La entrevista no usa IA ni llama a DataForSEO. Si eliges un presupuesto positivo, debes autorizarlo explícitamente dentro del perfil permitido, con techo inicial de USD 1 por web. Es un máximo acumulado, no un gasto obligatorio ni una cuota mensual. Los demás servicios y la publicación conservan sus autorizaciones propias.

## 2. Lee la meta y deja trabajar a Codex

Al terminar, el iniciador guarda en `proyectos/<nombre>/`:

- `proyecto.json`: respuestas y alcance.
- `META.md`: meta visible que guiará la entrega.
- `ESTADO.md`: situación inicial y pendientes.
- `INICIAR-CODEX.md`: mensaje de arranque para Codex.

`META.md` define páginas y cantidades, funciones, entregables, lo que queda fuera, flujos a comprobar y dependencias pendientes. Codex la completa con decisiones derivadas de tus respuestas antes de investigar; no te pide una aprobación adicional para avanzar. Si una decisión esencial sigue sin respuesta, la identifica y continúa lo que pueda resolver de forma independiente.

En el ejemplo, la meta podría incluir inicio, catálogo, fichas de los productos que aportaste, carrito, checkout, confirmación e índice de blog con los artículos acordados. No se inventan productos, precios ni pruebas comerciales. Sol redacta los artículos del alcance y fija cantidades explícitas en la meta. Sin proveedor de pagos, la integración y su comprobación siguen pendientes; una pantalla de checkout no acredita una tienda operativa.

El iniciador intenta abrir **Codex CLI interactivo con GPT-6.1 Sol / high**. Si no está instalado o no se puede abrir, usa el mensaje de `INICIAR-CODEX.md` en el chat de Codex con esta carpeta abierta. El inicio de sesión, permisos o acceso a modelos pueden requerir pasos del entorno; no se eluden para prometer una sola pausa.

Si quieres elegir desde el principio el chat del IDE, ejecuta:

```sh
node iniciar.mjs --solo-preparar
```

Hace la entrevista y prepara los mismos archivos; luego pega el mensaje generado en el chat. **El comando va en la terminal; el contenido de `INICIAR-CODEX.md` va en el chat.**

## 3. Elige entre tres diseños reales

Codex investiga con lo autorizado y prepara el contenido antes del diseño. Contenido, SEO, programación y verificaciones usan **GPT-6.1 Sol / high**. Diseño y revisión visual usan **GPT-6 Astra / ultra**.

El kit incluye configuración local: `.codex/config.toml` para el coordinador Sol high y `.codex/agents/disenador.toml` para el rol de diseño Astra ultra. El cliente debe cargar la configuración, confiar en el repositorio cuando corresponda y tener acceso a ambos modelos. Sol delega al rol `disenador` en la fase adecuada. El chat del IDE puede requerir otra forma de selección o traspaso.

El agente comprueba la selección real y la capacidad de delegar. Si no puede hacerlo, registra el problema y prepara el traspaso; no afirma que cambió de modelo por escribir su nombre ni sustituye silenciosamente el modelo solicitado. Los identificadores y esfuerzos admitidos dependen del cliente y de la cuenta.

Recibirás un comparador con **A, B y C**, tres mockups navegables con contenido real y diferencias en **composición, tipografía y estilo**. Incluye escritorio, móvil y una página interior representativa: producto en tienda, artículo en blog, servicio o ficha según el alcance. En una landing de una sola página, se compara el recorrido de sus secciones. Son URLs de vistas previas realmente iniciadas, no tres descripciones o paletas.

El agente revisa y mejora las propuestas internamente antes de mostrarlas; descarta las que no cumplen el contenido y los criterios visuales. El nombre del modelo o un prompt no garantiza un resultado excelente.

Esta es la **única pausa ordinaria después de la entrevista**. Responde, por ejemplo:

```text
Elijo B. Conserva su composición y tipografía; usa el tratamiento de fotos de A.
```

La elección queda guardada. Después Codex extiende esa dirección sin pedir permiso por fase.

## 4. Recibe una entrega comprobada contra la meta

Codex implementa en **Astro + Tailwind CSS**, comprueba tipos y build, recorre móvil y escritorio, revisa enlaces, contenido y SEO, y prueba los flujos críticos. Corrige los defectos materiales y repite las comprobaciones afectadas hasta cumplir la meta o dejar claro un bloqueo externo.

La entrega incluye URL real de preview o publicación autorizada, ubicación del código, comparación con `META.md`, qué está comprobado, qué falta, gasto de datos y forma de mantenimiento. Los pagos se prueban en modo de prueba, sin cobros reales. El registro en `ESTADO.md` distingue preview, publicación y operación real.

Una dependencia esencial, credenciales faltantes, un modelo no disponible o una ampliación de coste/alcance puede necesitar tu decisión. Codex continúa el trabajo independiente y no declara resuelto lo que no probó. Publicar requiere autorización existente; ninguna plantilla publica por sí sola. El SEO comprobado no garantiza posiciones ni resultados orgánicos.

La preview local funciona mientras su servidor siga ejecutándose. Una URL pública tiene su propio hosting y debe comprobarse después de publicar.

## Otra web u otro día

Para una web nueva, vuelve a ejecutar `node iniciar.mjs` **en la misma copia del kit** y usa otro nombre. Cada proyecto guarda sus archivos en `proyectos/<nombre>/`; no clones por web.

Para retomar, abre el kit en Codex y pega:

```text
Retoma proyectos/[nombre]. Lee META.md, proyecto.json, ESTADO.md y CONTENIDO.md
si existe. Continúa con las decisiones y autorizaciones guardadas, sin repetir
la entrevista ni la elección visual resueltas. Conserva el presupuesto acumulado
y reconcilia el registro de la cartera antes de cualquier compra.
```

Respalda los proyectos y el registro privado por separado: están excluidos de Git. Si cambias de equipo, restaura o vincula el registro original; clonar no vuelve a poner a cero los presupuestos.
