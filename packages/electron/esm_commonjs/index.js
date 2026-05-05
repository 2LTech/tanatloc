//@ts-check

/** @module ESM-CommonJS */

const swc = require('@swc/core')
const { promises: fs } = require('fs')
const path = require('path')

const dependencies = [
  'electron-serve',
  'electron-store',
  'is-docker',
  'url-join',
  'fix-path',
  '@airthium/pg-format',
  'node-fetch',
  '@airthium/extract-json-from-string'
]

/**
 * Check packages
 * @param {string} dir Directory
 */
const checkPackage = async (dir) => {
  console.info(' - Check package', dir)
  try {
    const pkgFile = path.join('./node_modules', dir, 'package.json')
    const pkgFileContent = await fs.readFile(pkgFile)
    const pkg = JSON.parse(pkgFileContent.toString())

    if (pkg.type === 'commonjs') return

    console.info('  + Convert package...')

    // Transpile files
    await transpileFiles(dir)

    // Update package.json
    pkg.type = 'commonjs'
    await fs.writeFile(pkgFile, JSON.stringify(pkg, null, '\t'))

    // Check dependencies
    await checkDependencies(pkg.dependencies)
  } catch (err) {
    console.info('   Failed')
  }
}

/**
 * Transpile files
 * @param {string} dir Directory
 */
const transpileFiles = async (dir) => {
  const directory = path.join('./node_modules', dir)
  const files = await fs.readdir(directory, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      if (file.name === 'node_modules')
        await checkPackages(path.join(dir, file.name))
      else await transpileFiles(path.join(dir, file.name))
    }

    const extension = file.name.split('.').pop()
    if (extension !== 'js') continue

    console.info('   - Transpile', file.name, '...')

    try {
      // Transpile
      const { code } = await swc.transformFile(
        path.join(directory, file.name),
        {
          minify: true,
          module: {
            type: 'commonjs'
          }
        }
      )

      // Override
      await fs.writeFile(path.join(directory, file.name), code)
    } catch (err) {
      console.info('     Failed')
    }
  }
}

/**
 * Check packages
 * @param {string} dir Directory
 */
const checkPackages = async (dir) => {
  const directory = path.join('./node_modules', dir)
  const packages = await fs.readdir(directory)

  for (const pack of packages) await checkPackage(path.join(dir, pack))
}

/**
 * Check dependencies
 * @param {string[]} dependencies Dependencies
 */
const checkDependencies = async (dependencies) => {
  if (!dependencies) return

  for (const dependency of Object.keys(dependencies))
    await checkPackage(dependency)
}

/**
 * Main
 */
const main = async () => {
  console.info('Convert ES module to CommonJS')
  console.info('', dependencies.join(' - '))
  for (const dependency of dependencies) await checkPackage(dependency)
}

main().catch(console.error)
