# Perfiles de web y criterios de entrega

Esta guía amplía `AGENTS.md`. Se consulta al definir el alcance y al verificar la entrega.
El resultado utiliza **Astro + Tailwind CSS**. Los módulos se combinan según lo que necesita cada proyecto.
No hay que ejecutar todos los módulos, contratar servicios ni construir funciones que el usuario no haya pedido.

## Uso sencillo

1. El usuario describe su idea con sus propias palabras; no necesita clasificarla técnicamente.
2. Sol identifica los módulos y hace hasta tres preguntas por turno sobre decisiones que falten.
3. Registra la combinación, el recorrido principal y los pendientes en `proyecto.json` y `ESTADO.md`.
4. Investiga, prepara contenido, entrega a Astra high la dirección visual y construye con Sol.
5. Aplica los criterios comunes y los específicos de los módulos seleccionados.

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
Las skills se leen y aplican cuando se usan; la tabla no inventa capacidades ni autoriza consultas de pago.

## Decisiones esenciales por naturaleza del sitio

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

## Diseño excelente con contenido real

Astra high recibe público, recorrido, identidad, contenido real y evidencias; el texto no queda pendiente de encajar después.
Si no existe dirección aprobada, preparar **dos direcciones** suficientemente distintas para elegir con criterio.
Cada una muestra inicio y una vista interior representativa cuando pertenezca al alcance, en móvil y escritorio, con contenido del proyecto. En una landing de una sola página, revisar sus secciones y recorrido sin inventar una página interior.
La vista interior depende del módulo: artículo, producto, servicio, ficha o flujo de reserva.
El usuario elige la dirección o una combinación concreta; si ya eligió, continuar sin repetir esa decisión.
Registrar tipografía, paleta, espaciado, tratamiento de imágenes, componentes y comportamiento responsive de la elegida.
Reutilizar primitivas no obliga a repetir hero, composición, colores, fotografía ni recorrido entre negocios.
Extender el diseño aprobado a todo el recorrido; una portada cuidada con páginas interiores genéricas no cumple el criterio.
Revisar textos largos, imágenes ausentes y estados lentos, vacíos o de error que existan realmente en ese proyecto.
El nombre del modelo en un prompt no cambia la selección: comprobarla o preparar el traspaso a Astra high.

## Criterios comunes de entrega

| Área | Evidencia necesaria |
|---|---|
| Contenido | Textos y datos reales, sin marcadores pendientes en el alcance entregado; afirmaciones respaldadas |
| SEO | Intención y páginas alineadas; títulos, descripciones, canonical, indexabilidad, enlaces y sitemap coherentes donde apliquen |
| Datos estructurados | Solo tipos y propiedades verdaderos, coherentes con contenido visible y validados |
| Accesibilidad | Semántica, teclado, foco visible, etiquetas, contraste y alternativas de imágenes revisados |
| Diseño | Inicio y vistas representativas en móvil/escritorio; sin desbordamientos ni contenido cortado |
| Rendimiento | Imágenes dimensionadas y bien servidas; comprobar el recorrido con carga lenta cuando sea relevante |
| Funcionamiento | Recorrido principal completo; estados y errores necesarios; recepción o transacción probada según módulo |
| Mantenimiento | Fuente de datos y forma de editar identificables; configuración y pendientes documentados |

Las verificaciones técnicas siguen el proyecto: validación de tipos/contenido disponible, compilación y comprobaciones pertinentes.
Ejecutar un recorrido breve de navegación y contacto; usar pruebas de extremo a extremo para transacciones críticas.
Comprobar más allá del estado inicial: navegación interior, móvil y entradas que realmente recibe el sistema.
Una compilación correcta no demuestra buen diseño, entrega de mensajes, cobros ni comportamiento público.
La publicación y los cambios externos requieren autorización existente; no publicar por terminar la revisión local.
Tras publicar con autorización, verificar URLs y recorrido público; si faltan accesos, dejar esa comprobación pendiente.

## Correcciones y cierre

Corregir automáticamente defectos materiales dentro del alcance autorizado y verificar las partes afectadas.
Realizar como máximo dos ciclos amplios de revisión; después, usar una lista concreta de defectos, causas y acciones.
Ese límite evita auditorías repetidas: no autoriza cerrar como listo un proyecto con fallos críticos conocidos.
Si algo requiere una decisión o acceso externo, continuar tareas independientes y dejar la condición de cierre explícita.
No perseguir una puntuación de 100 ni añadir páginas o funciones para mejorar una cifra sin utilidad para el proyecto.

Registrar la evidencia en `ESTADO.md`, sin crear otro informe para repetirla:

```text
Módulos y recorrido principal:
Dirección visual elegida y quién la eligió:
Entorno y URL: local / vista previa / público
Comprobación | Resultado: aprobado / fallo / pendiente / no_aplica | Evidencia y fecha
Integraciones: simulada / prueba del proveedor / real verificada
Defectos que impiden la entrega y siguiente acción:
Pendientes que no impiden la entrega, responsable y alcance afectado:
Estado final y límite de lo demostrado:
```

Usar los estados de `proyecto.json`: `en_construccion`, `preview_verificada`, `lista_para_publicar`, `publicada_verificada` y `operativa_verificada`.
**Preview verificada** demuestra solo lo probado en ese entorno; **lista para publicar** exige dependencias esenciales y controles previos resueltos; **publicada verificada** exige disponibilidad pública comprobada.
**Operativa verificada** requiere el recorrido real y las integraciones necesarias comprobados; no equivale a vista previa.
**SEO con resultados** requiere evidencia posterior de indexación, visibilidad y acciones; no se deduce de estas verificaciones.
El presupuesto DataForSEO de `AGENTS.md` es compartido entre módulos del sitio; añadir blog o tienda no lo reinicia.
Si el alcance necesita más investigación que la autorizada, registrar la cobertura pendiente y estimar su ampliación.
