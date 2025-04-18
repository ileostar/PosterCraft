import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: [
      'eslint.config.mjs',
      'src/helper/pinia-auto-refs.ts'
    ]
  },
)
