 * M1:
 * - Cantidad de commits: si
 * - Cantidad de archivos por commit: si
 * - Cantidad de lineas modificadas de archivo por commit: si (pull->commit->files)
 * - Lineas modificadas en un PR: si
 * 
 * M2:
 * - Cantidad de aprovadores: si
 * - Cantidad de declinados: externo, no esta en el contexto del PR.
 * 
 * M3:
 * - Lineas modificadas en un PR: si
 * - Tiempo de cierre de un PR: si (cronjob created_at)
 * M4:
 * - Cantidad de comentarios y tareas abiertas en un PR: ?
 * M5:
 * - PR abiertos: externo, no esta en el contexto del PR. Sin embargo se puede hacer un cronjob indicando la demora.