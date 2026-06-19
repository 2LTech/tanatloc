import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  // Non-linted paths
  {
    ignores: ['config/*', 'coverage/*', 'dist/*', 'docs/*']
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (non type-checked: no full type graph needed,
  // keeps `yarn lint` fast and free of tsconfig project wiring)
  ...tseslint.configs.recommended,

  // React recommended rules + the new JSX runtime (React 19 needs no React
  // import in scope)
  {
    files: ['**/*.{ts,tsx}'],
    ...react.configs.flat.recommended,
    settings: { react: { version: '19' } }
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...react.configs.flat['jsx-runtime']
  },

  // React Hooks: the two classic correctness rules. The full v7 React-Compiler
  // rule set is intentionally left out — it is out of scope for this package.
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Project posture. These relaxations mirror packages/core and keep the new
  // TypeScript/React coverage from churning pre-existing code:
  // - `no-explicit-any` / `no-empty-object-type`: matched to packages/core.
  // - `no-unused-vars`: error, but ignore caught errors, rest siblings and
  //   intentionally-unused `_`-prefixed args.
  // - `react/prop-types`: redundant in a fully-typed TypeScript codebase.
  // - `react/no-unknown-property`: react-three-fiber declares custom JSX
  //   properties (args, vertexColors, clippingPlanes, ...) that this DOM-
  //   oriented rule cannot know about.
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_'
        }
      ],
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off'
    }
  },

  // Test files: relax rules that only flag Jest mock idioms (inline mock
  // components without display names, `Function`-typed mock callbacks).
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'react/display-name': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off'
    }
  }
)
