const core = require('@actions/core');
const github = require('@actions/github');

try {
    const word = core.getInput('word');
    console.log(word);

    if (word === 'none') {
        throw new Error('Define param word');
    }

    core.setOutput('result', `Branch: ${github.context.ref_name}`);
  } catch (error) {
    core.setFailed(error.message);
  }