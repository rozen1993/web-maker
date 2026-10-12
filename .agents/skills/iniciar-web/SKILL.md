---
name: iniciar-web
description: Inicia o retoma por chat el único proyecto web del kit PLAN. Úsala con $iniciar-web, con nombre opcional, para abrir el brief y continuar las fases del kit; no para modificar el propio kit.
---

# Iniciar una web por chat

La raíz del kit es tres directorios por encima de esta carpeta y contiene `AGENTS.md`.
Lee ese archivo y `ENTREGA.md`. La interacción del usuario permanece en este chat;
el coordinador ejecuta las herramientas locales. No abras un cuestionario terminal.

1. Revisa `proyectos/` y `out/`. Hay un único proyecto por copia, incluso terminado.
   Si hay varios proyectos antiguos, muestra el conflicto sin borrarlos ni escoger uno.
   Si hay uno y no se indicó otro nombre, retómalo; no repitas decisiones registradas.
   Si se pide otro, explica que necesita otra copia limpia del kit; no sobrescribas.
   Si no hay proyecto ni nombre, pide solo el nombre. No lo deduzcas de ejemplos.
2. Con el nombre real, usa `abrirProyectoChat({root, name})` exportada por
   `scripts/iniciar-chat.mjs` (ruta desde la raíz). Prepara o recupera el brief,
   sin IA adicional, pagos, publicación ni autorizaciones nuevas. No edites
   contadores financieros ni crees un historial vacío para reemplazar otro.
3. Delega la entrevista a `entrevistador`: Astra high, según AGENTS. Transmite
   respuestas reales y presenta una sola pregunta cada vez. El coordinador conserva
   respuestas y pendientes después de cada respuesta. Si falta capacidad del modelo,
   informa el bloqueo; un texto en el prompt no prueba que cambió el modelo.
4. Conserva la idea y recoge la suposición sobre el público y el resultado útil deseado.
   Sol high concreta META y contrasta hipótesis con evidencia en las fases SEO.
   Continúa las fases y especialidades aplicables de AGENTS; presupuesto y elección
   visual son las dos pausas ordinarias después de la entrevista.
5. Astra ultra define/revisa el diseño. Sol high programa los mockups y toda la web.
   El código vive en `out/`; informes y control en `proyectos/<nombre>/`.
   Sigue ENTREGA para pruebas, paquete desplegable y estados reales. No declares lista
   una web por existir la carpeta. No publiques ni gastes por invocar esta skill.

Invocaciones: `$iniciar-web`, `$iniciar-web Mi web` o `$iniciar-web retoma`.
`retoma` es una acción, no un nombre de proyecto. Si no existe ninguno, pide el nombre.
