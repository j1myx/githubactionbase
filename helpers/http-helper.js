const github = require('@actions/github');
const httpClient = require('@actions/http-client');

const http = new httpClient.HttpClient();
http.requestOptions = {
    headers: {
        ['User-agent']: github.context.payload.pull_request.user.login
    }
}

const HttpHelper = {
    getOnlinePullRequest: () => {
        return this.get(github.context.payload.pull_request.url)
    },

    get: (path) => {
        return http.get(path)
            .then(response => response.readBody())
            .catch(error => reject(error))
            .then(body => JSON.parse(body))
    }
}

module.exports = {
    HttpHelper
}