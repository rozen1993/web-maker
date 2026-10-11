# Perfiles de web y criterios de entrega

Esta guía amplía `AGENTS.md`. Se consulta al definir el alcance y al verificar la entrega.
El resultado utiliza **Astro + Tailwind CSS**. Los módulos se combinan según lo que necesita cada proyecto.
No hay que ejecutar todos los módulos, contratar servicios ni construir funciones que el usuario no haya pedido.

## Uso sencillo

1. El usuario describe su idea con sus propias palabras; no necesita clasificarla técnicamente.
2. La entrevista terminal (`node iniciar.mjs`) o Sol pregunta **una cosa cada vez** y reutiliza las respuestas. Distingue web nueva/renovación y solo activa preguntas de migración, tienda, reservas u otros módulos cuando correspondan.
3. Registra módulos, recorrido y pendientes en `proyecto.json` y `ESTADO.md`; muestra `META.md` con páginas/cantidades, funciones, entregables, exclusiones y flujos de comprobación. Completa la meta a partir de las respuestas antes de investigar, sin una aprobación adicional.
4. **GPT-6.1 Sol / high** realiza una exploración acotada con fuentes gratuitas y el cupo previo autorizado; compara mínimo/estándar/óptimo, recomienda con motivos y espera aprobación explícita de opción/ID/versión. Cada total incluye la misma base de gasto y reservas previos, su máximo adicional y margen; no se suman los tres ni existe un USD 1 universal para toda la investigación.
5. Sol aplica la skill principal `seo` de AgriciDaniel y evalúa sus **26 subskills** en `SEO-COBERTURA.md`, según [SEO-COMPLETO.md](SEO-COMPLETO.md). Ejecuta los procedimientos completos pertinentes y prepara arquitectura/contenido; mencionar una disciplina no acredita trabajo.
6. **GPT-6 Astra / ultra** diseña y revisa tres homepages mockup A/B/C en el rol `disenador`. El usuario elige A/B/C o combinación concreta; Astra desarrolla **toda la web** elegida en el rol `desarrollador`.
7. Sol ejecuta auditoría SEO completa y pruebas; Astra corrige defectos de código/diseño y Sol verifica hasta la entrega contra `META.md`. Comprobar selección y delegación reales de los roles `.codex/`, sin atribuir ejecución por escribir un nombre.

Las dos pausas ordinarias después de la entrevista son **presupuesto y elección visual**. Cerrada la exploración, congelar compras hasta aprobar la propuesta para conservar una base acumulada estable. Todas las compras nuevas posteriores consumen su máximo adicional, incluso si aclaran una pregunta de exploración.

Una decisión esencial pendiente, acceso/modelo no disponible, coste fuera del alcance o publicación sin autorización puede impedir una acción dependiente. Registrar la condición, preparar el traspaso cuando corresponda y continuar las tareas independientes; no sustituir modelos ni integraciones silenciosamente. Las fases no requieren confirmación adicional y los permisos del entorno no se eluden.

Ejemplos: servicios + portfolio; blog + directorio; catálogo + contenido editorial; tienda + reservas.
La selección puede evolucionar si aparece una necesidad real, registrando su efecto en alcance, datos y costes.
No cambiar el negocio ni la modalidad de asociación del usuario para adaptarlos a una plantilla.

## Módulos combinables

| Módulo | Entradas que cambian decisiones | Páginas o vistas según alcance | Datos y recorrido principal | Skills SEO pertinentes | Comprobación específica |
|---|---|---|---|---|---|
| Servicios / landing | Oferta, público, zona, pruebas y contacto receptor | Inicio o landing, servicio, contacto | Oferta → confianza → consulta → recepción | `seo-plan`, `seo-content`, `seo-local` si aplica, `seo-page` | Envío y recepción comprobados; no basta mostrar un aviso de éxito |
| Portfolio | Trabajos publicables, permisos, descripción y autoría | Índice, proyecto, contacto | Explorar → caso real → consulta | `seo-images`, `seo-content`, `seo-page` | Medios cargan; créditos y resultados son ciertos; recorrido funciona en móvil |
| Blog / editorial | Temas, autores, revisión, frecuencia y quién editará | Índice, artículo, autor; categorías útiles | Descubrir → leer → siguiente acción | `seo-content`, `seo-schema`, `seo-sitemap`; `seo-cluster` si procede | Borradores excluidos; rutas estables; navegación y publicación verificadas |
| Catálogo sin pago | Productos, variantes, precios si públicos y receptor | Catálogo, categoría, ficha, selección | Filtrar → seleccionar → enviar consulta | `seo-ecommerce`, `seo-images`, `seo-schema` cuando corresponda | Consulta conserva productos y variantes; contacto real; sin fingir pago |
| Tienda con pago | Catálogo, stock, moneda, entrega, gestión y proveedor de pago | Catálogo, ficha, carrito, checkout, confirmación | Seleccionar → pagar → pedido registrado → gestión | `seo-ecommerce`, `seo-technical`, `seo-schema`, `seo-sitemap` | Operación íntegra en modo de prueba; importes y confirmación verificados en servidor |
| Directorio / recursos | Tipos de fichas, origen, revisión, filtros y responsable | Listado, ficha, categorías con valor | Buscar o filtrar → recurso → acción | `seo-content`, `seo-schema` pertinente; `seo-programmatic` solo a escala | Sin resultados y fichas incompletas tratados; enlaces útiles; sin páginas vacías indexables |
| Reservas | Qué se reserva, disponibilidad, duración y confirmación | Oferta, disponibilidad, formulario, resultado | Elegir → solicitar o reservar → confirmar | `seo-local` si aplica, `seo-page`, `seo-schema` pertinente | No confundir solicitud con reserva confirmada; evitar duplicar horarios |
| Cuentas de usuario | Quién entra, para qué, roles y datos necesarios | Acceso, recuperación, área privada | Entrar → acción autorizada → salir | `seo-technical` para separar rutas públicas y privadas | Autorización en servidor; datos ajenos inaccesibles; recuperación y cierre de sesión |

Las páginas indicadas son posibilidades, no un mínimo que deba rellenarse con contenido débil.
Las cuentas se añaden únicamente cuando el recorrido lo exige; una web editorial no necesita cuentas por defecto.
La columna de skills da ejemplos pertinentes, no una selección reducida por defecto: evaluar las 26 conforme a `SEO-COMPLETO.md`. Leer y aplicar cada procedimiento cuando corresponda; la tabla no autoriza consultas de pago. Falta de acceso o evidencia externa se registra como pendiente/bloqueo, no como `no_aplica`.

## Decisiones esenciales por naturaleza del sitio

**Renovación:** modalidad transversal a todos los módulos. Seguir [MIGRACIONES.md](MIGRACIONES.md): distinguir conservar dominio y conservar rutas, registrar prioridades/accesos y comprobar baseline, mapa de URLs/archivos, equivalencias, continuidad de funciones, respaldo y reversión. No sustituir la web pública con una entrega parcial. Registrar por separado pruebas en preview, públicas y seguimiento posterior autorizado; no garantizar posiciones ni tráfico por cambiar tecnología.

**Venta:** preguntar si se busca un catálogo para consultar por WhatsApp/formulario o comprar y pagar dentro del sitio.
No elegir una de estas opciones por el usuario. Un botón de WhatsApp no completa una tienda con checkout solicitado.
Si ya existe una decisión, reutilizarla y preguntar solo por lo que falte para implementarla.

**Edición:** preguntar quién cambiará artículos, productos o disponibilidad y si necesita un editor visual.
Usar la fuente existente si sirve; no introducir un CMS, panel administrativo o suscripción sin necesidad.
Si el usuario editará archivos, documentar el cambio mínimo; si necesita un editor, preparar la integración acordada.

**Reservas:** distinguir petición pendiente de aceptación y reserva inmediata sobre disponibilidad real.
**Directorio:** aclarar quién valida y mantiene las fichas y si cualquiera puede enviar propuestas.
**Contenido especializado:** identificar quién revisa exactitud y credenciales; no inventar avales ni testimonios.

## Base técnica constante, integraciones según necesidad

- Astro organiza páginas, layouts y componentes; Tailwind define estilos y el sistema visual del proyecto.
- Compartir componentes, esquemas de datos y procedimientos; cada proyecto conserva su identidad y contenido.
- Mantener una fuente principal para contenido y datos; las vistas consumen esa fuente, sin duplicar precios o stock.
- Elegir generación estática o ejecución de servidor según los recorridos, el hosting y las integraciones acordadas.
- Añadir JavaScript interactivo donde el recorrido lo necesita; no exigir que todo el sitio sea una aplicación.
- Un pago, una cuenta o una reserva puede necesitar servidor o un servicio externo; Astro no lo sustituye por sí solo.
- Reutilizar proveedores existentes. Explicar las opciones imprescindibles antes de fijar uno que cambie costes u operación.
- Si faltan credenciales o proveedor, continuar interfaz, contenido y pruebas simuladas; registrar la integración pendiente.
- Las simulaciones llevan identificación clara en la evidencia y nunca se presentan como una operación real.
- No incrustar secretos en navegador, repositorio o capturas; usar la configuración del entorno que corresponda.

## Detalles que no deben perderse

### Blog y contenido editorial

Definir campos mínimos: título, slug estable, descripción, contenido, autor cuando corresponda, fechas y estado de publicación.
Organizar contenido mediante un esquema validable; comprobar referencias y evitar que un borrador se publique o entre al sitemap.
Conservar o redirigir URLs existentes cuando cambie la estructura, con una correspondencia comprobada.
Añadir paginación cuando el volumen lo requiera; navegación accesible y artículos alcanzables sin depender de una búsqueda.
Crear categorías con contenido y utilidad reales; no multiplicar etiquetas vacías ni páginas casi idénticas indexables.
Incluir RSS si forma parte del alcance editorial; verificar sus enlaces y que excluya borradores.
Si se solicita búsqueda, comprobar coincidencias, ausencia de resultados y navegación al artículo correcto.

### Catálogo y tienda

Centralizar identificadores, variantes, precios, moneda, disponibilidad e imágenes en la fuente de catálogo acordada.
Verificar filtros, producto inexistente, variante agotada, cantidades y persistencia pertinente de la selección o carrito.
En catálogo, el mensaje de consulta debe identificar la selección y llegar al contacto configurado sin inventar destinatarios.
En tienda, el servidor comprueba precios, cantidades y disponibilidad; no acepta como válidos importes enviados por el navegador.
Confirmar pago desde una señal fiable del proveedor validada en servidor, no desde la URL de retorno del navegador.
El procesamiento de una misma confirmación repetida no debe generar pedidos, cobros o descuentos de stock duplicados.
Comprobar pago aprobado, rechazado, cancelado y reintentado en modo de prueba, sin generar cargos reales.
Ante fallo, conservar el carrito y explicar cómo continuar sin afirmar que existe un pedido pagado.
Verificar que el responsable puede consultar y gestionar el pedido; una pantalla de agradecimiento no demuestra esa capacidad.
Registrar qué cubre el alcance sobre envíos, impuestos, devoluciones y notificaciones; no completar reglas comerciales inventadas.

## Tres diseños con contenido real

**GPT-6 Astra / ultra** recibe público, recorrido, identidad, contenido real y evidencias; el texto no queda pendiente de encajar después.
Para una dirección nueva, preparar **tres mockups A/B/C** distintos en composición, tipografía y estilo. La identidad existente es una restricción: no reemplazarla por inferencia. Si ya existe una elección, continuar con ella sin repetir la pausa.
Construir un comparador navegable y entregar **URLs reales** de previews iniciadas. Tres descripciones, paletas o cambios de color sobre una misma plantilla no cumplen el criterio.
Cada opción muestra una **homepage responsive** en escritorio y móvil, comprobada en navegador y con contenido del proyecto. Añadir una vista interior representativa cuando ayude a decidir el recorrido, sin exigir construir tres webs enteras. En una landing de una sola página, revisar sus secciones y recorrido sin inventar una página interior.
La vista interior depende del módulo: artículo, producto, servicio, ficha o flujo de reserva.
Revisar las propuestas internamente con capturas completas y recorridos; corregir defectos y descartar las que no cumplan el contenido, la identidad y la calidad visual antes de presentarlas. No pedir al usuario elegir entre propuestas sin revisar.
El usuario elige A, B, C o una combinación concreta; registrar `esperando_eleccion_visual` antes de la pausa, guardar elección/ajustes antes de extenderla y continuar sin nuevas confirmaciones por fase.
Registrar tipografía, paleta, espaciado, tratamiento de imágenes, componentes y comportamiento responsive de la elegida.
Reutilizar primitivas no obliga a repetir hero, composición, colores, fotografía ni recorrido entre negocios.
**Astra ultra desarrolla toda la web** con el diseño elegido, incluyendo páginas interiores y flujos; una portada cuidada con páginas interiores genéricas no cumple el criterio.
Revisar textos largos, imágenes ausentes y estados lentos, vacíos o de error que existan realmente en ese proyecto.
El nombre del modelo en un prompt no cambia la selección: comprobar modelo/esfuerzo reales y soporte de delegación, o preparar el traspaso a Astra ultra. Que este entorno lo admita no demuestra acceso en otro cliente. Un prompt o modelo no garantiza calidad ni posiciones SEO.

## Criterios comunes de entrega

| Área | Evidencia necesaria |
|---|---|
| Contenido | Textos y datos reales, sin marcadores pendientes en el alcance entregado; afirmaciones respaldadas |
| SEO | Matriz de 26 subskills con procedimientos/evidencia; auditoría `seo-audit` completa, intención y páginas alineadas, configuración coherente y cobertura externa pendiente explícita |
| Datos estructurados | Solo tipos y propiedades verdaderos, coherentes con contenido visible y validados |
| Accesibilidad | Semántica, teclado, foco visible, etiquetas, contraste y alternativas de imágenes revisados |
| Diseño | Inicio y vistas representativas en móvil/escritorio; sin desbordamientos ni contenido cortado |
| Rendimiento | Imágenes dimensionadas y bien servidas; comprobar el recorrido con carga lenta cuando sea relevante |
| Funcionamiento | Recorrido principal completo; estados y errores necesarios; recepción o transacción probada según módulo |
| Mantenimiento | Fuente de datos y forma de editar identificables; configuración y pendientes documentados |

Las verificaciones técnicas siguen el proyecto: validación de tipos/contenido disponible, compilación y comprobaciones pertinentes.
Sol high ejecuta `seo-audit` completo: ocho especialistas siempre y siete condicionales según la skill; con slots limitados, completar las disciplinas secuencialmente. Seguir [SEO-COMPLETO.md](SEO-COMPLETO.md) y enlazar sus artefactos desde `ESTADO.md`.
Ejecutar un recorrido breve de navegación y contacto; usar pruebas de extremo a extremo para transacciones críticas.
Comprobar más allá del estado inicial: navegación interior, móvil y entradas que realmente recibe el sistema.
Una compilación correcta no demuestra buen diseño, entrega de mensajes, cobros ni comportamiento público.
La publicación y los cambios externos requieren autorización existente; no publicar por terminar la revisión local.
Tras publicar con autorización, verificar URLs y recorrido público; si faltan accesos, dejar esa comprobación pendiente.

## Correcciones y cierre

Sol high documenta defectos concretos de código/diseño; Astra ultra los corrige dentro del alcance autorizado y Sol verifica las partes afectadas.
Registrar cada incidencia y su cierre con el helper de [BITACORA.md](BITACORA.md): hallazgo, impacto, causa conocida o hipótesis, corrección y evidencia de verificación. `MEJORAS.md` enlaza esos eventos y aprendizajes; no marca resuelto un cambio sin comprobar. Un aprendizaje puede mejorar pruebas o instrucciones del proyecto dentro del alcance, sin modificar skills globales ni otros proyectos por inferencia.
Realizar como máximo dos ciclos amplios de revisión; después, usar una lista concreta de defectos, causas y acciones.
Ese límite evita auditorías repetidas: no autoriza cerrar como listo un proyecto con fallos críticos conocidos.
Si algo requiere una decisión o acceso externo, continuar tareas independientes y dejar la condición de cierre explícita.
No perseguir una puntuación de 100 ni añadir páginas o funciones para mejorar una cifra sin utilidad para el proyecto.

Antes de entregar, comparar el resultado contra `META.md`: páginas y cantidades, funciones, entregables, exclusiones, cada flujo crítico y pendientes. Indicar evidencia del cumplimiento y límites de lo comprobado; la existencia de código no cierra un elemento. No pedir al usuario una ronda ordinaria de aprobación para sustituir estas comprobaciones.

Registrar la evidencia en `ESTADO.md`, sin crear otro informe para repetirla:
Enlazar la matriz `SEO-COBERTURA.md` y los entregables del protocolo `seo-audit`, sin duplicar sus hallazgos completos en el estado.

```text
Módulos y recorrido principal:
Cumplimiento de META.md: elemento, resultado, evidencia y pendientes:
Dirección visual elegida y quién la eligió:
Entorno y URL: local / vista previa / público
Comprobación | Resultado: aprobado / fallo / pendiente / no_aplica | Evidencia y fecha
Integraciones: simulada / prueba del proveedor / real verificada
Defectos que impiden la entrega y siguiente acción:
Bitácora, incidencias abiertas y aprendizajes verificados: enlaces
Renovación: baseline, mapa de URLs, respaldo/reversión y pruebas públicas pendientes
Pendientes que no impiden la entrega, responsable y alcance afectado:
Estado final y límite de lo demostrado:
```

Usar los estados de `proyecto.json`: `en_construccion`, `preview_verificada`, `lista_para_publicar`, `publicada_verificada` y `operativa_verificada`.
**Preview verificada** demuestra solo lo probado en ese entorno; **lista para publicar** exige dependencias esenciales y controles previos resueltos; **publicada verificada** exige disponibilidad pública comprobada.
**Operativa verificada** requiere el recorrido real y las integraciones necesarias comprobados; no equivale a vista previa.
**SEO con resultados** requiere evidencia posterior de indexación, visibilidad y acciones; no se deduce de estas verificaciones.
Una preview local no verifica GSC, indexación pública, GBP, rendimiento de campo ni conversiones reales: conservar los pendientes externos y declarar los límites.
El presupuesto DataForSEO de `AGENTS.md` es compartido entre módulos del sitio; añadir blog o tienda no lo reinicia.
Si el alcance necesita más investigación que la autorizada, registrar la cobertura pendiente y estimar su ampliación.
La recomendación de mantenimiento no activa consultas, seguimiento ni gasto recurrente.
