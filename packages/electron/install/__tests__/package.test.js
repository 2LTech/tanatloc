jest.mock('fs', () => ({
  readFileSync: () => JSON.stringify({ version: '1.0.0' }),
  writeFileSync: jest.fn
}))

describe('install/package', () => {
  test('run', () => {
    require('../package.js')
  })
})
