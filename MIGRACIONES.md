# Renovar una web existente

Este protocolo amplía `AGENTS.md` para `modalidad: renovacion`. Se aplica a cualquier módulo, conservando Astro + Tailwind CSS como destino. El objetivo es mejorar la web y proteger su valor existente con pruebas; no garantizar posiciones invariables. Renovar no autoriza publicar ni cambiar DNS, cuentas, servicios o datos por sí solo.

## Entrevista y meta

El iniciador distingue web nueva y renovación. En renovación recoge URL actual, continuidad o cambio de dominio, mejoras, elementos que deben conservarse, páginas y funciones prioritarias, disponibilidad de Search Console/analítica, tecnología, alojamiento, código, respaldo y responsable. Pregunta una cosa cada vez y reutiliza lo respondido. No pide contraseñas ni un inventario manual de keywords al usuario.

Sol convierte las respuestas en alcance comprobable; completa `MIGRACION-SEO.md` desde su plantilla y lo enlaza en META/ESTADO. Un dato declarado no prueba que haya acceso, respaldo restaurable o funcionalidad operativa. Si aparece una web existente en un proyecto antiguo, incorporar esta modalidad conservando respuestas, decisiones, costes y autorizaciones; no repetir la entrevista completa ni reiniciar la cartera.

## Antes de cambiar contenido o rutas

1. Guardar una fotografía fechada del estado actual: inventario de URLs y archivos públicos, respuestas HTTP, títulos, contenido principal, canonical, indexabilidad, enlaces internos, sitemap y datos estructurados. Usar `seo-technical`, `seo-content`, `seo-sitemap`, `seo-page`, `seo-google`, `seo-drift` y demás especialidades aplicables conforme a SEO-COMPLETO; reutilizar evidencias.
2. Cruzar rastreo, exportaciones del CMS, sitemap, GSC, analítica y registros accesibles. Registrar fuentes, cobertura y huecos. Un rastreo de 500 páginas no prueba que un sitio de mayor tamaño esté inventariado entero. Clasificar las URLs conocidas como conservar, redirigir a equivalente o retirar con justificación. Priorizar las que aportan búsquedas, enlaces o acciones útiles; no olvidar imágenes y descargas.
3. Conservar periodos comparables de clics/impresiones por página y consulta cuando haya acceso: fechas, mercado, dispositivo y estacionalidad. Si faltan datos, registrar la ausencia, pedir acceso/exportación solo si es decisivo y continuar lo independiente. No deducir tráfico observado desde volúmenes ni afirmar preservación de posiciones no medidas.
4. Separar cambios tecnológicos de cambios de oferta, público, contenido o estructura. Conservar rutas útiles y contenido que satisface la intención; justificar los cambios. No generar una nueva estructura solo porque la permite Astro. Cambios materiales de alcance se deciden expresamente, según AGENTS.

La [guía de Google para migraciones con cambios de URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) recomienda correspondencia de URLs y advierte posibles fluctuaciones. Mantener el dominio no conserva automáticamente las rutas. Si cambian, aplicar redirecciones permanentes 301/308 al equivalente pertinente, evitar cadenas y no enviar indiscriminadamente todo a inicio; contenido retirado sin equivalente devuelve 404/410. Actualizar enlaces internos, canonical y sitemap para el destino definitivo. Conservar redirecciones al menos un año, preferiblemente más cuando sigan recibiendo accesos. Fuente revisada el 11/10/2026; verificar su vigencia al ejecutar.

## Construcción, publicación y reversión

Astra recibe el inventario y mapa de URLs junto con META, contenido y elección visual. Las tres propuestas y su elección siguen el flujo normal. No sustituir el sitio público con una portada o un `dist/` incompleto.

Antes de declarar lista para publicar una renovación:

- Completar y probar en preview los destinos, contenidos, archivos y flujos comprometidos; distinguir simulación de integración real.
- Comprobar reglas de redirección en el entorno que las ejecutará. Si la preview no reproduce el hosting, marcar pendiente esa prueba, sin presentar la configuración como ejecución comprobada.
- Resolver incidencias críticas del mapa y de indexabilidad. Registrar diferencias de títulos, contenido, enlaces y datos estructurados; una diferencia deliberada y justificada no es automáticamente un defecto.
- Verificar respaldo recuperable de código/contenido/configuración y, cuando aplique, datos. Registrar dónde está y la evidencia de restauración en un entorno seguro, sin copiar secretos al informe.
- Preparar responsable, destino autorizado, ventana de cambio y reversión. Definir los fallos observables que obligan a detener el cambio o restaurar, pasos y comprobaciones; no reaccionar a una fluctuación de ranking aislada restaurando por automatismo.
- En tiendas, cuentas o reservas, planificar pedidos y cambios recibidos durante la transición; una reversión no puede descartar datos nuevos. Mantener accesibles los servicios necesarios. No alterar correo ni registros DNS ajenos al cambio autorizado.

La [guía de Google para cambiar alojamiento](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes) explica la preparación del entorno y la comprobación de páginas, imágenes, formularios y descargas. Conservar la verificación de Search Console y la medición; retirar bloqueos temporales de indexación solo en el destino que se publica. Comprobar acceso de Googlebot y no retirar prematuramente el alojamiento anterior. Fuente revisada el 11/10/2026.

Publicar solo si está autorizado el destino y las operaciones necesarias. Si la autorización existente ya cubre la transición, avanzar sin añadir otra pausa ordinaria. Si la entrega acordada es preview, entregarla con el plan y pruebas de transición pendientes; no exigir publicación para cerrar una preview válida.

## Verificación y seguimiento delimitados

Tras un cambio autorizado, verificar públicamente las URLs críticas y el mapa aplicable, redirecciones, recursos, canonical, sitemap, robots, verificación de herramientas y recepción de los flujos. Registrar fecha, entorno y evidencia. Una compilación o un check local no demuestra esos resultados remotos.

Comparar la baseline con los datos posteriores disponibles y periodos compatibles. Distinguir preservación técnica comprobada, tráfico observado y escenarios futuros; separar el total esperado del incremento sobre la baseline. Una caída puede requerir diagnóstico, no demuestra por sí sola una causa en el nuevo código.

Definir responsable, fechas/ventanas, accesos, métricas, umbrales y acciones de seguimiento. Es una propuesta hasta estar incluida expresamente en el alcance; no programa tareas, consultas ni gastos recurrentes. Cada hallazgo/corrección se enlaza a BITACORA.jsonl y MEJORAS.md conforme a BITACORA.md.

## Condiciones de entrega

| Estado | Evidencia mínima en renovación |
|---|---|
| `preview_verificada` | Alcance de preview aprobado; mapa y riesgos documentados; límites remotos visibles. |
| `lista_para_publicar` | Pruebas previas aprobadas, dependencias esenciales resueltas, respaldo/reversión comprobables y sin incidencias críticas abiertas. |
| `publicada_verificada` | Destino público y preservación técnica comprobados después del cambio autorizado. |
| `operativa_verificada` | Además, recepción y registro de los flujos reales o de prueba controlada apropiada. |

Ninguno de estos estados equivale a conservar todas las posiciones o haber aumentado tráfico. Para afirmar resultados SEO hacen falta datos posteriores.
