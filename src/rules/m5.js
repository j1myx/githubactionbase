const github = require('@actions/github')
const core = require('@actions/core')

const m5 = () => {
    return new Promise((resolve, reject) => {
        resolve(5)
    });
}

module.exports = { m5 }