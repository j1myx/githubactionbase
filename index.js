const core = require('@actions/core');
const github = require('@actions/github');

const { m1 } = require('./rules/m1');
const { m2 } = require('./rules/m2');
const { m3 } = require('./rules/m3');
const { m4 } = require('./rules/m4');
const { m5 } = require('./rules/m5');

try {
    const metricType = core.getInput('metric');
    let metricValue = null;

    switch (metricType) {
        case 'm1': metricValue = m1; break;
        case 'm2': metricValue = m2; break;
        case 'm3': metricValue = m3; break;
        case 'm4': metricValue = m4; break;
        case 'm5': metricValue = m5; break;
    }

    if (metricValue === null) {
        throw new Error('Undefined metric');
    }

    core.setOutput('note', metricValue);
  } catch (error) {
    core.setFailed(error.message);
  }