const github = require('@actions/github')

const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateCommitsQuantity, evaluateCommitFilesQuantity, evaluateLinesQuantity } = require('./../helpers/calc-helper')
const { validateExonerateCommit } = require('./../helpers/format-helper')
const { WORKFLOW_PRE_PULL_REQUEST, WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST } = require('./../constants/workflows.constant')

const m1 = () => {
    return new Promise((resolve, reject) => {
        if ([WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST].includes(github.context.workflow)) {
            const httpPullRequest = WORKFLOW_PULL_REQUEST === github.context.workflow
                ? HttpHelper.getEventPullRequest()
                : HttpHelper.getPullRequestById()

            httpPullRequest.then(pullRequest => {
                HttpHelper.get(pullRequest.commits_url).then(commits => {
                    let commitFilesQuantity = 0
                    let commitFileLinesQuantity = 0

                    let commitLinesQuantity = 0

                    for (let i = 0; i < commits.length; i++) {
                        const commitUrl = commits[i].url

                        HttpHelper.get(commitUrl).then(commit => {
                            if (validateExonerateCommit(commit.commit.message)) {
                                commitFilesQuantity += 5
                                commitFileLinesQuantity += 5
                            } else {
                                commitFilesQuantity += evaluateCommitFilesQuantity(commit.files.length)

                                let fileLines = 0
                                commit.files.forEach(file => {
                                    fileLines += evaluateLinesQuantity(file.changes)
                                    commitLinesQuantity += file.changes
                                })

                                commitFileLinesQuantity += fileLines / commit.files.length
                            }
                        })
                    }

                    setTimeout(() => {
                        const m1_1 = evaluateCommitsQuantity(commits.length) * 0.2
                        const m1_2 = (commitFilesQuantity / commits.length) * 0.25
                        const m1_3 = (commitFileLinesQuantity / commits.length) * 0.25
                        const m1_4 = evaluateLinesQuantity(commitLinesQuantity) * 0.3

                        resolve(m1_1 + m1_2 + m1_3 + m1_4)
                    }, 500)
                })
            })

        } else {
            /**
             * Workflow: WORKFLOW_PRE_PULL_REQUEST
             */
            HttpHelper.getCommitsByCompareBranch().then(commits => {
                let commitFilesQuantity = 0
                let commitFileLinesQuantity = 0

                let commitLinesQuantity = 0

                for (let i = 0; i < commits.length; i++) {
                    const commitUrl = commits[i].url

                    HttpHelper.get(commitUrl).then(commit => {
                        if (validateExonerateCommit(commit.commit.message)) {
                            commitFilesQuantity += 5
                            commitFileLinesQuantity += 5
                        } else {
                            commitFilesQuantity += evaluateCommitFilesQuantity(commit.files.length)

                            let fileLines = 0
                            commit.files.forEach(file => {
                                fileLines += evaluateLinesQuantity(file.changes)
                                commitLinesQuantity += file.changes
                            })

                            commitFileLinesQuantity += fileLines / commit.files.length
                        }
                    })
                }

                setTimeout(() => {
                    const m1_1 = evaluateCommitsQuantity(commits.length) * 0.2
                    const m1_2 = (commitFilesQuantity / commits.length) * 0.25
                    const m1_3 = (commitFileLinesQuantity / commits.length) * 0.25
                    const m1_4 = evaluateLinesQuantity(commitLinesQuantity) * 0.3

                    resolve(m1_1 + m1_2 + m1_3 + m1_4)
                }, 500)
            })
        }
    })
}

module.exports = { m1 }