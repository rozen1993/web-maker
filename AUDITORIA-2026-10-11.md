# Auditoría del kit PLAN

Fecha: 11 de octubre de 2026. Base examinada: commit `c0342bd`.

**Actualización posterior:** los defectos H1, H2 y H3 se corrigieron por indicación del usuario. La suite ampliada pasa 32 pruebas. La nota y los hallazgos siguientes conservan la fotografía anterior a esas correcciones; véase el registro de correcciones al final. Las mejoras de arquitectura continúan como propuestas, sin una nueva calificación global.

**Calificación: 74/100 como sistema para producir webs de manera repetible.** Es una valoración de ingeniería con la rúbrica indicada abajo, no una medición estadística ni una probabilidad de éxito comercial o SEO. El 94/100 mencionado anteriormente calificaba la propuesta de contrastar la idea con las necesidades del mercado; no acreditaba esa nota para el sistema completo.

El método tiene alcance, decisiones y controles bien definidos. Su implementación ejecutable cubre principalmente entrevista, preparación de archivos y lanzamiento/traspaso a Codex. Las fases posteriores dependen del cumplimiento de instrucciones por el agente. El mayor avance vendrá de hacer verificables esas reglas, recuperar el trabajo y probar entregas completas.

## Alcance y evidencia

- Revisión de código del iniciador, 14 pruebas, documentos operativos, plantillas, configuración local y roles de agentes. Tres revisiones complementarias: CLI, costes y coherencia.
- `node --test tests/asistente.test.mjs`: 14 aprobadas, 0 fallos. Node local: v24.14.1.
- Reproducciones aisladas de clasificación incorrecta, presupuesto mostrado distinto del registrado y fallo de escritura. No se modificaron proyectos reales.
- JSON de plantilla y tres TOML locales válidos sintácticamente. Catálogo: 26 subskills; audit: 8 especialistas obligatorios y 7 condicionales, coherentes con la skill 1.9.6 revisada.
- 26 enlaces Markdown locales comprobados en 9 documentos: ninguno roto.
- Configuración contrastada con documentación oficial actual: descubrimiento de roles en `.codex/agents/` y claves `[agents]` vigentes. Esto no demuestra acceso de la cuenta, modelo ejecutado ni carga del rol en cada cliente. [Subagentes](https://learn.chatgpt.com/docs/agent-configuration/subagents), [referencia de configuración](https://learn.chatgpt.com/docs/config-file/config-reference).
- No se ejecutó una producción completa con Sol/Astra ni se auditó una web pública. No se realizaron compras DataForSEO, despliegues o cambios de configuración global. Las pruebas actuales no permiten evaluar tráfico ni rentabilidad.
- La revisión original añadió este informe sin corregir código. La implementación posterior de H1-H3 se registra al final; no se confunde con la evidencia de la auditoría original.

## Rúbrica

| Dimensión | Puntos | Evidencia y principal límite |
|---|---:|---|
| Estrategia SEO y contenido | 18/20 | Cobertura, intención, diagnóstico de idea, fuentes y límites bien definidos; falta validación del proceso sobre entregas completas. |
| Entrevista y definición de alcance | 12/15 | Entrada sencilla, módulos y autorizaciones claras; clasificador y precisión monetaria tienen defectos reproducibles. |
| Orquestación, estado y recuperación | 11/20 | Roles y traspasos explícitos; sin validador de transiciones ni recuperación programada, con guardado parcial reproducible. |
| Presupuesto y trazabilidad | 11/15 | Política conservadora y honesta; reserva, reconciliación y exclusión de compradores no tienen implementación ejecutable. |
| Calidad visual, técnica y funcional | 12/15 | Criterios detallados por módulo, selección visual y separación preview/operación; falta evidencia de su aplicación completa y repetible. |
| Pruebas, portabilidad y mantenimiento | 10/15 | Iniciador probado y rutas portables; faltan preflight, esquemas/migración y pruebas representativas del flujo completo. |
| **Total** | **74/100** | **Buena base operativa, todavía dependiente de supervisión y disciplina del agente.** |

La nota evalúa lo demostrado en este repositorio. No presupone que proyectos o verificaciones privados fuera de él no existan; sencillamente no se han usado como evidencia.

## Defectos reproducidos

### H1. Clasificación incorrecta de módulos — prioridad alta de corrección

Evidencia: [scripts/asistente.mjs:31](scripts/asistente.mjs#L31), [línea 52](scripts/asistente.mjs#L52); afecta preguntas adaptativas de las líneas 106-120.

| Entrada | Resultado actual | Resultado esperado |
|---|---|---|
| Acción `solicitar presupuesto`; páginas `Inicio, Servicios, Contacto` | Activa `reservas` porque `cita` coincide dentro de `solicitar`. | Servicios, sin añadir reservas. |
| Acción `contactar`; páginas `Inicio, tienda sin cuentas y con reservas` | Omite reservas porque borra toda la frase posterior a `sin`. | Servicios, tienda y reservas; sin cuentas. |
| Acción `contactar`; páginas `Inicio, no tienda pero si blog` | Omite el blog solicitado. | Servicios y blog; sin tienda. |

Consecuencia: entrevista innecesaria o dependencias no recogidas. Corregir reconocimiento por palabras/cláusulas; aclarar únicamente las ambigüedades reales. Añadir estos casos a las regresiones.

### H2. Guardado parcial sin recuperación — prioridad alta de corrección

Evidencia: [scripts/asistente.mjs:295](scripts/asistente.mjs#L295). `saveProject` crea la carpeta final y escribe cuatro archivos por separado. En un fixture temporal, un fallo `EIO` inyectado al escribir `META.md` dejó solo `proyecto.json`; reintentar devolvió `EEXIST`.

Consecuencia: ficha incompleta que el iniciador no permite reparar con el mismo nombre. Preparar/validar los archivos en una carpeta temporal del mismo volumen y finalizar el guardado como unidad, con recuperación explícita de interrupciones y sin sobrescribir proyectos existentes. Un borrador de entrevista debe conservar respuestas sin convertirlas en autorización definitiva.

### H3. Importe mostrado distinto del autorizado — prioridad alta de corrección

Evidencia: [scripts/asistente.mjs:58](scripts/asistente.mjs#L58), [línea 132](scripts/asistente.mjs#L132) y [línea 234](scripts/asistente.mjs#L234). Se aceptan decimales arbitrarios, la confirmación usa dos decimales y el registro guarda el original: `0.104` muestra USD 0.10; `0.004` muestra USD 0.00 aunque el presupuesto guardado es positivo.

No se observó un gasto real: el iniciador no compra. El defecto es la discrepancia del permiso registrado. Admitir centavos para el presupuesto elegido por el usuario o mostrar explícitamente toda la precisión admitida; el valor confirmado y persistido debe coincidir. Los costes reales del proveedor pueden necesitar más precisión que centavos y deben conservarla con aritmética decimal adecuada.

## Brechas que limitan la repetibilidad

1. **El control financiero es documental.** La plantilla lo reconoce en `dataforseo.operational_instructions_only` y `mcp_gateway_or_enforcement_installed`. No es una falsa promesa ni demuestra gasto indebido. Falta un componente que valide autorización/versiones, reserve antes de llamar, consolide por `request_id`, conserve costes desconocidos y serialice compradores. Un helper opcional no se convierte en protección técnica mientras el agente conserve una ruta de pago que lo omita.
2. **Estado y reanudación dependen de interpretar varios documentos.** `main` solo admite ayuda y `--solo-preparar`; [EMPEZAR.md:80](EMPEZAR.md#L80) retoma mediante un prompt. No hay validador de fase, aprobación vigente, artefactos requeridos y evidencia. Esto puede producir divergencia entre ficha, META, ESTADO y presupuesto tras cambios manuales.
3. **Identidad y evolución de fichas necesitan contrato.** `project_id` es el slug y la campaña es `<slug>-inicial`; la colisión se comprueba solo en la carpeta local. Dos clones podrían producir IDs ambiguos al usar una cartera compartida. Además, `validacion_idea` se añadió manteniendo `schema_version: 4`; no hay reparación/migración de proyectos antiguos. Son riesgos de consistencia, no incidentes de gasto demostrados.
4. **La calidad está descrita, pero no existe una suite completa por módulo.** [PERFILES-Y-CALIDAD.md:109](PERFILES-Y-CALIDAD.md#L109) establece buenas comprobaciones; las pruebas versionadas cubren el iniciador. No acreditan mockups, interior responsive, checkout, auditoría, pausa visual o entrega completa.
5. **Las dependencias se descubren durante la ejecución.** Faltan comprobaciones iniciales programadas de skills/versiones, roles, cliente, navegador y herramientas de prueba. Las configuraciones son plausibles y válidas según la referencia consultada; su funcionamiento debe verificarse en el entorno, no deducirse del TOML.
6. **Varias fuentes de estado pueden divergir.** Idea vigente, alcance, estrategia y criterios se repiten entre JSON y Markdown. Faltan identificadores/versiones de decisiones y relación verificable entre cada criterio y su evidencia. Leer todas las skills no resuelve esta falta de trazabilidad.

## Mejoras propuestas, por orden

Estos comandos y componentes son propuestas; todavía no existen. El objetivo es conservar una entrada sencilla para el usuario y concentrar la complejidad dentro del kit.

| Orden | Trabajo | Criterio para darlo por terminado |
|---|---|---|
| 1 | Corregir H1-H3. | Regresiones de frases, negaciones y precisión monetaria; fallo entre escrituras y reintento seguros; pruebas actuales siguen pasando. |
| 2 | Añadir comprobación inicial del entorno (`doctor`) y esquema de ficha. | Detecta dependencias ausentes sin compras, verifica estructura/versiones y deja resultados comprobados o pendientes; no simula selección de modelo. |
| 3 | Incorporar `estado` y `continuar`, con registro de decisiones y recuperación. | Reiniciar en cualquier fase conserva respuestas, aprobaciones, idea, elección y gasto; una aprobación obsoleta no permite avanzar. No se abre otro asistente en nombre del usuario. |
| 4 | Implementar control de costes y vinculación estable de cartera/proyecto. | Pruebas sin gasto: reserva→timeout→reanudación, dos compradores sobre último saldo, cargo tardío, rechazo/ampliación, clon/restauración y ausencia de doble cómputo. El acceso de pago pasa efectivamente por el control si se anuncia como bloqueo técnico. |
| 5 | Preparar base técnica Astro/Tailwind y verificaciones reutilizables por módulo. | Tres fixtures de software (servicios/portfolio, blog/directorio, tienda) compilan y prueban rutas/flujos; permiten tres direcciones visuales distintas. Integraciones simuladas quedan identificadas y no acreditan operación real. |
| 6 | Añadir validación de entrega y pruebas continuas del kit. | Cada criterio de META tiene evidencia, entorno, fecha y estado; no se cierra una entrega con un fallo esencial. Cambios en plantillas/CLI disparan la suite; comprobaciones de docs/links detectan contradicciones o archivos desactualizados. |

La base Astro debe reutilizar estructura SEO, colecciones, metadatos, imágenes y pruebas, manteniendo libertad en composición, tipografía y diseño. Una tienda seguirá necesitando integrar y probar el proveedor real elegido; un fixture no sustituye esa validación.

## Qué justificaría una nota cercana a 94/100

Con esta misma rúbrica, sería defendible volver a evaluar una nota cercana a 94 cuando los defectos estén resueltos y las mejoras centrales tengan evidencia: preparación y recuperación 14/15, orquestación 19/20, presupuesto 14/15, calidad 14/15, reproducibilidad 14/15 y estrategia 19/20. Son objetivos de aceptación, no puntos que se ganan por escribir más documentos.

Se deben completar pruebas controladas de tres tipos representativos de web, incluyendo pausa de presupuesto, elección A/B/C, reanudación, comprobaciones móviles e interiores y al menos un flujo transaccional en modo de prueba. Son pruebas del producto, no una obligación de cambiar de negocio o lanzar un piloto comercial. Registrar defectos, retrabajo, tiempo, uso de modelos y coste de datos por fase permitirá juzgar si el sistema escala.

El tráfico y las acciones comerciales requieren evidencia posterior de proyectos publicados, en un seguimiento con alcance y autorización propios. Ni 94/100 de calidad del kit ni tres pruebas completas permiten deducir una tasa de éxito SEO o rentabilidad. Mantener los escenarios condicionados y las recomendaciones off-page opcionales ya previstos.

**Prioridad práctica:** corregir las tres fallas del iniciador y construir estado/recuperación y control de costes antes de ampliar el número de fases, prompts o documentos. Esas mejoras reducen dependencia de la memoria del agente y hacen revisable el trabajo.

## Registro de correcciones posteriores — 11/10/2026

| Hallazgo | Estado | Cambio y comprobación |
|---|---|---|
| H1: clasificación | Corregido | Palabras completas, flexiones habituales y negaciones delimitadas por cláusulas. Los ejemplos `solicitar presupuesto`, `tienda sin cuentas y con reservas` y `no tienda pero sí blog` producen los módulos esperados. Se prueban también las preguntas adaptativas y las negaciones de publicación. |
| H2: guardado parcial | Corregido | `scripts/guardar-proyecto.mjs` prepara los cuatro archivos en un temporal hermano antes de finalizar con `rename`. Se comprobaron EIO entre escrituras, fallo al finalizar, reintento con el mismo nombre, escritores simultáneos y preservación de carpetas/archivos/enlaces existentes. La limpieza se limita al temporal propio; si también falla, conserva la causa original. |
| H3: importe de autorización | Corregido | La entrevista admite presupuestos entre USD 0 y USD 1 con máximo dos decimales, sin redondear entradas inválidas. También valida llamadas programáticas antes de guardar. Todos los importes en centavos del intervalo muestran el mismo valor que se registra; la entrevista rechaza `0.104` y `0.004` antes de confirmar. Los costes reales de DataForSEO y su precisión no se han modificado. |

Validación ejecutada con Node v24.14.1:

```sh
node --test tests/asistente.test.mjs tests/clasificacion.test.mjs tests/guardar-proyecto.test.mjs
```

Resultado: **32 pruebas aprobadas, 0 fallos** (15 del iniciador, 6 de clasificación y 11 de guardado). `git diff --check` sin errores. Arranque CLI verificado con stub y ejecución de `--solo-preparar` en un kit temporal; no se abrió una sesión real de Codex ni se realizaron compras.

Límites de esta corrección: el clasificador es determinista, no comprende cualquier frase indirecta o doble negación. El guardado impide publicar la carpeta final a medias en los fallos probados; no aporta durabilidad ante un corte eléctrico ni protección frente a terceros que alteren rutas en plena operación. Un proceso terminado abruptamente puede dejar un temporal `.plan-<slug>-<aleatorio>`: no se reutiliza ni cuenta como proyecto final, y no bloquea un nuevo intento. No se modifican automáticamente proyectos incompletos antiguos.

Permanecen propuestas las mejoras de `doctor`, estado/reanudación entre fases, identificadores y migraciones, control ejecutable de gastos, base Astro reutilizable y pruebas completas de producción por módulo. Corregir H1-H3 no acredita que esas capacidades estén implementadas.

## Ampliación posterior: renovación, registro y opciones — versión 7

Esta sección registra cambios posteriores al diagnóstico y a las 32 pruebas anteriores; no reescribe aquella evidencia ni actualiza automáticamente la puntuación.

- **Renovación de webs:** entrevista específica para origen/destino, mejoras/conservación, prioridades y accesos. Guarda `alcance.web_existente` y `renovacion` en ficha `schema_version: 5`; genera `MIGRACION-SEO.md` y conserva comprobaciones en pendiente. `MIGRACIONES.md` fija inventario/baseline, mapa de URLs/recursos, pruebas locales y públicas, respaldo, reversión y seguimiento delimitado. No ejecuta una migración remota por rellenar la entrevista.
- **Registro de proceso:** el guardado completo incluye seis archivos para nuevas webs y siete para renovación. `scripts/bitacora.mjs` valida y anexa eventos con bloqueo exclusivo, comprueba continuidad de incidencias y exige solución/referencia de evidencia para cerrarlas. `MEJORAS.md` resume hallazgos y aprendizaje; el coordinador debe mantenerlo. No verifica por sí solo la autenticidad de las pruebas ni captura automáticamente todas las herramientas.
- **Tres presupuestos:** mínimo/estándar/óptimo con base de gasto común, planes alternativos completos y recomendación por valor marginal. `options` y `selected_option_id` permiten registrar la comparación y la selección expresa. Son instrucciones/plantillas operativas; no añaden un gateway de pagos. Los escenarios de tráfico se separan de los niveles de precio y de probabilidades de éxito.
- **Corrección detectada al integrar:** si la URL de destino de renovación se define después, al solicitar publicación, se valida y actualiza en la misma ficha antes de guardar la autorización. No quedan un destino aprobado y un destino de renovación pendiente contradictorios.

Validación: **53 pruebas aprobadas, 0 fallos**, con el comando completo de README; incluye 10 casos de renovación y 11 de bitácora. `git diff --check` sin errores. Guía regenerada desde EMPEZAR.md y revisada en sus cuatro páginas. No se realizaron compras, publicación ni una migración real; el lanzamiento de modelos se prueba con stubs. Permanecen pendientes el doctor, reanudación programática por fase, migraciones automáticas de esquemas/identidad de cartera, enforcement financiero y pruebas completas de webs reales por módulo.
