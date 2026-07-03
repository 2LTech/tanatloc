import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'config/jest/**',
    'coverage/**',
    'dist/**',
    'dist-install/**',
    'doc/**',
    'node_modules/**',
    'public/**',
    'out/**',
    'renderer/**',
    'next-env.d.ts',
    '**/__tests__/**',
    'src/components/editor/code/freefem/mode/mode-freefem-ejs.js'
  ]),
  {
    settings: {
      react: { version: '19' }
    }
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/jest.setup.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
])

export default eslintConfig

// rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-empty-object-type': 'off',
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {
//           caughtErrors: 'none',
//           ignoreRestSiblings: true
//         }
//       ],
//       '@next/next/no-img-element': 'off'
//     }
