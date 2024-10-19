const { HttpHelper } = require('./../helpers/http-helper')

// Not online:
// const reviewers = github.context.payload.pull_request.requested_reviewers.length

const m2 = () => {
    return HttpHelper.getOnlinePullRequest()
        .then(pullRequest => pullRequest.requested_reviewers.length)
        .then(reviewers => {
            let reviewersPoints = 0

            if (reviewers === 1) {
                reviewersPoints = 3
            } else if (reviewers === 2) {
                reviewersPoints = 4
            } else if (reviewers > 2) {
                reviewersPoints = 5
            }

            const m2_1 = reviewersPoints * 0.65
            const m2_2 = 5 * 0.35; // calibrar

            return m2_1 + m2_2
        })
}

module.exports = { m2 }