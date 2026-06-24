import config from 'eslint/config'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import react from 'eslint-plugin-react'

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
    settings: { react: { version: '19' } }
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...react.configs.flat['jsx-runtime']
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/jest.setup.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'side',
            'wireframe',
            'transparent',
            'position',
            'args',
            'vertexColors',
            'geometry',
            'rotation',
            'intensity',
            'decay',
            'userData',
            'visible'
          ]
        }
      ]
    }
  }
])

// export default eslint.defineConfig(

//   // React Hooks: the two classic correctness rules. The full v7 React-Compiler
//   // rule set is intentionally left out — it is out of scope for this package.
//   {
//     files: ['**/*.{ts,tsx}'],
//     plugins: { 'react-hooks': reactHooks },
//     rules: {
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'warn'
//     }
//   },

//   // Project posture. These relaxations mirror packages/core and keep the new
//   // TypeScript/React coverage from churning pre-existing code:
//   // - `no-explicit-any` / `no-empty-object-type`: matched to packages/core.
//   // - `no-unused-vars`: error, but ignore caught errors, rest siblings and
//   //   intentionally-unused `_`-prefixed args.
//   // - `react/prop-types`: redundant in a fully-typed TypeScript codebase.
//   // - `react/no-unknown-property`: react-three-fiber declares custom JSX
//   //   properties (args, vertexColors, clippingPlanes, ...) that this DOM-
//   //   oriented rule cannot know about.
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-empty-object-type': 'off',
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {
//           caughtErrors: 'none',
//           ignoreRestSiblings: true,
//           argsIgnorePattern: '^_'
//         }
//       ],
//       'react/prop-types': 'off',
//       'react/no-unknown-property': 'off'
//     }
//   },

//   // Test files: relax rules that only flag Jest mock idioms (inline mock
//   // components without display names, `Function`-typed mock callbacks).
//   {
//     files: ['**/*.test.{ts,tsx}'],
//     rules: {
//       'react/display-name': 'off',
//       '@typescript-eslint/no-unsafe-function-type': 'off'
//     }
//   }
// )
