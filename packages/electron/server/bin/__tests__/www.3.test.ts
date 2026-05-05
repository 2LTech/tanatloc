import www from '../www'

jest.mock('../../app', () => ({
  set: jest.fn()
}))
jest.mock('http', () => ({
  createServer: () => ({
    address: () => ({}),
    close: jest.fn(),
    listen: jest.fn(),
    on: jest.fn()
  })
}))

const mockInit = jest.fn()
jest.mock('../../../tanatloc/src/server/init', () => async () => mockInit())

const mockClean = jest.fn()
jest.mock('../../../tanatloc/src/server/clean', () => async () => mockClean())

Object.defineProperty(process, 'env', { value: { PORT: -1 } })

describe('server/bin/www', () => {
  test('www', async () => {
    await www({ addStatus: async () => undefined })
  })
})

export {}
