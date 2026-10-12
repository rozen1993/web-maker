# Bitácora del proceso y mejora verificable

La bitácora permite reconstruir decisiones, avances, comprobaciones y correcciones de un proyecto. El coordinador registra hechos resumidos y referencias de evidencia; no razonamiento interno, credenciales, tokens, datos personales innecesarios ni respuestas completas de servicios. El usuario recibe un resumen en ESTADO.md, sin tener que escribir eventos.

## Archivos y responsabilidad

- `BITACORA.jsonl`: una línea JSON por evento, añadida con el helper local. Los eventos anteriores se conservan. Una rectificación se registra como un evento nuevo que cita el ID anterior en `summary` o `evidence`.
- `MEJORAS.md`: resumen editable de incidencias, causas, correcciones, pruebas y aprendizajes propuestos. Usar `plantillas/MEJORAS.md`.
- `ESTADO.md`: fase, situación de entrega, pendientes y siguiente acción. La bitácora no lo actualiza automáticamente.
- `.control/dataforseo.jsonl` o el registro privado vinculado sigue siendo la fuente de verdad financiera. Referenciar un `request_id` cuando sea necesario; no duplicar contadores de gasto aquí.

El iniciador terminal guarda el primer evento de entrevista junto a los archivos iniciales. En chat, el coordinador conserva respuestas parciales en ficha/ESTADO y puede registrar el inicio como `accion`; utiliza `entrevista_completada` únicamente cuando el brief esencial esté resuelto y la META preparada. Después usa el helper al cambiar de fase, registrar una decisión del usuario, ejecutar una comprobación relevante o detectar/corregir un fallo. No genera un evento por cada pensamiento, lectura o detalle irrelevante. Registrar una decisión no la inventa ni concede autorización; enlazar su evidencia original y respetar las reglas de presupuesto, elección visual y publicación.

## Uso local

Desde la raíz del kit, preparar un JSON de entrada dentro de la carpeta privada del proyecto y ejecutarlo:

```powershell
node scripts/bitacora.mjs proyectos/mi-web proyectos/mi-web/evento.json
```

Ejemplo de entrada de comprobación (sustituir referencias y resultados por los reales):

```json
{
  "project_id": "mi-web",
  "phase": "verificacion_seguimiento",
  "type": "verificacion",
  "summary": "Comprobación de enlaces internos completada en preview.",
  "environment": "preview",
  "result": "aprobado",
  "evidence": ["evidencias/enlaces-preview.txt"]
}
```

El script no ejecuta esa comprobación: registra lo declarado. Revisar que la evidencia exista y respalde el resultado sigue siendo responsabilidad del coordinador. No reutilizar el ejemplo como un resultado real.

`node scripts/bitacora.mjs --help` muestra el uso. Se necesita Node 20 o posterior; no requiere paquetes adicionales ni conexiones externas.

## Contrato de eventos

`createEvent(input)` genera `schema_version: 1`, `event_id` UUID v4 y `timestamp` UTC del momento de registro. La entrada no puede imponer esos campos ni fechas pasadas. `appendEvent(projectDir, event)` verifica el identificador contra `proyecto.json`, valida el historial completo y añade el evento. Mover una carpeta no cambia su identidad: se usa `project_id`, no el nombre del directorio.

Campos obligatorios de entrada: `project_id`, `phase`, `type`, `summary`. `project_id` conserva el slug del proyecto; `phase` admite letras ASCII minúsculas, números y guion bajo. Tipos:

| Tipo | Uso y campos adicionales |
| --- | --- |
| `entrevista_completada` | Brief inicial guardado; no significa investigación ejecutada. |
| `cambio_fase` | Resumir fase anterior, nueva fase y razón verificable. |
| `accion` | Trabajo concreto realizado y resultado. |
| `decision` | Decisión explícita, su alcance y referencia a la respuesta original. |
| `verificacion` | `result`: `aprobado`, `fallo`, `pendiente` o `no_aplica`. Aprobado/fallo exigen `evidence`. |
| `incidencia` | `incident_id` estable y `status`: `pendiente`, `en_correccion` o `resuelto`. |

Campos opcionales: `evidence` (lista de hasta 50 referencias), `environment`, `cause`, `solution`, `lesson` y `request_id`. No se admiten campos desconocidos. Los textos tienen un máximo de 2000 caracteres; una evidencia larga debe guardarse en un archivo y referenciarse.

Una incidencia empieza en `pendiente`. Los siguientes eventos conservan su `incident_id`; cerrar como `resuelto` requiere una `solution` descriptiva de al menos 12 caracteres y alguna referencia en `evidence` a la comprobación posterior. La validación comprueba estructura y continuidad, no puede demostrar por sí sola que la solución sea correcta o la referencia auténtica. Una incidencia cerrada puede reabrirse con `pendiente`.

## Errores, concurrencia y límites

- El helper rechaza IDs de evento duplicados, proyectos mezclados, entradas corruptas, líneas incompletas, archivos enlazados y cierres sin evidencia/corrección. Los errores de validación no modifican el historial.
- `.bitacora.lock`, creado de forma exclusiva, impide dos escritores simultáneos que utilicen el helper. Un escritor bloqueado debe revisar y reintentar después; no esperar indefinidamente ni eliminar el lock automáticamente.
- Si un proceso termina de forma abrupta, puede quedar un bloqueo huérfano. Verificar que no siga escribiendo, revisar PID/fecha, conservar una copia del historial y comprobar su integridad antes de retirar manualmente el bloqueo. No inferir que está huérfano solo por su antigüedad o porque un PID no exista en otro equipo.
- Un fallo durante la escritura puede dejar el evento completo o una línea parcial. Antes de reintentar, inspeccionar el final y su `event_id`; no asumir que el error significa que no se guardó nada. El helper no trunca ni repara automáticamente. Conservar copia del original antes de una reparación explícita.
- El lock y las comprobaciones de archivos reducen errores accidentales; no protegen frente a edición manual, manipulación hostil de rutas entre operaciones, escrituras externas que ignoren el lock o toda pérdida por fallos de hardware. No es un registro inviolable ni un sistema distribuido.
- No intercepta acciones de Codex, no registra automáticamente herramientas externas, no autoriza compras, no sustituye pruebas y no promete mejora autónoma. El coordinador tiene que registrar los hitos y aplicar/verificar las correcciones.

Para proyectos anteriores sin bitácora, empezar con un evento actual que diga que se inicia el registro y enlace el estado verificable disponible. No reconstruir como eventos históricos supuestas acciones, aprobaciones o pruebas. Crear MEJORAS.md desde la plantilla sin declarar comprobaciones ejecutadas.

## Convertir una incidencia en una mejora

Documentar el hallazgo, distinguir la causa confirmada de una hipótesis, proponer y aplicar la corrección dentro del alcance autorizado, repetir la comprobación afectada y enlazar su evidencia. Solo entonces cerrar la incidencia. Proponer una mejora reutilizable cuando aporte valor; marcar su aplicación por separado. Un fallo del sitio puede corregirse en ese sitio sin cambiar todas las webs ni las skills globales. Una modificación del kit requiere que forme parte del trabajo autorizado y su propia verificación.
