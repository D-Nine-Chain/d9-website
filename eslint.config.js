// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',
      'eslint-comments/no-unlimited-disable': 'off',
      'style/no-tabs': 'off',
    },
  },
)
