const github = require('@actions/github')

const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateLinesQuantity } = require('./../helpers/calc-helper')
const { WORKFLOW_PRE_PULL_REQUEST, WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST } = require('./../constants/workflows.constant')

const m3 = () => {
    return new Promise((resolve, reject) => {
        if ([WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST].includes(github.context.workflow)) {
            const httpPullRequest = WORKFLOW_PULL_REQUEST === github.context.workflow
                ? HttpHelper.getEventPullRequest()
                : HttpHelper.getPullRequestById()
            httpPullRequest
                .then(pullRequest => {
                    const m3_1 = 5 * 0.75; // TODO: cron job
                    const m3_2 = evaluateLinesQuantity(pullRequest.additions + pullRequest.deletions) * 0.25;
                
                    resolve(m3_1 + m3_2)
                })
        } else {
            /**
             * Workflow: WORKFLOW_PRE_PULL_REQUEST
             */
            HttpHelper.getFilesByCompareBranch().then(files => {
                const m3_1 = 5 * 0.75; // TODO: cron job

                let commitLinesQuantity = 0

                files.forEach(file => {
                    commitLinesQuantity += file.changes
                })

                const m3_2 = evaluateLinesQuantity(commitLinesQuantity) * 0.25;
            
                resolve(m3_1 + m3_2)
            })
        }
    })
}

module.exports = { m3 }