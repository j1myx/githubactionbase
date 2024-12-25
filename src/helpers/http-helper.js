const github = require('@actions/github')
const core = require('@actions/core')
const httpClient = require('@actions/http-client')

const http = new httpClient.HttpClient()
http.requestOptions = {
    headers: {
        ['User-agent']: 'COE Software Engineer - Code Review Action',
        //['Authorization']: `Bearer ${github.context.payload.token}`
    }
}

const HttpHelper = {
    get: (path) => {
        return http.get(path)
            .then(response => response.readBody())
            .then(body => JSON.parse(body))
    },

    getEventPullRequest: () => {
        return HttpHelper.get(github.context.payload.pull_request.url)
    },

    getPullRequestById: () => {
        const pullRequestId = core.getInput('pull_request_id', { required: true })

        return HttpHelper.get(github.context.apiUrl + '/repos/' + github.context.payload.repository.full_name +
            '/pulls/' + pullRequestId)
    },
    getCommitsByCompareBranch: () => {
        return HttpHelper.get(github.context.apiUrl + '/repos/' + github.context.payload.repository.full_name +
            '/compare/' + core.getInput('destination_branch', { required: true }) + '...' + github.context.ref)
            .then(response => response.commits)
    },
    getFilesByCompareBranch: () => {
        return HttpHelper.get(github.context.apiUrl + '/repos/' + github.context.payload.repository.full_name +
            '/compare/' + core.getInput('destination_branch', { required: true }) + '...' + github.context.ref)
            .then(response => response.files)
    },

    /**
     * @deprecated
     * @returns 
     */
    getOnlinePullRequest: () => {
        let path = ''

        if (core.getInput('pullRequestId')) {
            path = 'https://api.github.com/repos/' + github.context.payload.repository.full_name + '/pulls/' + core.getInput('pullRequestId')
        } else {
            path = github.context.payload.pull_request.url
        }

        return HttpHelper.get(path)
    }
}

module.exports = {
    HttpHelper
}