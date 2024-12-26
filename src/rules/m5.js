const github = require('@actions/github')
const core = require('@actions/core')

const { getDaysDiff } = require('./../helpers/calc-helper')
const { WORKFLOW_CRON_JOB, WORKFLOW_PULL_REQUEST } = require('./../constants/workflows.constant')

const m5 = () => {
    return new Promise((resolve, reject) => {
        if (WORKFLOW_PULL_REQUEST === github.context.workflow) {
            HttpHelper.getEventPullRequest()
                .then(pullRequest => {
                    const days = getDaysDiff(pullRequest.created_at)

                    if (days >= 7) {
                        resolve(0)
                    } else {
                        resolve(5)
                    }
                })
        } else if (WORKFLOW_CRON_JOB === github.context.workflow) {
            // TODO: Implementar cron job to M3
            reject(new Error('Do not implement M5 to cron job workflow'))
        } else {
            reject(new Error('Invalid workflow called'))
        }
    });
}

module.exports = { m5 }