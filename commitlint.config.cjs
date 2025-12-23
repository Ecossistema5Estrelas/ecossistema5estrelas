module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat','fix','refactor','chore','docs','style',
      'test','perf','ci','build','revert'
    ]],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
}
