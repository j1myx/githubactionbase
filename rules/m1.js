const github = require('@actions/github');
const httpClient = require('@actions/http-client');

const validateCommitStandard = (commit) => {
    const regex = /^(ci|docs|feat|fix|perf|refactor|test|style|chore|revert)\([a-z]{2,20}\):( [A-Z]{4}-[0-9]{1,30})? [ a-zA-Z0-9áéíóú]*$/

    return commit.length <= 72 && regex.test(commit)
}

/**
 * Validar la cantidad de commits.
 */
const validateCommitQuantity = (commits) => {
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
 * 
 */
const validateCommitLinesQuantity = (changes) => {
    if (changes >= 350) {
        return 1;
    } else if (changes >=250 && changes < 350) {
        return 2;
    } else if (changes >= 150 && changes < 250) {
        return 3;
    } else if (changes >= 100 && changes < 150) {
        return 4;
    } else if (changes < 100) {
        return 5;
    }
}

/**
 * 
 */
const validatePRLinesQuantity = (totalChanges) => {
    if (totalChanges >= 350) {
        return 1;
    } else if (totalChanges >=250 && totalChanges < 350) {
        return 2;
    } else if (totalChanges >= 150 && totalChanges < 250) {
        return 3;
    } else if (totalChanges >= 100 && totalChanges < 150) {
        return 4;
    } else if (totalChanges < 100) {
        return 5;
    }
}

const m1 = () => {
    const http = new httpClient.HttpClient();
    const commits = github.context.payload.pull_request.commits;

    return new Promise((resolve, reject) => {
        console.log("commits_url", github.context.payload.pull_request.commits_url)

        http.get(github.context.payload.pull_request.commits_url).then(res => {
            res.readBody().then(readBody => {
                console.log("response value", readBody)
                console.log("response type", typeof readBody)
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
                    const m1_1 = validateCommitQuantity(commits) * 0.2
                    const m1_2 = validateCommitFilesQuantity(percentajeFiles) * 0.25
                    const m1_3 = validateCommitLinesQuantity(percentajeLines) * 0.25
                    const m1_4 = validatePRLinesQuantity(changes) * 0.3
                
                    resolve(m1_1 + m1_2 + m1_3 + m1_4)
                }, 500)
            })
        })
    })
}

module.exports = { m1 }