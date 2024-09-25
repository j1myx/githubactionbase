const core = require('@actions/core');

const m1 = core.getInput('m1') * 0.25;
const m2 = core.getInput('m2') * 0.15;
const m3 = core.getInput('m3') * 0.35;
const m4 = core.getInput('m4') * 0.25;
const m5 = core.getInput('m5') * -0.5; // Calibrar

const total = m1 + m2 + m3 + m4;

module.exports = {
    total: total
}
