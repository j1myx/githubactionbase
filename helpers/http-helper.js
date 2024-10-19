const github = require('@actions/github')
const httpClient = require('@actions/http-client')

const http = new httpClient.HttpClient()
http.requestOptions = {
    headers: {
        ['User-agent']: github.context.payload.pull_request.user.login
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
        return HttpHelper.get(github.context.payload.pull_request.url)
    }
}

module.exports = {
    HttpHelper
}