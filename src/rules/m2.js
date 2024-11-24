const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateReviewersQuantity } = require('./../helpers/calc-helper')

// Not online:
// const reviewers = github.context.payload.pull_request.requested_reviewers.length

const m2 = () => {
    return new Promise((resolve, reject) => {
        HttpHelper.getOnlinePullRequest()
            .then(pullRequest => pullRequest.requested_reviewers.length)
            .then(reviewers => {
                const m2_1 = evaluateReviewersQuantity(reviewers) * 0.65
                const m2_2 = 5 * 0.35; // Static

                resolve(m2_1 + m2_2)
            })
    })
}

module.exports = { m2 }