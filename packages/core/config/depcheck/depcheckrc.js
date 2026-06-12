import { basename } from 'path'
import depcheck from 'depcheck'
import { exit } from 'process'

/**
 * Custom typedeoc parser
 * @returns Deps array
 */
const customTypedoc = async (fileName) => {
  const newDeps = []

  try {
    if (basename(fileName) === 'package.json') {
      const packageJson = (await import(fileName, { with: { type: 'json' } }))
        .default
      Object.values(packageJson.scripts).forEach((script) => {
        if (script.includes('typedoc')) {
          newDeps.push('typedoc')
        }
        if (script.includes('depcheck')) newDeps.push('depcheck')
        if (script.includes('sitemap')) newDeps.push('next-sitemap')
      })
    }
  } catch (err) {
    console.error(err)
  }

  return newDeps
}

/**
 * Custom jest.config.js parser
 * @returns Deps array
 */
const customJest = async (fileName, deps) => {
  const newDeps = []

  try {
    if (basename(fileName) === 'jest.config.js') {
      newDeps.push('jest-environment-jsdom')
      if (deps.includes('typescript')) newDeps.push('@types/jest')

      const config = (await import(fileName)).default
      Object.values(config.transform).forEach((value) => {
        if (!value.includes('<rootDir>')) newDeps.push(value[0])
      })

      Object.values(config.moduleNameMapper).forEach((value) => {
        if (!value.includes('<rootDir>')) newDeps.push(value)
      })
    }
  } catch (err) {
    console.error(err)
  }

  return newDeps
}

const options = {
  ignoreMatches: [
    'mathjax', // MathJax
    'electron', // Mandatory for electron-store
    'electron-serve', // Mandatory for electron-store
    'form-data', // For plugins
    'https-proxy-agent', // For plugins
    'node-fetch', // For plugins
    'url-join', // For plugins
    '@types/url-join', //For plugins
    '@babel/plugin-syntax-import-assertions', // For tests
    '@babel/preset-env', // For tests
    '@babel/preset-react', // For tests
    '@babel/preset-typescript', // For tests
    '@types/babel__preset-env' // For tests
  ],
  specials: [
    depcheck.special.bin,
    depcheck.special.eslint,
    depcheck.special.jest,
    customTypedoc,
    customJest
  ]
}

depcheck(process.cwd(), options, (unused) => {
  let error = 0

  if (unused.dependencies.length) {
    console.error('Unused dependencies:')
    console.error(unused.dependencies)
    console.error()
    error++
  }

  if (unused.devDependencies.length) {
    console.error('Unused dev dependencies:')
    console.error(unused.devDependencies)
    console.error()
    error++
  }

  if (Object.keys(unused.missing).length) {
    console.warn('Missing dependencies:')
    console.warn(unused.missing)
    console.warn()
  }

  if (error) exit(1)
})
