/**
 * Validar el formato del commit.
 * 
 * @param {string} commit 
 * @returns 
 */
function validateCommitStandard(commit) {
    const regex = /^(ci|docs|feat|fix|perf|refactor|test|style|chore|revert)\([a-z]{2,20}\):( [A-Z]{4}-[0-9]{1,30})? [ a-zA-Z0-9áéíóú]*$/

    return commit.length <= 72 && regex.test(commit)
}

/**
 * Validar la cantidad de commits.
 * 
 * @param {string[]} commits 
 */
function validateCommitQuantity(commits) {
    const commitsQuantity = 5;

    return commits.length >= commitsQuantity;
}

/**
 * 
 * @param {{ commitId: string, files: number }[]} commits 
 */
function validateCommitFilesQuantity(commits) {
    commits[0]
}

/**
 * Me falta:
 * 
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
 */

module.exports = {
    m1: 5
}