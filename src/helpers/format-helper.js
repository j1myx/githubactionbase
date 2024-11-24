/**
 * Validar estandar de commits
 */
const validateCommitStandard = (commit) => {
    const regex = /^(ci|docs|feat|fix|perf|refactor|test|style|chore|revert)(\([a-z]{2,20}\))?:( [A-Z]{4}-[0-9]{1,30}) [ a-zA-Z0-9áéíóú]*$/

    return commit.length <= 72 && regex.test(commit)
}

const validateBranchStandard = (branch) => {
    const regex = /^(feature|bugfix|hotfix|release)\/([A-Z]{4}-[0-9]{1,30})$/

    return regex.test(branch)
}

/**
 * 
 * @param {string} commitMessage 
 * @returns 
 */
const validateExonerateCommit = (commitMessage) => {
    return commitMessage.startsWith('chore') || commitMessage.startsWith('style') || commitMessage.startsWith('docs')
}

module.exports = {
    validateCommitStandard,
    validateExonerateCommit,
    validateBranchStandard
}