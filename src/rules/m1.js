const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateCommitsQuantity, evaluateCommitFilesQuantity, evaluateLinesQuantity } = require('./../helpers/calc-helper')

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
                            commitFilesQuantity += evaluateCommitFilesQuantity(commit.commit.message, commit.files.length)

                            let fileLines = 0
                            commit.files.forEach(file => {
                                fileLines += evaluateLinesQuantity(commit.commit.message, file.changes)
                            })

                            commitFileLinesQuantity += fileLines / commit.files.length
                        })
                    }

                    setTimeout(() => {
                        const m1_1 = evaluateCommitsQuantity(pullRequest.commits) * 0.2
                        const m1_2 = (commitFilesQuantity / commits.length) * 0.25
                        const m1_3 = (commitFileLinesQuantity / commits.length) * 0.25
                        const m1_4 = evaluateLinesQuantity(pullRequest.additions + pullRequest.deletions) * 0.3

                        resolve(m1_1 + m1_2 + m1_3 + m1_4)
                    }, 500)
                })
            })
    })
}

module.exports = { m1 }