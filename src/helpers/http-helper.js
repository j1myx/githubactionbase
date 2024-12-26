const github = require('@actions/github')
const core = require('@actions/core')
const httpClient = require('@actions/http-client')

const http = new httpClient.HttpClient()
http.requestOptions = {
    headers: {
        ['User-agent']: 'COE Software Engineer - Code Review Action',
        ['Authorization']: `Bearer ${core.getInput('github_token')}`
    }
}

const HttpHelper = {
    post: (path, data) => {
        return http.post(path, JSON.stringify(data))
            .then(response => response.readBody())
            .then(body => JSON.parse(body))
    },
    get: (path) => {
        return http.get(path)
            .then(response => response.readBody())
            .then(body => JSON.parse(body))
    },
    getEventPullRequest: () => {
        return HttpHelper.get(github.context.payload.pull_request.url)
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
    getPullRequests: () => {
        return HttpHelper.get(github.context.apiUrl + '/repos/' + github.context.payload.repository.full_name +
            '/pulls')
    }
}

module.exports = {
    HttpHelper
}