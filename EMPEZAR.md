# Cómo usarlo, paso a paso

## Qué es y dónde está

El sistema que hemos preparado es un **procedimiento para Codex guardado en archivos**.
Codex lee esas instrucciones y hace el trabajo cuando le das una idea en el chat.
Actualmente no hay una aplicación con panel ni una web generada.

La copia original está en este ordenador, aquí:

`C:\Users\MARCO\Desktop\PLAN`

Si lo descargaste de GitHub, el sistema está en la carpeta donde lo clonaste; no necesita llamarse PLAN. **Abre esa carpeta en tu IDE y usa allí el chat de Codex.**
Abrir AGENTS.md te muestra las reglas; abrirlo no inicia una web.
Los mensajes de los ejemplos se pegan en el **chat de Codex**, no en la terminal ni dentro de un archivo.

## Lo único que necesitas abrir

Esta guía: **EMPEZAR.md**.

Los otros archivos los utiliza Codex:
- AGENTS.md contiene las reglas de trabajo y gasto.
- PERFILES-Y-CALIDAD.md explica cómo adaptar y comprobar cada tipo de web.
- plantillas/proyecto.json es la ficha que Codex rellena por ti.
- PROMPT-MAESTRO.md y SISTEMA-PILOTO.md contienen las instrucciones ampliadas.

No tienes que leerlos todos, ejecutarlos ni rellenar el JSON.

## Ejemplo completo: una tienda de café con blog

Este es un ejemplo ilustrativo. **No se ha iniciado ese proyecto ni autorizado gasto por escribir esta guía.**
Puedes sustituir la idea por la tuya.

### Paso 1. Envía este mensaje en el chat

```text
Quiero iniciar el proyecto cafe-ejemplo usando AGENTS.md y
PERFILES-Y-CALIDAD.md de la raíz de este repositorio.

Mi idea es una tienda online de café para compradores de Perú, en español.
Quiero vender productos con pago en línea y tener un blog con guías de café.
Todavía no tengo elegido el proveedor de pagos.

Construye en Astro + Tailwind. Usa mis skills SEO de agricidaniel.
Producción con GPT-6.1 Sol; diseño con GPT-6 Astra high.

Autorizo hasta US$1 total de DataForSEO para la investigación inicial de este
proyecto, con los límites del perfil base. No reinicies ese presupuesto
al retomar el proyecto. No actives otros gastos.

Crea la carpeta proyectos/cafe-ejemplo y rellena tú la ficha.
Pregúntame como máximo tres cosas por turno y avanza por fases.
Cuando haya una vista previa funcionando, dame su enlace para verla.
Antes de publicar, comprueba si ya tienes mi autorización.

Empieza por las preguntas que falten.
```

La frase de US$1 es una autorización para consultas cuando envíes el mensaje.
Puedes cambiar el importe. Es un máximo para esa investigación, no una cuota mensual ni una meta de consumo.
Al preparar la copia original el 9/10/2026, el límite técnico diario de DataForSEO no se configuró ni comprobó. Verifica el estado de tu cuenta antes de depender de esa protección. Si retomas un proyecto desde otro clon, conserva y reconcilia su registro privado; el presupuesto no vuelve a cero.

### Paso 2. Responde las preguntas

Lo primero que recibirás será una tanda de preguntas concretas, por ejemplo:
1. ¿Qué productos, precios y variantes tendrá la primera versión?
2. ¿Qué zonas atiendes y cómo se entregan los pedidos?
3. ¿Tienes nombre, fotos o referencias visuales que quieras utilizar?

Responde con lo que sabes. Si algo falta, di «todavía no lo tengo».
Codex guarda las respuestas, pregunta lo decisivo y distingue datos confirmados de pendientes.
Más adelante resolverá contigo el proveedor de pagos y la forma de editar contenido, si hace falta.

### Paso 3. Revisa el contenido y elige el diseño

Codex investiga dentro del presupuesto, propone páginas y prepara el contenido.
Para este ejemplo, los módulos serían **tienda + blog**.

Cuando llegue la etapa de diseño, se utiliza **Astra high**.
Si no puede delegarlo con ese modelo, Codex te indicará que lo selecciones y te dará el contexto para continuar.
Escribir «usa Astra» no cambia por sí solo el modelo seleccionado.

Recibirás dos direcciones visuales cuando no exista una ya elegida.
Puedes responder: «Elijo la opción B; conserva esa tipografía y usa las fotos de la opción A».
La comparación incluye móvil, escritorio y una página representativa, como un producto.

### Paso 4. Mira la web y pide ajustes

Sol implementa la dirección elegida y los módulos.
Codex debe iniciar la vista previa disponible, comprobarla y entregarte su **URL real**.
Entra en ese enlace para revisar la web: no necesitas abrir archivos .astro para verla.
La dirección y el puerto dependen de lo que se haya iniciado; no hay una URL todavía.

Puedes decir: «En móvil, el texto de producto se ve pequeño; aumenta la legibilidad sin cambiar la dirección visual».
Los ajustes y decisiones quedan guardados.

Los pagos se prueban con el modo de prueba del proveedor elegido.
Si falta esa integración, la vista previa se identifica como tal y la tienda no se declara operativa.

### Paso 5. Recibe la entrega

Codex comprueba diseño, navegación, contenido, SEO y los flujos propios de tienda y blog, y corrige los fallos encontrados.
La entrega debe incluir:
- Enlace para ver la web y ubicación del código.
- Qué funciona y qué falta, con las comprobaciones realizadas.
- Cuánto se gastó en DataForSEO.
- Cómo editar productos y artículos según la solución acordada.
- Qué hace falta para publicar, si aún no está autorizado o configurado.

Para este ejemplo, el código se crearía en `proyectos/cafe-ejemplo/sitio`, dentro de tu copia del kit. En la ubicación original, eso sería:
`C:\Users\MARCO\Desktop\PLAN\proyectos\cafe-ejemplo\sitio`.

**Esa carpeta todavía no existe: la creará Codex cuando inicies el proyecto.**
Una vista previa local depende de que su servidor siga ejecutándose; una publicación tiene su propia URL.

## Cómo continuar otro día

Abre tu copia del kit en el IDE y el chat de Codex, y escribe:

```text
Retoma proyectos/cafe-ejemplo. Lee su estado y continúa la siguiente tarea.
Mantén las decisiones tomadas y el presupuesto acumulado.
```

## Cómo iniciar una web diferente

Envía una idea nueva y un nombre de proyecto distinto:

```text
Inicia proyectos/blog-jardineria siguiendo AGENTS.md y PERFILES-Y-CALIDAD.md.
Quiero un blog en español para aprender jardinería en espacios pequeños.
Usa Astro + Tailwind. Empieza por aclarar público, contenido y estilo.
Por ahora trabaja sin consultas de pago.
```

No hay que copiar todas las reglas para cada web. Cada proyecto guarda su propio contenido, código, decisiones y presupuesto.
