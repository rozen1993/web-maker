# Sistema repetible de webs con SEO y presupuesto por proyecto

Versión 5 — 10 de octubre de 2026. Entrevista, exploración pequeña, presupuesto aprobado, SEO completo, tres homepages y entrega verificada.

El usuario elige idea y modalidad de negocio o asociación. **GPT-6.1 Sol / high** coordina, investiga, prepara contenido y verifica; **GPT-6 Astra / ultra** diseña las propuestas y desarrolla toda la web en **Astro + Tailwind CSS**. Las skills de AgriciDaniel y DataForSEO aportan procedimientos y evidencia según el proyecto. El SEO comprobado no garantiza resultados orgánicos.

Para empezar: [EMPEZAR.md](EMPEZAR.md). Ejecutar `node iniciar.mjs` desde la raíz, con Node 20+. La entrevista es local, sin IA ni compras; `--solo-preparar` permite continuar en el IDE. Las skills globales y los servicios son externos al kit: descubrirlos y verificar acceso, sin modificar sus archivos ni instalar/conectar por inferencia.

## 1. Fases y responsabilidades

| Fase | Responsable | Trabajo y condición para avanzar |
|---|---|---|
| Entrevista y meta | Sol high | Una pregunta cada vez; resolver alcance esencial y escribir/muestra `META.md` con páginas, cantidades, funciones, contenidos, criterios, entrega, límites y pendientes. Sin aprobación extra del plan. |
| Exploración acotada | Sol high | Revisar idea, fuentes y demanda inicial con datos gratuitos y el cupo previo autorizado. Evaluar qué investigación necesita la meta; guardar fuentes originales. |
| Presupuesto de investigación | Sol high; aprobación del usuario | Presentar `PRESUPUESTO-SEO.md` identificado/versionado. Esperar aprobación explícita de sus límites; registrar autorización exacta. |
| Investigación y contenido completos | Sol high | Aplicar principal `seo`, evaluar las 26 subskills y ejecutar los procedimientos pertinentes; arquitectura y texto real antes del diseño. |
| Tres homepages | Astra ultra, rol `disenador` | Mockups A/B/C con contenido real, URL comprobada, navegador, escritorio y móvil; interior representativo cuando aporte. Revisar internamente antes de presentar. |
| Elección visual | Usuario | Elegir A, B, C o combinación concreta; guardar elección/ajustes en ficha y `ESTADO.md`. |
| Desarrollo completo | Astra ultra, rol `desarrollador` | Implementar toda la web elegida en Astro + Tailwind, con TypeScript, componentes y fuente de datos validada. |
| Auditoría, pruebas y correcciones | Sol high audita; Astra ultra corrige | Ejecutar `seo-audit` completo y flujos del alcance. Astra corrige defectos de código/diseño; Sol verifica hasta satisfacer META o declarar un bloqueo concreto. |

**Dos pausas ordinarias después de la entrevista: presupuesto y diseño.** No añadir aprobaciones por fase de contenido, arquitectura, código o pruebas ni pedir permiso por compras ya cubiertas. Un acceso/modelo imprescindible, permiso del entorno, coste fuera de autorización o publicación no autorizada puede impedir una acción; conservar el alcance, señalar la condición y continuar el trabajo independiente.

`.codex/config.toml` solicita Sol high; `.codex/agents/disenador.toml` y `.codex/agents/desarrollador.toml` solicitan Astra ultra. Comprobar carga real del cliente, capacidad de delegación y acceso de la cuenta. Registrar modelo/esfuerzo ejecutados por fase, con evidencia del entorno. Escribir sus nombres no verifica ejecución; si falta soporte, informar y preparar un traspaso sin sustitución silenciosa. No eludir permisos para aparentar continuidad.

## 2. Un alcance combinable

Aplicar [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md): servicios, portfolio, blog, catálogo, tienda, directorio/recursos, reservas y cuentas solo cuando sean necesarias. No imponer un negocio existente, piloto o modelo comercial.

La entrevista resuelve pagar dentro del sitio frente a pedir por contacto, editor, stock/disponibilidad, materiales, integraciones y destino de entrega. Reutilizar respuestas y explicitar supuestos reversibles. Una tienda con pago no se sustituye por catálogo; una reserva simulada no se declara confirmada. Proveedores o accesos pendientes se registran y no se contratan automáticamente.

Antes de explorar, concretar `META.md`; la investigación puede precisar arquitectura sin ampliar o reducir silenciosamente la entrega. Mantener `proyecto.json`, `META.md`, `ESTADO.md`, `CONTENIDO.md`, `PRESUPUESTO-SEO.md`, `SEO-COBERTURA.md` y `.seo-cache/`. Crear `evidencias/` cuando existan capturas/artefactos, sin informes duplicados. Las versiones, lockfile y APIs de Astro/Tailwind se contrastan con documentación oficial vigente y el proyecto real; no actualizar una web existente indiscriminadamente ni copiar APIs obsoletas de ejemplos locales.

## 3. Preexploración: cupo pequeño y separado

El iniciador pregunta únicamente por este cupo. **USD 0 por defecto; USD 0.10 sugeridos**, con autorización explícita. El máximo aceptado por la entrada de preexploración es USD 1; es un límite de esa exploración acotada, **no un presupuesto universal de investigación ni una razón para rechazar proyectos mayores**. La entrevista y este kit no ejecutan compras.

| Control previo | Límite |
|---|---|
| Importe | El autorizado expresamente para este proyecto, dentro de la entrada acotada |
| Máximo por intento | USD 0.10 y siempre dentro del importe restante |
| SERP | Hasta 3 intentos; una tarea por llamada, `depth: 10`, `max_crawl_pages: 1`, sin extras |
| Labs Keyword Suggestions | Hasta 1 intento, máximo 25 ítems |
| Reintentos | Máximo 1 por consulta y 1 total en la preexploración, incluidos en los cupos anteriores |
| Parámetros | País, ciudad si aplica, idioma y dispositivo explícitos; granularidad real por endpoint |

Los cupos son techos, no consumo obligatorio. Un reintento permitido usa un request_id nuevo y cuenta como intento. Si no hay precio máximo verificable, saldo suficiente conocido, registro reconciliado o autorización, no pagar. Ante timeout o coste desconocido, conservar reserva y no repetir automáticamente.

Con USD 0, usar fuentes gratuitas para preparar la propuesta y declarar incertidumbre. La evidencia de preexploración no se presenta como investigación completa. Las tarifas se verifican antes de cada intento; ningún ejemplo histórico ni saldo observado en otra sesión demuestra coste/saldo actual.

## 4. Presupuesto principal: propuesta concreta y aprobación

Después de explorar, dimensionar la investigación completa de este proyecto: temas, URLs, mercados, decisiones de conversión y disciplinas de [SEO-COMPLETO.md](SEO-COMPLETO.md). No aplicar el antiguo USD 1 como límite universal. Evitar compras repetidas entre módulos y subskills.

`PRESUPUESTO-SEO.md` y su vista en la ficha deben contener:

- ID y versión de la propuesta, fecha, proyecto, objetivo y estado de conciliación del registro.
- Gasto confirmado previo, reservas pendientes previas y operaciones/cupos consumidos de la preexploración y otras fases.
- Por endpoint: finalidad, contrato/parámetros, tareas/llamadas, cantidad máxima de ítems, ubicación, idioma, dispositivo y extras pertinentes.
- Tarifas máximas verificadas, fuente y fecha de comprobación; máximos por llamada y por endpoint, cupos de intentos y reintentos.
- Resultados/entregables esperados, cobertura que permite decidir y limitaciones/incertidumbres.
- **Máximo adicional**, con margen explícito incluido, y **total máximo acumulado del proyecto**: gasto previo + reservas previas + máximo adicional.
- Qué queda fuera: hosting, servicios comerciales, créditos ajenos, activación SEM u otras operaciones no incluidas; alternativas si cambian alcance o evidencia.
- Recomendación de mantenimiento/consultoría separada, que no autoriza recurrencia ni compras futuras.
- Autorización `null` hasta aprobación explícita; después, texto exacto del usuario, fecha, propuesta/versión y límites aprobados.

Presentar una estimación comprensible antes de comprar la investigación principal. El máximo adicional es dinero nuevo permitido; el total acumulado ya incluye gastos/reservas previos, que **no se reinician ni se suman dos veces**. Si cambia versión, no trasladar por inferencia la aprobación a un presupuesto mayor o distinto. Actualizar el proyecto con la autorización exacta y comprobar su compatibilidad con los límites de cuenta/cartera/lote existentes.

Al cerrar la preexploración, congelar nuevas compras mientras se espera aprobación: la base de gasto/reservas de la propuesta debe permanecer estable. **Toda llamada nueva después de aprobar consume el máximo adicional**, aunque aclare una pregunta de preexploración. Una reserva previa pendiente no se libera ni se repite sin evidencia.

Con aprobación vigente, ejecutar sin nuevas confirmaciones por cada llamada cubierta. Si falta una dependencia para presupuestar, presentar lo conocido y señalar lo pendiente; no declarar autorizado el coste desconocido. Una ampliación necesita propuesta y autorización concretas; no se compra para alcanzar una puntuación.

## 5. Un comprador y un registro acumulado

Sol coordinador es el único comprador DataForSEO. Subagentes solicitan datasets y reutilizan respuestas/caché; no reciben compradores ni presupuestos separados. Ni el iniciador ni estos documentos interceptan el MCP.

Una cartera nueva usa `.control/dataforseo.jsonl`, resuelto desde la raíz del kit. Una cartera existente conserva su registro privado original o copia completa vinculada. Un chat, cuenta, clon, traslado, fase o módulo no reinicia autorizaciones, gasto, reservas ni cupos. No sustituir un historial por registro vacío. Respaldarlo fuera de Git.

Si existe un lote autorizado, sus límites y los del proyecto deben permitir simultáneamente la operación. No inventar lotes ni trasladar saldo. Un proyecto individual no requiere lote. Un límite diario del proveedor solo existe si su configuración fue comprobada; no configurarlo por inferencia ni presentarlo como protección local.

Antes de cada intento:

1. Leer contrato y precios vigentes del endpoint. Descubrir el helper desde el `SKILL.md` instalado, consultar su uso y ejecutar el check requerido; las tablas aproximadas del helper no prueban precio actual ni autorización.
2. Reconciliar JSONL por request_id, autorización, gasto/reservas y cupos del proyecto/cartera/lote pertinente; verificar saldo suficiente actual.
3. Escribir evento `reservado` **antes** de llamar: fecha, proyecto/campaña/lote autorizado, endpoint, parámetros completos, autorización y coste máximo. La reserva consume importe y cupo. Si no puede escribirse/reconciliarse, no llamar.
4. Guardar respuesta original, task_id y coste facturado. Escribir `completado` y sustituir la reserva por coste real, sin contar total y subtareas dos veces. Ejecutar el log requerido por la skill; ese log global no sustituye el JSONL de cartera.
5. Si no se conoce el coste, escribir `costependiente` y conservar reserva/cupo hasta resolver con evidencia. Un fallo confirmado sin cargo puede completarse con 0; el intento sigue contado.

Estados de evento: `propuesta`, `reservado`, `completado`, `costependiente`. Cada reintento tiene ID propio y referencia el anterior. Los totales en `proyecto.json` son vistas derivadas con fecha; no editarlos manualmente para ajustar límites. Diferencias o reservas no reconciliadas impiden nuevas compras.

Caché por fecha, endpoint y parámetros completos: SERP 7 días, volúmenes 30. Datos actuales solicitados requieren consultas nuevas autorizadas. Los defaults US/English/depth 100 de la skill DataForSEO no se aplican frente a parámetros y límites explícitos del proyecto.

## 6. SEO completo y contenido antes del diseño

Leer la skill principal `seo` y su routing, evaluar las 26 subskills en `SEO-COBERTURA.md` y ejecutar los flujos completos pertinentes según [SEO-COMPLETO.md](SEO-COMPLETO.md). No marcar una disciplina como cubierta por nombrarla ni como no aplicable por carecer de acceso. Cargar referencias al usar la disciplina, sin leerlas todas al comienzo.

El contenido fija por página visitante, intención, jerarquía, pruebas disponibles, dudas, metadatos y acción. Sol redacta el contenido incluido en el alcance y guarda fuentes originales; no inventa productos, precios, stock, casos, credenciales ni resultados. Contenido especializado conserva revisión competente pendiente cuando corresponda.

## 7. Tres homepages y toda la web

Astra ultra recibe META, contenido, identidad, referencias y responsabilidad explícita de archivos. Preparar A/B/C realmente distintas; construir un comparador navegable, iniciar las previews y comprobar URLs, capturas completas y recorridos en escritorio/móvil. La homepage es la prueba principal; añadir interior representativo cuando aporte a la decisión, sin exigir tres webs completas. En una landing, comparar sus secciones y recorrido.

Revisar e iterar propuestas antes de presentarlas. Registrar `esperando_eleccion_visual` y esperar elección o combinación concreta; silencio no elige. Guardar elección/ajustes antes de construir. Astra ultra desarrolla después **todas las páginas y flujos acordados**, con componentes reutilizables y datos centralizados/validados. La dirección elegida se extiende al recorrido interior; no basta una portada cuidada.

## 8. Verificación y entrega

Sol high ejecuta `seo-audit` completo: rastreo, ocho especialistas siempre y siete condicionales según el protocolo instalado, puntuación sustentada, informe, plan priorizado y caché. Con slots limitados, completar las disciplinas secuencialmente. Aplicar también tipos, build, rutas/enlaces, accesibilidad, diseño responsive y E2E de los módulos activos.

Astra ultra corrige defectos de código/diseño y Sol verifica las partes afectadas. No repetir auditorías completas sin causa ni cerrar fallos críticos por un límite de ciclos. Comparar cada entregable de `META.md` con evidencia, entorno y resultado: `aprobado`, `fallo`, `pendiente` o `no_aplica`.

Registrar el estado real: `en_construccion`, `preview_verificada`, `lista_para_publicar`, `publicada_verificada` u `operativa_verificada`. Una preview no demuestra publicación, indexación, GSC/GBP, rendimiento de campo o conversiones reales; dejar esos elementos externos pendientes. `lista_para_publicar` exige dependencias esenciales resueltas y controles previos aprobados; publicación exige URL pública revisada, operación exige recepción/registro del flujo real. Pagos se prueban con eventos controlados en modo de prueba, sin cobros reales.

Entregar URL real, código, comparación contra META, cobertura SEO, evidencias/pendientes y coste acumulado. Recomendar mantenimiento cuando corresponda, sin activarlo automáticamente. Si solo se autorizó preview, entregarla sin imponer publicación como paso final.
