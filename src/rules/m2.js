const github = require('@actions/github')

const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateReviewersQuantity } = require('./../helpers/calc-helper')
const { WORKFLOW_PULL_REQUEST } = require('./../constants/workflows.constant')

// Not online:
// const reviewers = github.context.payload.pull_request.requested_reviewers.length

const m2 = () => {
    return new Promise((resolve, reject) => {
        if (WORKFLOW_PULL_REQUEST === github.context.workflow) {
            HttpHelper.getEventPullRequest()
                .then(pullRequest => pullRequest.requested_reviewers.length)
                .then(reviewers => {
                    const m2_1 = evaluateReviewersQuantity(reviewers) * 0.65
                    const m2_2 = 5 * 0.35; // Static

                    resolve(m2_1 + m2_2)
                })
        } else {
            reject(new Error('Invalid workflow called'))
        }
    })
}

module.exports = { m2 }