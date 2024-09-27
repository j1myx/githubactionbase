const github = require('@actions/github');

const pull_request = github.context.payload.pull_request;
const modiffied = pull_request.additions + pull_request.deletions;

const linesInPr = () => {
    if (modiffied > 1200) {
        return 1;
    } else if (modiffied > 500 && modiffied <= 1200) {
        return 2;
    } else if (modiffied > 300 && modiffied <= 500) {
        return 3;
    } else if (modiffied > 50 && modiffied <= 300) {
        return 4;
    } else if (modiffied <=  50) {
        return 5;
    }
}

const m3 = () => {
    const m3_1 = 5 * 0.75; // cron job
    const m3_2 = linesInPr() * 0.25;

    return m3_1 + m3_2;
}

module.exports = { m3 }