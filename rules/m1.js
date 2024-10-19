const { HttpHelper } = require('./../helpers/http-helper')

const validateCommitStandard = (commit) => {
    const regex = /^(ci|docs|feat|fix|perf|refactor|test|style|chore|revert)\([a-z]{2,20}\):( [A-Z]{4}-[0-9]{1,30})? [ a-zA-Z0-9áéíóú]*$/

    return commit.length <= 72 && regex.test(commit)
}

/**
 * Validar la cantidad de commits.
 */
const validateCommitsQuantity = (commits) => {
    if (commits >= 8) {
        return 1;
    } else if (commits >= 6 && commits <= 7) {
        return 2;
    } else if (commits === 5) {
        return 3;
    } else if (commits >= 3 && commits <= 4) {
        return 4;
    } else if (commits >= 1 && commits <= 2) {
        return 5;
    }
}

/**
 * Validar la cantidad de archivos por commit
 */
const validateCommitFilesQuantity = (files) => {
    if (files >= 40) {
        return 1;
    } else if (files >=30 && files < 40) {
        return 2;
    } else if (files >= 20 && files < 30) {
        return 3;
    } else if (files >= 15 && files < 20) {
        return 4;
    } else if (files < 15) {
        return 5;
    }
}

/**
 * Validar la cantidad de lineas modificadas
 * 1. Es usado para validar la cantidad de lineas por archivo.
 * 2. Es usado para validar la cantidad de lineas por pull request.
 */
const validateLinesQuantity = (lines) => {
    if (lines >= 350) {
        return 1;
    } else if (lines >=250 && lines < 350) {
        return 2;
    } else if (lines >= 150 && lines < 250) {
        return 3;
    } else if (lines >= 100 && lines < 150) {
        return 4;
    } else if (lines < 100) {
        return 5;
    }
}

const m1 = () => {
    return new Promise((resolve, reject) => {
        HttpHelper.getOnlinePullRequest()
            .then(pullRequest => {
                HttpHelper.get(pullRequest.commits_url).then(commits => {
                    let commitFilesQuantity = 0
                    let commitFileLinesQuantity = 0

                    for (let i = 0; i < commits.length; i++) {
                        const commitUrl = commits[i].url

                        HttpHelper.get(commitUrl).then(commit => {
                            commitFilesQuantity += validateCommitFilesQuantity(commit.files.length)

                            let fileLines = 0
                            commit.files.forEach(file => {
                                fileLines += validateLinesQuantity(file.changes)
                            })

                            commitFileLinesQuantity += fileLines / commit.files.length
                        })
                    }

                    setTimeout(() => {
                        const m1_1 = validateCommitsQuantity(pullRequest.commits) * 0.2
                        const m1_2 = (commitFilesQuantity / commits.length) * 0.25
                        const m1_3 = (commitFileLinesQuantity / commits.length) * 0.25
                        const m1_4 = validateLinesQuantity(pullRequest.additions + pullRequest.deletions) * 0.3

                        resolve(m1_1 + m1_2 + m1_3 + m1_4)
                    }, 500)
                })
            })
    })
}

module.exports = { m1 }