const github = require('@actions/github')
const core = require('@actions/core')

const { HttpHelper } = require('./../helpers/http-helper')
const { evaluateLinesQuantity, evaluateTimeQuantity, getHoursDiff } = require('./../helpers/calc-helper')
const { WORKFLOW_PRE_PULL_REQUEST, WORKFLOW_PULL_REQUEST, WORKFLOW_CRON_JOB } = require('./../constants/workflows.constant')
const { BODY, ITEM } = require('./../constants/request.constant')

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
            HttpHelper.getPullRequests()
                .then(prs => {
                    const open_prs = prs.filter(pr => getHoursDiff(pr.created_at) >= 1)

                    if (open_prs.length > 0) {
                        let request = BODY
                        const items = open_prs.map(pr => {
                            let item = ITEM;
                            item.title = pr.title;
                            item.subtitle = (Math.floor(getHoursDiff(pr.created_at))) + ' hora(s)';
                            item.tap.value = pr.html_url;

                            return item;
                        })

                        request.attachments[0].content.items = items;

                        HttpHelper.post(core.getInput('webhook_url'), request)
                            .then();

                        resolve(0)
                    } else {
                        resolve(5)
                    }
                })
        } else {
            reject(new Error('Invalid workflow called'))
        }
    })
}

module.exports = { m3 }