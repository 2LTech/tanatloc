import www from '../www'

jest.mock('../../app', () => ({
  set: jest.fn()
}))

jest.mock('http', () => {
  let count = 0
  return {
    createServer: () => ({
      address: () => ({}),
      close: jest.fn(),
      listen: jest.fn(),
      on: jest.fn((_: any, callback: Function) => {
        if (callback.length === 1) {
          try {
            callback({ syscall: 'not-listen' })
          } catch (err) {
            console.error(err)
          }

          try {
            callback({ syscall: 'listen' })
          } catch (err) {
            console.error(err)
          }

          if (count === 0) {
            count++
            callback({ syscall: 'listen', code: 'EACCES' })
          } else {
            callback({ syscall: 'listen', code: 'EADDRINUSE' })
          }
        } else {
          callback({})
        }
      })
    })
  }
})

const mockInit = jest.fn()
jest.mock('../../../tanatloc/src/server/init', () => async () => mockInit())

const mockClean = jest.fn()
jest.mock('../../../tanatloc/src/server/clean', () => async () => mockClean())

Object.defineProperty(process, 'exit', { value: jest.fn })
Object.defineProperty(process, 'on', {
  value: async (type: string, callback: Function) => {
    if (type === 'exit')
      try {
        await callback()
      } catch (err) {}
  }
})

//@ts-ignore
global.setTimeout = (callback) => callback()

describe('server/bin/www', () => {
  beforeEach(() => {
    mockInit.mockReset()
    mockClean.mockReset()
  })

  test('Initialization fail', async () => {
    mockInit.mockImplementation(() => {
      throw new Error('clean error')
    })
    try {
      await www({ addStatus: async () => undefined })
    } catch (err) {}
  })

  test('clean fail', async () => {
    mockClean.mockImplementation(() => {
      throw new Error('clean error')
    })
    try {
      await www({ addStatus: async () => undefined })
    } catch (err) {}
  })

  test('www', async () => {
    try {
      await www({ addStatus: async () => undefined })
    } catch (err) {}

    try {
      await www({ addStatus: async () => undefined })
    } catch (err) {}
  })
})

export {}
