jest.mock('http-errors', () => jest.fn())
jest.mock('express', () => ({
  __esModule: true,
  default: () => ({
    disable: jest.fn(),
    use: jest.fn((callback) => {
      if (typeof callback === 'function') {
        if (callback.length === 3) callback({}, {}, jest.fn())
        if (callback.length === 4) {
          const err = {}
          const req = {
            app: {
              get: () => 'development'
            }
          }
          const res = {
            locals: {},
            status: jest.fn(),
            send: jest.fn()
          }
          callback(err, req, res, jest.fn())

          req.app.get = () => 'production'
          callback(err, req, res, jest.fn())
        }
      }
    }),
    get: jest.fn((_: any, callback: Function) => {
      callback()
    }),
    all: jest.fn((_: any, callback: Function) => {
      callback()
    }),
    post: jest.fn((_: any, callback: Function) => {
      callback()
    })
  }),
  json: jest.fn(),
  urlencoded: jest.fn()
}))
jest.mock('cors', () => jest.fn())

jest.mock('../../tanatloc/src/route/login', () => ({
  loginRoute: jest.fn()
}))
jest.mock('../../tanatloc/src/route/avatar', () => jest.fn())
jest.mock('../../tanatloc/src/route/email', () => jest.fn())
jest.mock('../../tanatloc/src/route/geometries', () => jest.fn())
jest.mock('../../tanatloc/src/route/geometry', () => jest.fn())
jest.mock('../../tanatloc/src/route/geometry/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/geometry/[id]/download', () => jest.fn())
jest.mock('../../tanatloc/src/route/geometry/[id]/part', () => jest.fn())
jest.mock('../../tanatloc/src/route/group', () => jest.fn())
jest.mock('../../tanatloc/src/route/groups', () => jest.fn())
jest.mock('../../tanatloc/src/route/groups/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/link', () => jest.fn())
jest.mock('../../tanatloc/src/route/organization', () => jest.fn())
jest.mock('../../tanatloc/src/route/organization/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/organizations', () => jest.fn())
jest.mock('../../tanatloc/src/route/plugin', () => jest.fn())
jest.mock('../../tanatloc/src/route/plugins', () => jest.fn())
jest.mock('../../tanatloc/src/route/postprocessing', () => jest.fn())
jest.mock('../../tanatloc/src/route/project', () => jest.fn())
jest.mock('../../tanatloc/src/route/project/[id]/archive', () => jest.fn())
jest.mock('../../tanatloc/src/route/project/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/projects', () => jest.fn())
jest.mock('../../tanatloc/src/route/result', () => jest.fn())
jest.mock('../../tanatloc/src/route/result/download', () => jest.fn())
jest.mock('../../tanatloc/src/route/result/archive', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation/[id]/run', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation/[id]/stop', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation/[id]/log', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulation/[id]/tasks', () => jest.fn())
jest.mock('../../tanatloc/src/route/simulations', () => jest.fn())
jest.mock('../../tanatloc/src/route/system', () => jest.fn())
jest.mock('../../tanatloc/src/route/user', () => jest.fn())
jest.mock('../../tanatloc/src/route/user/[id]', () => jest.fn())
jest.mock('../../tanatloc/src/route/user/check', () => jest.fn())
jest.mock('../../tanatloc/src/route/userModel', () => jest.fn())
jest.mock('../../tanatloc/src/route/users', () => jest.fn())
jest.mock('../../tanatloc/src/route/workspace', () => jest.fn())
jest.mock('../../tanatloc/src/route/logout', () => ({
  logout: jest.fn()
}))

describe('server/app', () => {
  Object.defineProperty(process, 'exit', { value: jest.fn })
  Object.defineProperty(process, 'on', {
    value: (type: string, callback: (code: number) => {}) => {
      if (type === 'exit') callback(10)
    }
  })

  test('app', async () => {
    const app = await import('../app')
    expect(app.default).toBeDefined()
  })
})

export {}
