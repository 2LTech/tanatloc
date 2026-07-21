import config from 'eslint/config'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactThree from '@react-three/eslint-plugin'

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
    files: ['**/*.{ts,tsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    settings: { react: { version: '19' } },
    // threeJS properties
    plugins: {
      '@react-three': reactThree
    }
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/jest.setup.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
])
