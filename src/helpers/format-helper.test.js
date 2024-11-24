const { validateCommitStandard, validateBranchStandard } = require('./format-helper')

test('validate branch standard format', () => {
    expect(validateBranchStandard('feature/ABCD-1234')).toBe(true)
    expect(validateBranchStandard('bugfix/ABCD-1234')).toBe(true)
    expect(validateBranchStandard('hotfix/ABCD-1234')).toBe(true)
    expect(validateBranchStandard('release/ABCD-1234')).toBe(true)
})

test('validate commit standard format', () => {
    expect(validateCommitStandard('feat(transfer): PEDS-4431 add form')).toBe(true)
    expect(validateCommitStandard('test: PEDS-4431 add code coverage')).toBe(true)
    expect(validateCommitStandard('estoy subiendo una funcionalidad')).toBe(false)
    expect(validateCommitStandard('feat(transfer): add form')).toBe(false)
})