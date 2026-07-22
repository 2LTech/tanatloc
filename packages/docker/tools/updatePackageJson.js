import fs from 'node:fs'

const managerPackageJson = '../../package.json'
const referencePackageJson = '../core/package.json'
const toUpdatePackageJson = './docker/package.json'

const readPackageJson = (fileName) => {
  const content = fs.readFileSync(fileName)
  return JSON.parse(content)
}

const findNewVersion = (reference, dep) => {
  const newDep = Object.keys(reference.dependencies).find((key) => key === dep)
  if (newDep) return reference.dependencies[newDep]

  const newDevDep = Object.keys(reference.devDependencies).find(
    (key) => key === dep
  )
  return reference.devDependencies[newDevDep]
}

const writePackageJson = (fileName, content) => {
  fs.writeFileSync(fileName, content)
}

const main = () => {
  let needUpdate = false

  const manager = readPackageJson(managerPackageJson)
  const reference = readPackageJson(referencePackageJson)
  const toUpdate = readPackageJson(toUpdatePackageJson)

  // Version
  if (toUpdate.version !== reference.version) {
    toUpdate.version = reference.version
    needUpdate = true
  }

  // Update dependencies
  const deps = toUpdate.dependencies
  Object.keys(deps).forEach((dep) => {
    const currentVersion = deps[dep]
    const newVersion = findNewVersion(reference, dep)

    if (newVersion && currentVersion !== newVersion) {
      toUpdate.dependencies[dep] = newVersion
      needUpdate = true
    }
  })

  // Update packageManager
  if (toUpdate.packageManager !== manager.packageManager) {
    toUpdate.packageManager = manager.packageManager
    needUpdate = true
  }

  // Skip if not updated
  if (!needUpdate) return

  // Write new
  writePackageJson(toUpdatePackageJson, JSON.stringify(toUpdate, null, 2))
}

main()
