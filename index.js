const core = require('@actions/core');

const { m1 } = require('./rules/m1');
const { m2 } = require('./rules/m2');
const { m3 } = require('./rules/m3');
const { m4 } = require('./rules/m4');
const { m5 } = require('./rules/m5');
const { total } = require('./rules/total');

try {
    const metricType = core.getInput('metric');
    let metricValue = null;

    switch (metricType) {
        case 'm1': m1().then(value => metricValue = value); break;
        case 'm2': metricValue = m2(); break;
        case 'm3': metricValue = m3(); break;
        case 'm4': metricValue = m4(); break;
        case 'm5': metricValue = m5(); break;
        case 'total': metricValue = total(); break;
    }

    setTimeout(() => {
        if (metricValue === null) {
            throw new Error('Undefined metric');
        }
    
        core.setOutput('value', metricValue);
    
        if (metricValue < 4) {
            throw new Error('Nivel de madurez bajo: ' + metricValue);
        }
    }, 1500)

  } catch (error) {
    core.setFailed(error.message);
  }