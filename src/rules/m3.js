const github = require('@actions/github')
const core = require('@actions/core')

const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateLinesQuantity, evaluateTimeQuantity, getHoursDiff } = require('./../helpers/calc-helper')
const { WORKFLOW_PRE_PULL_REQUEST, WORKFLOW_PULL_REQUEST, WORKFLOW_CRON_JOB } = require('./../constants/workflows.constant')

const m3 = () => {
    return new Promise((resolve, reject) => {
        if (WORKFLOW_PULL_REQUEST === github.context.workflow) {
            HttpHelper.getEventPullRequest()
                .then(pullRequest => {
                    const m3_1 = evaluateTimeQuantity(getHoursDiff(pullRequest.created_at), core.getInput('m1', { required: true })) * 0.75;
                    const m3_2 = evaluateLinesQuantity(pullRequest.additions + pullRequest.deletions) * 0.25;

                    resolve(m3_1 + m3_2)
                })
        } else if (WORKFLOW_PRE_PULL_REQUEST === github.context.workflow) {
            HttpHelper.getFilesByCompareBranch().then(files => {
                const m3_1 = 5 * 0.75;

                let commitLinesQuantity = 0

                files.forEach(file => {
                    commitLinesQuantity += file.changes
                })

                const m3_2 = evaluateLinesQuantity(commitLinesQuantity) * 0.25;

                resolve(m3_1 + m3_2)
            })
        } else if (WORKFLOW_CRON_JOB === github.context.workflow) {
            // TODO: Implementar cron job to M3
            reject(new Error('Do not implement M3 to cron job workflow'))
        } else {
            reject(new Error('Invalid workflow called'))
        }
    })
}

module.exports = { m3 }