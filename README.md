# Kit de webs con Astro, Tailwind y SEO

Convierte una idea en una web con contenido, diseño, SEO y verificaciones. Admite servicios, portfolios, blogs, catálogos, tiendas, directorios y reservas combinados según tu proyecto.

**Empieza en [EMPEZAR.md](EMPEZAR.md).** Clona o descarga el kit **una vez**. Para cada web, reutiliza esa carpeta y ejecuta en su terminal:

```sh
node iniciar.mjs
```

Necesitas **Node 20 o superior**. El iniciador te entrevista **una pregunta cada vez**, guarda el proyecto en `proyectos/<nombre>/` y muestra una meta concreta. La entrevista no usa IA ni consume DataForSEO. Después intenta abrir Codex CLI interactivo con **GPT-6.1 Sol / high**; si no está instalado, deja el mensaje preparado para el chat. Descargar o abrir archivos no ejecuta el sistema.

Si prefieres trabajar en el IDE:

```sh
node iniciar.mjs --solo-preparar
```

Esta opción realiza la misma entrevista y prepara `INICIAR-CODEX.md` para pegarlo en el chat, sin abrir Codex CLI. No necesitas editar JSON, elegir subskills ni redactar un megaprompt.

## Qué sucede después

Codex lee la ficha y `META.md`, investiga dentro de lo autorizado y prepara contenido. **GPT-6 Astra / ultra** construye y revisa tres mockups A/B/C con contenido real, distintos en composición, tipografía y estilo. Los presenta en navegador mediante URLs reales, con escritorio, móvil e interior representativo cuando corresponda. **GPT-6.1 Sol / high** realiza contenido, SEO, programación y comprobaciones.

Codex comprueba selección real y capacidad de delegación: escribir un modelo en el prompt no lo selecciona ni garantiza acceso. Si falta el modelo requerido, prepara el traspaso y registra el impedimento; no lo sustituye silenciosamente.

La única pausa ordinaria tras la entrevista es para **elegir A, B, C o una combinación concreta**. Luego implementa, prueba y corrige hasta entregar lo acordado en `META.md`. Una dependencia esencial, acceso faltante, coste fuera de alcance o publicación sin autorización puede requerir tu intervención; continúa las tareas independientes. El CLI también puede pedir inicio de sesión o permisos del entorno: el kit no los evita.

## Qué necesitas

- Node 20+ para el iniciador; herramientas de construcción y navegador para comprobar las webs.
- Codex CLI instalado y con sesión disponible, o Codex en tu IDE con acceso a la carpeta.
- Acceso a los modelos indicados y orquestación compatible en ese entorno.
- Skills `astro`, `frontend-design` y las skills SEO pertinentes de agricidaniel instaladas. El clon no las instala.
- Para datos de pago: MCP DataForSEO y credenciales fuera de Git. El presupuesto inicial es **USD 0**; un importe positivo necesita autorización explícita dentro del perfil permitido. Se verifican precios, saldo y registro antes de comprar.

Una tienda, reservas o edición con panel pueden requerir proveedores y accesos adicionales. La plantilla no autoriza suscripciones, cobros reales ni publicación. Los proyectos registran versiones y lockfile al construirse; el kit no garantiza que una versión o modelo esté disponible en otro equipo.

## Archivos del kit

| Archivo | Para qué sirve |
|---|---|
| [EMPEZAR.md](EMPEZAR.md) | Uso paso a paso y ejemplo |
| [iniciar.mjs](iniciar.mjs) | Entrevista terminal y preparación del proyecto |
| [.codex/config.toml](.codex/config.toml) y [.codex/agents/disenador.toml](.codex/agents/disenador.toml) | Configuración local del coordinador Sol high y del rol de diseño Astra ultra |
| [AGENTS.md](AGENTS.md) | Reglas del coordinador, modelos y costes |
| [PROMPT-MAESTRO.md](PROMPT-MAESTRO.md) | Mensajes para chat, continuidad y revisiones |
| [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md) | Módulos y comprobaciones por tipo de web |
| [SISTEMA-PILOTO.md](SISTEMA-PILOTO.md) | Procedimiento y política de costes |
| [plantillas/proyecto.json](plantillas/proyecto.json) | Ficha que completa el sistema |

Conserva la carpeta oculta `.codex/` al clonar o descargar. El cliente debe cargar esta configuración y la cuenta debe tener acceso a los modelos; Sol delega al rol `disenador` durante la etapa visual. La configuración no evita login, confianza del repositorio ni permisos del entorno, y otros clientes pueden requerir un traspaso.

La [guía PDF del 9/10/2026](output/pdf/guia-de-uso.pdf) se conserva como historial: **no incluye el iniciador CLI ni el flujo actualizado**. Para usar el kit, sigue `EMPEZAR.md` y los archivos actuales.

## Un kit, varios proyectos privados

Cada web vive en `proyectos/<nombre>/`, con ficha, meta, decisiones, contenido y código propios. No clones el kit de nuevo para cada web. Las webs pueden tener repositorios propios; `proyectos/`, `.control/`, `.seo-cache/`, credenciales y evidencias privadas quedan fuera de Git y requieren respaldo separado.

El registro DataForSEO de una cartera nueva es `.control/dataforseo.jsonl`. Al trasladar o volver a clonar una cartera existente, vincula su registro privado original o restaura su copia completa y reconcíliala antes de pagar. **Un clon no reinicia presupuestos, gasto ni reservas.** Un único coordinador compra datos. Estos archivos son instrucciones, no un bloqueo técnico del MCP ni un límite configurado en el proveedor.
