const github = require('@actions/github')
const core = require('@actions/core')
const httpClient = require('@actions/http-client')

const http = new httpClient.HttpClient()
http.requestOptions = {
    headers: {
        ['User-agent']: 'COE Software Engineers - Code Review Action'
    }
}

const HttpHelper = {
    get: (path) => {
        return http.get(path)
            .then(response => response.readBody())
            .catch(error => reject(error))
            .then(body => JSON.parse(body))
    },

    getOnlinePullRequest: () => {
        let path = ''

        if (core.getInput('pullRequestId')) {
            path = 'https://api.github.com/repos/' + github.context.payload.repository.full_name + '/pulls/' + core.getInput('pullRequestId')
        } else {
            path = github.context.payload.pull_request.url
        }

        console.log('path', path)
        return HttpHelper.get(path)
    }
}

module.exports = {
    HttpHelper
}