jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: (_type, object) => {
      object.handleStatus()
      object.handleErrors()
    }
  },
  ipcRenderer: {
    on: jest.fn
  }
}))

describe('electron-src/helper/preload', () => {
  test('run', () => {
    require('../preload')
  })
})
