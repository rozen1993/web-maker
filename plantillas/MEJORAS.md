# Incidencias y mejoras del proyecto

Estado inicial: sin incidencias registradas. Esto no significa que se hayan realizado o aprobado comprobaciones.

Mantener una entrada por hallazgo real. Enlazar los `event_id` de BITACORA.jsonl; no copiar importes del registro de DataForSEO ni almacenar secretos. Este documento es un resumen editable, no sustituye el historial. No inventar acontecimientos anteriores al inicio del registro.

## Ficha para cada incidencia

- **ID estable:** pendiente de asignar al detectar una incidencia.
- **Estado:** `pendiente` → `en_correccion` → `resuelto`; reabrir como `pendiente` si la comprobación posterior falla.
- **Fase y entorno:** dónde se observó, distinguiendo local, preview y público.
- **Hallazgo e impacto:** comportamiento esperado, resultado observado y a quién afecta.
- **Evidencia inicial:** archivo, informe, captura o resultado verificable, con fecha y alcance.
- **Causa:** confirmada, hipótesis o todavía desconocida; no convertir una hipótesis en hecho.
- **Corrección propuesta:** acción concreta y dependencias. No amplía alcance ni autoriza gastos o publicación.
- **Corrección aplicada:** cambio realizado y referencia al archivo o commit, cuando exista.
- **Prueba posterior y resultado:** evidencia de la comprobación afectada; si no se ejecutó, sigue pendiente.
- **Aprendizaje propuesto:** comprobación o cambio reutilizable que podría prevenir la repetición.
- **Aplicación del aprendizaje:** `pendiente`, `aplicado_y_verificado` o `descartado_con_motivo`, con motivo y evidencia.
- **Eventos relacionados:** IDs del hallazgo, corrección y cierre en BITACORA.jsonl.

No rellenar la ficha con casos ficticios. Al crear una incidencia real, copiarla y completar solo lo conocido. Una recomendación no se marca aplicada por escribirla. Las mejoras de este proyecto no modifican automáticamente el kit, skills globales ni memorias; cualquier cambio debe estar dentro del encargo vigente.
