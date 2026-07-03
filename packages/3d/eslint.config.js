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
            'visible',
            'metalness',
            'roughness',
            'uuid',
            'object',
            'depthWrite',
            'clippingPlanes'
          ]
        }
      ]
    }
  }
])
