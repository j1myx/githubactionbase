const { HttpHelper } = require('./../helpers/http-helper');

// Not online:
// const reviewers = github.context.payload.pull_request.requested_reviewers.length

const m2 = () => {
    return HttpHelper.getOnlinePullRequest()
        .then(pull_request => pull_request.requested_reviewers.length)
        .then(reviewers => {
            let reviewers_point = 0;

            if (reviewers === 1) {
                reviewers_point = 3;
            } else if (reviewers === 2) {
                reviewers_point = 4;
            } else if (reviewers > 2) {
                reviewers_point = 5;
            }

            const m2_1 = reviewers_point * 0.65;
            const m2_2 = 5 * 0.35; // calibrar

            return m2_1 + m2_2
        })
}

module.exports = { m2 }