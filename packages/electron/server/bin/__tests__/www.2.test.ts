import www from '../www'

jest.mock('../../app', () => ({
  set: jest.fn()
}))
jest.mock('http', () => ({
  createServer: () => ({
    address: () => 'address',
    close: jest.fn(),
    listen: jest.fn(),
    on: jest.fn((_: any, callback: Function) => {
      if (callback.length === 1) {
        try {
          callback({ syscall: 'listen' })
        } catch (err) {
          console.error(err)
        }
      } else {
        callback({})
      }
    })
  })
}))

const mockInit = jest.fn()
jest.mock('../../../tanatloc/src/server/init', () => async () => mockInit())

const mockClean = jest.fn()
jest.mock('../../../tanatloc/src/server/clean', () => async () => mockClean())

Object.defineProperty(process, 'env', { value: { PORT: 'port' } })

describe('server/bin/www', () => {
  test('www', async () => {
    await www({ addStatus: async () => undefined })
  })
})

export {}
