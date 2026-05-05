jest.mock('@swc/core', () => {
  let swcCount = 0
  return {
    transformFile: () => {
      swcCount++
      if (swcCount === 1) throw new Error('swc error')
      else
        return {
          code: 'code'
        }
    }
  }
})

jest.mock('fs', () => {
  let readFileCount = 0
  let writeFileCount = 0
  let readdirCount = 0
  return {
    promises: {
      readFile: async () => {
        readFileCount++
        if (readFileCount === 1)
          return JSON.stringify({
            type: 'module',
            dependencies: { test: '1.0.0' }
          })
        else if (readFileCount === 2)
          return JSON.stringify({ type: 'commonjs' })
        else return JSON.stringify({ type: 'module' })
      },
      writeFile: async () => {
        writeFileCount++
        if (writeFileCount === 3) throw new Error('writeFile error')
      },
      readdir: async () => {
        readdirCount++
        if (readdirCount <= 2)
          return [{ isDirectory: () => false, name: 'file.js' }]
        else if (readdirCount === 3)
          return [{ isDirectory: () => true, name: 'path' }]
        else if (readdirCount === 4)
          return [{ isDirectory: () => true, name: 'node_modules' }]
        else if (readdirCount === 5) return ['pack']
        else return [{ isDirectory: () => false, name: 'file' }]
      }
    }
  }
})

describe('esm_commonjs', () => {
  test('run', async () => {
    require('..')
    await new Promise((resolve) => setTimeout(resolve, 2_000))
  }, 10_000)
})
