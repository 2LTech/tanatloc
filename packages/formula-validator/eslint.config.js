import config from 'eslint/config'
import js from '@eslint/js'
import ts from 'typescript-eslint'

import globals from 'globals'

export default config.defineConfig([
  // Non-linted paths
  {
    ignores: ['config/*', 'coverage/*', 'dist/*', 'docs/*']
  },
  // Base JavaScript recommended rules
  js.configs.recommended,
  // TypeScript recommended rules
  ...ts.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
])
