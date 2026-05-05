import { createWindow } from '..'

jest.mock('electron', () => ({
  screen: {
    getPrimaryDisplay: () => ({
      bounds: {
        width: 100,
        height: 100
      }
    }),
    getAllDisplays: () => ({
      some: (callback: Function) =>
        callback({
          bounds: {
            x: 200,
            y: 200,
            width: 200,
            height: 200
          }
        })
    })
  },
  BrowserWindow: class {
    on = (_: any, callback: Function) => callback()
    isMinimized = () => false
    isMaximized = () => false
    getPosition = () => []
    getSize = () => []
    constructor() {
      this.on = (_: any, callback: Function) => callback()
      this.isMinimized = () => false
      this.isMaximized = () => false
      this.getPosition = () => []
      this.getSize = () => []
    }
  }
}))

jest.mock(
  'electron-store',
  () =>
    class {
      set = jest.fn
      get = () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      })
      constructor() {
        this.set = jest.fn
        this.get = () => ({
          x: 300,
          y: 300,
          width: 300,
          height: 300
        })
      }
    }
)

describe('electron-src/helpers/create-window', () => {
  test('call', () => {
    createWindow('name', { width: 1000, height: 1000 })
  })
})
