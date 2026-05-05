jest.mock('electron', () => ({
  app: {
    setPath: jest.fn,
    getPath: jest.fn,
    whenReady: jest.fn,
    quit: jest.fn,
    on: (_: any, callback: Function) => callback()
  },
  ipcMain: {
    on: (_: any, callback: Function) => callback({ sender: { send: jest.fn } })
  }
}))

jest.mock('electron-serve', () => () => {
  // Empty
})

jest.mock('@sentry/electron/main', () => ({
  init: jest.fn
}))

jest.mock('fix-path', () => () => undefined)

jest.mock('../helpers', () => ({
  createWindow: () => ({
    maximize: jest.fn,
    loadURL: jest.fn,
    webContents: {
      openDevTools: jest.fn,
      send: jest.fn
    }
  })
}))

jest.mock(
  '../../../extra/install/install/index.js',
  () => {
    throw new Error('install error')
  },
  { virtual: true }
)

jest.mock(
  '../../../extra/server/server/bin/www.js',
  () => () => {
    // Empty
  },
  { virtual: true }
)

describe('electron-src/background', () => {
  test('import', async () => {
    await import('..')
    await new Promise((resolve) => setTimeout(resolve, 5_000))
  }, 10_000)
})

export {}
