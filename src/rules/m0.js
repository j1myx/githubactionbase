const { HttpHelper } = require('./../helpers/http-helper')
const { validateBranchStandard, validateCommitStandard } = require('./../helpers/format-helper')

const m0 = () => {
    return new Promise((resolve, reject) => {
        HttpHelper.getOnlinePullRequest()
            .then(pullRequest => {
                const m0_1 = validateBranchStandard(pullRequest.head.ref) ? 2 : 0
                let m0_2 = 2

                HttpHelper.get(pullRequest.commits_url).then(commits => {
                    for (let i = 0; i < commits.length; i++) {
                        const commit = commits[i]

                        if (!validateCommitStandard(commit.commit.message)) {
                            m0_2 = 0
                            break
                        }
                    }

                    resolve(m0_1 + m0_2)
                })
            })
    })
}

module.exports = { m0 }