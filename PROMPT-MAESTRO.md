# Mensajes para iniciar, retomar o revisar

La entrada habitual es `node iniciar.mjs` desde la raíz del kit; la guía está en [EMPEZAR.md](EMPEZAR.md). `--solo-preparar` prepara el mensaje para el IDE. El sistema entrevista una pregunta cada vez y guarda `META.md`; no necesitas escribir un megaprompt para cada web.

Si prefieres empezar directamente en el chat, pega este mensaje. **No autoriza consultas de pago ni publicación.**

```text
Lee AGENTS.md y PERFILES-Y-CALIDAD.md de la raíz del kit.
Quiero crear una web sobre [idea], para [público y mercado].
Su acción principal es [acción]. Los materiales disponibles son [materiales].
Crea proyectos/[nombre] en esta copia del kit; no clones el kit por web.

Haz las preguntas que falten UNA POR UNA y reutiliza mis respuestas.
Conserva mi idea y modalidad de negocio. Distingue datos confirmados y pendientes.
Pregunta decisiones funcionales esenciales en lenguaje sencillo, sin pedirme
arquitectura ni escoger subskills. Presupuesto de datos USD 0 por ahora.

Al terminar la entrevista, escribe y muestra una meta concreta en META.md:
páginas y cantidades, funciones, entregables, exclusiones, flujos a verificar y
pendientes. Define el alcance a partir de mis respuestas; no pidas una aprobación
adicional de la meta. Avanza contenido, investigación y construcción autorizados.

Usa GPT-6.1 Sol / high para contenido, SEO, programación y comprobaciones;
GPT-6 Astra / ultra para diseño y revisión visual. Comprueba selección real y
delegación disponibles antes de atribuir el trabajo al modelo. El kit configura
el coordinador y el rol disenador en .codex/; verifica que el cliente los cargue.
Si falta acceso o soporte, prepara el traspaso y sigue el trabajo independiente,
sin sustituciones silenciosas. Lee las skills astro y frontend-design y solo
las skills SEO necesarias.

Construye en Astro + Tailwind CSS con datos centralizados y validados.
Prepara contenido real antes del diseño, sin inventar pruebas, precios ni casos.
Entrega un comparador navegable de tres mockups A/B/C distintos en composición,
tipografía y estilo, con URLs reales y vistas de escritorio, móvil e interior
representativo si corresponde. Revisa e itera las propuestas antes de mostrarlas;
descarta las que no cumplan el contenido y los criterios visuales.

La única pausa ordinaria tras la entrevista es mi elección A/B/C o combinación.
Después implementa, prueba y corrige hasta entregar lo acordado en META.md,
sin confirmaciones por fase ni por tareas ya autorizadas. Si falta una dependencia
esencial, acceso o autorización para un coste o publicación, pausa solo la acción
dependiente y continúa las tareas independientes. No eludas permisos del entorno.

Comprueba tipos, build, rutas, enlaces, diseño y recorrido en móvil/escritorio,
SEO técnico y flujos críticos del alcance. Registra evidencia y pendientes en
ESTADO.md; no declares operativas integraciones simuladas. Corrige defectos
materiales y repite las comprobaciones afectadas. Entrega URL real, ubicación,
comparación final contra META.md, verificaciones, pendientes y gasto de datos.
```

## Autorizar datos de un proyecto

Añade esta instrucción solo si quieres autorizar consultas. El importe debe estar dentro del perfil base; copiar o leer este documento no autoriza gasto.

```text
Autorizo hasta USD [importe, máximo 1] acumulado de DataForSEO para la
investigación inicial de proyectos/[nombre], dentro del perfil base de AGENTS.md:
máximo USD 0.10 por intento y los cupos de endpoints/reintentos allí definidos.
No pidas aprobación por llamadas cubiertas. No uses el resto del saldo de la cuenta
ni actives otros servicios. No reinicies presupuesto, gasto ni reservas al retomar.
Localiza y reconcilia el registro privado compartido de la cartera antes de pagar;
clonar no crea una cartera nueva ni sustituye su historial.
```

Un importe autorizado no sustituye la comprobación de endpoint, tarifa máxima, saldo, reservas y cupos. Si falta evidencia para comprar, continuar sin nuevas consultas de pago y registrar cobertura pendiente.

## Un lote identificado

Solo si quieres trabajar por lote, añade una autorización con ID y proyectos explícitos. No se crean lotes ni se incorporan webs por inferencia.

```text
Autorizo hasta USD 10 acumulados de DataForSEO para el lote [ID].
Proyectos incluidos: [lista]. Máximo USD 1 por proyecto y límites de AGENTS.md.
Respeta simultáneamente los saldos del sitio y del lote. Un único coordinador
compra datos y escribe el registro compartido. No traslades saldo ni incorpores
proyectos nuevos sin autorización. Estos límites no se reinician entre chats o clones.
```

## Retomar

```text
Retoma proyectos/[nombre]. Lee META.md, proyecto.json, ESTADO.md, CONTENIDO.md
y caché disponibles. Conserva decisiones, modelos, alcance y autorizaciones.
Reconcilia costes y reservas con el registro compartido antes de cualquier compra.
Continúa la siguiente tarea; no repitas entrevista, diseño o investigación resueltos
sin motivo. Contrasta la entrega contra META.md y registra lo que sigue pendiente.
```

## Revisión posterior

```text
Revisa proyectos/[nombre] en [periodo] para responder [pregunta concreta].
Autorizo hasta USD 0.25 de DataForSEO solo para esta revisión, dentro del saldo
del lote si corresponde. Reutiliza Search Console y datos pertinentes disponibles.
No programes revisiones recurrentes ni repitas auditorías superadas sin motivo.
```

La configuración local `.codex/config.toml` y `.codex/agents/disenador.toml` solicita modelos y esfuerzos explícitos. El cliente debe cargarla y la cuenta debe tener acceso; en otros clientes puede hacer falta un traspaso. Referencias para comprobar capacidades y sintaxis: [comandos del CLI](https://learn.chatgpt.com/docs/developer-commands?surface=cli) y [subagentes](https://learn.chatgpt.com/docs/agent-configuration/subagents). Escribir un nombre en el mensaje no cambia el modelo seleccionado.
