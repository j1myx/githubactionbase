const github = require('@actions/github')
const core = require('@actions/core')

const { getDaysDiff } = require('./../helpers/calc-helper')
const { WORKFLOW_CRON_JOB, WORKFLOW_PULL_REQUEST } = require('./../constants/workflows.constant')
const { BODY, ITEM } = require('./../constants/request.constant')

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
            HttpHelper.getPullRequests()
                .then(prs => {
                    const open_prs = prs.filter(pr => getDaysDiff(pr.created_at) >= 1)

                    if (open_prs.length > 0) {
                        let request = BODY
                        const items = open_prs.map(pr => {
                            let item = ITEM;
                            item.title = pr.title;
                            item.subtitle = (Math.floor(getDaysDiff(pr.created_at))) + ' día(s)';
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
    });
}

module.exports = { m5 }