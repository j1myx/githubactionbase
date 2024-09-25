const github = require('@actions/github');
const httpClient = require('@actions/http-client');

const commits = github.payload.pull_request.commits;

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
 * 
 * @returns {Promise<object>}
 */
function calculateCommitPercentajes() {
    const http = new httpClient.HttpClient()

    return new Promise((resolve, reject) => {
        http.get(github.payload.pull_request.commits_url).then(res => {
            res.readBody().then(readBody => {
                const body = JSON.parse(readBody)

                let files = 0;
                let changes = 0;

                for (let i = 0; i < body.length; i++) {
                    const commitUrl = body[i].url;

                    http.get(commitUrl).then(resCommit => {
                        files += resCommit.files;
                        changes += resCommit.stats.total;
                    });
                }

                const percentajeFiles = files / body.length;
                const percentajeLines = changes / body.length;

                setTimeout(() => {
                    resolve({ files: percentajeFiles, changes: percentajeLines, totalChanges: changes })
                }, 1000)
            })
        })
    })
}

/**
 * Validar la cantidad de commits.
 */
function validateCommitQuantity(commitPercentajes) {
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
 * 
 */
function validateCommitFilesQuantity(commitPercentajes) {
    const percentajeFiles = commitPercentajes.files;

    if (percentajeFiles >= 40) {
        return 1;
    } else if (percentajeFiles >=30 && percentajeFiles < 40) {
        return 2;
    } else if (percentajeFiles >= 20 && percentajeFiles < 30) {
        return 3;
    } else if (percentajeFiles >= 15 && percentajeFiles < 20) {
        return 4;
    } else if (percentajeFiles < 15) {
        return 5;
    }
}

/**
 * 
 */
function validateCommitLinesQuantity(commitPercentajes) {
    const percentajeLines = commitPercentajes.changes;

    if (percentajeLines >= 350) {
        return 1;
    } else if (percentajeLines >=250 && percentajeLines < 350) {
        return 2;
    } else if (percentajeLines >= 150 && percentajeLines < 250) {
        return 3;
    } else if (percentajeLines >= 100 && percentajeLines < 150) {
        return 4;
    } else if (percentajeLines < 100) {
        return 5;
    }
}

/**
 * 
 */
function validatePRLinesQuantity(commitPercentajes) {
    const prLines = commitPercentajes.totalChanges;

    if (prLines >= 350) {
        return 1;
    } else if (prLines >=250 && prLines < 350) {
        return 2;
    } else if (prLines >= 150 && prLines < 250) {
        return 3;
    } else if (prLines >= 100 && prLines < 150) {
        return 4;
    } else if (prLines < 100) {
        return 5;
    }
}

module.exports = new Promise((resolve, reject) => {
    calculateCommitPercentajes().then(cp => {
        const m1_1 = validateCommitQuantity(cp) * 0.2
        const m1_2 = validateCommitFilesQuantity(cp) * 0.25
        const m1_3 = validateCommitLinesQuantity(cp) * 0.25
        const m1_4 = validatePRLinesQuantity(cp) * 0.3
    
        const total = m1_1 + m1_2 + m1_3 + m1_4

        resolve({m1: total})
    })
})