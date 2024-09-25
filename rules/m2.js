const github = require('@actions/github');

const reviewers = github.payload.pull_request.requested_reviewers.length

let reviewers_point = 0;

if (reviewers === 1) {
    reviewers_point = 3; 
} else if (reviewers === 2) {
    reviewers_point = 4;
} else if (reviewers > 2) {
    reviewers_point = 5;
}

let m2_1 = reviewers_point * 0.65;
let m2_2 = 5 * 0.35; // calibrar

const total = m2_1 + m2_2

module.exports = {
    m2: total
}