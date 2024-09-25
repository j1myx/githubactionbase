const core = require('@actions/core');
const github = require('@actions/github');

try {
    const metricType = core.getInput('metric');
    let metricValue = null;

    switch (metricType) {
        case 'm1': require('./rules/m1').then(aa => metricValue = aa.m1); break;
        case 'm2': metricValue = require('./rules/m2')(github).m2; break;
        case 'm3': metricValue = require('./rules/m3').m3; break;
        case 'm4': metricValue = require('./rules/m4').m4; break;
        case 'm5': metricValue = require('./rules/m5').m5; break;
        case 'total': metricValue = require('./rules/total').total; break;
    }

    if (metricValue === null) {
        throw new Error('Undefined metric');
    }

    core.setOutput('value', metricValue);

    if (metricValue < 4) {
        throw new Error('Nivel de madurez bajo: ' + metricValue);
    }

  } catch (error) {
    core.setFailed(error.message);
  }