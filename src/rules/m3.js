const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateLinesQuantity } = require('./../helpers/calc-helper')

const m3 = () => {
    return new Promise((resolve, reject) => {
        HttpHelper.getOnlinePullRequest()
            .then(pullRequest => {
                const m3_1 = 5 * 0.75; // TODO: cron job
                const m3_2 = evaluateLinesQuantity(pullRequest.additions + pullRequest.deletions) * 0.25;
            
                resolve(m3_1 + m3_2)
            })
    })
}

module.exports = { m3 }