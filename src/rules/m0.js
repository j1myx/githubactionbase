const github = require('@actions/github')

const { HttpHelper } = require('./../helpers/http-helper')
const { validateBranchStandard, validateCommitStandard } = require('./../helpers/format-helper')
const { WORKFLOW_PRE_PULL_REQUEST, WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST } = require('./../constants/workflows.constant')


const m0 = () => {
    return new Promise((resolve, reject) => {
        if ([WORKFLOW_PULL_REQUEST, WORKFLOW_POST_PULL_REQUEST].includes(github.context.workflow)) {
            const httpPullRequest = WORKFLOW_PULL_REQUEST === github.context.workflow
                ? HttpHelper.getEventPullRequest()
                : HttpHelper.getPullRequestById()

            httpPullRequest.then(pullRequest => {
                console.info('Origin branch: ' + pullRequest.head.ref)
                const m0_1 = validateBranchStandard(pullRequest.head.ref) ? 2 : 0
                let m0_2 = 2

                HttpHelper.get(pullRequest.commits_url).then(commits => {
                    for (let i = 0; i < commits.length; i++) {
                        const commit = commits[i]

                        console.info('Commit N° ' + i + ': ' + commit.commit.message)

                        if (!validateCommitStandard(commit.commit.message)) {
                            m0_2 = 0
                            break
                        }
                    }

                    resolve(m0_1 + m0_2)
                })
            })
        } else {
            /**
             * Workflow: WORKFLOW_PRE_PULL_REQUEST
             */
            HttpHelper.getCommitsByCompareBranch().then(commits => {
                console.info('Origin branch: ' + github.context.ref)
                const m0_1 = validateBranchStandard(github.context.ref) ? 2 : 0
                let m0_2 = 2

                for (let i = 0; i < commits.length; i++) {
                    const commit = commits[i]

                    console.info('Commit N° ' + i + ': ' + commit.commit.message)

                    if (!validateCommitStandard(commit.commit.message)) {
                        m0_2 = 0
                        break
                    }
                }

                resolve(m0_1 + m0_2)
            })
        }
    })
}

module.exports = { m0 }