const path = require('path')
const depcheck = require('depcheck')
const { exit } = require('process')
const { promises: fs } = require('fs')

depcheck.special.customTypedoc = async (fileName) => {
  const newDeps = []

  if (path.basename(fileName) === 'package.json') {
    const packageJson = require(fileName)

    if (packageJson.scripts.doc) {
      newDeps.push('typedoc')
    }
  }

  return newDeps
}

depcheck.special.customBabel = async (fileName) => {
  const newDeps = []

  if (path.basename(fileName).includes('babelrc')) {
    const buffer = await fs.readFile(fileName)
    const babelrc = JSON.parse(buffer.toString())
    if (babelrc.presets) {
      newDeps.push(
        ...babelrc.presets.filter((preset) => preset !== 'next/babel')
      )
    }
  }

  return newDeps
}

let justOne = 0
depcheck.special.customPackage = async () => {
  const newDeps = []

  if (!justOne) {
    const packageJson = require('../../core/package.json')
    newDeps.push(...Object.keys(packageJson.devDependencies))

    justOne++
  }

  return newDeps
}

const options = {
  ignoreMatches: ['@types/*', '@babel/runtime'],
  specials: [
    depcheck.special.babel,
    depcheck.special.bin,
    depcheck.special.jest,
    depcheck.special.customTypedoc,
    depcheck.special.customBabel,
    depcheck.special.customPackage
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

  if (error) exit(1)
})
