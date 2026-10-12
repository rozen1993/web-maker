# Sistema repetible de webs con SEO y presupuesto por proyecto

Versión 11 — 12 de octubre de 2026. Entrevista adaptativa por chat, web nueva o renovación, bitácora verificable, tres presupuestos, SEO completo, tres homepages y entrega verificada.

El usuario elige idea y modalidad de negocio o asociación. **GPT-6.1 Sol / high** coordina, investiga, prepara contenido y verifica; **GPT-6 Astra / ultra** diseña y revisa toda la parte visual; **Sol high** programa los mockups y toda la web en **Astro + Tailwind CSS**. Las skills de AgriciDaniel y DataForSEO aportan procedimientos y evidencia según el proyecto. El SEO comprobado no garantiza resultados orgánicos.

Para empezar: [EMPEZAR.md](EMPEZAR.md). Con el kit abierto en Codex, escribir `$iniciar-web [nombre]`, o `$iniciar-web` sin nombre. La skill local `.agents/skills/iniciar-web/` inicia o retoma el único proyecto de esta copia; `$iniciar-web retoma` continúa el existente. Ficha e informes en `proyectos/<nombre>/`, código en `out/`, según ENTREGA.md. Otra web requiere otra copia limpia. Astra high conduce la entrevista adaptativa; Sol presenta las preguntas y guarda respuestas y pendientes, sin exigir terminal ni JSON. `node iniciar.mjs` es una alternativa opcional con Node 20+: cuestionario local sin IA ni compras; `--solo-preparar` guarda sin abrir Codex. Las skills y los servicios son externos al kit: descubrirlos y verificar acceso, sin modificar sus archivos ni instalar/conectar por inferencia.

## 1. Fases y responsabilidades

| Fase | Responsable | Trabajo y condición para avanzar |
|---|---|---|
| Entrevista y meta | Astra high entrevista; Sol high registra y concreta META | Una pregunta cada vez; resolver alcance esencial y escribir y mostrar `META.md` con páginas, cantidades, funciones, contenidos, criterios, entrega, límites y pendientes. Sin aprobación extra del plan. |
| Exploración acotada | Sol high | Revisar idea original, fuentes, necesidades expresadas y demanda inicial con datos gratuitos y el cupo previo autorizado. Adelantar hipótesis de oportunidad o ajuste; evaluar qué investigación necesita la meta y guardar fuentes originales. |
| Presupuesto de investigación | Sol high; aprobación del usuario | Comparar `minimo`, `estandar` y `optimo` en `PRESUPUESTO-SEO.md`, recomendar con motivos y esperar aprobación explícita de opción/ID/versión y límites. No comprar las tres. |
| Investigación y contenido completos | Sol high | Aplicar principal `seo`, evaluar las 26 subskills y ejecutar los procedimientos pertinentes; diagnosticar la idea original y recomendar mantenerla, enfocarla o modificarla antes de la arquitectura y el texto real. Registrar decisión expresa para cambios materiales; documentar oportunidad orgánica en `SEO-STRATEGY.md` antes del diseño. |
| Tres homepages | Astra ultra diseña; Sol high programa | Mockups A/B/C con contenido real, URL comprobada, navegador, escritorio y móvil; interior representativo cuando aporte. Revisar internamente antes de presentar. |
| Elección visual | Usuario | Elegir A, B, C o combinación concreta; guardar elección/ajustes en ficha y `ESTADO.md`. |
| Desarrollo completo | Sol 6.1 high, rol `desarrollador` | Implementar toda la web elegida en Astro + Tailwind, con TypeScript, componentes y fuente de datos validada. |
| Auditoría, pruebas y correcciones | Sol high audita y programa correcciones; Astra ultra revisa diseño | Ejecutar `seo-audit` completo y flujos del alcance. Astra revisa el diseño y Sol 6.1 high corrige el código; Sol verifica hasta satisfacer META o declarar un bloqueo concreto. |

**Dos pausas ordinarias después de la entrevista: presupuesto y diseño.** No añadir aprobaciones por fase de contenido, arquitectura, código o pruebas ni pedir permiso por compras ya cubiertas. Un acceso/modelo imprescindible, permiso del entorno, coste fuera de autorización o publicación no autorizada puede impedir una acción; conservar el alcance, señalar la condición y continuar el trabajo independiente.

`.codex/config.toml` solicita Sol high; `.codex/agents/entrevistador.toml` solicita Astra high únicamente para entrevista; `.codex/agents/disenador.toml` solicita Astra ultra y `.codex/agents/desarrollador.toml` solicita Sol high. Comprobar carga real del cliente, capacidad de delegación y acceso de la cuenta. Registrar modelo/esfuerzo ejecutados por fase, con evidencia del entorno. Escribir sus nombres no verifica ejecución; si falta soporte, informar y preparar un traspaso sin sustitución silenciosa. No eludir permisos para aparentar continuidad.

## 2. Un alcance combinable

Aplicar [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md): servicios, portfolio, blog, catálogo, tienda, directorio/recursos, reservas y cuentas solo cuando sean necesarias. No imponer un negocio existente, piloto o modelo comercial.

La entrevista resuelve pagar dentro del sitio frente a pedir por contacto, editor, stock/disponibilidad, materiales, integraciones y destino de entrega. Reutilizar respuestas y explicitar supuestos reversibles. Una tienda con pago no se sustituye por catálogo; una reserva simulada no se declara confirmada. Proveedores o accesos pendientes se registran y no se contratan automáticamente.

La IA puede añadir preguntas según lo que descubre, una por vez y solo si afecta una decisión. Mantener las respuestas parciales en ficha/ESTADO con `brief_en_curso`; al cerrar el alcance esencial, completar META y registrar el fin del brief. Si la carpeta ya existe, leer y retomar, sin repetir entrevista ni eliminar el proyecto. Las aclaraciones esenciales posteriores no se convierten en aprobaciones de todas las fases. Guardar y retomar depende del coordinador, no de un proceso automático en segundo plano.

La modalidad inicial distingue `nueva` y `renovacion`. Renovar activa preguntas de URL, continuidad de dominio, mejoras/conservación, prioridades y accesos, sin exigir un inventario manual. Aplicar [MIGRACIONES.md](MIGRACIONES.md): baseline previa, mapa de URLs/archivos, preservación comprobable, respaldo, transición y reversión. La nueva tecnología no garantiza conservar posiciones; la verificación pública y el seguimiento se distinguen de la preview. No cambiar el destino de publicación ya autorizado sin decisión expresa.

Antes de explorar, recoger qué cree el usuario que desea el público y concretar la acción útil, objetivo/horizonte y medición en `META.md`. Contrastar hipótesis con evidencia a favor y en contra en `SEO-STRATEGY.md`, distinguir datos e inferencias y vincular cada recomendación a páginas y métricas; no equiparar búsquedas con compras. Antes de explorar, concretar `META.md`; la investigación puede precisar arquitectura sin ampliar o reducir silenciosamente la entrega. Mantener `proyecto.json`, `META.md`, `ESTADO.md`, `CONTENIDO.md`, `PRESUPUESTO-SEO.md`, `SEO-STRATEGY.md`, `SEO-COBERTURA.md` y `.seo-cache/`. Crear `evidencias/` cuando existan capturas/artefactos, sin informes duplicados. Las versiones, lockfile y APIs de Astro/Tailwind se contrastan con documentación oficial vigente y el proyecto real; no actualizar una web existente indiscriminadamente ni copiar APIs obsoletas de ejemplos locales.

En chat, el coordinador prepara progresivamente `BITACORA.jsonl`, `MEJORAS.md` y, al renovar, `MIGRACION-SEO.md`; `INICIAR-CODEX.md` se necesita solo si hay traspaso. El iniciador terminal sigue guardándolos al completar su cuestionario. Seguir [BITACORA.md](BITACORA.md): registrar decisiones, transiciones, pruebas y correcciones, con evidencia para cada cierre. ESTADO resume; la bitácora general no sustituye ni duplica el registro financiero. Proyectos anteriores se amplían desde el momento actual conservando permisos y sin inventar historia.

## 3. Preexploración: cupo pequeño y separado

Durante la entrevista por chat o terminal, preguntar únicamente por este cupo: **USD 0 por defecto; USD 0.10 sugeridos**, con autorización explícita. El máximo aceptado por la entrada de preexploración es USD 1; es un límite de esa exploración acotada, **no un presupuesto universal de investigación ni una razón para rechazar proyectos mayores**. La entrevista no requiere ejecutar compras.

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

Comparar mínimo suficiente, estándar y óptimo según `plantillas/PRESUPUESTO-SEO.md`. Los tres conservan el alcance comprometido y los controles esenciales; varía la profundidad útil de la evidencia. Cada opción viable tiene su plan completo, preguntas que resuelve, incertidumbre, fuentes, límites y exclusiones. Explicar el valor marginal y recomendar una; marcar no viable o no justificada cuando corresponda en vez de fabricar tres escalones. Cambios en cantidad de páginas, funciones o mercado acordado se presentan como decisiones de alcance separadas.

`PRESUPUESTO-SEO.md` y su vista en la ficha deben contener:

- ID y versión de la propuesta, ID de opción, fecha, proyecto, objetivo y estado de conciliación del registro.
- Gasto confirmado previo, reservas pendientes previas y operaciones/cupos consumidos de la preexploración y otras fases.
- Por endpoint: finalidad, contrato/parámetros, tareas/llamadas, cantidad máxima de ítems, ubicación, idioma, dispositivo y extras pertinentes.
- Tarifas máximas verificadas, fuente y fecha de comprobación; máximos por llamada y por endpoint, cupos de intentos y reintentos.
- Resultados/entregables esperados, cobertura que permite decidir y limitaciones/incertidumbres.
- **Máximo adicional**, con margen explícito incluido, y **total máximo acumulado del proyecto**: gasto previo + reservas previas + máximo adicional.
- Qué queda fuera: hosting, servicios comerciales, créditos ajenos, activación SEM u otras operaciones no incluidas; alternativas si cambian alcance o evidencia.
- Recomendación de mantenimiento/consultoría separada, que no autoriza recurrencia ni compras futuras.
- Autorización `null` y `selected_option_id: null` hasta selección/aprobación explícita; después, texto exacto, fecha, opción, propuesta/versión y límites aprobados.

Presentar una estimación comprensible antes de comprar la investigación principal. El máximo adicional es dinero nuevo permitido; el total acumulado ya incluye gastos/reservas previos, que **no se reinician ni se suman dos veces**. Si cambia versión, no trasladar por inferencia la aprobación a un presupuesto mayor o distinto. Actualizar el proyecto con la autorización exacta y comprobar su compatibilidad con los límites de cuenta/cartera/lote existentes.

La base de gasto/reservas es común a las alternativas; no sumar sus máximos entre sí. Guardarlas en `dataforseo.investigacion.options`. La aprobación de la opción/version fija `selected_option_id`, `proposal`, `authorization.option_id`, máximos y límites efectivos exclusivamente de esa alternativa. Un «sí» sin opción inequívoca no basta. La selección y aprobación ocurren en la misma pausa habitual. Conservar autorizaciones previas válidas de proyectos antiguos sin inventar una elección retrospectiva.

Los escenarios conservador/base/favorable no son esos tres niveles de precio. Mostrar rangos preliminares a 3/6/12 meses solo si son defendibles; de lo contrario, `no_estimable`. Tras investigar la opción aprobada, actualizar sus escenarios en SEO-STRATEGY. Misma web con más investigación no justifica multiplicar tráfico. En renovaciones registrar baseline observada, total previsto y diferencia comparable, sin duplicar visitas existentes. Definir objetivo/horizonte de éxito sin asignar porcentajes de probabilidad no calibrados.

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

La estrategia base busca captar tráfico mediante el contenido inicial y el SEO del propio sitio, **sin suponer una campaña nueva de enlaces ni otras acciones off-page**. Evaluar demanda, intención, competencia y autoridad existente antes del diseño. Usar esa evidencia para priorizar páginas del alcance; no añadir cantidades de páginas, publicación mensual de contenidos o trabajo externo del usuario como supuestos ocultos. Si la evidencia no respalda la oportunidad esperada, explicar la limitación sin decidir abandonar la idea ni cambiar su alcance por cuenta propia.

Conservar la idea original en la ficha. La exploración plantea hipótesis de mejora junto al presupuesto; la investigación aprobada compara opciones y recomienda un enfoque concreto en `SEO-STRATEGY.md` antes de escribir. Ajustes de lenguaje y estructura dentro del alcance se aplican y registran. Cambiar público, oferta, acción, ingresos, páginas o integraciones exige decisión expresa separada de la aprobación de datos; mientras esté pendiente, continuar tareas independientes. Las búsquedas muestran interés de búsqueda, no acreditan clientes ni rentabilidad.

Completar [la plantilla de `SEO-STRATEGY.md`](plantillas/SEO-STRATEGY.md) como documento principal de oportunidad, escenarios y recomendaciones. Enlazar fuentes e informes ya producidos por las skills en vez de duplicarlos. Presentar una lectura preliminar de la oportunidad junto al presupuesto y consolidarla con la investigación antes del diseño; no introducir una aprobación adicional.

Solo con evidencia suficiente, estimar escenarios conservador, central y favorable de **clics orgánicos mensuales de Google en los meses 3, 6 y 12 desde la publicación**, no acumulados. Documentar fecha, mercado, datos, método y supuestos de cada rango; evitar duplicar consultas solapadas y confundir búsquedas con clics o conversiones. No inventar volúmenes, CTR, posiciones futuras ni tasas de éxito por el número de skills ejecutadas. Cuando falten datos, registrar `no_estimable` y explicar la carencia. Incluso con escenarios fundamentados, cero sigue siendo un resultado posible; la calidad de implementación no acredita tráfico observado.

## 7. Tres homepages y toda la web

Astra ultra recibe META, contenido, identidad y referencias; define A/B/C realmente distintas y transfiere especificaciones visuales a Sol high. Sol recibe responsabilidad explícita de archivos para programarlas; construir un comparador navegable, iniciar las previews y comprobar URLs, capturas completas y recorridos en escritorio/móvil. La homepage es la prueba principal; añadir interior representativo cuando aporte a la decisión, sin exigir tres webs completas. En una landing, comparar sus secciones y recorrido.

Revisar e iterar propuestas antes de presentarlas. Registrar `esperando_eleccion_visual` y esperar elección o combinación concreta; silencio no elige. Guardar elección/ajustes antes de construir. Sol 6.1 high desarrolla después **todas las páginas y flujos acordados**, con componentes reutilizables y datos centralizados/validados. La dirección elegida se extiende al recorrido interior; no basta una portada cuidada.

## 8. Verificación y entrega

Sol high ejecuta `seo-audit` completo: rastreo, ocho especialistas siempre y siete condicionales según el protocolo instalado, puntuación sustentada, informe, plan priorizado y caché. Con slots limitados, completar las disciplinas secuencialmente. Aplicar también tipos, build, rutas/enlaces, accesibilidad, diseño responsive y E2E de los módulos activos.

Astra ultra revisa el diseño y Sol 6.1 high corrige el código y Sol verifica las partes afectadas. No repetir auditorías completas sin causa ni cerrar fallos críticos por un límite de ciclos. Comparar cada entregable de `META.md` con evidencia, entorno y resultado: `aprobado`, `fallo`, `pendiente` o `no_aplica`.

Registrar el estado real: `en_construccion`, `preview_verificada`, `lista_para_publicar`, `publicada_verificada` u `operativa_verificada`. Una preview no demuestra publicación, indexación, GSC/GBP, rendimiento de campo o conversiones reales; dejar esos elementos externos pendientes. `lista_para_publicar` exige dependencias esenciales resueltas y controles previos aprobados; publicación exige URL pública revisada, operación exige recepción/registro del flujo real. Pagos se prueban con eventos controlados en modo de prueba, sin cobros reales.

Entregar URL real, código, comparación contra META, cobertura SEO, evidencias/pendientes y coste acumulado. Recomendar mantenimiento cuando corresponda, sin activarlo automáticamente. Si solo se autorizó preview, entregarla sin imponer publicación como paso final.

Finalizar `SEO-STRATEGY.md` con recomendaciones off-page opcionales, personalizadas a la investigación: prioridad, evidencia y oportunidad concreta, acción que corresponde al usuario, esfuerzo/coste conocido y señal para evaluar utilidad. No ejecutar contactos, campañas, compras de enlaces, contrataciones ni nuevas consultas de pago por generar esa lista. No estimar un aumento numérico sin evidencia ni incluir el posible efecto de esas acciones en el escenario base. El usuario decide si las aplica; no son un requisito oculto de la entrega ni una prueba de que el sitio ya funciona como canal de adquisición. Separar claramente SEO listo y resultados orgánicos observados; cualquier revisión posterior requiere alcance y autorización propios.
